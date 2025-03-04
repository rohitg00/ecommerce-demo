import React from 'react';
import type { CartConfig } from './cart-config.js';
import { MenuItem, MenuItemSlot } from './menu-item.js';
import { SymphonyPlatformAspect, SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { PiedPlatformAspect, PiedPlatformBrowser } from '@pied/pied-piper.pied-platform'; 

// Navigation menu component
const NavigationMenu = ({ menuItems }: { menuItems: MenuItem[] }) => {
  // Sort menu items by order
  const sortedItems = [...menuItems].sort((a, b) => (a.order || 0) - (b.order || 0));
  
  return (
    <nav className="main-navigation">
      <ul className="menu-items">
        {sortedItems.map((item, index) => (
          <li key={index} className="menu-item">
            <a href={item.url} className="menu-link">
              {item.icon && <span className="menu-icon">{item.icon}</span>}
              <span className="menu-text">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

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

  static defaultConfig: CartConfig = {
    maxCartItems: 20,
    enableCartPersistence: true
  };

  static async provider(
    [ symphonyPlatform, piedPlatform ]: [ SymphonyPlatformBrowser, PiedPlatformBrowser ],
    config: CartConfig,
    [menuItemSlot]: [MenuItemSlot],
  ) {
    const cart = new CartBrowser(config, menuItemSlot);
    
    // Register default menu items
    cart.registerMenuItem([
      {
        name: 'Home',
        url: '/',
        icon: '🏠',
        order: 1
      },
      {
        name: 'Products',
        url: '/products',
        icon: '🛍️',
        order: 2
      },
      {
        name: 'Cart',
        url: '/cart',
        icon: '🛒',
        order: 3
      }
    ]);
    
    // Register navigation links
    const menuItems = cart.listMenuItems();
    piedPlatform.registerHeaderLinks(
      menuItems.map(item => ({
        label: item.name,
        href: item.url,
        icon: item.icon
      }))
    );

    // Register navigation component in the main route
    symphonyPlatform.registerRoute([
      {
        path: '/',
        component: () => (
          <div className="main-container">
            <NavigationMenu menuItems={menuItems} />
            <div className="content">
              <h1>Welcome to our E-commerce Store</h1>
              <p>Browse our products and start shopping!</p>
            </div>
          </div>
        )
      }
    ]);

    return cart;
  }
}

export default CartBrowser;
