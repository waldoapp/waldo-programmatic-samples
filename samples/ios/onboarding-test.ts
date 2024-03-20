import * as moment from 'moment';

/**
 * This is an example script that interacts with the Wikipedia app
 * and searches for the article about today's date
 */

describe('Wikipedia iOS - Onboarding', () => {
  it('onboarding', async () => {
    await driver.tapElement('text', 'Next');
    await driver.screenshot(`ios/screenshot-onboarding.png`);
    // Do the next two screens by swiping instead
    // Swipe left from 95% of the screen to 5%
    await driver.waitForElement('text', 'Next');
    await driver.swipeScreen('horizontal', 95, 5);
    // Wait for screen to be stable
    await driver.waitForElement('text', 'Next', 5000, 500, true);
    await driver.swipeScreen('horizontal', 95, 5);

    await driver.tapElement('text', 'Get started');
  });

  it("Search today's date", async () => {
    await driver.tapElement('type', 'textField');
    const today = moment().format('MMMM Do');
    await driver.typeInElement('type', 'textField', today);
    await driver.tapElement('text', 'Day of the year');
    await driver.waitForElement('text', 'Day of the year', 10_000, 500, true);
    await driver.screenshot(`ios/screenshot-today.png`);
  });
});
