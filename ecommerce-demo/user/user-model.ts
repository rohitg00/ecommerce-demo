import type { SlotRegistry } from '@bitdev/harmony.harmony';

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface User {
  /**
   * Unique identifier for the user
   */
  id: string;
  
  /**
   * User's email address (used for login)
   */
  email: string;
  
  /**
   * User's full name
   */
  name: string;
  
  /**
   * User's shipping addresses
   */
  addresses?: Address[];
  
  /**
   * User's preferred currency
   */
  preferredCurrency?: string;
  
  /**
   * Account creation date
   */
  createdAt: Date;
  
  /**
   * Last login date
   */
  lastLoginAt?: Date;
}

export interface UserSession {
  userId: string;
  token: string;
  expiresAt: Date;
}

export type UserSlot = SlotRegistry<User[]>; 