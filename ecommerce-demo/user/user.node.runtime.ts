import type { UserConfig } from './user-config.js';
import { MenuItem, MenuItemSlot } from './menu-item.js';
import { SymphonyPlatformAspect, SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';

export class UserNode {
  constructor(
    private config: UserConfig,
    private menuItemSlot: MenuItemSlot,
  ) {}
  
  /**
   * register a list of menu item.
   */
  registerMenuItem(menuItems: MenuItem[]) {
    this.menuItemSlot.register(menuItems);
    return this;
  }

  /**
   * list all menu item.
   */
  listMenuItems() {
    return this.menuItemSlot.flatValues();
  }

  static dependencies = [ SymphonyPlatformAspect ];

  static defaultConfig: UserConfig = {
    sessionTimeout: 60,
    allowGuestCheckout: true,
    requireEmailVerification: false
  };

  static async provider(
    [ symphonyPlatform ]: [ SymphonyPlatformNode ],
    config: UserConfig,
    [menuItemSlot]: [MenuItemSlot]
  ) {
    const user = new UserNode(config, menuItemSlot);
    
    // Register user-related menu items
    user.registerMenuItem([
      {
        name: 'Login',
        url: '/login',
        order: 90
      },
      {
        name: 'Register',
        url: '/register',
        order: 91
      },
      {
        name: 'My Account',
        url: '/account',
        order: 92
      }
    ]);

    return user;
  }
}

export default UserNode;
