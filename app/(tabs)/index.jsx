import { useRouter } from 'expo-router';
import { Flame, Search, Trophy } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Loading from '../../components/Loading';
import useSportsStore from '../../store/sportsStore';

export default function HomeScreen() {
  const router = useRouter();
  const { sports, loading, error, loadSports } = useSportsStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSports();
  }, [loadSports]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSports();
    setRefreshing(false);
  };

  const filteredSports = sports?.filter(sport => {
    const matchesSearch = sport?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const categoryLower = sport?.category?.toLowerCase() || '';
    const matchesCategory = selectedCategory === 'All' || 
      (selectedCategory === 'Team' && (categoryLower === 'collectif' || categoryLower === 'team')) ||
      (selectedCategory === 'Individual' && (categoryLower === 'individuel' || categoryLower === 'individual'));

    return matchesSearch && matchesCategory;
  }) || [];

  if (loading && !refreshing) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadSports}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Flame color="#FF4500" size={28} fill="#FF4500" />
          <Text style={styles.headerTitle}>Sport Discovery</Text>
        </View>
        <Text style={styles.headerSubtitle}>Find your passion, start moving today!</Text>
      </View>

      <View style={styles.searchSection}>
        <Search color="#8E8E93" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your favorite sport..."
          placeholderTextColor="#8E8E93"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoryContainer}>
        {['All', 'Team', 'Individual'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === category && styles.categoryButtonTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredSports}
        // إصلاح مشكل keyExtractor بزيادة حماية الـ index
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FF4500']} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Trophy size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>No sports match your criteria.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.sportCard}
            onPress={() => router.push(`/sport/${item.id}`)}
            activeOpacity={0.95}
          >
            {item?.image && <Image source={{ uri: item.image }} style={styles.cardImage} />}
            <View style={styles.cardContent}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>{item?.name?.toUpperCase()}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item?.category || 'Sport'}</Text>
                </View>
              </View>
              <Text style={styles.cardDescription} numberOfLines={2}>
                {item?.description || item?.shortDescription}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// الـ styles كيبقاو هما هما...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFF', paddingTop: 60, paddingHorizontal: 20 },
  header: { marginBottom: 20 },
  logoContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#1A1A24' },
  headerSubtitle: { fontSize: 14, color: '#6C757D', marginTop: 4 },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: 20,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#1A1A24' },
  categoryContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  categoryButton: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: '#EFF0F6' },
  categoryButtonActive: { backgroundColor: '#1A1A3A' },
  categoryButtonText: { fontSize: 14, fontWeight: '600', color: '#6C757D' },
  categoryButtonTextActive: { color: '#FFF' },
  listContent: { paddingBottom: 30 },
  sportCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  cardImage: { width: '100%', height: 160, resizeMode: 'cover' },
  cardContent: { padding: 16 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A24' },
  badge: { backgroundColor: '#F3E8FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  badgeText: { color: '#4A148C', fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  cardDescription: { fontSize: 13, color: '#666', lineHeight: 18 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 16, color: '#DC3545', textAlign: 'center', marginBottom: 16 },
  retryButton: { backgroundColor: '#1A1A3A', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  retryButtonText: { color: '#FFF', fontWeight: '600' },
  emptyContainer: { alignItems: 'center', marginTop: 40, gap: 12 },
  emptyText: { color: '#6C757D', fontSize: 14 },
});