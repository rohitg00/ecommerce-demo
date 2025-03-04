import React from 'react';
import type { ProductsConfig } from './products-config.js';
import { Product, ProductSlot } from './product.js';
import { SymphonyPlatformAspect, SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { PiedPlatformAspect, PiedPlatformBrowser } from '@pied/pied-piper.pied-platform';

// Product Card component for displaying a product
const ProductCard = ({ product }: { product: Product }) => {
  // Format price from cents to dollars/currency
  const formattedPrice = (product.price / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p className="product-price">{formattedPrice}</p>
      <p className="product-description">{product.description}</p>
      <div className="product-actions">
        <button className="view-details-btn">View Details</button>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

// Product List component for displaying multiple products
const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

// Product Details component
const ProductDetails = ({ product }: { product: Product }) => {
  const formattedPrice = (product.price / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  return (
    <div className="product-details">
      <div className="product-image-container">
        <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="product-price">{formattedPrice}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-stock">
          {product.stockCount > 0 
            ? `In Stock (${product.stockCount})` 
            : 'Out of Stock'}
        </p>
        <button className="add-to-cart-btn-large">Add to Cart</button>
      </div>
    </div>
  );
};

// Products Page component
const ProductsPage = ({ products }: { products: Product[] }) => {
  return (
    <div className="products-page">
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
};

// Featured Products component
const FeaturedProducts = ({ products }: { products: Product[] }) => {
  return (
    <div className="featured-products">
      <h2>Featured Products</h2>
      <ProductList products={products} />
    </div>
  );
};

export class ProductsBrowser {
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

  static dependencies = [ SymphonyPlatformAspect, PiedPlatformAspect ];

  static defaultConfig: ProductsConfig = {
    enableFeaturedProducts: true,
    productsPerPage: 10
  };

  static async provider(
    [ symphonyPlatform, piedPlatform ]: [ SymphonyPlatformBrowser, PiedPlatformBrowser ],
    config: ProductsConfig,
    [productSlot]: [ProductSlot]
  ) {
    const products = new ProductsBrowser(config, productSlot);
    
    // Register sample products if none exist
    if (products.listProducts().length === 0) {
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
    }
    
    // Register routes
    symphonyPlatform.registerRoute([
      {
        path: '/products',
        component: () => <ProductsPage products={products.listProducts()} />,
      },
      {
        path: '/products/:id',
        component: ({ id }: { id: string }) => {
          const product = products.getProductById(id);
          return product ? <ProductDetails product={product} /> : <div>Product not found</div>;
        },
      }
    ]);

    // Register header link
    piedPlatform.registerHeaderLinks([{
      label: 'Products',
      href: '/products',
    }]);
    
    // Register featured products for homepage
    if (config.enableFeaturedProducts) {
      piedPlatform.registerHomePageSection(() => (
        <FeaturedProducts products={products.getFeaturedProducts()} />
      ));
    }

    return products;
  }
}

export default ProductsBrowser; 