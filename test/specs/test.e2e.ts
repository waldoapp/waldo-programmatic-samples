import * as moment from 'moment';
import {
  type WaldoDriver,
  tapElement,
  typeInElement,
  waitForElement,
  swipeScreen,
} from '../../utils/utils.ts';

describe('Wikipedia - Onboarding', () => {
  it('onboarding', async () => {
    const device = driver as WaldoDriver;
    await tapElement(device, 'text', 'Next');
    await device.saveScreenshot('./screenshots/screenshot-onboarding.png');
    // Do the next two screens by swiping instead
    // Swipe left from 95% of the screen to 5%
    await waitForElement(device, 'text', 'Next');
    await swipeScreen(device, 'horizontal', 95, 5);
    await waitForElement(device, 'text', 'Next');
    await swipeScreen(device, 'horizontal', 95, 5);

    await tapElement(device, 'text', 'Get started');
  });

  it("Search today's date", async () => {
    const device = driver as WaldoDriver;
    await tapElement(device, 'type', 'textField');
    const today = moment().format('MMMM Do');
    await typeInElement(device, 'type', 'textField', today);
    await tapElement(device, 'text', 'Day of the year');
    await waitForElement(device, 'text', 'Day of the year', 5000, 500, true);
    await device.saveScreenshot('./screenshots/screenshot-today.png');
  });
});
