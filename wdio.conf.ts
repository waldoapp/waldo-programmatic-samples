import { exec } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { promisify } from 'node:util';
import { homedir } from 'node:os';
import type { Options } from '@wdio/types';
import { W3CCapabilities } from '@wdio/types/build/Capabilities';
import { parse } from 'yaml';

import { REMOTE_CONFIG } from './utils/config.ts';
import { waitForSessionReady, addDriverCommands } from './utils/utils.ts';
import { WaldoDriver } from './types/waldo.ts';

const execP = promisify(exec);

function stopOnError(message: string) {
  console.error(`Could not run script: ${message}`, '\n');

  process.exit(1);
}

// Load the token from the environment, or default to the waldo profile file
let waldoToken = process.env.WALDO_API_TOKEN || process.env.TOKEN;
const waldoProfileFile = `${homedir()}/.waldo/profile.yml`;
if (!waldoToken) {
  try {
    const ymlContent = readFileSync(waldoProfileFile, 'utf-8');
    const config = parse(ymlContent);
    waldoToken = config.user_token;
    console.log(`Successfully loaded user token from ${waldoProfileFile}`);
  } catch (error: any) {
    // File not existing is expected - any other error is not
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

if (!waldoToken) {
  stopOnError(`No WALDO_API_TOKEN found.

refer to https://github.com/waldoapp/waldo-programmatic-samples#authentication`);
}

// Load the params for the test
const versionId = process.env.WALDO_APP_VERSION_ID || process.env.VERSION_ID;
const showSession = process.env.WALDO_SHOW_SESSION || process.env.SHOW_SESSION;
const requestedSessionId = process.env.WALDO_SESSION_ID || process.env.SESSION_ID;
if (!versionId && !requestedSessionId) {
  stopOnError(`Either VERSION_ID or SESSION_ID environment variable should be set.

refer to https://github.com/waldoapp/waldo-programmatic-samples`);
}

// The sample repository contains different set of tests to illustrate different capacities of Waldo.
// We force to run only one set of tests at a time.
let sampleDirectory = 'ios';
if (process.argv.length >= 5) {
  const sampleDirectories = readdirSync(`${__dirname}/samples`);
  const directory = process.argv[4];
  if (sampleDirectories.includes(directory)) {
    sampleDirectory = directory;
  } else {
    stopOnError(`Unrecognized sample directory "${directory}"

Usage: npm run wdio {${sampleDirectories.map((d) => ` ${d} `).join('|')}}`);
  }
}
// We consider the default platform to be iOS.
const isIOS = !sampleDirectory.endsWith('-android');

// The requested device is completely configurable. See https://core.waldo.com/devices for the list of all supported
// devices. Simply make sure to run the Android scenario on an Android device and vice versa.
const requestedDevice = isIOS
  ? {
      deviceName: 'iPhone 15',
      osVersion: '17',
    }
  : {
      deviceName: 'Pixel 7',
      osVersion: '33',
    };
const platformName = isIOS ? 'iOS' : 'Android';

const requestedCapabilities: W3CCapabilities[] = [
  {
    // @ts-expect-error This is ok and required for Waldo
    platformName,
    'appium:app': versionId,
    'waldo:displayName': 'Waldo Driver Session',
    'waldo:options': {
      ...requestedDevice,
      waldoMode: true,
      token: waldoToken,
      sessionId: requestedSessionId,
      waitSessionReady: false,
    },
  },
];

export const config: Options.Testrunner = {
  //
  // ====================
  // Runner Configuration
  // ====================
  // WebdriverIO supports running e2e tests as well as unit and component tests.
  runner: 'local',
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
    },
  },

  hostname: REMOTE_CONFIG.hostname,
  port: REMOTE_CONFIG.port,
  protocol: REMOTE_CONFIG.protocol,
  path: REMOTE_CONFIG.path,

  // hostname: 'localhost',
  // port: 3035,
  // protocol: 'http',

  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // of the configuration file being run.
  //
  // The specs are defined as an array of spec files (optionally using wildcards
  // that will be expanded). The test for each spec file will be run in a separate
  // worker process. In order to have a group of spec files run in the same worker
  // process simply enclose them in an array within the specs array.
  //
  // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
  // then the current working directory is where your `package.json` resides, so `wdio`
  // will be called from there.
  //
  specs: [`./samples/${sampleDirectory}/**/*.ts`],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 10,
  capabilities: requestedCapabilities,

  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'warn',
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevels: {
    webdriver: 'info',
  },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: '',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: [],

  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'mocha',

  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,
  //
  // Whether or not retried spec files should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter
  reporters: ['spec'],

  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  // onPrepare: function (config, capabilities) {
  // },
  /**
   * Gets executed before a worker process is spawned and can be used to initialize specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {string} cid      capability id (e.g 0-0)
   * @param  {object} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {object} specs    specs to be run in the worker process
   * @param  {object} args     object that will be merged with the main configuration once worker is initialized
   * @param  {object} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  /**
   * Gets executed just after a worker process has exited.
   * @param  {string} cid      capability id (e.g 0-0)
   * @param  {number} exitCode 0 - success, 1 - fail
   * @param  {object} specs    specs to be run in the worker process
   * @param  {number} retries  number of retries used
   */
  // onWorkerEnd: function (cid, exitCode, specs, retries) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   * @param {string} cid worker id (e.g. 0-0)
   */
  // beforeSession: function (config, capabilities, specs, cid) {
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} _specs        List of spec file paths that are to be run
   * @param {object}         browser      instance of created browser/device session
   */
  async before(capabilities: any, _specs: string[], browser: WaldoDriver) {
    // Add Waldo specific logic to the driver
    addDriverCommands(browser);

    // Open Waldo session in browser if not in interactive mode
    if (showSession && !requestedSessionId) {
      await execP(`open "${browser.capabilities.replayUrl}"`);
    }

    console.log(`View live session: ${browser.capabilities.replayUrl}`);

    if (!capabilities['waldo:options'].waitSessionReady) {
      await waitForSessionReady(browser.sessionId);
    }
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {string} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Hook that gets executed before the suite starts
   * @param {object} suite suite details
   */
  // beforeSuite: function (suite) {
  // },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) starts.
   */
  // beforeTest: function (test, context) {
  // },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  // beforeHook: function (test, context, hookName) {
  // },
  /**
   * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
   * afterEach in Mocha)
   */
  // afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
  // },
  /**
   * Function to be executed after a test (in Mocha/Jasmine only)
   * @param {object}  test             test object
   * @param {object}  context          scope object the test was executed with
   * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
   * @param {*}       result.result    return object of test function
   * @param {number}  result.duration  duration of test
   * @param {boolean} result.passed    true if test has passed, otherwise false
   * @param {object}  result.retries   information about spec related retries, e.g. `{ attempts: 0, limit: 0 }`
   */
  // afterTest(test, context, { error, result, duration, passed, retries }) {
  // console.log(test, context);
  // },

  /**
   * Hook that gets executed after the suite has ended
   * @param {object} suite suite details
   */
  // afterSuite: function (suite) {
  // },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {string} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {number} result 0 - command success, 1 - command error
   * @param {object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {object} exitCode 0 - success, 1 - fail
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  // onComplete: function(exitCode, config, capabilities, results) {
  // },
  /**
   * Gets executed when a refresh happens.
   * @param {string} oldSessionId session ID of the old session
   * @param {string} newSessionId session ID of the new session
   */
  // onReload: function(oldSessionId, newSessionId) {
  // }
  /**
   * Hook that gets executed before a WebdriverIO assertion happens.
   * @param {object} params information about the assertion to be executed
   */
  // beforeAssertion: function(params) {
  // }
  /**
   * Hook that gets executed after a WebdriverIO assertion happened.
   * @param {object} params information about the assertion that was executed, including its results
   */
  // afterAssertion: function(params) {
  // }
};
