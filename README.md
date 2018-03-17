# React Native Embryo

- [x] Bug-free Xcode & Android setups for multiple build flavors
- [x] [React Native Navigation](https://github.com/wix/react-native-navigation)
- [x] [MobX](https://github.com/mobxjs/mobx)
- [x] Friendly exception handling (no crash :dizzy_face:)
- [x] Centralized versioning - one script to bump’em all
- [x] Flow-typed & eslint for quality code

## Bootstrap time!

This example uses `CoffeBreak` as project name but it could be anything:

```
git clone https://github.com/aino/react-native-embryo.git CoffeeBreak
cd CoffeeBreak
yarn start
```

An installation wizard will start in the terminal where you should enter your desired App Name (f.ex **CoffeeBreak**) and bundle ID (f.ex **com.aino.coffeebreak**):

<img src="https://i.imgur.com/ONgI3jj.gif" width="600px" />

**That’s it!** now you can test your embryo using `yarn run ios` or `yarn run android`. You will find a very simple demo app presenting native navigation and exception handling:

| Development | Production |
|-----|------|
| <img src="https://i.imgur.com/Td2KVqU.gif" width="300px"> | <img src="https://i.imgur.com/ZSOGvEb.gif" width="300px" /> |

## At first glance ##

The footprint is small by design! Minimal dependencies and zero UI modules.

| File/directory  | Description |
| --------------- | ------------|
| [`src/config.js`](/src/config.js) | config file in JSON that also imports the `env` variable |
| [`src/index.js`](/src/index.js) | starting point for ios & android. It contains a basic wrapper around react-native-navigation |
| [`src/screens/index.js`](/src/screens/index.js) | is where you define each screen for routing |
| [`src/screens/`](/src/screens/) | is where all your screens are |
| [`src/stores/`](/src/stores/) | contains MobX stores. The only one provided by default is the `exception` class for error handling |
| [`src/components/ErrorBoundary.js`](/src/components/ErrorBoundary.js) | catches and displays custom errors (modify as you wish) |

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

**The display names of `Staging` and `Debug` will have (S) and (D) in its name** (you can also add custom app icons for each flavor).

## Versioning

Versions should follow the semver pattern `major.minor.patch+build` (f.ex 1.8.2+62) for best compatibility.

**Use ``yarn run v`` to automatically bump or apply new versions on all platforms and package.json.**

<img src="https://i.imgur.com/Viybft6.gif" width="600px" />

## Exceptions & logging

The embryo strategy is that **`console` should be used for console output and not in-app messages**.

You can still use `console.error` and `console.warning` to print messages in the console just as in web development, but if you want to raise an exception that *may or may not* be visible to the user, you can use  **3 levels** of exceptions from the `stores/exception` store:

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

You should never deploy apps with errors. But if you do – make sure you catch them, show a friendly message and report the error so it can be fixed in the next patch!

### Customized errors

You can customize how these errors will be shown for the user in `PROD` by editing `components/ErrorBoundary`.
We added some simple Modals as a default.

It is also worth noting that **internal react errors and plain syntax errors also will be catched**.

In `DEV`, we use the built-in standard red screen for errors, a slightly customized warnings list and nice logs in the console.

### Error reporting

You can add your own preferred reporting service (f.ex BugSnag) in the `Exception.reportError` function. All exceptions will pass through here.

**Bonus:** use `exception.todo(task)` when developing to save time!

## Environments & configuration

The `PROD` and `DEV` environment variables are imported into the ``config.js`` file,
you can use that to write environment-specific code, f.ex ``if (config.DEV) { // do DEV specific things }``

## Android specific deployment info

The embryo automatically adds a temporary `react-native-embryo.keystore` for production prototyping in `~/.gradle/gradle.properties`. You should change this before deploying a real app.

The gradle script will automatically increase it’s `versionCode` when the version has changed (use `yarn run v`), so no need to edit manually. It will also rename the `.apk` file according to it’s version.

## Linting & static types

Use ``yarn run flow`` to type-check using flow. To code flow, add ``// @flow`` at the top of the source code. Flow is also used as a pre-commit script.

## The Aino rules

- Never use ``undefined`` or ``NaN`` as a type, payload or parameter
- Use ``constants.js`` for string definitions
- Be smart

## Coding styles

Follow https://github.com/airbnb/javascript/tree/master/react standards (except we use ``.js`` instead of ``.jsx`` suffix)
