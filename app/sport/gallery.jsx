import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { X, ChevronLeft, ChevronRight } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import useSportsStore from '../../store/sportsStore';
import Loading from '../../components/Loading';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const GalleryItem = ({ item, index, scrollX }) => {
  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];
    const scale = interpolate(scrollX.value, inputRange, [0.9, 1, 0.9]);
    const opacity = interpolate(scrollX.value, inputRange, [0.6, 1, 0.6]);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={styles.imageWrapper}>
      <Animated.Image 
        source={{ uri: item }} 
        style={[styles.galleryImage, rStyle]} 
      />
    </View>
  );
};

export default function GalleryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { sports, loading } = useSportsStore();
  const [currentIndex, setCurrentIndex] = useState(1);

  const sport = sports.find(s => s.id === id);

  const defaultGallery = [
    sport?.image,
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800'
  ].filter(Boolean);

  const galleryImages = sport?.gallery && sport.gallery.length > 0 ? sport.gallery : defaultGallery;

  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <X color="#FFF" size={28} />
        </TouchableOpacity>
        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>{currentIndex} / {galleryImages.length}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <Animated.FlatList
        data={galleryImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          const page = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH) + 1;
          setCurrentIndex(page);
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <GalleryItem item={item} index={index} scrollX={scrollX} />
        )}
      />

      <View style={styles.footerHint}>
        <ChevronLeft color="rgba(255,255,255,0.4)" size={20} />
        <Text style={styles.hintText}>Swipe left or right</Text>
        <ChevronRight color="rgba(255,255,255,0.4)" size={20} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A14',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  counterText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  imageWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryImage: {
    width: SCREEN_WIDTH * 0.92,
    height: SCREEN_HEIGHT * 0.55,
    borderRadius: 24,
    resizeMode: 'cover',
  },
  footerHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    gap: 8,
  },
  hintText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    fontWeight: '500',
  },
});