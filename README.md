# advanced-key-generator

[![GitHub package.json version (branch)][version-image]][npm-url]
[![CodeFactor][codefactor-image]][codefactor-url]

`advanced-key-generator` is a library for generating random API (Application Programming Interface) keys or access tokens. By using this library, a Node.js backend service can generate API keys or access tokens, then issue them to users and/or other services that require access to the capabilities and resources provided by the API service.

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

The `advanced-key-generator` library can generate API key/access tokens by utilizing several generation methods, such as `string`, `bytes`, `base32`, `base62`, `uuidv4`, `uuidv5`, `sha256`, and `sha512`. Additionally, it provides functions to verify the validity of API keys and check if they have expired.

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
| -------- | ------------------------------------------------------------------------| 
| `string` | Creates an API key/access token using random string generation           |
| `bytes`  | Creates an API key/access token using random bytes                       |
| `base32` | Creates an API key/access token using a random UUID and converting it<br />into a [Douglas Crockford Base32](https://en.wikipedia.org/wiki/Base32#Crockford's_Base32) encoded string  |
| `base62` | Creates an API key using Base62 encoding                                 |
| `uuidv4` | Creates an API key/access token using random UUID Version 4 generation   |
| `uuidv5` | Creates an API key/access token using random UUID Version 5 generation   |
| `sha256` | Creates an API key/access token using SHA-256 hash generation            |
| `sha512` | Creates an API key/access token using SHA-512 hash generation            |

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

**Check if an API Key is Expired**

```javascript
import { isExpired } from 'advanced-key-generator';

// Check if the API key has expired.
const expired = isExpired(apiKey);
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

#### `isExpired(apiKey)`

Checks if the provided API key has expired based on its stored expiration date.

| Parameter  | Type   | Description                                                      |
| ---------- | ------ | ---------------------------------------------------------------- |
| `apiKey`   | string | The API key to check for expiration                             |

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

### `bytes` Method  

Creates an API key/access token using random bytes.  

| Name     | Default Value |  Description                                                      |
| ---------| ------------- | ----------------------------------------------------------------- | 
| `method` | `bytes`       | To use the `bytes` generation method                              |
| `min`    | `16`          | The minimum length of the API key (ignored if `length` is given)  |
| `max`    | `32`          | The maximum length of the API key (ignored if `length` is given)  |
| `length` | `undefined`   | The length of the API key                                         |
| `prefix` | `undefined`   | A string prefix for the API key, followed by a period (`.`)       |  
| `batch`  | `undefined`   | The number of API keys to generate                                |

Examples:  

```javascript
import generateApiKey from 'advanced-key-generator';

// Provide the generation method.
console.log(generateApiKey({ method: 'bytes' })); // ⇨ '6f31bfc3717d63e7bd21'

// Create an API key with a certain length.
console.log(generateApiKey({ method: 'bytes', length: 12 })); // ⇨ '47a8dcbc79f6'

// Create an API key with a length between a certain range.
console.log(generateApiKey({ method: 'bytes', min: 12, max: 25 })); // ⇨'fae27c801b5092bc'

// Create an API key with a prefix.
console.log(generateApiKey({ method: 'bytes', prefix: 'test_app' })); // ⇨ 'test_app.8daaa6b26c79030db1a1448261'

// Create a batch (certain amount) of API keys.
console.log(generateApiKey({ method: 'bytes', batch: 5 }));
// [
//   '0d5a87f007aae092a6',
//   '96a62b4438d82645506b',
//   'abd4e4199311fb1e2a818a4a',
//   'ddbb04b2375ba050cb506e89df',
//   '2ee3db86329865d8'
// ]
```

### `base32` Method  

Creates an API key/access token using a UUID encoded in [Douglas Crockford Base32](https://en.wikipedia.org/wiki/Base32#Crockford's_Base32).

| Name     | Default Value | Description                                                     |
| -------- | ------------- | --------------------------------------------------------------- |
| `method` | `base32`      | To use the `base32` generation method                           |
| `dashes` | `true`        | Include dashes (`-`) in the API key                             |
| `prefix` | `undefined`   | A string prefix for the API key, followed by a period (`.`)     |
| `batch`  | `undefined`   | The number of API keys to generate                              |

Examples:

```javascript
import generateApiKey from 'advanced-key-generator';

// Provide the generation method.
console.log(generateApiKey({ method: 'base32' })); // ⇨ 'F3C5L7Q0G1P8J2W6-B2V3H9D4X7R1M5T8'

// Generate an API key without dashes.
console.log(generateApiKey({ method: 'base32', dashes: false })); // ⇨ 'F3C5L7Q0G1P8J2W6B2V3H9D4X7R1M5T8'

// Create an API key with a prefix.
console.log(generateApiKey({ method: 'base32', prefix: 'test_app' })); // ⇨ 'test_app.F3C5L7Q0G1P8J2W6-B2V3H9D4X7R1M5T8'

// Create a batch (certain amount) of API keys.
console.log(generateApiKey({ method: 'base32', batch: 5 }));
// [
//   'X1C3L5Q2G1P8J7W6-B2V3H9D4X7R1M5T8',
//   'F4C5L7Q0G1P8J2W6-B2V3H9D4X7R1M5T9',
//   'F3C5L7Q0G1P8J2W6-B2V3H9D4X7R1M5T0',
//   'F2C5L7Q0G1P8J2W6-B2V3H9D4X7R1M5T1',
//   'F1C5L7Q0G1P8J2W6-B2V3H9D4X7R1M5T2'
// ]
```

### `base62` Method  

Creates an API key using Base62 encoding.

| Name     | Default Value | Description                                                     |
| -------- | ------------- | --------------------------------------------------------------- |
| `method` | `base62`      | To use the `base62` generation method                           |
| `length` | `20`          | The length of the API key                                       |
| `prefix` | `undefined`   | A string prefix for the API key, followed by a period (`.`)     |
| `batch`  | `undefined`   | The number of API keys to generate                              |

Examples:

```javascript
import generateApiKey from 'advanced-key-generator';

// Provide the generation method.
console.log(generateApiKey({ method: 'base62' })); // ⇨ 'aX7Q8W6N3Z5R4Y2B1J9V0M8P2T3G4L1'

// Generate an API key with a specific length.
console.log(generateApiKey({ method: 'base62', length: 15 })); // ⇨ 'aX7Q8W6N3Z5R4Y2'

// Create an API key with a prefix.
console.log(generateApiKey({ method: 'base62', prefix: 'test_app' })); // ⇨ 'test_app.aX7Q8W6N3Z5R4Y2B1J9V0M8P2T3G4L1'

// Create a batch (certain amount) of API keys.
console.log(generateApiKey({ method: 'base62', batch: 5 }));
// [
//   'aX7Q8W6N3Z5R4Y2B1J9V0M8P2T3G4L1',
//   'bY7Q8W6N3Z5R4Y2B1J9V0M8P2T3G4L2',
//   'cZ7Q8W6N3Z5R4Y2B1J9V0M8P2T3G4L3',
//   'dA7Q8W6N3Z5R4Y2B1J9V0M8P2T3G4L4',
//   'eB7Q8W6N3Z5R4Y2B1J9V0M8P2T3G4L5'
// ]
```

### `uuidv4` Method  

Creates an API key/access token using random UUID Version 4 generation.

| Name     | Default Value | Description                                                     |
| -------- | ------------- | --------------------------------------------------------------- |
| `method` | `uuidv4`      | To use the `uuidv4` generation method                           |
| `prefix` | `undefined`   | A string prefix for the API key, followed by a period (`.`)     |
| `batch`  | `undefined`   | The number of API keys to generate                              |

Examples:

```javascript
import generateApiKey from 'advanced-key-generator';

// Provide the generation method.
console.log(generateApiKey({ method: 'uuidv4' })); // ⇨ '6fbb2e1e-2b3c-453b-9673-9ad3e5b8e8b0'

// Create an API key with a prefix.
console.log(generateApiKey({ method: 'uuidv4', prefix: 'test_app' })); // ⇨ 'test_app.6fbb2e1e-2b3c-453b-9673-9ad3e5b8e8b0'

// Create a batch (certain amount) of API keys.
console.log(generateApiKey({ method: 'uuidv4', batch: 5 }));
// [
//   '6fbb2e1e-2b3c-453b-9673-9ad3e5b8e8b0',
//   '7fbb2e1e-2b3c-453b-9673-9ad3e5b8e8b1',
//   '8fbb2e1e-2b3c-453b-9673-9ad3e5b8e8b2',
//   '9fbb2e1e-2b3c-453b-9673-9ad3e5b8e8b3',
//   '0fbb2e1e-2b3c-453b-9673-9ad3e5b8e8b4'
// ]
```

### `uuidv5` Method  

Creates an API key/access token using random UUID Version 5 generation.

| Name       | Default Value | Description                                                     |
| ---------- | ------------- | --------------------------------------------------------------- |
| `method`   | `uuidv5`      | To use the `uuidv5` generation method                           |
| `namespace`| `url`         | The UUID namespace: `url`, `dns`, `oid`, or `x500`              |
| `name`     | `example.com` | The name for the namespace, e.g., 'example.com' for `url`       |
| `prefix`   | `undefined`   | A string prefix for the API key, followed by a period (`.`)     |
| `batch`    | `undefined`   | The number of API keys to generate                              |

Examples:

```javascript
import generateApiKey from 'advanced-key-generator';

// Provide the generation method.
console.log(generateApiKey({ method: 'uuidv5', namespace: 'url', name: 'example.com' })); // ⇨ 'e5f6b3b2-6b3e-533b-bf32-bf5d9b0e8a8a'

// Create an API key with a prefix.
console.log(generateApiKey({ method: 'uuidv5', namespace: 'url', name: 'example.com', prefix: 'test_app' })); // ⇨ 'test_app.e5f6b3b2-6b3e-533b-bf32-bf5d9b0e8a8a'

// Create a batch (certain amount) of API keys.
console.log(generateApiKey({ method: 'uuidv5', namespace:

```javascript
'url', name: 'example.com', batch: 5 }));
// [
//   'e5f6b3b2-6b3e-533b-bf32-bf5d9b0e8a8a',
//   'f6f6b3b2-6b3e-533b-bf32-bf5d9b0e8a8b',
//   'g7f6b3b2-6b3e-533b-bf32-bf5d9b0e8a8c',
//   'h8f6b3b2-6b3e-533b-bf32-bf5d9b0e8a8d',
//   'i9f6b3b2-6b3e-533b-bf32-bf5d9b0e8a8e'
// ]
```

### `sha256` Method

Creates an API key/access token using SHA-256 hash generation.

| Name     | Default Value | Description                                                     |
| -------- | ------------- | --------------------------------------------------------------- |
| `method` | `sha256`      | To use the `sha256` generation method                           |
| `length` | `64`          | The length of the API key                                       |
| `prefix` | `undefined`   | A string prefix for the API key, followed by a period (`.`)     |
| `batch`  | `undefined`   | The number of API keys to generate                              |

Examples:

```javascript
import generateApiKey from 'advanced-key-generator';

// Provide the generation method.
console.log(generateApiKey({ method: 'sha256' })); // ⇨ 'f2c2f71b3c3ff0bb6a42a1f22362b01988b0c6e888d3a3c1a66b9d907c6b3459'

// Generate an API key with a specific length.
console.log(generateApiKey({ method: 'sha256', length: 32 })); // ⇨ 'f2c2f71b3c3ff0bb6a42a1f22362b019'

// Create an API key with a prefix.
console.log(generateApiKey({ method: 'sha256', prefix: 'test_app' })); // ⇨ 'test_app.f2c2f71b3c3ff0bb6a42a1f22362b01988b0c6e888d3a3c1a66b9d907c6b3459'

// Create a batch (certain amount) of API keys.
console.log(generateApiKey({ method: 'sha256', batch: 5 }));
// [
//   'f2c2f71b3c3ff0bb6a42a1f22362b01988b0c6e888d3a3c1a66b9d907c6b3459',
//   'e3d3f82c4d4ff1cc7b53b2f33473c12a99c1d7f999e4b4c2b77c0d018d7c456a',
//   'd4e4g93d5e5ff2dd8c64c3f44584d23b10d2e8fa88f5c5d3b88d1e129e8d567b',
//   'c5f5h04e6f6ff3ee9d75d4f55695e34c21e3f9fb99g6d6e4c99e2f23af9e678c',
//   'b6g6i15f707ff4ffae86e5g667a6f45d32f4g0gcdc0f7e7f5d10f4g3b0af789d'
// ]
```

### `sha512` Method

Creates an API key/access token using SHA-512 hash generation.

| Name     | Default Value | Description                                                     |
| -------- | ------------- | --------------------------------------------------------------- |
| `method` | `sha512`      | To use the `sha512` generation method                           |
| `length` | `128`         | The length of the API key                                       |
| `prefix` | `undefined`   | A string prefix for the API key, followed by a period (`.`)     |
| `batch`  | `undefined`   | The number of API keys to generate                              |

Examples:

```javascript
import generateApiKey from 'advanced-key-generator';

// Provide the generation method.
console.log(generateApiKey({ method: 'sha512' })); // ⇨ 'f2c2f71b3c3ff0bb6a42a1f22362b01988b0c6e888d3a3c1a66b9d907c6b3459f2c2f71b3c3ff0bb6a42a1f22362b01988b0c6e888d3a3c1a66b9d907c6b3459'

// Generate an API key with a specific length.
console.log(generateApiKey({ method: 'sha512', length: 64 })); // ⇨ 'f2c2f71b3c3ff0bb6a42a1f22362b01988b0c6e888d3a3c1a66b9d907c6b3459'

// Create an API key with a prefix.
console.log(generateApiKey({ method: 'sha512', prefix: 'test_app' })); // ⇨ 'test_app.f2c2f71b3c3ff0bb6a42a1f22362b01988b0c6e888d3a3c1a66b9d907c6b3459f2c2f71b3c3ff0bb6a42a1f22362b01988b0c6e888d3a3c1a66b9d907c6b3459'

// Create a batch (certain amount) of API keys.
console.log(generateApiKey({ method: 'sha512', batch: 5 }));
// [
//   'f2c2f71b3c3ff0bb6a42a1f22362b01988b0c6e888d3a3c1a66b9d907c6b3459f2c2f71b3c3ff0bb6a42a1f22362b01988b0c6e888d3a3c1a66b9d907c6b3459',
//   'e3d3f82c4d4ff1cc7b53b2f33473c12a99c1d7f999e4b4c2b77c0d018d7c456ae3d3f82c4d4ff1cc7b53b2f33473c12a99c1d7f999e4b4c2b77c0d018d7c456a',
//   'd4e4g93d5e5ff2dd8c64c3f44584d23b10d2e8fa88f5c5d3b88d1e129e8d567bd4e4g93d5e5ff2dd8c64c3f44584d23b10d2e8fa88f5c5d3b88d1e129e8d567b',
//   'c5f5h04e6f6ff3ee9d75d4f55695e34c21e3f9fb99g6d6e4c99e2f23af9e678cc5f5h04e6f6ff3ee9d75d4f55695e34c21e3f9fb99g6d6e4c99e2f23af9e678c',
//   'b6g6i15f707ff4ffae86e5g667a6f45d32f4g0gcdc0f7e7f5d10f4g3b0af789db6g6i15f707ff4ffae86e5g667a6f45d32f4g0gcdc0f7e7f5d10f4g3b0af789d'
// ]
```

## Security

Ensure that you keep your API keys secure and do not expose them publicly. Use secure storage solutions such as environment variables or dedicated secrets management services to store and manage your keys.

## Change Log

See the [CHANGELOG.md](./CHANGELOG.md) file for details about the latest updates and changes.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

[npm-url]: https://www.npmjs.com/package/advanced-key-generator
[version-image]: https://img.shields.io/github/package-json/v/Varshneyhars/advanced-key-generator/main?label=version&style=flat-square
[codefactor-url]: https://www.codefactor.io/repository/github/Varshneyhars/advanced-key-generator/overview/main
[codefactor-image]: https://www.codefactor.io/repository/github/varshneyhars/advanced-key-generator/badge


```

This README provides detailed examples for each method, ensuring that users can easily understand how to use each feature of the `advanced-key-generator` library. Make sure to replace placeholder links and

images with actual URLs relevant to your project. If you need more help or have other questions, feel free to ask!