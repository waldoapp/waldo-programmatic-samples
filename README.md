# Testing Wikipedia with Waldo Core API

![CleanShot 2024-02-15 at 00 20 54](https://github.com/waldoapp/waldo-programmatic-samples/assets/2805640/4781c206-4223-4279-a6e5-7659d3a96489)

## Introduction

This project demonstrates how to script end-to-end (E2E) mobile tests
with Waldo Core API. It includes a sample test script that shows how to
use Waldo Core API to write and run a test on the Waldo infrastructure
against the open-source [Wikipedia][wikipedia] iOS app.

More importantly, this project allows you to use Waldo Core API to write
and run _your own_ scripted tests on the Waldo infrastructure.

> **Note:** This project extends the [WebdriverIO][webdriverio] mobile
> automation test framework to communicate with Waldo Core API. However,
> since [Waldo Core API][coreapi] implements the [W3C WebDriver standard
> endpoints][w3c], you can use _any_ automation test framework that
> implements these endpoints.

## Requirements

### Waldo account

Using Waldo Core API requires you to have access to a [Waldo][waldo]
account. This will enable you to obtain an app token to communicate with
Waldo Core API (see below). If you do not have an account yet, you can
sign up for one [here][signup].

### Node.js and npm

You also need to have the [Node.js][nodejs] runtime and its bundled npm
package manager installed on your machine. We recommend that you use the
latest long-term support (LTS) version.

To check that Node.js and npm are correctly installed, type the
following commands into your terminal client:

```sh
node -v
npm -v
```

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

This repo includes a sample test script that runs the Wikipedia iOS app
on the Waldo infrastructure. To connect to Waldo, you need to provide an
_app token_. You can obtain one by visiting [the configuration page for
your app][config].

Once you have your app token in hand, you can either specify it as the
value of the  `WALDO_APP_TOKEN` environment variable, or paste it into
[wdio.conf.ts](wdio.conf.ts).

```shell
WALDO_APP_TOKEN=[YourToken] WALDO_APP_VERSION_ID=wiki-ios npm run wdio
```

[config]:       https://app.waldo.com/applications/ios/configurations/general
[coreapi]:      https://docs.waldo.com/reference/postwdhubsession
[nodejs]:       https://nodejs.org/
[signup]:       https://app.waldo.com/signup
[w3c]:          https://w3c.github.io/webdriver/#endpoints
[waldo]:        https://www.waldo.com/
[webdriverio]:  https://webdriver.io/
[wikipedia]:    https://github.com/wikimedia/wikipedia-ios
