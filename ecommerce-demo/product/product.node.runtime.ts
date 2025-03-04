import type { ProductConfig } from './product-config.js';
import { MenuItem, MenuItemSlot } from './menu-item.js';
import { SymphonyPlatformAspect, SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';

export class ProductNode {
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

  static dependencies = [ SymphonyPlatformAspect ];

  static defaultConfig: ProductConfig = {
    productsPerPage: 12,
    showRatings: true,
    defaultSortMethod: 'popularity'
  };

  static async provider(
    [ symphonyPlatform ]: [ SymphonyPlatformNode ],
    config: ProductConfig,
    [menuItemSlot]: [MenuItemSlot]
  ) {
    const product = new ProductNode(config, menuItemSlot);
    
    // Register product-related menu items
    product.registerMenuItem([
      {
        name: 'All Products',
        url: '/products',
        order: 10
      },
      {
        name: 'Categories',
        url: '/products/categories',
        order: 11
      },
      {
        name: 'New Arrivals',
        url: '/products/new',
        order: 12
      }
    ]);

    return product;
  }
}

export default ProductNode;
