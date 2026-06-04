import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CategoryFilter from "../components/CategoryFilter";
import SportCard from "../components/SportCard";
// import useSportsStore from "../store/sportsStore";
import { useSportsStore } from "../store/sportsStore";

export default function Home() {
  // كنعيطو على الداتا والوجيك لي صاوب Person B ف الـ Store
  const { sports, loading, error, loadSports } = useSportsStore();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSports();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSports();
    setRefreshing(false);
  };

  // لـ Logic ديال الفلترة ب السيرش والـ Category معاً
  const filteredSports = sports.filter((sport) => {
    const matchesSearch = sport.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = selectedCategory
      ? sport.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    // COLOR: الخلفية العامة للتطبيق (بياض مائل للموف خفيف جداً كيف فالتصميم)
    <View style={styles.container}>
      {/* FlatList كتحكم ف كولشي باش يكون الـ Scroll ناضي */}
      <FlatList
        data={filteredSports}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // هادي لي كتخليهم يطلو 2 كارتات ف السطر
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        // Header ديال الصفحة (عوض ما نديروه بوحدو باش ما يخسرش السكرول)
        ListHeaderComponent={
          <View>
            {/* Header Titles */}
            <Text style={styles.welcomeText}>Hello User Name 👋</Text>
            <Text style={styles.mainTitle}>Discover Your Next Passion</Text>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              {/* COLOR: لون أيقونة البحث */}
              <FontAwesome
                name="search"
                size={18}
                color="#9CA3AF"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for..."
                placeholderTextColor="#9CA3AF"
                value={search}
                onChangeText={setSearch}
              />
            </View>

            {/* Category Filter Component */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </View>
        }
        // ايلى كانت الداتا كتحمل (Loading)
        ListEmptyComponent={
          loading ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" color="#4A154B" />
            </View>
          ) : error ? (
            <View style={styles.center}>
              <Text style={styles.errorText}>Error: {error}</Text>
            </View>
          ) : (
            <View style={styles.center}>
              <Text style={styles.emptyText}>No sports found</Text>
            </View>
          )
        }
        // رندر ديال البطاقات
        renderItem={({ item, index }) => (
          <SportCard sport={item} index={index} />
        )}
        // Pull to Refresh
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#4A154B"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // COLOR: خلفية الصفحة الرئيسية
    backgroundColor: "#F8F6FA",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 100, // مساحة للـ bottom bar لي لتحت
  },
  row: {
    justifyContent: "space-between", // كتخلي الفراغ بين الكارتات متساوي
  },
  welcomeText: {
    fontSize: 16,
    // COLOR: لون نص الترحيب
    color: "#6B7280",
    marginBottom: 4,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    // COLOR: لون العنوان الرئيسي
    color: "#111827",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    // COLOR: خلفية خانة البحث البيضاء
    backgroundColor: "#FFF",
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 14,
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 14,
  },
});
