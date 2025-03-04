// use this type for your aspect config.
export type ProductConfig = {
  // Maximum number of products displayed per page
  productsPerPage?: number;
  // Whether to show product ratings
  showRatings?: boolean;
  // Default sorting method for products
  defaultSortMethod?: 'price' | 'name' | 'popularity';
};

