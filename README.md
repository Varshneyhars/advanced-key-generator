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

The `advanced-key-generator` library can generate API key/access tokens by utilizing several generation methods, such as `string`, `bytes`, `base32`, `base62`, `uuidv4`, and `uuidv5`. The `string` method is used by default.

Importing:  

```javascript
// CommonJS Import
const { generateApiKey } = require('advanced-key-generator');
// OR
const generateApiKey = require('advanced-key-generator').default;

// ES6 Import
import { generateApiKey } from 'advanced-key-generator';
// OR
import generateApiKey from 'advanced-key-generator';
```

Example:

```javascript
import generateApiKey from 'advanced-key-generator';

// Generate the API key using default method 'string'.
console.log(generateApiKey()); // ⇨ 'q_EaTiX+xbBXLyO05.+zDXjI+Qi_X0v'
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
console.log(generateApiKey({ method: 'bytes', min: 12, max: 25 })); // ⇨ 'fae27c801b5092bc'

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

Creates an API key/access token using a random UUID and converting it into a [Douglas Crockford Base32](https://en.wikipedia.org/wiki/Base32#Crockford's_Base32) encoded string.  

| Name     | Default Value |  Description                                                      |
| ---------| ------------- | ----------------------------------------------------------------- | 
| `method` | `base32`      | To use the `base32` generation method                             |
| `dashes` | `true`        | Add dashes (`-`) to the API key or not                            |
| `prefix` | `undefined`   | A string prefix for the API key, followed by a period (`.`)       |  
| `batch`  | `undefined`   | The number of API keys to generate                                |

Examples:  

```javascript
import generateApiKey from 'advanced-key-generator';

// Provide the generation method.
console.log(generateApiKey({ method: 'base32' })); // ⇨ '2NOLH5I-43EEK7A-R6YRK3I-BRCIQNQ'

// Create an API key without the dashes.
console.log(generateApiKey({ method: 'base32', dashes: false })); // ⇨ '2NOLH5I43EEK7AR6YRK3IBRCIQNQ'

// Create an API key with a prefix.
console.log(generateApiKey({ method: 'base32', prefix: 'prefix_' })); // ⇨ 'prefix_.2NOLH5I-43EEK7A-R6YRK3I-BRCIQNQ'

// Create a batch (certain amount) of API keys.
console.log(generateApiKey({ method: 'base32', batch: 5 })); 
// [
//   'A4AEMJ4-JBQ4-FAHQ-B65S-DG4WBW7',
//   'A4AEMJ4-JBQ4-FAHQ-B65S-DG4WBW7',
//   'A4AEMJ4-JBQ4-FAHQ-B65S-DG4WBW7',
//   'A4AEMJ4-JBQ4-FAHQ-B65S-DG4WBW7',
//   'A4AEMJ4-JBQ4-FAHQ-B65S-DG4WBW7'
// ]
```

### `base62` Method  

Creates an API key using Base62 encoding.  

| Name     | Default Value |  Description                                                      |
| ---------| ------------- | ----------------------------------------------------------------- | 
| `method` | `base62`      | To use the `base62` generation method                             |
| `prefix` | `undefined`   | A string prefix for the API key, followed by a period (`.`)       |  
| `batch`  | `undefined`   | The number of API keys to generate                                |

Examples:  

```javascript
import generateApiKey from 'advanced-key-generator';

// Provide the generation method.
console.log(generateApiKey({ method: 'base62' })); // ⇨ 'ZKc19O5EnfgyZthv'

console.log(generateApiKey({ method: 'base62', prefix: 'key_' })); // ⇨ 'key_PzI7tKy90Fl4wZsc'

console.log(generateApiKey({ method: 'base62', batch: 3 })); 
// [
//   '5Z39PFA3Ws4r6Uqz',
//   'AaHs9vKrT2m5gLtz',
//   '2P7k6O8h1oZsJwWq'
// ]
```

### `uuidv4` Method  

Creates an API key/access token using random UUID Version 4 generation.  

| Name     | Default Value |  Description                                                      |
| ---------| ------------- | ----------------------------------------------------------------- | 
| `method` | `uuidv4`      | To use the `uuidv4` generation method                             |
| `dashes` | `true`        | Add dashes (`-`) to the API key or not                            |
| `prefix` | `undefined`   | A string prefix for the API key, followed by a period (`.`)       |  
| `batch`  | `undefined`   | The number of API keys to generate                                |

Examples:  

```javascript
import generateApiKey from 'advanced-key-generator';

