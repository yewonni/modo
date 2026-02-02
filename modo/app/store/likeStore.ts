import { create } from "zustand";
import { apiRequest } from "../lib/apiClient";

interface LikeState {
  likedProductIds: number[];
  setLikes: (ids: number[]) => void;
  toggleLike: (id: number) => void;
  fetchLikes: () => Promise<void>;
}

export const useLikeStore = create<LikeState>((set, get) => ({
  likedProductIds: [],

  setLikes: (ids) => set({ likedProductIds: ids }),

  toggleLike: (id) => {
    const liked = get().likedProductIds.includes(id);
    set({
      likedProductIds: liked
        ? get().likedProductIds.filter((pid) => pid !== id)
        : [...get().likedProductIds, id],
    });
  },

  fetchLikes: async () => {
    try {
      const data = await apiRequest<{ likedProductIds: number[] }>(
        "/api/likes",
        {
          method: "GET",
        },
      );
      set({ likedProductIds: data.likedProductIds });
    } catch (err) {
      console.error("좋아요 리스트 불러오기 실패", err);
    }
  },
}));
