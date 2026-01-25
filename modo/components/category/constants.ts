export const PRODUCT_SORT = {
  PRICE_DESC: "높은가격순",
  PRICE_ASC: "낮은가격순",
} as const;

export type ProductSortType = (typeof PRODUCT_SORT)[keyof typeof PRODUCT_SORT];
