import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { UserBrowser } from './user.browser.runtime.js';
import { UserAspect } from './user.aspect.js';

it('should retrieve the aspect', async () => {
  const user = await loadAspect<UserBrowser>(UserAspect, {
    runtime: 'browser',
  });

  expect(user).toBeTruthy();
});    
