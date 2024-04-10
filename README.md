# Testing with Waldo Core API

![CleanShot 2024-02-15 at 00 20 54](https://github.com/waldoapp/waldo-programmatic-samples/assets/2805640/4781c206-4223-4279-a6e5-7659d3a96489)

## Introduction

This project provides the scaffolding to easily build end-to-end
(E2E) scripts on your mobile app using Waldo Core API.

It also includes some samples in the [samples directory](./samples) so that
you can quickly familiarize yourself with the capabilities of Waldo Core API. You can
learn more in the [README](./samples/README.md) for this directory.

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

The best way to discover scripting with Waldo is to follow our guide in the product:

https://app.waldo.com/applications/0/sessions?guide=wikipedia-programmatic

It describes the instructions below, as well as shows you how to edit a script.

### Onetime setup

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
   npm run authenticate [YourToken]
   ```

### First run

To validate that you have properly configured everything, you can run one of our sample scripts targeting
the Wikipedia app.

For instance, you can run the [iOS sample script](samples/ios/onboarding-test.ts):

```shell
SHOW_SESSION=1 npm run sample ios
```

Similary, you can run the [Android sample script](samples/android/onboarding-test.ts):

```shell
SHOW_SESSION=1 npm run sample android
```

## Run modes

When you execute a script that uses Waldo Core API, the script always uses a remote device session on a simulator/emulator
running within the Waldo infrastructure.

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

Since you do not necessarily want to run device sessions in the same way for all use cases (development, CI
execution, etc.), there are 3 modes to run scripts:

### Background execution

In this mode, your script interacts via Waldo Core API with a freshly created remote
session that is killed when execution reaches the end of the script.

You do not have any visual feedback of what is happening; however, you can watch
the replay of the execution at a later time.

For an example of running a script in background execution mode, try:

```shell
npm run sample ios
```

This is the most common mode of execution when you have a full suite of scripts to run in parallel
(for instance from your CI).
In such a case, you are usually only interested in accessing the session replay of a script that
failed.

### Live execution

In this mode, your script also interacts with a freshly created remote session, but you can
watch its execution in a browser in real time.

For an example of running a script in live execution mode, try:

```shell
SHOW_SESSION=1 npm run sample ios
```

This mode is very useful when you want to watch the current behavior of a script, but you do
not intend to modify it.

### Interactive execution

In this last mode, your script interacts with an ongoing remote session that _remains alive_
when execution reaches the end of the script.

In order to run in this mode, you must first launch a session manually in Waldo by going to
https://app.waldo.com/applications/ios/sessions, and then copy the session ID from the URL (they
are prefixed with `sess-`, such as `sess-1234567890abcdef`).

As long as this session remains alive, you can execute your script against it. For an example
of running a script in interactive execution mode, try:

```shell
SESSION_ID=sess-1234567890abcdef npm run sample ios
```

This mode is very useful for creating a new script or editing an existing one, since it allows you
to quickly relaunch your app over and over without waiting for session initialization. In addition,
this mode also allows you to perform some actions manually on the session in the browser, as well
as use the tree inspector to determine the best way to locate an element.

## Work on your first test

### Upload your app

Since Waldo Core API operates on devices running within the Waldo infrastructure, the first step to
be able to test your app is to upload it to Waldo.

To do so, follow the instructions in https://app.waldo.com/applications/0/builds/upload.

### Run the scaffold test

We’ve made it very easy for you to get up and running, with a [scaffold test](tests/scaffold-test.ts)
ready to run on your own app.

You simply need to target the app version that you previously uploaded. To do so, go
to [your builds page](https://app.waldo.com/applications/0/builds), copy
the version ID using the 3-dots menu, and run the following command:

```shell
VERSION_ID=[VersionID] npm run wdio
```

This test is _very_ basic. All it does is:

1. Launch a session with your app
2. Take a screenshot of it
3. Exit

That is all you need. You are now set up to create your own E2E scripts.

### Start implementing

This project scaffolding follows the `wdio` syntax. You can now add all the tests you want
under the [tests directory](tests).

For some inspiration on syntax, take a look at the [samples directory](samples) or
the [WebdriverIO documentation][webdriverio].

If you want to make this repository your own, feel free to remove the [samples directory](samples) entirely.

## List of run parameters

- `VERSION_ID` is the `id` of a specific build file of an app (hence the “app version”) you want to target with your test.
  See the [upload section](#upload-your-app) of the documentation.

- `SHOW_SESSION` enables [live execution](#live-execution).

- `SESSION_ID` enables [interactive execution](#interactive-execution).

[coreapi]: https://docs.waldo.com/reference/postwdhubsession
[nodejs]: https://nodejs.org/
[signup]: https://app.waldo.com/register
[config]: https://app.waldo.com/settings/profile
[w3c]: https://w3c.github.io/webdriver/#endpoints
[waldo]: https://www.waldo.com/
[webdriverio]: https://webdriver.io/
[wikipedia-ios]: https://github.com/wikimedia/wikipedia-ios
[wikipedia-android]: https://github.com/wikimedia/apps-android-wikipedia
