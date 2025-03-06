import {
  SymphonyPlatformAspect,
  SymphonyPlatformBrowser,
} from '@bitdev/symphony.symphony-platform';
import type { CartConfig } from './cart-config.js';
import { MenuItem, MenuItemSlot } from './menu-item.js';

export class CartBrowser {
  constructor(private config: CartConfig, private menuItemSlot: MenuItemSlot) {}

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

  static dependencies = [SymphonyPlatformAspect];

  static defaultConfig: CartConfig = {};

  static async provider(
    [symphonyPlatform]: [SymphonyPlatformBrowser],
    config: CartConfig,
    [menuItemSlot]: [MenuItemSlot]
  ) {
    const cart = new CartBrowser(config, menuItemSlot);

    return cart;
  }
}

export default CartBrowser;
