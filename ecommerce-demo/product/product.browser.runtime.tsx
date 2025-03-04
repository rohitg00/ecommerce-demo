import React from 'react';
import type { ProductConfig } from './product-config.js';
import { MenuItem, MenuItemSlot } from './menu-item.js';
import { SymphonyPlatformAspect, SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { PiedPlatformAspect, PiedPlatformBrowser } from '@pied/pied-piper.pied-platform'; 

// Product listing component
const ProductListing = ({ title }: { title: string }) => {
  return (
    <div className="product-container">
      <h1>{title}</h1>
      <div className="product-grid">
        {/* Placeholder for product items */}
        <div className="product-item">
          <img src="https://via.placeholder.com/150" alt="Product" />
          <h3>Product Name</h3>
          <p className="price">$99.99</p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export class ProductBrowser {
  constructor(
    private config: ProductConfig,
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

  static defaultConfig: ProductConfig = {
    productsPerPage: 12,
    showRatings: true,
    defaultSortMethod: 'popularity'
  };

  static async provider(
    [ symphonyPlatform, piedPlatform ]: [ SymphonyPlatformBrowser, PiedPlatformBrowser ],
    config: ProductConfig,
    [menuItemSlot]: [MenuItemSlot]
  ) {
    const product = new ProductBrowser(config, menuItemSlot);
    
    // Register product-related menu items
    product.registerMenuItem([
      {
        name: 'All Products',
        url: '/products',
        icon: '🛍️',
        order: 10
      },
      {
        name: 'Categories',
        url: '/products/categories',
        icon: '📑',
        order: 11
      },
      {
        name: 'New Arrivals',
        url: '/products/new',
        icon: '✨',
        order: 12
      }
    ]);
    
    // Register product routes
    symphonyPlatform.registerRoute([
      {
        path: '/products',
        component: () => <ProductListing title="All Products" />
      },
      {
        path: '/products/categories',
        component: () => <ProductListing title="Product Categories" />
      },
      {
        path: '/products/new',
        component: () => <ProductListing title="New Arrivals" />
      }
    ]);

    return product;
  }
}

export default ProductBrowser; 