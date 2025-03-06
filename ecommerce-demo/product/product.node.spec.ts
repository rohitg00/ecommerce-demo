import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { ProductNode } from './product.node.runtime.js';
import { ProductAspect } from './product.aspect.js';

it('should retrieve the aspect', async () => {
  const product = await loadAspect<ProductNode>(ProductAspect, {
    runtime: 'node',
  });

  expect(product).toBeTruthy();
});    
