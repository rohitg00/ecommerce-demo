import type { CartConfig } from './cart-config.js';
import { MenuItem, MenuItemSlot } from './menu-item.js';

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

  static dependencies = [];

  static defaultConfig: CartConfig = {};

  static async provider(
    []: [],
    config: CartConfig,
    [menuItemSlot]: [MenuItemSlot]
  ) {
    const cart = new CartNode(config, menuItemSlot);
    

    return cart;
  }
}

export default CartNode;
