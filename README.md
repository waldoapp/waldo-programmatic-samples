# Testing with Waldo Scripting

![demo video](https://github.com/waldoapp/waldo-programmatic-samples/assets/10992081/48d12141-6d51-405c-85fb-c8a68b3ea8d0)

## Introduction

When you execute a script that uses Waldo Scripting, the script always uses a remote device session on a
simulator/emulator running within the Waldo infrastructure.

This has many advantages:

- **simplicity**: the setup to execute or edit an E2E script locally only takes a few minutes: no more full Appium
  install on your local machine or tweaking of system configurations.
- **universality**: wherever the script executes, it targets the same remote device environment, and therefore you know
  how it will behave: no more debugging local versus CI device conditions.
- **collaboration**: one consequence of this _simplicity_ and _universality_ is the ease of working together with
  the rest of your development team.
- **full observability**: since everything runs remotely within the Waldo infrastructure, rich artifacts are captured
  from every device session. These session replays can be accessed at any time in the future at
  https://app.waldo.com/applications/0/replays.

In this project we provide several examples of how to script end-to-end (E2E) mobile tests with Waldo Scripting.

> [!NOTE]
> The sample scripts point to the open-source [Wikipedia iOS app][wikipedia-ios] or
> [Wikipedia Android app][wikipedia-android].

> [!TIP]
> This project extends the [WebdriverIO][webdriverio] mobile automation test framework to communicate with
> Waldo Scripting. However, since [Waldo Scripting][coreapi] implements the [W3C WebDriver standard endpoints][w3c]
> and most of the [Appium][appium] extensions, you can use _any_ automation test framework that targets these
> endpoints.

## Requirements

### Waldo account

Using Waldo Scripting requires you to have a [Waldo][waldo] account: [sign up here][signup].

### Node.js

You also need to have the [Node.js][nodejs] runtime installed on your machine. We recommend that you use the
latest long-term support (LTS) version.

To check that Node.js is correctly installed, type the following command into your terminal client:

```sh
node -v
```

Refer to the [nodejs.org installation instructions](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
for more information.

## Getting started

> [!IMPORTANT]
> The samples uses the [@wdio/wdio-service](https://www.npmjs.com/package/@waldoapp/wdio-service) package to
> communicate with Waldo Scripting. The package README contains more information about the service, how to configure
> it and all the available commands.

The best way to discover scripting with Waldo is to
[follow our guide in the product](https://app.waldo.com/applications/0/sessions?guide=wikipedia-programmatic).

It describes the instructions below, as well as shows you how to edit a script.

### Setup

1. Clone this repository:

   ```sh
   git clone https://github.com/waldoapp/waldo-programmatic-samples.git
   ```

2. Navigate to the root directory:

   ```sh
   cd waldo-programmatic-samples
   ```

3. Install the project dependencies:

   ```sh
   npm install
   ```

4. Go to [your settings page][config] to find your API token; then run the following command:

   ```sh
   npx waldo-auth [YourToken]
   ```

### Running the sample scripts

You can now run the sample scripts targeting the Wikipedia app.

For instance, you can run the [iOS sample script](ios/test/onboarding.ts):

```shell
SHOW_SESSION=1 npm run ios -- --spec onboarding
```

Similarly, you can run the [Android sample script](android/test/onboarding.ts):

```shell
SHOW_SESSION=1 npm run android -- --spec onboarding
```

## Exploring Waldo Scripting

Once you have run the sample scripts, you can explore explore the
[WebDriverIO API](https://webdriver.io/docs/api/browser) and the
[Waldo service documentation][service-readme] to learn more about how
to interact with the device.

[service-readme]: https://github.com/waldoapp/wdio-service/blob/main/Readme.md

### Editing the scripts

You can edit the sample scripts and re-run them to see the changes in action, but it's often faster to create a
session and iterate without starting from a clean device each time.

To do so, you can use the [live execution mode][live-exec]:

```sh
# Sessions for the Wikipedia app can be created from one of theses links:
# - https://app.waldo.com/applications/ios/sessions?versionId=wiki
# - https://app.waldo.com/applications/android/sessions?versionId=wiki

SESSION_ID=[SessionID] npm run wdio -- --spec [YourScript]
```

[live-exec]: https://github.com/waldoapp/wdio-service/blob/main/Readme.md#live-execution

### Using you own application

If you want to use your own application, you need to
[upload a binary](https://app.waldo.com/applications/0/builds/upload) to Waldo first. Once this is done the version ID
can be specified in the `'appium:app'` capability inside the `wdio.conf.js` file.

More information can be found in the [Specifying the application binary/build to target][specifying] section of the
service readme.

[specifying]: https://github.com/waldoapp/wdio-service/blob/main/Readme.md#specifying-the-application-binarybuild-to-target

### Integrating in your own project

If you already have [a WebDriverIO project][existing-wdio] or want to [start from scratch][from-scratch] you can
follow the corresponding sections of the service readme.

But you can also copy and reuse part of this sample project in your own project by copying the node and typescript
configuration files (`package.json`, `tsconfig.json`) and one of the folder that contains the sample scripts
(`ios` and `android`).

[from-scratch]: https://github.com/waldoapp/wdio-service/blob/main/Readme.md#starting-from-scratch
[existing-wdio]: https://github.com/waldoapp/wdio-service/blob/main/Readme.md#in-an-existing-webdriverio-project
[coreapi]: https://docs.waldo.com/reference/postwdhubsession
[nodejs]: https://nodejs.org/
[signup]: https://app.waldo.com/register
[config]: https://app.waldo.com/settings/profile
[w3c]: https://w3c.github.io/webdriver/#endpoints
[waldo]: https://www.waldo.com/
[webdriverio]: https://webdriver.io/
[wikipedia-ios]: https://github.com/wikimedia/wikipedia-ios
[wikipedia-android]: https://github.com/wikimedia/apps-android-wikipedia
[appium]: http://appium.io/
