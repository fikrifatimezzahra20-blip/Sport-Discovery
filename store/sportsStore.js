import { create } from "zustand";
import { fetchSports } from "../services/api";

export const useSportsStore =
  create((set) => ({
    sports: [],
    loading: false,
    error: null,

    selectedCategory: "All",

    setCategory: (category) =>
      set({
        selectedCategory:
          category,
      }),

    loadSports: async () => {
      try {
        set({
          loading: true,
          error: null,
        });

        const data =
          await fetchSports();

        set({
          sports: data,
          loading: false,
        });
      } catch (_error) {
        set({
          error:
            "Failed to fetch sports",
          loading: false,
        });
      }
    },
  }));