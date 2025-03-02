import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { CartNode } from './cart.node.runtime.js';
import { CartAspect } from './cart.aspect.js';

it('should retrieve the aspect', async () => {
  const cart = await loadAspect<CartNode>(CartAspect, {
    runtime: 'node',
  });

  expect(cart).toBeTruthy();
});    
