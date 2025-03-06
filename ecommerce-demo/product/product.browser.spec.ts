import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { ProductBrowser } from './product.browser.runtime.js';
import { ProductAspect } from './product.aspect.js';

it('should retrieve the aspect', async () => {
  const product = await loadAspect<ProductBrowser>(ProductAspect, {
    runtime: 'browser',
  });

  expect(product).toBeTruthy();
});    
