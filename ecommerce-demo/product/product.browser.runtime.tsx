import React from 'react';
import type { ProductConfig } from './product-config.js';
import { MenuItem, MenuItemSlot } from './menu-item.js';
import { SymphonyPlatformAspect, SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { PiedPlatformAspect, PiedPlatformBrowser } from '@pied/pied-piper.pied-platform'; 

// Product listing component with improved UI and working buttons
const ProductListing = ({ title }: { title: string }) => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Smartphone Pro Max',
      price: 999.99,
      image: 'https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/tile/Apple-iPhone-16-Pro-hero-240909-lp.jpg.news_app_ed.jpg',
      description: 'Latest smartphone with advanced camera system and all-day battery life.'
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      price: 149.99,
      image: 'https://m.media-amazon.com/images/I/610zLOuJmpL.jpg',
      description: 'Premium noise-cancelling headphones with 30-hour battery life.'
    },
    {
      id: 3,
      name: 'Ultra Slim Laptop',
      price: 1299.99,
      image: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW16Wkf?ver=ded8',
      description: 'Powerful laptop with high-resolution display and all-day battery.'
    },
    {
      id: 4,
      name: 'Smart Watch Series 5',
      price: 349.99,
      image: 'https://m.media-amazon.com/images/I/719n6SUN-jL.jpg?wid=1400&hei=1400',
      description: 'Track your fitness and stay connected with this premium smartwatch.'
    },
    {
      id: 5,
      name: 'Wireless Earbuds',
      price: 129.99,
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73?wid=1144&hei=1144&fmt=jpeg',
      description: 'True wireless earbuds with active noise cancellation and water resistance.'
    },
    {
      id: 6,
      name: 'Digital Camera',
      price: 799.99,
      image: 'https://cdn.mos.cms.futurecdn.net/264e989e7b9f976cb51adb737d75546f.jpg',
      description: '24MP digital camera with 4K video recording and interchangeable lenses.'
    }
  ];

  // Function to add product to cart
  const addToCart = (product: any) => {
    // Get existing cart from localStorage or initialize empty array
    const existingCart = localStorage.getItem('cart') ? 
      JSON.parse(localStorage.getItem('cart') || '[]') : [];
    
    // Check if product already exists in cart
    const existingProductIndex = existingCart.findIndex((item: any) => item.id === product.id);
    
    if (existingProductIndex >= 0) {
      // Increment quantity if product already in cart
      existingCart[existingProductIndex].quantity += 1;
    } else {
      // Add new product with quantity 1
      existingCart.push({
        ...product,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Provide feedback to user
    alert(`${product.name} added to cart!`);
    
    // Optional: redirect to cart page
    // window.location.href = '/cart';
  };

  // CSS styles for the product listing
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '30px',
      color: '#333',
      borderBottom: '2px solid #eee',
      paddingBottom: '10px',
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '25px',
    },
    productCard: {
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      backgroundColor: 'white',
    },
    productImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover' as 'cover',
      borderBottom: '1px solid #eee',
    },
    productInfo: {
      padding: '15px',
    },
    productName: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#333',
    },
    productPrice: {
      fontSize: '18px',
      color: '#e63946',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    productDescription: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '15px',
      lineHeight: '1.4',
    },
    addToCartButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      width: '100%',
      transition: 'background-color 0.2s ease',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>{title}</h1>
      <div style={styles.productGrid}>
        {products.map(product => (
          <div key={product.id} style={styles.productCard}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={styles.productImage} 
            />
            <div style={styles.productInfo}>
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.productPrice}>${product.price.toFixed(2)}</p>
              <p style={styles.productDescription}>{product.description}</p>
              <button 
                style={styles.addToCartButton}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
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