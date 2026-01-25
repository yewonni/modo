import { Category, Product } from "./types";

export const PRODUCT_SORT = {
  PRICE_DESC: "높은가격순",
  PRICE_ASC: "낮은가격순",
} as const;

export type ProductSortType = (typeof PRODUCT_SORT)[keyof typeof PRODUCT_SORT];

export function filterProducts(
  products: Product[],
  activeParent: Category | null,
  activeChild: Category | null,
) {
  if (!activeParent) return [];

  if (activeChild) {
    return products.filter((p) => p.category.id === activeChild.id);
  }

  return products.filter((p) =>
    activeParent.children.some((c) => c.id === p.category.id),
  );
}

export function sortProducts(products: Product[], filter: ProductSortType) {
  return [...products].sort((a, b) => {
    if (filter === PRODUCT_SORT.PRICE_DESC) return b.price - a.price;
    if (filter === PRODUCT_SORT.PRICE_ASC) return a.price - b.price;
    return 0;
  });
}

export function paginate<T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number,
) {
  return items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
}
