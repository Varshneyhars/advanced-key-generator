# advanced-key-generator

[![GitHub package.json version (branch)][version-image]][npm-url]
[![CodeFactor][codefactor-image]][codefactor-url]

`advanced-key-generator` is a library for generating random API (Application Programming Interface) keys or access tokens. By using this library, a Node.js backend service can generate API keys or access tokens, and then issue them to users and/or other services that require access to the capabilities and resources provided by the API service.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [Generation Methods](#generation-methods)
- [Options](#options)
  - [`string` Method](#string-method)
  - [`bytes` Method](#bytes-method)
  - [`base32` Method](#base32-method)
  - [`base62` Method](#base62-method)
  - [`uuidv4` Method](#uuidv4-method)
  - [`uuidv5` Method](#uuidv5-method)
  - [`sha256` Method](#sha256-method)
  - [`sha512` Method](#sha512-method)
  - [`jwt` Method](#jwt-method)
  - [`md5` Method](#md5-method)
- [Security](#security)
- [Change Log](#change-log)
- [License](#license)

## Installation

Using NPM:

```bash
$ npm install advanced-key-generator
```

Using Yarn:

```bash
$ yarn add advanced-key-generator
```

## Usage

The `advanced-key-generator` library can generate API key/access tokens by utilizing several generation methods, such as `string`, `bytes`, `base32`, `base62`, `uuidv4`, `uuidv5`, `sha256`, `sha512`, `jwt`, and `md5`. Additionally, it provides functions to verify the validity of API keys and check if they have expired.

Importing:

```javascript
// CommonJS Import
const { generateApiKey, verifyKey, isExpired } = require('advanced-key-generator');
// OR
const { default: generateApiKey, verifyKey, isExpired } = require('advanced-key-generator');

// ES6 Import
import { generateApiKey, verifyKey, isExpired } from 'advanced-key-generator';
```

### Generation Methods

| Method   |  Description                                                           |
| -------- | -----------------------------------------------------------------------| 
| `string` | Creates an API key/access token using random string generation           |
| `bytes`  | Creates an API key/access token using random bytes                       |
| `base32` | Creates an API key/access token using a random UUID and converting it<br />into a [Douglas Crockford Base32](https://en.wikipedia.org/wiki/Base32#Crockford's_Base32) encoded string  |
| `base62` | Creates an API key using Base62 encoding                                 |
| `uuidv4` | Creates an API key/access token using random UUID Version 4 generation   |
| `uuidv5` | Creates an API key/access token using random UUID Version 5 generation   |
| `sha256` | Creates an API key/access token using SHA-256 hash generation            |
| `sha512` | Creates an API key/access token using SHA-512 hash generation            |
| `jwt`    | Creates a JSON Web Token (JWT) using a specified payload and secret      |
| `md5`    | Creates an API key/access token using MD5 hash generation                |

### Options

See the [Options](#options) section for detailed descriptions of available options for each generation method.

### Example Usage

**Generate an API Key**

```javascript
import { generateApiKey } from 'advanced-key-generator';

// Generate the API key using default method 'string'.
console.log(generateApiKey()); // ⇨ 'q_EaTiX+xbBXLyO05.+zDXjI+Qi_X0v'

// Generate an API key with expiration time.
const apiKey = generateApiKey({ method: 'string', length: 20, expiration: 3600 }); // 1 hour
console.log(`Generated API Key: ${apiKey}`);
```

**Verify an API Key**

```javascript
import { verifyKey } from 'advanced-key-generator';

// Verify the generated API key.
const isValid = verifyKey(apiKey, 'string');
console.log(`Is API Key Valid? ${isValid}`);
```

## Check if an API Key is Expired

You can check if an API key has expired using the `isExpired` function. Ensure that the object you pass to the function contains both the API key and its expiration timestamp (`expiresAt`).

Here's an example of how to use the `isExpired` function:

```javascript
import { isExpired } from 'advanced-key-generator';

// Example API key with expiration timestamp
const apiKeyObject = {
  apiKey: 'your-api-key',
  expiresAt: 1724564930854 // Example expiration timestamp in milliseconds
};

// Check if the API key has expired
const expired = isExpired(apiKeyObject);
console.log(`Is API Key Expired? ${expired}`);

```

### New Functions

#### `verifyKey(apiKey, method)`

Verifies if the provided API key matches the expected format for the given generation method.

| Parameter  | Type   | Description                                                      |
| ---------- | ------ | ---------------------------------------------------------------- |
| `apiKey`   | string | The API key to verify                                           |
| `method`   | string | The generation method used to create the key                     |

Returns `true` if the API key matches the expected format, otherwise `false`.

#### `isExpired(apiKeyObject)`

Check if the provided API key has expired based on its stored expiration date.

| Parameter  | Type   | Description                                                      |
| ---------- | ------ | ---------------------------------------------------------------- |
| `apiKeyObject`   | object| An object containing the API key and its expiration date. The object should have the following properties: `apiKey` (string) and `expiresAt` (number).                             |

Returns `true` if the API key has expired, otherwise `false`.

---

## Options

### `string` Method  

Creates an API key/access token using random string generation.  

| Name     | Default Value |  Description                                                      |
| ---------| ------------- | ----------------------------------------------------------------- | 
| `method` | `string`      | To use the `string` generation method                             |
| `min`    | `16`          | The minimum length of the API key (ignored if `length` is given)  |
| `max`    | `32`          | The maximum length of the API key (ignored if `length` is given)  |
| `length` | `undefined`   | The length of the API key                                         |
| `pool`   | `abcdefghijklmnopqrstuvwxyz`<br />`ABCDEFGHIJKLMNOPQRSTUVWXYZ`<br />`0123456789-._~+/` | The characters used for the API key generation | 
| `prefix` | `undefined`   | A string prefix for the API key, followed by a period (`.`)       |  
| `batch`  | `undefined`   | The number of API keys to generate                                |

Examples:

```javascript
import generateApiKey from 'advanced-key-generator';

// Generate the API key using default method 'string'.
console.log(generateApiKey()); // ⇨ 'q_EaTiX+xbBXLyO05.+zDXjI+Qi_X0v'

// Provide the generation method.
console.log(generateApiKey({ method: 'string' })); // ⇨ 'Zt1HbMcLKxk6~nnW'

// Create an API key with a certain length.
console.log(generateApiKey({ method: 'string', length: 8 })); // ⇨ 'TNJ6-Lo4'

// Create an API key with a length between a certain range.
console.log(generateApiKey({ method: 'string', min: 10, max: 20 })); // ⇨ 'ENwiOFdP8cWj'

// Create an API key with a certain pool of characters.
console.log(generateApiKey({
  method: 'string',
  pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
})); // ⇨ 'QFLSGIDLOUAELQZTQXMHQNJ'

// Create an API key with a prefix.
console.log(generateApiKey({ method: 'string', prefix: 'test_app' })); // ⇨ 'test_app.aTd34Rli0nir70/8'

// Create a batch (certain amount) of API keys.
console.log(generateApiKey({ method: 'string', batch: 5 })); 
// [
//   'w05KkI9AWhKxzvPFtXotUva-',
//   'YFL0ICl4PtLD8Y/oQ20iyAE',
//   'vJFbfeP_cpMYsH9l5BVHY23Ss',
//   '29~LIlSjDYFr5OrhU3f',
//   'UQc8Tp1d9elWAh7KDIMkjz2moFs'
// ]
```

### `jwt` Method  

Creates a JSON Web Token (JWT) using a specified payload and secret.

| Name       | Default Value |  Description                                                      |
| ---------- | ------------- | ----------------------------------------------------------------- | 
| `method`   | `jwt`         | To use the `jwt` generation method                                |
| `payload`  | `{}`          | The payload data to include in the JWT                            |
| `secret`   | `undefined`   | The secret key used to sign the JWT                               |
| `expiresIn`| `undefined`   | Expiration time for the JWT                                       |
| `algorithm`| `HS256`       | The algorithm used to sign the JWT (e.g., `HS256`, `RS256`)       |
| `prefix`   | `undefined`   | A string prefix for the JWT, followed by a period (`.`)           |
| `batch`    | `undefined`   | The number of JWTs to generate                                    |

Examples:

```javascript
import generateApiKey from 'advanced-key-generator';

// Provide the generation method.
console.log(generateApiKey({ method: 'jwt', payload: { userId: 1 }, secret: 'mySecret' })); 
// ⇨ 'eyJ

hbGciOiAiSFMyNTYiLCAiaWF0IjoxNjE4MjU2OTU5LCAiZXhwIjoxNjE4MjcwNTU5fQ.eyJ1c2VySWQiOiAxfQ.qMc7aSVE_9xwbjLxnhecMxkXetZYq3Fphs4sdjQkMk'

```

### `md5` Method  

Creates an API key/access token using MD5 hash generation.

| Name       | Default Value |  Description                                                      |
| ---------- | ------------- | ----------------------------------------------------------------- | 
| `method`   | `md5`         | To use the `md5` generation method                                |
| `input`    | `undefined`   | The input string to hash                                         |
| `prefix`   | `undefined`   | A string prefix for the API key, followed by a period (`.`)       |
| `batch`    | `undefined`   | The number of API keys to generate                                |

Examples:

```javascript
import generateApiKey from 'advanced-key-generator';

// Generate the API key using MD5 hash generation.
console.log(generateApiKey({ method: 'md5', input: 'exampleString' })); 
// ⇨ '6c569aabb98f037b92c0e5f1d0f600d8'

```

---

## Security

Ensure that you keep your API keys secure and do not expose them publicly. Use secure storage solutions such as environment variables or dedicated secrets management services to store and manage your keys.

## Change Log

See the [CHANGELOG.md](__./CHANGELOG.md__) file for details about the latest updates and changes.

## License

This project is licensed under the MIT License - see the [LICENSE](__./LICENSE__) file for details.

[npm-url]: __https://www.npmjs.com/package/advanced-key-generator__
[version-image]: __https://img.shields.io/github/package-json/v/Varshneyhars/advanced-key-generator/main?label=version&style=flat-square__
[codefactor-url]: __https://www.codefactor.io/repository/github/Varshneyhars/advanced-key-generator/overview/main__
[codefactor-image]: __https://www.codefactor.io/repository/github/varshneyhars/advanced-key-generator/badge__


```

This README provides detailed examples for each method, ensuring that users can easily understand how to use each feature of the `advanced-key-generator` library. Make sure to replace placeholder links and

images with actual URLs relevant to your project. If you need more help or have other questions, feel free to ask!