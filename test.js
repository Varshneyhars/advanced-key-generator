import { generateApiKey, verifyKey, isExpired } from './index.js';
import { v4 as uuidv4 } from 'uuid';


async function runTests() {
    const testCases = [
        // Basic cases
        { method: 'string', length: 16 },
        { method: 'string', length: 32 },
        { method: 'string', length: 16, charset: 'abcdef0123456789' },
        { method: 'string', min: 8, max: 16 },
        { method: 'string', length: 16, pool: 'ABCDEF1234567890' },

        // Bytes cases
        { method: 'bytes', length: 16 },
        { method: 'bytes', length: 32 },

        // Base64 cases
        { method: 'base64', length: 16 },
        { method: 'base64', length: 32 },

        // UUID cases
        { method: 'uuidv4' },
        { method: 'uuidv5', namespace: uuidv4(), name: 'example' },

        // Hash cases
        { method: 'md5' },
        { method: 'sha256' },
        { method: 'sha512' },

        // Expiry cases
        { method: 'string', length: 16, expiresIn: 5000, prefix: 'exp-', suffix: '-key' },
        { method: 'bytes', length: 16, expiresIn: 5000 },
        { method: 'uuidv4', expiresIn: 5000 },

        // Batch cases
        { method: 'string', length: 16, batch: 3 },
        { method: 'uuidv4', batch: 2 },
        { method: 'sha256', batch: 2 },

        // JWT cases
        { method: 'jwt', jwtSecret: 'your-secret-key', jwtPayload: { userId: 123, role: 'admin' }, jwtOptions: { expiresIn: '1s' } },
        { method: 'jwt', jwtSecret: 'your-secret-key', jwtPayload: { userId: 456, role: 'user' }, jwtOptions: { expiresIn: '2s' } }
    ];

    for (const testCase of testCases) {
        try {
            console.log(`Running test case:`, testCase);

            const generatedKeys = await generateApiKey(testCase);
            console.log("Generated API Key(s):", generatedKeys);

            if (Array.isArray(generatedKeys)) {
                for (const keyObj of generatedKeys) {
                    const { apiKey, expiresAt } = keyObj;
                    const isValid = await verifyKey(apiKey, { ...testCase, apiKey });
                    console.log(`Key: ${apiKey}, Is valid: ${isValid}`);

                    if (expiresAt) {
                        console.log(`Is API Key expired? ${isExpired({ apiKey, expiresAt })}`);
                        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for additional 3 seconds
                        console.log(`Is API Key expired after more time? ${isExpired({ apiKey, expiresAt })}`);
                    }
                }
            } else {
                const isValid = await verifyKey(generatedKeys.apiKey, { ...testCase, apiKey: generatedKeys.apiKey });
                console.log(`Key: ${generatedKeys.apiKey}, Is valid: ${isValid}`);
                
                if (testCase.expiresIn) {
                    const expiresAt = Date.now() + testCase.expiresIn;
                    console.log(`Is API Key expired? ${isExpired({ apiKey: generatedKeys.apiKey, expiresAt })}`);
                    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for additional 3 seconds
                    console.log(`Is API Key expired after more time? ${isExpired({ apiKey: generatedKeys.apiKey, expiresAt })}`);
                }
            }

        } catch (error) {
            console.error(`Error with test case ${JSON.stringify(testCase)}:`, error);
        }
    }
}

runTests().catch(console.error);
