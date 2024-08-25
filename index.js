import crypto from 'crypto';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import base32 from 'base32.js';
import base64url from 'base64url';
import jwt from 'jsonwebtoken';

const defaultCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

async function generateString(length = 32, charset = defaultCharset, min, max, pool) {
    const finalLength = min && max ? Math.floor(Math.random() * (max - min + 1)) + min : length;
    const charsetToUse = pool || charset;
    const charsetLength = charsetToUse.length;

    if (charsetLength === 0) {
        throw new Error('Charset cannot be empty');
    }

    const randomBytes = crypto.randomBytes(finalLength);
    const result = Array.from(randomBytes)
        .map(byte => charsetToUse[byte % charsetLength])
        .join('');
    console.debug(`Generated string: ${result}`);
    return result;
}

function hashData(data, algorithm = 'md5') {
    if (!['md5', 'sha256', 'sha512'].includes(algorithm)) {
        throw new Error('Invalid hash algorithm');
    }

    const hash = crypto.createHash(algorithm).update(data).digest('hex');
    console.debug(`Hash (${algorithm}): ${hash}`);
    return hash;
}

async function generateApiKey(options = {}) {
    const {
        method = 'string',
        length = 32,
        charset = defaultCharset,
        namespace,
        name,
        expiresIn = 0,
        base32Scheme = 'RFC4648',
        base32Padding = true,
        uuidVersion = 'v4',
        prefix = '',
        suffix = '',
        entropySource = crypto.randomBytes,
        pool,
        min,
        max,
        batch,
        jwtSecret,
        jwtPayload,
        jwtOptions
    } = options;

    const adjustedLength = min && max ? Math.floor(Math.random() * (max - min + 1)) + min : length;

    if (adjustedLength <= 0) {
        throw new Error('Length must be greater than zero');
    }

    const generateKey = async () => {
        let result;
        switch (method) {
            case 'string':
                result = await generateString(adjustedLength, charset, min, max, pool);
                break;
            case 'bytes':
                result = entropySource(adjustedLength).toString('hex');
                break;
            case 'base32':
                try {
                    const encoder = new base32.Encoder({ type: base32Scheme, padding: base32Padding });
                    const data = entropySource(adjustedLength);
                    result = encoder.write(data).finalize().slice(0, adjustedLength);
                } catch (error) {
                    throw new Error(`Error encoding base32: ${error.message}`);
                }
                break;
            case 'base64':
                result = base64url.encode(entropySource(adjustedLength)).slice(0, adjustedLength);
                break;
            case 'uuidv4':
                result = uuidv4();
                break;
            case 'uuidv5':
                if (!namespace || !name) {
                    throw new Error('Namespace and name are required for UUIDv5');
                }
                result = uuidv5(name, namespace);
                break;
            case 'md5':
            case 'sha256':
            case 'sha512':
                result = hashData(entropySource(adjustedLength), method);
                break;
            case 'jwt':
                if (!jwtSecret || !jwtPayload) {
                    throw new Error('JWT secret and payload are required');
                }
                result = jwt.sign(jwtPayload, jwtSecret, jwtOptions);
                break;
            default:
                throw new Error('Invalid method');
        }
        return result;
    };

    if (batch && Number.isInteger(batch) && batch > 1) {
        const results = [];
        for (let i = 0; i < batch; i++) {
            const key = await generateKey();
            results.push({
                apiKey: `${prefix}${key}${suffix}`,
                expiresAt: expiresIn ? Date.now() + expiresIn : undefined
            });
        }
        console.debug(`Generated batch of keys: ${JSON.stringify(results)}`);
        return results;
    }

    const apiKey = await generateKey();
    let expiresAt;

    if (method === 'jwt') {
        const decoded = jwt.decode(apiKey);
        if (decoded && decoded.exp) {
            expiresAt = decoded.exp * 1000; // Convert from seconds to milliseconds
        }
    } else if (expiresIn) {
        expiresAt = Date.now() + expiresIn;
    }

    return {
        apiKey: `${prefix}${apiKey}${suffix}`,
        expiresAt
    };
}

function verifyKey(apiKey, options) {
    if (!apiKey) return false;

    // Check expiration
    if (options && options.expiresAt !== undefined) {
        const now = Date.now();
        if (now > options.expiresAt) {
            return false;
        }
    }

    // Additional verification based on method
    if (options && options.method) {
        switch (options.method) {
            case 'uuidv4':
                const uuidv4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                return uuidv4Pattern.test(apiKey);
            case 'uuidv5':
                const uuidv5Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                return uuidv5Pattern.test(apiKey);
            case 'md5':
                const md5Pattern = /^[a-f0-9]{32}$/i;
                return md5Pattern.test(apiKey);
            case 'sha256':
                const sha256Pattern = /^[a-f0-9]{64}$/i;
                return sha256Pattern.test(apiKey);
            case 'sha512':
                const sha512Pattern = /^[a-f0-9]{128}$/i;
                return sha512Pattern.test(apiKey);
            case 'string':
                if (options.length && apiKey.length !== options.length) {
                    return false;
                }
                if (options.charset) {
                    const charsetPattern = new RegExp(`^[${options.charset}]+$`);
                    if (!charsetPattern.test(apiKey)) {
                        return false;
                    }
                }
                if (options.pool) {
                    const poolPattern = new RegExp(`^[${options.pool}]+$`);
                    if (!poolPattern.test(apiKey)) {
                        return false;
                    }
                }
                return true;
            case 'base64':
                const base64Pattern = /^[a-zA-Z0-9+/]+={0,2}$/;
                return base64Pattern.test(apiKey);
            case 'jwt':
                try {
                    jwt.verify(apiKey, options.jwtSecret);
                    return true;
                } catch (err) {
                    return false;
                }
            default:
                return false;
        }
    }

    return true;
}

// Function to determine if the key is a JWT based on its structure
function isJwt(apiKey) {
    // Simple check for JWT format (three parts separated by dots)
    return typeof apiKey === 'string' && apiKey.split('.').length === 3;
}

function isExpired(apiKeyObject) {
    if (!apiKeyObject) return true; // Invalid API key object

    // Handle JWTs
    if (apiKeyObject.apiKey && isJwt(apiKeyObject.apiKey)) {
        try {
            // Decode the JWT to check its expiration
            const decoded = jwt.decode(apiKeyObject.apiKey, { complete: true });

            if (decoded && decoded.payload && decoded.payload.exp) {
                // Check if the current time is past the expiration time
                return Date.now() >= decoded.payload.exp * 1000;
            }

            // If there is no 'exp' claim, we cannot determine expiration
            return true; // Treat as expired if no 'exp' claim
        } catch (err) {
            // Handle errors (e.g., invalid token format)
            console.error('Error decoding JWT:', err);
            return true; // Treat as expired if decoding fails
        }
    }

    // Handle non-JWT keys with 'expiresAt' property
    if (apiKeyObject.expiresAt !== undefined) {
        // Ensure expiresAt is in milliseconds
        if (typeof apiKeyObject.expiresAt === 'number') {
            return Date.now() >= apiKeyObject.expiresAt;
        }
        // If expiresAt is in seconds, convert to milliseconds
        if (typeof apiKeyObject.expiresAt === 'number') {
            return Date.now() >= apiKeyObject.expiresAt * 1000;
        }
    }

    // Default to false if no expiration check is applicable
    return false;
}

export { generateApiKey, verifyKey, isExpired };
    