import type { CartConfig } from './cart-config.js';
import { MenuItem, MenuItemSlot } from './menu-item.js';
import { SymphonyPlatformAspect, SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';

export class CartNode {
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

  static dependencies = [ SymphonyPlatformAspect ];

  static defaultConfig: CartConfig = {
    maxCartItems: 20,
    enableCartPersistence: true
  };

  static async provider(
    [ symphonyPlatform ]: [ SymphonyPlatformNode ],
    config: CartConfig,
    [menuItemSlot]: [MenuItemSlot]
  ) {
    const cart = new CartNode(config, menuItemSlot);

    // Register default menu items
    cart.registerMenuItem([
      {
        name: 'Home',
        url: '/',
        order: 1
      },
      {
        name: 'Products',
        url: '/products',
        order: 2
      },
      {
        name: 'Cart',
        url: '/cart',
        order: 3
      }
    ]);

    return cart;
  }
}

export default CartNode;
