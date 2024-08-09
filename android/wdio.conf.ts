import '@waldoapp/wdio-service';

export const config: WebdriverIO.Config = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
    },
  },
  specs: ['./test/**/*.ts'],
  capabilities: [{
    platformName: 'Android',
    'appium:app': 'wiki',
    'waldo:automationName': 'Waldo',
    'waldo:options': {
      deviceName: 'Pixel 7',
      osVersion: '33',
    },
  }],
  logLevel: 'warn',
  logLevels: {
    webdriver: 'info',
    '@waldoapp/wdio-service': 'info',
  },
  services: ['@waldoapp/wdio-service'],
  reporters: ['spec'],
  mochaOpts: {
    timeout: 10 * 60 * 1000,
  },
};
