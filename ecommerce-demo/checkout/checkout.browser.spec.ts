import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { CheckoutBrowser } from './checkout.browser.runtime.js';
import { CheckoutAspect } from './checkout.aspect.js';

it('should retrieve the aspect', async () => {
  const checkout = await loadAspect<CheckoutBrowser>(CheckoutAspect, {
    runtime: 'browser',
  });

  expect(checkout).toBeTruthy();
});    
