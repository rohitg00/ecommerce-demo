// use this type for your aspect config.
export type CheckoutConfig = {
  // Available payment methods
  paymentMethods?: string[];
  // Default shipping method
  defaultShippingMethod?: string;
  // Enable order tracking
  enableOrderTracking?: boolean;
};

