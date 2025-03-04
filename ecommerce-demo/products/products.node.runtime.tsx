import type { ProductsConfig } from './products-config.js';
import { Product, ProductSlot } from './product.js';
import { SymphonyPlatformAspect, SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';

export class ProductsNode {
  constructor(
    private config: ProductsConfig,
    private productSlot: ProductSlot,
  ) {}
  
  /**
   * Register a list of products
   */
  registerProducts(products: Product[]) {
    this.productSlot.register(products);
    return this;
  }

  /**
   * List all products
   */
  listProducts() {
    return this.productSlot.flatValues();
  }
  
  /**
   * Get product by ID
   */
  getProductById(id: string) {
    const allProducts = this.listProducts();
    return allProducts.find(product => product.id === id);
  }
  
  /**
   * Get products by category
   */
  getProductsByCategory(category: string) {
    const allProducts = this.listProducts();
    return allProducts.filter(product => product.category === category);
  }
  
  /**
   * Get featured products
   */
  getFeaturedProducts() {
    if (!this.config.enableFeaturedProducts) return [];
    const allProducts = this.listProducts();
    return allProducts.filter(product => product.isFeatured);
  }

  static dependencies = [ SymphonyPlatformAspect ];

  static defaultConfig: ProductsConfig = {
    enableFeaturedProducts: true,
    productsPerPage: 10
  };

  static async provider(
    [ symphonyPlatform ]: [ SymphonyPlatformNode ],
    config: ProductsConfig,
    [productSlot]: [ProductSlot]
  ) {
    const products = new ProductsNode(config, productSlot);
    
    // Register some sample products for demonstration
    products.registerProducts([
      {
        id: 'prod-1',
        name: 'Smartphone X',
        description: 'Latest model with advanced features',
        price: 79999,
        imageUrl: 'https://example.com/smartphone-x.jpg',
        category: 'Electronics',
        stockCount: 100,
        isFeatured: true
      },
      {
        id: 'prod-2',
        name: 'Laptop Pro',
        description: 'Powerful laptop for professionals',
        price: 129999,
        imageUrl: 'https://example.com/laptop-pro.jpg',
        category: 'Electronics',
        stockCount: 50,
        isFeatured: true
      },
      {
        id: 'prod-3',
        name: 'Bluetooth Headphones',
        description: 'Noise canceling wireless headphones',
        price: 24999,
        imageUrl: 'https://example.com/headphones.jpg',
        category: 'Audio',
        stockCount: 200
      }
    ]);

    return products;
  }
}

export default ProductsNode; 