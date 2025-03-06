import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { CheckoutNode } from './checkout.node.runtime.js';
import { CheckoutAspect } from './checkout.aspect.js';

it('should retrieve the aspect', async () => {
  const checkout = await loadAspect<CheckoutNode>(CheckoutAspect, {
    runtime: 'node',
  });

  expect(checkout).toBeTruthy();
});    
