import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { UserNode } from './user.node.runtime.js';
import { UserAspect } from './user.aspect.js';

it('should retrieve the aspect', async () => {
  const user = await loadAspect<UserNode>(UserAspect, {
    runtime: 'node',
  });

  expect(user).toBeTruthy();
});    
