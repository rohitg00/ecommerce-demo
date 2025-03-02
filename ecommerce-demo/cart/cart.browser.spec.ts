import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { CartBrowser } from './cart.browser.runtime.js';
import { CartAspect } from './cart.aspect.js';

it('should retrieve the aspect', async () => {
  const cart = await loadAspect<CartBrowser>(CartAspect, {
    runtime: 'browser',
  });

  expect(cart).toBeTruthy();
});    
