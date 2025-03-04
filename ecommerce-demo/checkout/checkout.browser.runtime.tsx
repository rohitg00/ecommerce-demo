import React, { useState } from 'react';
import type { CheckoutConfig } from './checkout-config.js';
import { Order, OrderSlot, CartItem } from './order.js';
import { SymphonyPlatformAspect, SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { PiedPlatformAspect, PiedPlatformBrowser } from '@pied/pied-piper.pied-platform';
import { ProductsAspect } from '@dras/ecommerce-demo.products';
import { UserAspect } from '@dras/ecommerce-demo.user';
import type { ProductsBrowser } from '@dras/ecommerce-demo.products';
import type { UserBrowser } from '@dras/ecommerce-demo.user';
import type { Address } from '@dras/ecommerce-demo.user';

// Cart component
const Cart = ({ items, onUpdateQuantity, onRemoveItem, onCheckout }: { 
  items: CartItem[], 
  onUpdateQuantity: (productId: string, quantity: number) => void,
  onRemoveItem: (productId: string) => void,
  onCheckout: () => void
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const formattedSubtotal = (subtotal / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      
      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <a href="/products" className="continue-shopping-btn">Continue Shopping</a>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => {
              const formattedPrice = (item.product.price / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              });
              
              return (
                <div key={item.product.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.product.imageUrl} alt={item.product.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.product.name}</h3>
                    <p className="item-price">{formattedPrice}</p>
                  </div>
                  <div className="item-quantity">
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stockCount}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    {((item.product.price * item.quantity) / 100).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </div>
                  <button 
                    className="remove-item-btn"
                    onClick={() => onRemoveItem(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          
          <div className="cart-summary">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>{formattedSubtotal}</span>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>
              Proceed to Checkout
            </button>
            <a href="/products" className="continue-shopping-link">
              Continue Shopping
            </a>
          </div>
        </>
      )}
    </div>
  );
};

// Checkout form component
const CheckoutForm = ({ 
  cartItems, 
  addresses, 
  config, 
  onPlaceOrder 
}: { 
  cartItems: CartItem[], 
  addresses: Address[],
  config: CheckoutConfig,
  onPlaceOrder: (shippingAddress: Address, shippingMethod: string, paymentMethod: string) => void
}) => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(addresses.length > 0 ? 0 : -1);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState(config.availablePaymentMethods?.[0] || 'credit_card');
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = Math.round(subtotal * (config.taxRate || 0) / 100);
  const shippingCost = config.enableShipping ? 999 : 0; // $9.99 flat shipping for demo
  const total = subtotal + tax + shippingCost;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedAddressIndex === -1) {
      alert('Please select a shipping address');
      return;
    }
    
    onPlaceOrder(addresses[selectedAddressIndex], shippingMethod, paymentMethod);
  };
  
  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      
      <div className="checkout-sections">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit}>
            {config.enableShipping && (
              <div className="shipping-section">
                <h3>Shipping</h3>
                
                {addresses.length === 0 ? (
                  <div className="no-addresses">
                    <p>You don't have any saved addresses.</p>
                    <a href="/profile" className="add-address-link">Add an address</a>
                  </div>
                ) : (
                  <div className="address-selection">
                    <label>Select a shipping address:</label>
                    <div className="address-options">
                      {addresses.map((address, index) => (
                        <div key={index} className="address-option">
                          <input 
                            type="radio" 
                            id={`address-${index}`} 
                            name="shipping-address"
                            checked={selectedAddressIndex === index}
                            onChange={() => setSelectedAddressIndex(index)}
                          />
                          <label htmlFor={`address-${index}`}>
                            <div>{address.street}</div>
                            <div>{address.city}, {address.state} {address.postalCode}</div>
                            <div>{address.country}</div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="shipping-method">
                  <label>Shipping Method:</label>
                  <div className="shipping-options">
                    <div className="shipping-option">
                      <input 
                        type="radio" 
                        id="standard-shipping" 
                        name="shipping-method"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                      />
                      <label htmlFor="standard-shipping">
                        <span>Standard Shipping</span>
                        <span>$9.99</span>
                      </label>
                    </div>
                    <div className="shipping-option">
                      <input 
                        type="radio" 
                        id="express-shipping" 
                        name="shipping-method"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                      />
                      <label htmlFor="express-shipping">
                        <span>Express Shipping</span>
                        <span>$19.99</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {config.enablePayment && (
              <div className="payment-section">
                <h3>Payment</h3>
                <div className="payment-methods">
                  {config.availablePaymentMethods?.map(method => (
                    <div key={method} className="payment-method">
                      <input 
                        type="radio" 
                        id={`payment-${method}`} 
                        name="payment-method"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                      />
                      <label htmlFor={`payment-${method}`}>
                        {method === 'credit_card' ? 'Credit Card' : 
                         method === 'paypal' ? 'PayPal' : 
                         method}
                      </label>
                    </div>
                  ))}
                </div>
                
                {paymentMethod === 'credit_card' && (
                  <div className="credit-card-form">
                    <div className="form-group">
                      <label htmlFor="card-number">Card Number</label>
                      <input type="text" id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="expiry">Expiry Date</label>
                        <input type="text" id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cvv">CVV</label>
                        <input type="text" id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="name-on-card">Name on Card</label>
                      <input type="text" id="name-on-card" />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{(subtotal / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
              </div>
              <div className="summary-row">
                <span>Tax ({config.taxRate}%):</span>
                <span>{(tax / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>{(shippingCost / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>{(total / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="place-order-btn"
              disabled={addresses.length === 0}
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Order confirmation component
const OrderConfirmation = ({ order }: { order: Order }) => {
  return (
    <div className="order-confirmation">
      <div className="confirmation-header">
        <h2>Thank You for Your Order!</h2>
        <p>Your order has been placed successfully.</p>
      </div>
      
      <div className="order-details">
        <h3>Order Details</h3>
        <div className="detail-row">
          <span>Order Number:</span>
          <span>{order.id}</span>
        </div>
        <div className="detail-row">
          <span>Order Date:</span>
          <span>{order.createdAt.toLocaleDateString()}</span>
        </div>
        <div className="detail-row">
          <span>Order Status:</span>
          <span>{order.orderStatus}</span>
        </div>
        <div className="detail-row">
          <span>Payment Status:</span>
          <span>{order.paymentStatus}</span>
        </div>
      </div>
      
      <div className="order-items">
        <h3>Items</h3>
        {order.items.map(item => (
          <div key={item.product.id} className="order-item">
            <div className="item-name">{item.product.name}</div>
            <div className="item-quantity">Qty: {item.quantity}</div>
            <div className="item-price">
              {((item.product.price * item.quantity) / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="order-totals">
        <div className="total-row">
          <span>Subtotal:</span>
          <span>{(order.subtotal / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
        </div>
        <div className="total-row">
          <span>Tax:</span>
          <span>{(order.tax / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
        </div>
        <div className="total-row">
          <span>Shipping:</span>
          <span>{(order.shippingCost / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
        </div>
        <div className="total-row grand-total">
          <span>Total:</span>
          <span>{(order.total / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
        </div>
      </div>
      
      <div className="confirmation-actions">
        <a href="/products" className="continue-shopping-btn">Continue Shopping</a>
        <a href="/orders" className="view-orders-btn">View My Orders</a>
      </div>
    </div>
  );
};

// Orders history component
const OrdersHistory = ({ orders }: { orders: Order[] }) => {
  return (
    <div className="orders-history">
      <h2>My Orders</h2>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <a href="/products" className="shop-now-btn">Shop Now</a>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-number">
                  <span>Order #:</span>
                  <span>{order.id}</span>
                </div>
                <div className="order-date">
                  <span>Date:</span>
                  <span>{order.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="order-status">
                <div className="status-badge">
                  {order.orderStatus}
                </div>
              </div>
              
              <div className="order-summary">
                <div className="items-count">
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                </div>
                <div className="order-total">
                  {(order.total / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </div>
              </div>
              
              <a href={`/orders/${order.id}`} className="view-details-btn">
                View Details
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export class CheckoutBrowser {
  private cartItems: CartItem[] = [];
  private orders: Map<string, Order> = new Map();

  constructor(
    private config: CheckoutConfig,
    private orderSlot: OrderSlot,
    private productsNode: ProductsBrowser,
    private userNode: UserBrowser
  ) {}
  
  /**
   * Add item to cart
   */
  addToCart(productId: string, quantity: number = 1) {
    const product = this.productsNode.getProductById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    
    // Check if product is already in cart
    const existingItemIndex = this.cartItems.findIndex(item => item.product.id === productId);
    
    if (existingItemIndex >= 0) {
      // Update quantity if already in cart
      this.cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      this.cartItems.push({
        product,
        quantity
      });
    }
    
    // Save cart to localStorage
    this.saveCartToStorage();
    
    return this.cartItems;
  }
  
  /**
   * Update cart item quantity
   */
  updateCartItemQuantity(productId: string, quantity: number) {
    const itemIndex = this.cartItems.findIndex(item => item.product.id === productId);
    if (itemIndex === -1) {
      throw new Error(`Product with ID ${productId} not found in cart`);
    }
    
    this.cartItems[itemIndex].quantity = quantity;
    this.saveCartToStorage();
    
    return this.cartItems;
  }
  
  /**
   * Remove item from cart
   */
  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.saveCartToStorage();
    
    return this.cartItems;
  }
  
  /**
   * Get cart items
   */
  getCartItems() {
    return this.cartItems;
  }
  
  /**
   * Clear cart
   */
  clearCart() {
    this.cartItems = [];
    this.saveCartToStorage();
  }
  
  /**
   * Save cart to localStorage
   */
  private saveCartToStorage() {
    // We can't directly serialize the cart items with product objects
    // So we'll just save the product IDs and quantities
    const serializedCart = this.cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));
    
    localStorage.setItem('cart', JSON.stringify(serializedCart));
  }
  
  /**
   * Load cart from localStorage
   */
  loadCartFromStorage() {
    const cartData = localStorage.getItem('cart');
    if (!cartData) return;
    
    try {
      const serializedCart = JSON.parse(cartData);
      this.cartItems = serializedCart.map((item: { productId: string, quantity: number }) => {
        const product = this.productsNode.getProductById(item.productId);
        if (!product) return null;
        
        return {
          product,
          quantity: item.quantity
        };
      }).filter(Boolean);
    } catch (error) {
      console.error('Failed to load cart from storage', error);
    }
  }
  
  /**
   * Create a new order
   */
  createOrder(shippingAddress: any, shippingMethod: string, paymentMethod: string) {
    const currentUser = this.userNode.getCurrentUser();
    if (!currentUser) {
      throw new Error('User must be logged in to create an order');
    }
    
    if (this.cartItems.length === 0) {
      throw new Error('Cart is empty');
    }
    
    // Calculate totals
    const subtotal = this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = Math.round(subtotal * (this.config.taxRate || 0) / 100);
    const shippingCost = this.config.enableShipping ? 999 : 0; // $9.99 flat shipping for demo
    const total = subtotal + tax + shippingCost;
    
    const order: Order = {
      id: `order-${Date.now()}`,
      userId: currentUser.id,
      items: [...this.cartItems], // Create a copy of cart items
      shippingAddress,
      shippingMethod,
      paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'pending',
      subtotal,
      tax,
      shippingCost,
      total,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.orders.set(order.id, order);
    this.orderSlot.register([order]);
    
    // Clear cart after order is created
    this.clearCart();
    
    return order;
  }
  
  /**
   * Get order by ID
   */
  getOrderById(orderId: string) {
    return this.orders.get(orderId);
  }
  
  /**
   * Get orders for current user
   */
  getCurrentUserOrders() {
    const currentUser = this.userNode.getCurrentUser();
    if (!currentUser) return [];
    
    return Array.from(this.orders.values())
      .filter(order => order.userId === currentUser.id)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Sort by date, newest first
  }

  static dependencies = [ SymphonyPlatformAspect, PiedPlatformAspect, ProductsAspect, UserAspect ];

  static defaultConfig: CheckoutConfig = {
    enableShipping: true,
    enablePayment: true,
    taxRate: 8.5,
    availablePaymentMethods: ['credit_card', 'paypal']
  };

  static async provider(
    [ symphonyPlatform, piedPlatform, productsAspect, userAspect ]: 
    [ SymphonyPlatformBrowser, PiedPlatformBrowser, ProductsBrowser, UserBrowser ],
    config: CheckoutConfig,
    [orderSlot]: [OrderSlot]
  ) {
    const checkout = new CheckoutBrowser(config, orderSlot, productsAspect, userAspect);
    
    // Load cart from localStorage
    checkout.loadCartFromStorage();
    
    // Register routes
    symphonyPlatform.registerRoute([
      {
        path: '/cart',
        component: () => {
          const cartItems = checkout.getCartItems();
          
          return (
            <Cart 
              items={cartItems}
              onUpdateQuantity={(productId, quantity) => {
                checkout.updateCartItemQuantity(productId, quantity);
                // Force re-render
                window.location.reload();
              }}
              onRemoveItem={(productId) => {
                checkout.removeFromCart(productId);
                // Force re-render
                window.location.reload();
              }}
              onCheckout={() => {
                const currentUser = userAspect.getCurrentUser();
                if (!currentUser) {
                  window.location.href = '/login?redirect=/checkout';
                } else {
                  window.location.href = '/checkout';
                }
              }}
            />
          );
        }
      },
      {
        path: '/checkout',
        component: () => {
          const currentUser = userAspect.getCurrentUser();
          if (!currentUser) {
            window.location.href = '/login?redirect=/checkout';
            return <div>Redirecting to login...</div>;
          }
          
          const cartItems = checkout.getCartItems();
          if (cartItems.length === 0) {
            window.location.href = '/cart';
            return <div>Your cart is empty. Redirecting...</div>;
          }
          
          return (
            <CheckoutForm 
              cartItems={cartItems}
              addresses={currentUser.addresses || []}
              config={config}
              onPlaceOrder={(shippingAddress, shippingMethod, paymentMethod) => {
                try {
                  const order = checkout.createOrder(shippingAddress, shippingMethod, paymentMethod);
                  window.location.href = `/order-confirmation/${order.id}`;
                } catch (error) {
                  alert(`Failed to place order: ${error.message}`);
                }
              }}
            />
          );
        }
      },
      {
        path: '/order-confirmation/:id',
        component: ({ id }: { id: string }) => {
          const order = checkout.getOrderById(id);
          if (!order) {
            return <div>Order not found</div>;
          }
          
          return <OrderConfirmation order={order} />;
        }
      },
      {
        path: '/orders',
        component: () => {
          const currentUser = userAspect.getCurrentUser();
          if (!currentUser) {
            window.location.href = '/login?redirect=/orders';
            return <div>Redirecting to login...</div>;
          }
          
          const orders = checkout.getCurrentUserOrders();
          return <OrdersHistory orders={orders} />;
        }
      },
      {
        path: '/orders/:id',
        component: ({ id }: { id: string }) => {
          const order = checkout.getOrderById(id);
          if (!order) {
            return <div>Order not found</div>;
          }
          
          return <OrderConfirmation order={order} />;
        }
      }
    ]);

    // Register header links
    piedPlatform.registerHeaderLinks([
      {
        label: 'Cart',
        href: '/cart',
      },
      {
        label: 'Orders',
        href: '/orders',
        condition: () => !!userAspect.getCurrentUser()
      }
    ]);
    
    // Add to cart functionality for product pages
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('add-to-cart-btn') || target.classList.contains('add-to-cart-btn-large')) {
        e.preventDefault();
        
        // Find the product ID from the closest product card or detail
        const productCard = target.closest('[data-product-id]');
        if (productCard) {
          const productId = productCard.getAttribute('data-product-id');
          if (productId) {
            checkout.addToCart(productId);
            alert('Product added to cart!');
          }
        }
      }
    });

    return checkout;
  }
}

export default CheckoutBrowser; 