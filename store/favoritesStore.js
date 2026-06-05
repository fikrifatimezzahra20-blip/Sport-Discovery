import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFavoritesStore = create((set, get) => ({
  favorites: [],

  loadFavorites: async () => {
    try {
      const storedFavs = await AsyncStorage.getItem('favorites');
      if (storedFavs) set({ favorites: JSON.parse(storedFavs) });
    } catch (error) {
      console.error('Error loading favorites', error);
    }
  },

  toggleFavorite: async (id) => {
    const { favorites } = get();
    const isFav = favorites.includes(id);
    const newFavorites = isFav 
      ? favorites.filter(favId => favId !== id) 
      : [...favorites, id]; 

    set({ favorites: newFavorites });
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites', error);
    }
  },

  isFavorite: (id) => get().favorites.includes(id),
}));

export default useFavoritesStore