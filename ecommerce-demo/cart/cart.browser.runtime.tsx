import React, { useEffect, useState } from 'react';
import type { CartConfig } from './cart-config.js';
import { MenuItem, MenuItemSlot } from './menu-item.js';
import { SymphonyPlatformAspect, SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { PiedPlatformAspect, PiedPlatformBrowser } from '@pied/pied-piper.pied-platform'; 

// Navigation menu component - keeping the original structure
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

// Improved home page component that replaces "Welcome to Pied Piper"
const HomePage = () => {
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    hero: {
      padding: '40px 20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      marginBottom: '30px',
      textAlign: 'center' as 'center',
    },
    heroTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#333',
    },
    heroSubtitle: {
      fontSize: '18px',
      color: '#666',
      marginBottom: '25px',
      maxWidth: '800px',
      margin: '0 auto 25px',
    },
    shopButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
    },
    featuresSection: {
      marginBottom: '30px',
    },
    featuresTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333',
      textAlign: 'center' as 'center',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
    },
    featureCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      textAlign: 'center' as 'center',
    },
    featureIcon: {
      fontSize: '32px',
      marginBottom: '10px',
    },
    featureTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#333',
    },
    featureDescription: {
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.4',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to Ecommerce Demo</h1>
        <p style={styles.heroSubtitle}>
          Discover amazing products at great prices. Shop the latest in electronics, fashion, and more.
        </p>
        <a href="/products" style={styles.shopButton}>Shop Now</a>
      </div>
      
      <div style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>Why Shop With Us</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🚚</div>
            <h3 style={styles.featureTitle}>Free Shipping</h3>
            <p style={styles.featureDescription}>
              Free shipping on all orders over $50
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>⭐</div>
            <h3 style={styles.featureTitle}>Quality Products</h3>
            <p style={styles.featureDescription}>
              All products are carefully selected for quality
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔒</div>
            <h3 style={styles.featureTitle}>Secure Payments</h3>
            <p style={styles.featureDescription}>
              Shop with confidence with our secure payment options
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart page component with working functionality
const CartPage = () => {
  // State to store cart items
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);
  
  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Function to update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  // Function to remove item from cart
  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  // Function to handle checkout
  const proceedToCheckout = () => {
    // In a real app, this would navigate to checkout page
    alert('Proceeding to checkout with items worth $' + totalPrice.toFixed(2));
    window.location.href = '/checkout';
  };

  // CSS styles for the cart page
  const styles = {
    cartPage: {
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
    cartContainer: {
      display: 'flex',
      flexDirection: 'row' as 'row',
      gap: '30px',
      flexWrap: 'wrap' as 'wrap',
    },
    cartItems: {
      flex: '1 1 65%',
      minWidth: '300px',
    },
    cartItem: {
      display: 'flex',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '15px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor: 'white',
      alignItems: 'center',
    },
    itemImage: {
      width: '100px',
      height: '100px',
      objectFit: 'cover' as 'cover',
      borderRadius: '6px',
      marginRight: '20px',
    },
    itemDetails: {
      flex: '1',
    },
    itemName: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#333',
    },
    itemPrice: {
      fontSize: '16px',
      color: '#666',
      marginBottom: '10px',
    },
    quantityControl: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    quantityBtn: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: '#f0f0f0',
      cursor: 'pointer',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    quantity: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
    itemTotal: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      marginLeft: '20px',
      minWidth: '80px',
      textAlign: 'right' as 'right',
    },
    removeBtn: {
      backgroundColor: '#ff4d4d',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginLeft: '15px',
    },
    cartSummary: {
      flex: '1 1 25%',
      minWidth: '250px',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      alignSelf: 'flex-start',
    },
    summaryTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '1px solid #eee',
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px',
      fontSize: '16px',
    },
    total: {
      fontWeight: 'bold',
      fontSize: '18px',
      marginTop: '15px',
      paddingTop: '15px',
      borderTop: '1px solid #eee',
    },
    checkoutBtn: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      width: '100%',
      marginTop: '20px',
    },
    emptyCart: {
      textAlign: 'center' as 'center',
      padding: '40px 0',
      color: '#666',
    },
    continueShoppingLink: {
      color: '#4CAF50',
      textDecoration: 'none',
      fontWeight: 'bold',
    }
  };

  return (
    <div style={styles.cartPage}>
      <h1 style={styles.header}>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div style={styles.emptyCart}>
          <p>Your cart is empty. <a href="/products" style={styles.continueShoppingLink}>Continue shopping</a></p>
        </div>
      ) : (
        <div style={styles.cartContainer}>
          <div style={styles.cartItems}>
            {cartItems.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <img src={item.image} alt={item.name} style={styles.itemImage} />
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemPrice}>${item.price.toFixed(2)}</p>
                  <div style={styles.quantityControl}>
                    <button 
                      style={styles.quantityBtn}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >-</button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button 
                      style={styles.quantityBtn}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                </div>
                <p style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</p>
                <button 
                  style={styles.removeBtn}
                  onClick={() => removeItem(item.id)}
                >Remove</button>
              </div>
            ))}
          </div>
          <div style={styles.cartSummary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>
            <div style={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div style={{...styles.summaryRow, ...styles.total}}>
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              style={styles.checkoutBtn}
              onClick={proceedToCheckout}
            >Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
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
    
    // Register default menu items - keeping the original structure
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
            <HomePage />
          </div>
        )
      },
      {
        path: '/cart',
        component: () => <CartPage />
      }
    ]);

    return cart;
  }
}

export default CartBrowser;
