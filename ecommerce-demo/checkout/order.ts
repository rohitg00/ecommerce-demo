import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { Product } from '@dras/ecommerce-demo.products';
import type { Address } from '@dras/ecommerce-demo.user';

export interface CartItem {
  /**
   * Product information
   */
  product: Product;
  
  /**
   * Quantity of the product
   */
  quantity: number;
}

export interface Order {
  /**
   * Unique order identifier
   */
  id: string;
  
  /**
   * User ID who placed the order
   */
  userId: string;
  
  /**
   * Items in the order
   */
  items: CartItem[];
  
  /**
   * Shipping address
   */
  shippingAddress?: Address;
  
  /**
   * Shipping method
   */
  shippingMethod?: string;
  
  /**
   * Payment method
   */
  paymentMethod?: string;
  
  /**
   * Payment status
   */
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  
  /**
   * Order status
   */
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  
  /**
   * Subtotal amount (before tax/shipping) in smallest currency unit
   */
  subtotal: number;
  
  /**
   * Tax amount in smallest currency unit
   */
  tax: number;
  
  /**
   * Shipping cost in smallest currency unit
   */
  shippingCost: number;
  
  /**
   * Total amount (subtotal + tax + shipping) in smallest currency unit
   */
  total: number;
  
  /**
   * Order creation date
   */
  createdAt: Date;
  
  /**
   * Order last updated date
   */
  updatedAt: Date;
}

export type OrderSlot = SlotRegistry<Order[]>; 
 