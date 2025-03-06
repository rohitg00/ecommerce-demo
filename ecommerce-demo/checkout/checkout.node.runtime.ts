import type { CheckoutConfig } from './checkout-config.js';
import { MenuItem, MenuItemSlot } from './menu-item.js';
import { SymphonyPlatformAspect, SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';

export class CheckoutNode {
  constructor(
    private config: CheckoutConfig,
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

  static defaultConfig: CheckoutConfig = {
    paymentMethods: ['Credit Card', 'PayPal', 'Bank Transfer'],
    defaultShippingMethod: 'Standard',
    enableOrderTracking: true
  };

  static async provider(
    [ symphonyPlatform ]: [ SymphonyPlatformNode ],
    config: CheckoutConfig,
    [menuItemSlot]: [MenuItemSlot]
  ) {
    const checkout = new CheckoutNode(config, menuItemSlot);
    
    // Register checkout-related menu items
    checkout.registerMenuItem([
      {
        name: 'Checkout',
        url: '/checkout',
        order: 80
      },
      {
        name: 'Orders',
        url: '/orders',
        order: 81
      },
      {
        name: 'Shipping',
        url: '/shipping',
        order: 82
      }
    ]);

    return checkout;
  }
}

export default CheckoutNode;
