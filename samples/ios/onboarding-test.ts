import * as moment from 'moment';

/**
 * This is a sample script that interacts with the Wikipedia app
 * and searches for the article about today's date
 */

describe('Wikipedia iOS - Onboarding', () => {
  it('goes through onboarding', async () => {
    await driver.log('Going through onboarding', {}, 'info');
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
    await driver.log('Done with onboarding', {}, 'info');
  });

  it("Search today's date", async () => {
    const today = moment().format('MMMM Do');
    await driver.log(`Will search for today's date: ${today}`, { date: today }, 'info');
    await driver.tapElement('type', 'textField');
    await driver.typeInElement('type', 'textField', today);
    await driver.tapElement('text', 'Day of the year');
    await driver.waitForElement('text', 'Day of the year', 10_000, 500, true);
    await driver.screenshot(`ios/screenshot-today.png`);
  });
});
