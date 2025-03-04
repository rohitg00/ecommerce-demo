// use this type for the Checkout aspect config.
export type CheckoutConfig = {
  // Enable or disable shipping
  enableShipping?: boolean;
  // Enable or disable payment processing
  enablePayment?: boolean;
  // Tax rate percentage
  taxRate?: number;
  // Available payment methods
  availablePaymentMethods?: string[];
}; 