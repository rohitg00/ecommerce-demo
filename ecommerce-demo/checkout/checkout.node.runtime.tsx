import type { CheckoutConfig } from './checkout-config.js';
import { Order, OrderSlot, CartItem } from './order.js';
import { SymphonyPlatformAspect, SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';
import { ProductsAspect } from '@dras/ecommerce-demo.products';
import { UserAspect } from '@dras/ecommerce-demo.user';
import type { ProductsNode } from '@dras/ecommerce-demo.products';
import type { UserNode } from '@dras/ecommerce-demo.user';

export class CheckoutNode {
  private orders: Map<string, Order> = new Map();

  constructor(
    private config: CheckoutConfig,
    private orderSlot: OrderSlot,
    private productsNode: ProductsNode,
    private userNode: UserNode
  ) {}
  
  /**
   * Create a new order
   */
  createOrder(userId: string, items: CartItem[], shippingAddress?: any, shippingMethod?: string, paymentMethod?: string) {
    // Validate user exists
    const user = this.userNode.getUserById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = Math.round(subtotal * (this.config.taxRate || 0) / 100);
    const shippingCost = this.config.enableShipping ? 999 : 0; // $9.99 flat shipping for demo
    const total = subtotal + tax + shippingCost;
    
    const order: Order = {
      id: `order-${Date.now()}`,
      userId,
      items,
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
    
    return order;
  }
  
  /**
   * Get order by ID
   */
  getOrderById(orderId: string) {
    return this.orders.get(orderId);
  }
  
  /**
   * Get orders by user ID
   */
  getOrdersByUserId(userId: string) {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }
  
  /**
   * Update order status
   */
  updateOrderStatus(orderId: string, status: Order['orderStatus']) {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }
    
    order.orderStatus = status;
    order.updatedAt = new Date();
    
    return order;
  }
  
  /**
   * Update payment status
   */
  updatePaymentStatus(orderId: string, status: Order['paymentStatus']) {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }
    
    order.paymentStatus = status;
    order.updatedAt = new Date();
    
    return order;
  }

  static dependencies = [ SymphonyPlatformAspect, ProductsAspect, UserAspect ];

  static defaultConfig: CheckoutConfig = {
    enableShipping: true,
    enablePayment: true,
    taxRate: 8.5,
    availablePaymentMethods: ['credit_card', 'paypal']
  };

  static async provider(
    [ symphonyPlatform, productsAspect, userAspect ]: [ SymphonyPlatformNode, ProductsNode, UserNode ],
    config: CheckoutConfig,
    [orderSlot]: [OrderSlot]
  ) {
    const checkout = new CheckoutNode(config, orderSlot, productsAspect, userAspect);
    
    return checkout;
  }
}

export default CheckoutNode; 