import { create } from "zustand";
import { fetchSports } from "../app";

export const useSportsStore = create((set) => ({
  sports: [],
  loading: false,
  error: null,

  loadSports: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

     await new Promise(resolve =>
        setTimeout(resolve, 3000));

      const data = await fetchSports();

      set({
        sports: data,
        loading: false,
      });
    } catch (_error) {
      set({
        error: "Failed to fetch sports",
        loading: false,
      });
    }
  },
}));