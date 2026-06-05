import React from 'react';
import { View, Text, FlatList, StyleSheet, Platform, ImageBackground, Image, Pressable } from 'react-native';
import useSportsStore from '../../store/sportsStore';

export default function FavoriteScreen() {
  const { favorites, toggleFavorite } = useSportsStore();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.mainTitle}>Favorites</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{favorites.length}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Your favorite sports. Tap to see details</Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.shadowWrapper}>
            <ImageBackground 
              source={{ uri: item.image }} 
              style={styles.cardBackground}
              imageStyle={{ borderRadius: 24 }}
            >
              <View style={styles.overlay}>
                <View style={styles.cardContent}>
                  <Text style={styles.sportName}>{item.name?.toUpperCase()}</Text>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{item.type || 'Collectif'}</Text>
                  </View>
                </View>

                <Pressable
                  onPress={() => toggleFavorite(item)}
                  style={({ pressed }) => [
                    styles.heartCircle,
                    pressed && styles.heartCirclePressed,
                  ]}
                >
                  {({ pressed }) => (
                    <Image 
                      source={require("../../assets/heart.icon/heart-28_.png")} 
                      style={[
                        styles.heartIcon,
                        pressed && styles.heartIconPressed 
                      ]}
                      resizeMode="contain"
                    />
                  )}
                </Pressable>
              </View>
            </ImageBackground>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Image 
              source={require('../../assets/sad.icone.png')} 
              style={styles.sadSticker} 
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>
              Oh no! Your list is empty...{"\n"}
              Add your first sport! ❤️
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9FB', paddingHorizontal: 20, paddingTop: 60 },
  headerContainer: { marginBottom: 25 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  mainTitle: { fontSize: 34, fontWeight: '900', color: '#1A1D4E', flex: 1 },
  badge: { backgroundColor: '#FFD1E8', paddingHorizontal: 14, paddingVertical: 4, borderRadius: 18 },
  badgeText: { color: '#FF4D94', fontWeight: 'bold', fontSize: 16 },
  subtitle: { color: '#8A8D9F', fontSize: 14, marginTop: 4 },

  shadowWrapper: {
    marginBottom: 20,
    borderRadius: 24,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#FF4D94',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
      },
      android: { elevation: 10 },
    }),
  },
  cardBackground: { height: 180, width: '100%', overflow: 'hidden' },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    flexDirection: 'row', 
    padding: 20, 
    alignItems: 'flex-end' 
  },
  cardContent: { flex: 1 },
  sportName: { fontSize: 26, fontWeight: '900', color: '#FFF', marginBottom: 6 },
  tag: { backgroundColor: '#FF4D94', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  tagText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

  heartCircle: { 
    width: 54, 
    height: 54, 
    borderRadius: 27, 
    backgroundColor: '#FFF', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD1E8'
  },
  heartCirclePressed: {
    backgroundColor: '#FFE6F0',
  },
  heartIcon: {
    width: 28,
    height: 28,
    transform: [{ scale: 1 }],
  },
  heartIconPressed: {
    transform: [{ scale: 1.2 }],
    opacity: 0.8,
  },

  emptyContainer: { marginTop: 80, alignItems: 'center', justifyContent: 'center' },
  sadSticker: { width: 280, height: 280, marginBottom: 20 }, 
  emptyText: { color: '#FF4D94', fontSize: 18, fontWeight: '700', textAlign: 'center', lineHeight: 28 }
});