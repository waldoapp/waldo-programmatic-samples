import '@waldoapp/wdio-service';

export const config: WebdriverIO.Config = {
  specs: ['./test/**/*.ts'],
  capabilities: [
    {
      platformName: 'iOS',
      'appium:app': 'wiki',
      'waldo:automationName': 'Waldo',
      'waldo:options': {
        deviceName: 'iPhone 15',
        osVersion: '17',
      },
    },
  ],
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
