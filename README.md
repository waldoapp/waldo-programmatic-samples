# Testing Wikipedia with Waldo Core API

## Introduction

This project extends the [WebdriverIO][webdriverio] mobile automation
test framework by enabling a test script to run on the Waldo
infrastructure.

It includes a sample test script that demonstrates how to write and run
a scripted test against the open-source [Wikipedia][wikipedia] iOS app.

More importantly, this project allows you to write and run _your own_
scripted tests on the Waldo infrastructure.

## Prerequisites

To use Waldo Core API, you need to have access to a few tools. It is
quite likely that you already have these tools installed on your system.

### Code editor

You will need a text editor or IDE to write your code. You can choose
whichever one tickles your fancy. Some folks use [Visual Studio
Code][vscode]. Others prefer [Webstorm][webstorm] or [Sublime
Text][sublime]. Really, it does not matter.

### Node.js and npm

You also need to install the [Node.js][nodejs] runtime and its bundled
npm package manager onto your system. We recommend that you use the
latest long-term support (LTS) version.

To check that Node.js is correctly installed, type the following
commands into your terminal client:

```sh
node -v
npm -v
```

## Getting Started

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

This repo includes a sample test script that controls the Wikipedia iOS
app.

To run a test script on the Waldo infrastructure, you always need an app
token.

You can obtain one by visiting [the configuration page for your
app][config].

Once you have your app token in hand, you can either pass it as the
value of the  `WALDO_APP_TOKEN` environment variable, or paste it into
[wdio.conf.ts](wdio.conf.ts).

```shell
WALDO_APP_TOKEN=[YourToken] WALDO_APP_VERSION_ID=wiki-ios npm run wdio
```

[config]:       https://app.waldo.com/applications/ios/configurations/general
[nodejs]:       https://nodejs.org/
[sublime]:      https://www.sublimetext.com/
[vscode]:       https://code.visualstudio.com/
[webdriverio]:  https://webdriver.io/
[webstorm]:     https://www.jetbrains.com/webstorm/
[wikipedia]:    https://github.com/wikimedia/wikipedia-ios
