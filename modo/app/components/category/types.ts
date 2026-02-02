export interface Category {
  id: number;
  name: string;
  slug: string;
  children: Category[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  store?: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  description?: string;
}
