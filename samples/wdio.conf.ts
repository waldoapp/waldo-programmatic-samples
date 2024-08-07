import { readdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import '@waldoapp/wdio-service';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function stopOnError(message: string) {
  console.error(`Could not run script: ${message}`, '\n');

  process.exit(1);
}

// The sample repository contains different set of tests to illustrate different capacities of Waldo.
let sampleDirectory = 'ios';
if (process.argv.length >= 5) {
  const sampleDirectories = readdirSync(__dirname);
  const directory = process.argv[4];
  if (sampleDirectories.includes(directory)) {
    sampleDirectory = directory;
  } else {
    stopOnError(`Unrecognized sample directory "${directory}"

Usage: npm run sample {${sampleDirectories.map((d) => ` ${d} `).join('|')}}`);
  }
}
// We consider the default platform to be iOS.
const isIOS = !sampleDirectory.includes('android');

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

const requestedCapabilities: WebdriverIO.Capabilities[] = [
  {
    platformName,
    'appium:app': 'wiki',
    'waldo:automationName': 'Waldo',
    'waldo:options': {
      ...requestedDevice,
    },
  },
];

export const config: WebdriverIO.Config = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
    },
  },

  specs: [`./${sampleDirectory}/**/*.ts`],

  capabilities: requestedCapabilities,

  logLevel: 'warn',
  logLevels: {
    webdriver: 'info',
    '@waldoapp/wdio-service': 'info',
  },
  services: ['@waldoapp/wdio-service'],
  reporters: ['spec'],
  mochaOpts: {
    timeout: 60000,
  },
};
