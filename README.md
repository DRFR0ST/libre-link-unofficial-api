# 🩸 Unofficial Libre Link Up API for Node.js

[![npm version](https://badge.fury.io/js/libre-link-unofficial-api.svg)](https://www.npmjs.com/package/libre-link-unofficial-api)
[![GitHub license](https://img.shields.io/github/license/DRFR0ST/libre-link-unofficial-api)](https://github.com/DRFR0ST/libre-link-unofficial-api/blob/main/LICENSE)
[![🧪 Tests](https://github.com/DRFR0ST/libre-link-unofficial-api/actions/workflows/test.yml/badge.svg)](https://github.com/DRFR0ST/libre-link-unofficial-api/actions/workflows/test.yml)

Welcome to the unofficial Node.js API for Libre Link Up! This library is designed to help you interact with your CGM data from your Freestyle Libre 2/3 stored inside Abbott's database directly from your Node.js applications. Please note that this library is not officially supported by Abbott/Freestyle and was reverse engineered for educational purposes.

⚠️ The library is in alpha and may not work as expected, breaking changes may occur. Please open an issue if you encounter any problems.

## 🚀 Getting Started

First, install the library using either

### npm
```sh
npm install libre-link-unofficial-api
```

### pnpm
```sh
pnpm add libre-link-unofficial-api
```

### yarn
```sh
yarn add libre-link-unofficial-api
```

### bun
```sh
bun install libre-link-unofficial-api
```

Then, you can import the `LibreLinkClient` from the library:

```js
import { LibreLinkClient } from 'libre-link-unofficial-api';
```

You'll need to provide an email and password for your [Libre Link Up](https://librelinkup.com/) account either in the .env file or when creating a new `LibreLinkClient` instance:

```js
const client = new LibreLinkClient({ email: 'your-libre-link-up-email', password: 'your-libre-link-up-password' });
```

Please make sure that the email and password work with the [Libre Link Up](https://librelinkup.com/) mobile application before using them with this library.

## 📚 API

### Options
The `LibreLinkClient` constructor accepts the following options:

Option | Description | Default
--- | --- | ---
`email` | The email address for your Libre Link Up account. Will fallback to env variables, if not provided. | `undefined`
`password` | The password for your Libre Link Up account. Will fallback to env variables, if not provided. | `undefined`
`patientId` | The patient ID for the user. Will fallback to env variables, if not provided. | `undefined`
`cache` | Whether to enable cache for request responses received from Libre Link Up api. Data like blood glucose readings will never be cached. | `true`

### Methods
The `LibreLinkClient` provides access to the following methods:

Method | Description | Status
--- | --- | ---
`login` | Login to the Libre Link Up API. | ✅
`me` | Get the current cached user. | ✅
`read` | Get the raw reading. | ✅
`stream` | Stream the readings. | ⏳
`fetchReading` | Fetch the raw reading from the Libre Link Up API. Use read for parsed readings. | ✅
`fetchConnections` | Fetch the connections between LinkUp account and Libre app. | ✅

More methods will be added in the future. If you need a specific method, please open an issue or submit a pull request!

## 📖 Examples

### Create a new LibreLinkClient
It's necessary to create a new `LibreLinkClient` instance to interact with the Libre Link Up API. Otherwise any method listed below will throw an error.
```js
import { LibreLinkClient } from 'libre-link-unofficial-api';

const client = new LibreLinkClient({ email: 'your-libre-link-up-email', password: 'your-libre-link-up-password' });
```

### Log into Libre Link Up
```js
await client.login();
```

### Get current user
```js
const user = client.me;
```

### Get a blood glucose reading
```js
const reading = await client.read();

console.log(reading.value);
```

Check out the [examples](https://github.com/DRFR0ST/libre-link-unofficial-api/blob/main/example/index.ts) directory for more examples.

## ⚠️ Disclaimer
This library was reverse engineered from the Libre Link Up API and resources available online; and may be incomplete or inaccurate. The library is not associated with Abbott or Freestyle. Use at your own risk.

Every 12 hours a Github Action runs to test the library against the Libre Link Up API. If the tests fail, the library may be out of date. Please open an issue or submit a pull request if you notice any issues. Thanks!

[![🧪 Tests](https://github.com/DRFR0ST/libre-link-unofficial-api/actions/workflows/test.yml/badge.svg)](https://github.com/DRFR0ST/libre-link-unofficial-api/actions/workflows/test.yml)

## 🙏 Acknowledgements
Big thanks to the author of the [libre-link-up-api-client](https://github.com/DiaKEM/libre-link-up-api-client) library for reverse engineering the Libre Link Up API — your work inspired this library! 🚀

## 📝 License
This project is licensed under the terms of the MIT license. See the LICENSE file for details.
