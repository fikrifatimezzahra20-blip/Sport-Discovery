import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, CheckCircle2, Users } from 'lucide-react-native';
import useSportsStore from '../../store/sportsStore';
import HeartButton from '../../components/HeartButton';
import Loading from '../../components/Loading';

const equipmentImages = {
  tennis: [
    require('../../assets/tennis/tennis,rct.png'),
    require('../../assets/tennis/tennis-court.png'),
    require('../../assets/tennis/tennis.png'),
  ],
  basketball: [
    require('../../assets/Basketball/basketball.shirt.png'),
    require('../../assets/Basketball/basketball.shoes.png'),
    require('../../assets/Basketball/basketball.png'),
  ],
  cycling: [
    require('../../assets/Cycling/bike.png'),
    require('../../assets/Cycling/helmet.png'),
    require('../../assets/Cycling/racing.png'),
  ],
  swimming: [
    require('../../assets/Swimming/suits.png'),
    require('../../assets/Swimming/suits (boy).png'),
    require('../../assets/Swimming/swiming.png.png'), 
  ],
  athletics: [
    require('../../assets/Athletics/athletics.png'),
    require('../../assets/Athletics/running-shoes.png'),
  ],
  football: [
    require("../../assets/Football/cleats.png"),
    require("../../assets/Football/football-shirt.png"),
    require("../../assets/Football/football.game.png"),
    require("../../assets/Football/soccer-ball.png"),
  ],
};

export default function SportDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { sports, loading } = useSportsStore();

  // إصلاح 1: مقارنة الـ id كـ String باش نضمنوا أنه يلقى الرياضة ديما
  const sport = sports.find(s => String(s.id) === String(id));

  if (loading) {
    return <Loading />;
  }

  if (!sport) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Sport not found!</Text>
        <TouchableOpacity style={styles.backButtonField} onPress={() => router.back()}>
          <Text style={styles.backButtonTextField}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const sportKey = sport.name?.toLowerCase() || '';
  const localIcons = equipmentImages[sportKey] || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sport Discovery</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: sport.image }} style={styles.image} />
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ChevronLeft color="#000" size={24} />
            </TouchableOpacity>
            
            {/* إصلاح 2: صيفطنا الـ sport كامل للـ HeartButton */}
            <View style={styles.heartContainer}>
              <HeartButton sport={sport} />
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{sport.name?.toUpperCase()}</Text>
            <Text style={styles.description}>{sport.description}</Text>

            <Text style={styles.sectionTitle}>Rules</Text>
            {sport.rules && Array.isArray(sport.rules) ? (
              sport.rules.map((rule, index) => (
                <View key={index} style={styles.ruleItem}>
                  <CheckCircle2 size={16} color="#4A148C" style={styles.ruleIcon} />
                  <Text style={styles.ruleText}>{rule}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.ruleText}>Standard professional rules apply.</Text>
            )}

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.sectionTitle}>Equipment</Text>
                <View style={styles.iconsRow}>
                  {localIcons.map((iconSource, index) => (
                    <View key={index} style={styles.iconCircle}>
                      <Image source={iconSource} style={styles.equipmentIcon} />
                    </View>
                  ))}
                </View>
                <Text style={styles.statTextLight} numberOfLines={1}>
                  {sport.equipment || 'Specialized Gear'}
                </Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.sectionTitle}>Players</Text>
                <View style={styles.statItem}>
                  <Users size={18} color="#000" />
                  <Text style={styles.statText}>{sport.playerCount || 'N/A'}</Text>
                </View>
                <Text style={styles.statTextLight}>{sport.type || 'Indoor / Outdoor'}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.galleryButton} 
              onPress={() => router.push(`/sport/gallery?id=${id}`)}
            >
              <Text style={styles.galleryButtonText}>Open Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8E9FF' },
  header: { alignItems: 'center', paddingTop: 50, paddingBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#1A1A24' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  card: { backgroundColor: '#FFF', borderRadius: 30, overflow: 'hidden', elevation: 5 },
  imageContainer: { position: 'relative', height: 250 },
  image: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 20, padding: 8 },
  heartContainer: { position: 'absolute', top: 20, right: 20 },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: '800', color: '#1A1A24', marginBottom: 10 },
  description: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A24', marginBottom: 10 },
  ruleItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  ruleIcon: { marginRight: 10 },
  ruleText: { fontSize: 14, color: '#444', flex: 1 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 30 },
  statBox: { flex: 1 },
  iconsRow: { flexDirection: 'row', gap: 8, marginBottom: 5 },
  iconCircle: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#F3F4F6', 
    justifyContent: 'center', 
    alignItems: 'center',
    overflow: 'hidden'
  },
  equipmentIcon: {
    width: '65%',
    height: '65%',
    resizeMode: 'contain', 
  },
  statItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  statText: { marginLeft: 8, fontSize: 16, fontWeight: '600' },
  statTextLight: { fontSize: 13, color: '#666', marginTop: 2 },
  galleryButton: { backgroundColor: '#1A1A3A', borderRadius: 25, paddingVertical: 16, alignItems: 'center' },
  galleryButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 18, fontWeight: '600', color: '#FF0000', marginBottom: 20 },
  backButtonField: { backgroundColor: '#1A1A3A', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  backButtonTextField: { color: '#FFF', fontWeight: '600' }
});