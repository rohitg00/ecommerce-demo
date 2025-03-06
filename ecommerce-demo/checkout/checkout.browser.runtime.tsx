import React from 'react';
import type { CheckoutConfig } from './checkout-config.js';
import { MenuItem, MenuItemSlot } from './menu-item.js';
import { SymphonyPlatformAspect, SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { PiedPlatformAspect, PiedPlatformBrowser } from '@pied/pied-piper.pied-platform'; 

// Checkout component
const CheckoutForm = () => {
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-form">
        <div className="shipping-section">
          <h2>Shipping Information</h2>
          <form>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" placeholder="Enter your address" />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" placeholder="Enter your city" />
            </div>
          </form>
        </div>
        <div className="payment-section">
          <h2>Payment Method</h2>
          <div className="payment-options">
            <div className="payment-option">
              <input type="radio" name="payment" id="credit-card" />
              <label htmlFor="credit-card">Credit Card</label>
            </div>
            <div className="payment-option">
              <input type="radio" name="payment" id="paypal" />
              <label htmlFor="paypal">PayPal</label>
            </div>
          </div>
        </div>
        <button className="checkout-button">Complete Order</button>
      </div>
    </div>
  );
};

export class CheckoutBrowser {
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

  static dependencies = [ SymphonyPlatformAspect, PiedPlatformAspect ];

  static defaultConfig: CheckoutConfig = {
    paymentMethods: ['Credit Card', 'PayPal', 'Bank Transfer'],
    defaultShippingMethod: 'Standard',
    enableOrderTracking: true
  };

  static async provider(
    [ symphonyPlatform, piedPlatform ]: [ SymphonyPlatformBrowser, PiedPlatformBrowser ],
    config: CheckoutConfig,
    [menuItemSlot]: [MenuItemSlot]
  ) {
    const checkout = new CheckoutBrowser(config, menuItemSlot);
    
    // Register checkout-related menu items
    checkout.registerMenuItem([
      {
        name: 'Checkout',
        url: '/checkout',
        icon: '💳',
        order: 80
      },
      {
        name: 'Orders',
        url: '/orders',
        icon: '📦',
        order: 81
      },
      {
        name: 'Shipping',
        url: '/shipping',
        icon: '🚚',
        order: 82
      }
    ]);
    
    // Register checkout routes
    symphonyPlatform.registerRoute([
      {
        path: '/checkout',
        component: () => <CheckoutForm />
      },
      {
        path: '/orders',
        component: () => (
          <div className="orders-container">
            <h1>Your Orders</h1>
            <p>Order history will be displayed here</p>
          </div>
        )
      },
      {
        path: '/shipping',
        component: () => (
          <div className="shipping-container">
            <h1>Shipping Options</h1>
            <p>Shipping methods and tracking will be displayed here</p>
          </div>
        )
      }
    ]);

    return checkout;
  }
}

export default CheckoutBrowser; 