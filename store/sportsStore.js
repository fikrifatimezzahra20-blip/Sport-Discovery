import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchSports } from "../services/api"; 

const useSportsStore = create(
  persist(
    (set, get) => ({
      sports: [],
      favorites: [], 
      loading: false,

      loadSports: async () => {
        set({ loading: true });
        try {
          const data = await fetchSports();
          set({ sports: data, loading: false });
        } catch (error) {
          console.log("Store Load Sports Error:", error);
          set({ loading: false });
        }
      },

      toggleFavorite: (sport) => {
        const { favorites } = get();
        const isExist = favorites.some((fav) => String(fav.id) === String(sport.id));

        if (isExist) {
          set({ favorites: favorites.filter((fav) => String(fav.id) !== String(sport.id)) });
        } else {
          set({ favorites: [...favorites, sport] });
        }
      },
    }),
    {
      name: 'sports-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useSportsStore;