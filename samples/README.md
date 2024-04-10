# Waldo Core API samples

In this directory we provide several examples of how to script
end-to-end (E2E) mobile tests with Waldo Core API.

The sample scripts point to the open-source [Wikipedia iOS app][wikipedia-ios] or
[Wikipedia Android app][wikipedia-android].

To run a sample script, simply follow the [setup for this repo](../README.md#one-time-setup),
and then execute:

```shell
npm run sample ${sampleDirectory}
```

For example, you can run the [iOS sample script](./ios/onboarding-test.ts):

```shell
npm run sample ios
```

## Run modes

You can use the parameters `SHOW_SESSION` or `SESSION_ID` (see
[the parameters section](../README.md#list-of-run-parameters)) as demonstrated below.

### Live execution

If you want to see the execution of the [iOS sample script](./ios/onboarding-test.ts) in the browser, you can run:

```shell
SHOW_SESSION=1 npm run sample ios
```

### Interactive execution

If you want to use an existing session and execute a script on it, you can do the following:

**iOS:**

- Go to https://app.waldo.com/applications/ios/sessions?versionId=wiki and launch a session.

- Copy the session ID from the URL and paste it into the following command:

  ```shell
  SESSION_ID=sess-1234567890abcdef npm run sample ios
  ```

**Android:**

- Go to https://app.waldo.com/applications/android/sessions?versionId=wiki and launch a session.

- Copy the session ID from the URL and paste it into the following command:

  ```shell
  SESSION_ID=sess-1234567890abcdef npm run sample android
  ```

[wikipedia-ios]: https://github.com/wikimedia/wikipedia-ios
[wikipedia-android]: https://github.com/wikimedia/apps-android-wikipedia
