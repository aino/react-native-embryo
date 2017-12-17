# React Native Embryo

- [x] Bugfree Xcode & Android setups for multiple build flavors
- [x] [React Native Navigation](https://github.com/wix/react-native-navigation)
- [x] [MobX](https://github.com/mobxjs/mobx)
- [x] Friendly exception handling (no crash :dizzy_face:)
- [x] Centralized versioning - one script to bump’em all
- [x] Flow-typed & eslint for quality code

## Get

```
git clone git@github.com:aino/react-native-embryo.git <APP_NAME>
cd <APP_NAME>
yarn start
```

An installation wizard will start in the terminal where you should enter your desired App Name (f.ex **CoffeeBreak**) and bundle ID (f.ex **com.company.coffeebreak**):

<img src="https://i.imgur.com/ONgI3jj.gif" width="600px" />

## At first glance ##

The footprint is small by design! Minimal dependencies and zero UI modules.

| File/directory  | Description |
| --------------- | ------------|
| [`src/config.js`](/src/config.js) | config file in JSON that also imports the `env` variable |
| [`src/index.js`](/src/index.js) | starting point for ios & android. It contains a basic wrapper around react-native-navigation |
| [`src/screens/index.js`](/src/screens/index.js) | is where you define each screen for routing |
| [`src/screens/`](/src/screens/) | is where all your screens are |
| [`src/stores/`](/src/stores/) | contains MobX stores. The only one provided by default is the `exception` class for error handling |
| [`src/components/ErrorBoundary`](/src/components/ErrorBoundary) | catches and displays custom errors (modify as you wish) |

## Building

You can use yarn commands for building from command line:

```bash
yarn run ios              # run ios app for development
yarn run ios:release      # run ios app for release (PROD)
yarn run android          # run android app for development
yarn run android:staging  # compile apk for staging
yarn run android:release  # compile apk for release
```

**Note:** IOS Staging must currently be built from within Xcode. Just select `Staging` scheme and press play. You can also build other archives from Xcode or Android Studio.

Each build flavor will have it’s own bundle ID so you can have all 3 builds on the same device. 

**The display names of `Staging` and `Debug` will have (S) and (D) in it’s name** (you can also add custom app icons for each flavor).

## Environments & configuration

The `PROD` and `DEV` environment variables are imported into the ``config.js`` file, 
you can use that to write environment-specific code, f.ex ``if (config.DEV) { // do DEV specific things }``

## Versioning

Versions should follow the semver pattern `major.minor.patch+build` (f.ex 1.8.2+62) for best compability.

**Use ``yarn run v`` to automatically bump or apply new versions on all platforms and package.json.**

## Linting & static types

Use ``yarn run flow`` to type-check using flow. To code flow, add ``// @flow`` at the top of the source code. Flow is also used as a pre-commit script.

## Exceptions & logging

Use **3 levels** of exceptions from the `stores/exception` store:

```javascript
import exception from 'stores/exception'

/*
 * USAGE:
 * error is an error object, context is an optional string that will be logged & reported
 *
 * exception.raise(error, context?)
 * exception.warn(error, context?)
 * exception.info(error, context?)
 *
 */

// fatal error:
exception.raise(new Error('Epic Fail'))

// promise error with warning:
fetch(url).then(success).catch(exception.warn)

// silent error:
exception.info(new Error('User entered 4 digits'), 'login form')

```

You can customize how these errors will be shown for the user in `PROD` by editing `components/ErrorBoundary`. 
We added some simple Modals as a default.

In `DEV`, we use the built-in standard red screen for errors, a slightly customized warnings list and nice logs in the console.

**Bonus:** use `exception.todo(task)` when developing to save time!

## The Aino rules

- Never use ``undefined`` or ``NaN`` as a type, payload or parameter
- Use ``constants.js`` for string definitions
- Be smart

## Coding styles

Follow https://github.com/airbnb/javascript/tree/master/react standards (except we use ``.js`` instead of ``.jsx`` suffix)
