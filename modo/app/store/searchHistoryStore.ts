import { create } from "zustand";

interface SearchHistoryState {
  history: string[];
  addKeyword: (keyword: string) => void;
  removeKeyword: (keyword: string) => void;
  clearHistory: () => void;
}

export const useSearchHistoryStore = create<SearchHistoryState>((set) => ({
  history: [],

  addKeyword: (keyword) =>
    set((state) => ({
      history: state.history.includes(keyword)
        ? state.history
        : [keyword, ...state.history],
    })),

  removeKeyword: (keyword) =>
    set((state) => ({
      history: state.history.filter((k) => k !== keyword),
    })),

  clearHistory: () => set({ history: [] }),
}));
