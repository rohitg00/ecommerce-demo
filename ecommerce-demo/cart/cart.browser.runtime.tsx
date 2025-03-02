import type { CartConfig } from './cart-config.js';
import { MenuItem, MenuItemSlot } from './menu-item.js';
import { SymphonyPlatformAspect, SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { PiedPlatformAspect, PiedPlatformBrowser } from '@pied/pied-piper.pied-platform'; 

export class CartBrowser {
  constructor(
    private config: CartConfig,
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

  static dependencies = [ SymphonyPlatformAspect, PiedPlatformAspect ];

  static defaultConfig: CartConfig = {};

  static async provider(
    [ symphonyPlatform, piedPlatform ]: [ SymphonyPlatformBrowser, PiedPlatformBrowser ],
    config: CartConfig,
    [menuItemSlot]: [MenuItemSlot],
  ) {
    const cart = new CartBrowser(config, menuItemSlot);
    symphonyPlatform.registerRoute([{
      path: '/cart',
      component: () => <div>Cart</div>,
    }]);

    piedPlatform.registerHeaderLinks([{
      label: 'Cart',
      href: '/cart',
    }]);

    return cart;
  }
}

export default CartBrowser;