// Provide the generation method.
console.log(generateApiKey({ method: 'uuidv4' })); // ⇨ 'a1b2c3d4-e5f6-1234-5678-9abcdef01234'

// Create an API key without the dashes.
console.log(generateApiKey({ method: 'uuidv4', dashes: false })); // ⇨ 'a1b2c3d4e5f6123456789abcdef01234'

// Create an API key with a prefix.
console.log(generateApiKey({ method: 'uuidv4', prefix: 'uuid_' })); // ⇨ 'uuid_a1b2c3d4-e5f6-1234-5678-9abcdef01234'

// Create a batch (certain amount) of API keys.
console.log(generateApiKey({ method: 'uuidv4', batch: 3 })); 
// [
//   'f47ac10b-58cc-4372-a567-0e02b2c3d479',
//   'f47ac10b-58cc-4372-a567-0e02b2c3d479',
//   'f47ac10b-58cc-4372-a567-0e02b2c3d479'
// ]
```

### `uuidv5` Method  

Creates an API key/access token using random UUID Version 5 generation.  

| Name         | Default Value |  Description                                                      |
| ------------ | ------------- | ----------------------------------------------------------------- | 
| `method`     | `uuidv5`      | To use the `uuidv5` generation method                             |
| `name`       | `undefined`   | A unique name to be used for UUID Version 5 generation            |
| `namespace`  | `undefined`   | The UUID namespace used for generation                            |
| `dashes`     | `true`        | Add dashes (`-`) to the API key or not                            |
| `prefix`     | `undefined`   | A string prefix for the API key, followed by a period (`.`)       |  
| `batch`      | `undefined`   | The number of API keys to generate                                |

Examples:  

```javascript
import generateApiKey from 'advanced-key-generator';

// Provide the generation method.
console.log(generateApiKey({ method: 'uuidv5', name: 'example-name', namespace: '123e4567-e89b-12d3-a456-426614174000' })); // ⇨ '9b8a8090-ccf1-5d08-bd3c-bf0e946f24dc'

// Create an API key without the dashes.
console.log(generateApiKey({ method: 'uuidv5', name: 'example-name', namespace: '123e4567-e89b-12d3-a456-426614174000', dashes: false })); // ⇨ '9b8a8090ccf15d08bd3cbf0e946f24dc'

// Create an API key with a prefix.
console.log(generateApiKey({ method: 'uuidv5', name: 'example-name', namespace: '123e4567-e89b-12d3-a456-426614174000', prefix: 'uuid5_' })); // ⇨ 'uuid5_9b8a8090-ccf1-5d08-bd3c-bf0e946f24dc'

// Create a batch (certain amount) of API keys.
console.log(generateApiKey({ method: 'uuidv5', name: 'example-name', namespace: '123e4567-e89b-12d3-a456-426614174000', batch: 3 })); 
// [
//   '9b8a8090-ccf1-5d08-bd3c-bf0e946f24dc',
//   '9b8a8090-ccf1-5d08-bd3c-bf0e946f24dc',
//   '9b8a8090-ccf1-5d08-bd3c-bf0e946f24dc'
// ]
```

## Security  

When generating and storing API keys and tokens, always adhere to secure storage best practices. API keys and tokens should be treated like passwords, as they provide access to resources and services.

Avoid storing API keys or tokens in plain text. Instead, use secure hashing techniques, such as hashing with a salt or pepper. If API keys are compromised, promptly revoke them and generate new ones.

## Change Log

See the [CHANGELOG](./CHANGELOG.md) for detailed descriptions of changes and updates.

## License

This software is licensed under the [MIT License](./LICENSE).

[npm-url]: https://www.npmjs.com/package/advanced-key-generator
[version-image]: https://img.shields.io/github/package-json/v/Varshneyhars/advanced-key-generator/main?label=version&style=flat-square
[codefactor-url]: https://www.codefactor.io/repository/github/Varshneyhars/advanced-key-generator/overview/main
[codefactor-image]: https://www.codefactor.io/repository/github/varshneyhars/advanced-key-generator/badge


```

This README provides detailed examples for each method, ensuring that users can easily understand how to use each feature of the `advanced-key-generator` library. Make sure to replace placeholder links and

images with actual URLs relevant to your project. If you need more help or have other questions, feel free to ask!