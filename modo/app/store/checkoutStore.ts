import { create } from "zustand";
import { CheckoutItem } from "../components/checkout/types";

interface CheckoutState {
  items: CheckoutItem[];
  setItems: (items: CheckoutItem[]) => void;
  clear: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  clear: () => set({ items: [] }),
}));
