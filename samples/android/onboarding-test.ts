import * as moment from 'moment/moment';

/**
 * This is an example script that interacts with the Wikipedia app
 * and searches for the article about today's date
 */

describe('Wikipedia Android - Onboarding', () => {
  it('onboarding', async () => {
    await driver.tapElement('text', 'CONTINUE');
    await driver.screenshot(`android/screenshot-onboarding.png`);

    await driver.tapElement('text', 'CONTINUE');
    await driver.tapElement('text', 'CONTINUE');

    await driver.tapElement('text', 'GET STARTED');
  });

  it("Search today's date", async () => {
    await driver.tapElement('text', 'Search Wikipedia');
    const today = moment().format('MMMM Do');
    await driver.typeInElement('text', 'Search Wikipedia', today);
    await driver.tapElement('text', 'Day of the year');
    await driver.waitForElement('text', 'Day of the year', 10_000, 500, true);
    await driver.screenshot(`android/screenshot-today.png`);
  });
});
