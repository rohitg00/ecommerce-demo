// use this type for your aspect config.
export type UserConfig = {
  // Session timeout in minutes
  sessionTimeout?: number;
  // Enable or disable guest checkout
  allowGuestCheckout?: boolean;
  // Require email verification
  requireEmailVerification?: boolean;
};

