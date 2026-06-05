import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import useSportsStore from '../store/sportsStore';

export default function HeartButton({ sport }) {
  const { favorites, toggleFavorite } = useSportsStore();
  
  const isFavorite = favorites.some((fav) => String(fav.id) === String(sport?.id));

  return (
    <TouchableOpacity style={styles.button} onPress={() => toggleFavorite(sport)}>
      <Text style={styles.icon}>{isFavorite ? '❤️' : '🤍'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: 'rgba(255,255,255,0.9)', padding: 10, borderRadius: 20 },
  icon: { fontSize: 20 }
});