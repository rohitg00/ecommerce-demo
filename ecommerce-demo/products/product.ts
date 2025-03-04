import type { SlotRegistry } from '@bitdev/harmony.harmony';

export interface Product {
  /**
   * Unique identifier for the product
   */
  id: string;
  
  /**
   * Name of the product
   */
  name: string;
  
  /**
   * Description of the product
   */
  description: string;
  
  /**
   * Product price in the smallest currency unit (e.g., cents)
   */
  price: number;
  
  /**
   * URL to the product image
   */
  imageUrl: string;
  
  /**
   * Product category
   */
  category: string;
  
  /**
   * Product inventory count
   */
  stockCount: number;
  
  /**
   * Featured product flag
   */
  isFeatured?: boolean;
}

export type ProductSlot = SlotRegistry<Product[]>; 