# Testing Wikipedia with Waldo Core API

![CleanShot 2024-02-15 at 00 20 54](https://github.com/waldoapp/waldo-programmatic-samples/assets/2805640/4781c206-4223-4279-a6e5-7659d3a96489)

## Introduction

This project demonstrates how to script end-to-end (E2E) mobile tests
with Waldo Core API. It includes sample test scripts that show how to
use Waldo Core API to write and run a test on the Waldo infrastructure
against the open-source [Wikipedia iOS app][wikipedia-ios] or
[Wikipedia Android app][wikipedia-android].

The scripts are located in the [test directory](test/specs):

- in the subdirectory [ios](test/specs/ios) are the samples meant to run
  on the iOS app
- in the subdirectory [android](test/specs/android) are the samples meant to run
  on the Android app

More importantly, this project allows you to use Waldo Core API to write
and run _your own_ scripted tests on the Waldo infrastructure.

> **Note:** This project extends the [WebdriverIO][webdriverio] mobile
> automation test framework to communicate with Waldo Core API. However,
> since [Waldo Core API][coreapi] implements the [W3C WebDriver standard
> endpoints][w3c], you can use _any_ automation test framework that
> implements these endpoints.

## Requirements

### Waldo account

Using Waldo Core API requires you to have a [Waldo][waldo] account: [sign up here][signup].

### Node.js

You also need to have the [Node.js][nodejs] runtime installed on your machine. We recommend that you use the
latest long-term support (LTS) version.

To check that Node.js is correctly installed, type the
following command into your terminal client:

```sh
node -v
```

Refer to the [nodejs.org installation instructions](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) for more information.

## Getting started

1. Clone this repository:

   ```sh
   git clone https://github.com/waldoapp/waldo-programmatic-samples.git
   ```

2. Go to the root directory:

   ```sh
   cd waldo-programmatic-samples
   ```

3. Install the project dependencies:

   ```sh
   npm install
   ```

## First run

The command below will run our sample script targeting a Wikipedia sample app running on a Waldo simulator in the cloud.

Run the [iOS sample script](test/specs/ios):

```shell
WALDO_APP_TOKEN=[YourToken] VERSION_ID=wiki npm run wdio ios
```

Run the [Android sample script](test/specs/android):

```shell
WALDO_APP_TOKEN=[YourToken] VERSION_ID=wiki npm run wdio android
```

You will find your auth token in [your settings page][https://app.waldo.com/settings/profile].

## Iterate on your script with interactive sessions

Interactive sessions are meant to provide a quick feedback loop when you work on your script.

By default, the `npm run wdio` command asks Waldo for a brand new session (meaning a fresh simulator/emulator image where the app corresponding to `WALDO_APP_VERSION_ID` is installed): this takes about 20 seconds to set up. If you provide the id of an _ongoing_ Waldo session (they are prefixed with `sess-`, such as `sess-0367d672ba0051af`), Waldo re-uses that specific session, and will not kill it at the end of the script. Thus you have the opportunity to iterate on your script and relaunch the command: all without having to wait for a new session to be set up. This provides a very quick feedback loop when iterating on your scripts. The session id can be found in the URL of your manual session or in the info tab of this session.

```shell
WALDO_APP_TOKEN=[YourToken] WALDO_SESSION_ID=[YourSessionID] npm run wdio
```

where:

- `WALDO_APP_TOKEN` is your auth token.
- `WALDO_APP_VERSION_ID` is the `id` of a specific build file of an app (hence the "app version") you want to target with your test. `wiki-ios` is a shortcut refering to our iOS sample app (wikipedia).
- `SHOW_SESSION` is an optional argument, default to `false`. When set to `true`, the command will spin up a new tab on your default browser targeting the URL where you'll see the live stream of your test exectution.
- `WALDO_SESSION_ID` is an optional argument, referring to the `id` of an ongoing manual session you launched from https://app.waldo.com and that you want to target with your script.

[config]: https://app.waldo.com/applications/ios/configurations/general
[coreapi]: https://docs.waldo.com/reference/postwdhubsession
[nodejs]: https://nodejs.org/
[signup]: https://app.waldo.com/register
[config]: https://app.waldo.com/settings/profile
[w3c]: https://w3c.github.io/webdriver/#endpoints
[waldo]: https://www.waldo.com/
[webdriverio]: https://webdriver.io/
[wikipedia-ios]: https://github.com/wikimedia/wikipedia-ios
[wikipedia-android]: https://github.com/wikimedia/apps-android-wikipedia
