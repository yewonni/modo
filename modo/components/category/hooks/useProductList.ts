import { useMemo } from "react";
import { Category, Product } from "../types";
import { filterProducts, sortProducts, paginate } from "../utils";
import { ProductSortType } from "../utils";

interface Props {
  products: Product[];
  activeParent: Category | null;
  activeChild: Category | null;
  selectedFilter: ProductSortType;
  currentPage: number;
  itemsPerPage: number;
}

export function useProductList({
  products,
  activeParent,
  activeChild,
  selectedFilter,
  currentPage,
  itemsPerPage,
}: Props) {
  const filteredProducts = useMemo(() => {
    return filterProducts(products, activeParent, activeChild);
  }, [products, activeParent, activeChild]);

  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, selectedFilter);
  }, [filteredProducts, selectedFilter]);

  const displayedProducts = useMemo(() => {
    return paginate(sortedProducts, currentPage, itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  return {
    displayedProducts,
    totalCount: sortedProducts.length,
  };
}
