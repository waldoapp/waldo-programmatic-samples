# Wikipedia automated testing with Waldo

## Introduction

This project is based on <a href="https://webdriver.io/" target="_blank">WebdriverIO</a> targeting the Waldo infrastructure to run.

It shows some examples on how to automate tests on the open-source application
<a href="https://github.com/wikimedia/wikipedia-ios" target="_blank">Wikipedia</a>.

## Getting Started

Clone this repository, go to its root directory and run:

```shell
npm install
```

## First run

This repo has one test that talks to the Wikipedia app.

In order to run against the Waldo infrastructure, you always need an application token.

You can get it by going to
<a href="https://app.waldo.com/applications/ios/configurations/general" target="_blank">your app's configuration page</a>.

You can either set it as the environment variable `WALDO_APP_TOKEN` or paste it in [wdio.conf.ts](wdio.conf.ts).

```shell
WALDO_APP_TOKEN=[YourToken] WALDO_APP_VERSION_ID=wiki-ios npm run wdio
```
