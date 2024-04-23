describe('Landing page testing', () => {
  it('takes a screenshot of the application', async () => {
    // Take a screenshot of the app right after the app started
    await driver.screenshot('landing.png');

    // Add your own steps here!

    // here are a few examples to get you started:
    //    await driver.tapElement('text', 'skip');
    //    await driver.typeInElement('text', 'Search Wikipedia', 'Alan Turing');
    //    await driver.swipeScreen(device, 'horizontal', 95, 5);
    //    await driver.log('Logging in as a regular user', { email: 'test@test.com' }, 'info');  // 'debug' | 'info' | 'warn' | 'error'
    //
    // see more examples in the docs https://docs.waldo.com/v2.0/docs/code-examples-for-interactions
    // or directly checkout the commands listed at the end of the utils/utils.ts file: look for "driver.addCommand("
    //
    // the following video will show you how to specify the elements you want to interact with
    // https://waldo.wistia.com/medias/9nthhbi5jr
  });
});
