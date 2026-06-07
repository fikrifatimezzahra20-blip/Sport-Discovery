// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import { Flame, Search, Trophy } from "lucide-react-native";
// import { useEffect, useState } from "react";
// import {
//   FlatList,
//   Image,
//   RefreshControl,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Loading from "../../components/Loading";
// import useSportsStore from "../../store/sportsStore";

// export default function HomeScreen() {
//   const router = useRouter();
//   const { sports, loading, error, loadSports } = useSportsStore();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     loadSports();
//   }, [loadSports]);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadSports();
//     setRefreshing(false);
//   };

//   const filteredSports =
//     sports?.filter((sport) => {
//       const matchesSearch = sport?.name
//         ?.toLowerCase()
//         .includes(searchQuery.toLowerCase());

//       const categoryLower = sport?.category?.toLowerCase() || "";
//       const matchesCategory =
//         selectedCategory === "All" ||
//         (selectedCategory === "Team" &&
//           (categoryLower === "collectif" || categoryLower === "team")) ||
//         (selectedCategory === "Individual" &&
//           (categoryLower === "individuel" || categoryLower === "individual"));

//       return matchesSearch && matchesCategory;
//     }) || [];

//   if (loading && !refreshing) {
//     return <Loading />;
//   }

//   if (error) {
//     return (
//       <>
//         <View style={styles.centerContainer}>
//           <Text style={styles.errorText}>Error: {error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={loadSports}>
//             <Text style={styles.retryButtonText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       </>
//     );
//   }

//   return (
//     <LinearGradient
//       colors={["#6b0984", "#bb90d4"]}
//       locations={[0.09, 0.64]}
//       style={styles.container}
//     >
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <View style={styles.logoContainer}>
//             <Flame color="#FF4500" size={28} fill="#FF4500" />
//             <Text style={styles.headerTitle}>Sport Discovery</Text>
//           </View>
//           <Text style={styles.headerSubtitle}>
//             Find your passion, start moving today!
//           </Text>
//         </View>

//         <View style={styles.searchSection}>
//           <Search color="#8E8E93" size={20} style={styles.searchIcon} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search your favorite sport..."
//             placeholderTextColor="#8E8E93"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//         </View>

//         <View style={styles.categoryContainer}>
//           {["All", "Team", "Individual"].map((category) => (
//             <TouchableOpacity
//               key={category}
//               style={[
//                 styles.categoryButton,
//                 selectedCategory === category && styles.categoryButtonActive,
//               ]}
//               onPress={() => setSelectedCategory(category)}
//             >
//               <Text
//                 style={[
//                   styles.categoryButtonText,
//                   selectedCategory === category &&
//                     styles.categoryButtonTextActive,
//                 ]}
//               >
//                 {category}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <FlatList
//           data={filteredSports}
//           // إصلاح مشكل keyExtractor بزيادة حماية الـ index
//           keyExtractor={(item, index) =>
//             item?.id?.toString() || index.toString()
//           }
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.listContent}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={["#FF4500"]}
//             />
//           }
//           ListEmptyComponent={
//             <View style={styles.emptyContainer}>
//               <Trophy size={48} color="#D1D5DB" />
//               <Text style={styles.emptyText}>
//                 No sports match your criteria.
//               </Text>
//             </View>
//           }
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.sportCard}
//               onPress={() => router.push(`/sport/${item.id}`)}
//               activeOpacity={0.95}
//             >
//               {item?.image && (
//                 <Image source={{ uri: item.image }} style={styles.cardImage} />
//               )}
//               <View style={styles.cardContent}>
//                 <View style={styles.cardHeaderRow}>
//                   <Text style={styles.cardTitle}>
//                     {item?.name?.toUpperCase()}
//                   </Text>
//                   <View style={styles.badge}>
//                     <Text style={styles.badgeText}>
//                       {item?.category || "Sport"}
//                     </Text>
//                   </View>
//                 </View>
//                 <Text style={styles.cardDescription} numberOfLines={2}>
//                   {item?.description || item?.shortDescription}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 60,
//     paddingHorizontal: 20,
//   },
//   header: { marginBottom: 20 },
//   logoContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
//   headerTitle: { fontSize: 26, fontWeight: "800", color: "#1A1A24" },
//   headerSubtitle: { fontSize: 14, color: "#6C757D", marginTop: 4 },
//   searchSection: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFF",
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#EAEAEA",
//     marginBottom: 20,
//   },
//   searchIcon: { marginRight: 10 },
//   searchInput: { flex: 1, fontSize: 15, color: "#1A1A24" },
//   categoryContainer: { flexDirection: "row", gap: 10, marginBottom: 20 },
//   categoryButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 20,
//     backgroundColor: "#EFF0F6",
//   },
//   categoryButtonActive: { backgroundColor: "#1A1A3A" },
//   categoryButtonText: { fontSize: 14, fontWeight: "600", color: "#6C757D" },
//   categoryButtonTextActive: { color: "#FFF" },
//   listContent: { paddingBottom: 30 },
//   sportCard: {
//     backgroundColor: "#FFF",
//     borderRadius: 24,
//     overflow: "hidden",
//     marginBottom: 16,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.06,
//     shadowRadius: 10,
//   },
//   cardImage: { width: "100%", height: 160, resizeMode: "cover" },
//   cardContent: { padding: 16 },
//   cardHeaderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   cardTitle: { fontSize: 18, fontWeight: "700", color: "#1A1A24" },
//   badge: {
//     backgroundColor: "#F3E8FF",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 10,
//   },
//   badgeText: {
//     color: "#4A148C",
//     fontSize: 11,
//     fontWeight: "700",
//     textTransform: "uppercase",
//   },
//   cardDescription: { fontSize: 13, color: "#666", lineHeight: 18 },
//   centerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   errorText: {
//     fontSize: 16,
//     color: "#DC3545",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   retryButton: {
//     backgroundColor: "#1A1A3A",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 10,
//   },
//   retryButtonText: { color: "#FFF", fontWeight: "600" },
//   emptyContainer: { alignItems: "center", marginTop: 40, gap: 12 },
//   emptyText: { color: "#6C757D", fontSize: 14 },
// });
// ==========================================================

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// استيراد الأيقونات الآمنة والموجودة ف كاع النسخ ديال lucide ف الويب والهاتف
import {
  Activity,
  Award,
  Flame,
  Search,
  Sliders,
  Target,
  Trophy,
} from "lucide-react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Loading from "../../components/Loading";
import useSportsStore from "../../store/sportsStore";

// هاد المكون خاص بالبنر الفوقاني وكيخليه يتفاعل مع الماوس (Hover Effect) ف الويب
const InteractiveBanner = () => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View
      style={[animatedStyle]}
      // فاش يدوز الماوس (ف الويب) البنر غيكبر شوية بشكل مرن
      onPointerEnter={() => {
        scale.value = withSpring(1.03);
      }}
      // فاش يخرج الماوس كيرجع للحجم الطبيعي
      onPointerLeave={() => {
        scale.value = withSpring(1);
      }}
    >
      <LinearGradient
        colors={["#FF2E93", "#FF8A00", "#FF2E93"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bannerContainer}
      >
        <View style={styles.bannerLeft}>
          <Text style={styles.bannerTag}>GAME ON.</Text>
          <Text style={styles.bannerTag}>GEAR UP.</Text>
          <Text style={styles.bannerTagBold}>PERFORM.</Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Explore</Text>
          </TouchableOpacity>
        </View>
        {/* صورة اللاعب اللي ف البنر */}
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=500",
          }}
          style={styles.bannerImage}
        />
      </LinearGradient>
    </Animated.View>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  // الربط مع الـ store ديال Person B بلا ما نخسروه
  const { sports, loading, error, loadSports } = useSportsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSports();
  }, [loadSports]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSports();
    setRefreshing(false);
  };

  // الفلترة ديال الصفحات بناء على الكاتيكوري والبحث
  const filteredSports =
    sports?.filter((sport) => {
      const matchesSearch = sport?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const categoryLower = sport?.category?.toLowerCase() || "";
      const matchesCategory =
        selectedCategory === "All" ||
        (selectedCategory === "Team" &&
          (categoryLower === "collectif" || categoryLower === "team")) ||
        (selectedCategory === "Individual" &&
          (categoryLower === "individuel" || categoryLower === "individual"));
      return matchesSearch && matchesCategory;
    }) || [];

  if (loading && !refreshing) {
    return <Loading />;
  }

  // مصفوفة الأيقونات المصلحة والآمنة للربط والضغط 100% بلا أخطاء
  const circularCategories = [
    { id: "1", name: "Football", icon: Target },
    { id: "2", name: "Basketball", icon: Flame },
    { id: "3", name: "Tennis", icon: Award },
    { id: "4", name: "Swimming", icon: Activity },
    { id: "5", name: "Running", icon: Trophy },
  ];

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#FF2E93"]}
          />
        }
      >
        {/* شريط البحث الاحترافي مع الفلتر */}
        <View style={styles.searchContainer}>
          <Search color="#8E8E93" size={18} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for sports"
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Sliders color="#FFF" size={18} />
        </View>

        {/* العنوان الرئيسي EXPLORE */}
        <Text style={styles.mainTitle}>EXPLORE</Text>

        {/* الكاتيكوري الفوقانية */}
        <View style={styles.tabContainer}>
          {["All", "Team", "Individual", "Water", "Endurance"].map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={styles.tabButton}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedCategory === cat && styles.tabActiveText,
                ]}
              >
                {cat}
              </Text>
              {selectedCategory === cat && <View style={styles.activeDot} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* البنر المتفاعل مع الـ Hover */}
        <InteractiveBanner />

        {/* قسم الأيقونات الدائرية للرياضات */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SPORTS</Text>
          <Text style={styles.viewAllText}>View all</Text>
        </View>

        {/* لستة الأيقونات الدائرية بحال التصميم */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.circularList}
        >
          {circularCategories.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.circularItem}
                // الربط بالصفحة: فاش يضغط كيديه لصفحة الرياضة المعنية عبر الـ router
                onPress={() => router.push(`/sport/${item.id}`)}
              >
                <View style={styles.circleIconContainer}>
                  <IconComponent color="#FFF" size={24} />
                </View>
                <Text style={styles.circleLabel}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* الكروت النيون التحتانية */}
        <View style={styles.gridContainer}>
          {filteredSports.map((item, index) => (
            <TouchableOpacity
              key={item?.id?.toString() || index.toString()}
              style={styles.neonCard}
              onPress={() => router.push(`/sport/${item.id}`)}
              activeOpacity={0.9}
            >
              {/* إطار نيون وردي مشع بحال التصميم */}
              <View style={styles.neonWrapper}>
                <Image
                  source={{
                    uri:
                      item.image ||
                      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=300",
                  }}
                  style={styles.cardImage}
                />
              </View>
              <Text style={styles.cardTitle}>{item?.name?.toUpperCase()}</Text>
              <Text style={styles.cardSub}>
                {item?.category || "Game Gear"}
              </Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardPrice}>$129.00</Text>
                <Text style={styles.cardRating}>★ 4.8</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>Error: {error}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#000000", // خلفية سوداء فخمة 100% بحال التصميم بالظبط
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 20,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: "#FFF", fontSize: 15 },
  mainTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 1,
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tabButton: { alignItems: "center" },
  tabText: { color: "#666", fontSize: 14, fontWeight: "600" },
  tabActiveText: { color: "#FFF" },
  activeDot: {
    width: 15,
    height: 2,
    backgroundColor: "#FFF",
    marginTop: 4,
  },
  bannerContainer: {
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 160,
    overflow: "hidden",
    marginBottom: 25,
  },
  bannerLeft: { flex: 1, justifyContent: "center" },
  bannerTag: { color: "#FFF", fontSize: 22, fontWeight: "700", lineHeight: 26 },
  bannerTagBold: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 28,
  },
  bannerButton: {
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  bannerButtonText: { color: "#000", fontWeight: "700", fontSize: 12 },
  bannerImage: { width: 140, height: 140, resizeMode: "contain" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: { color: "#FFF", fontSize: 18, fontWeight: "800" },
  viewAllText: { color: "#FF2E93", fontSize: 13, fontWeight: "600" },
  circularList: { flexDirection: "row", marginBottom: 25 },
  circularItem: { alignItems: "center", marginRight: 20 },
  circleIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  circleLabel: { color: "#8E8E93", fontSize: 12, fontWeight: "500" },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  neonCard: {
    width: "48%",
    backgroundColor: "#0B0B0C",
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
  },
  neonWrapper: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FF2E93", // تأثير النيون الوردي المشع
    shadowColor: "#FF2E93",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  cardImage: { width: "100%", height: 120, resizeMode: "cover" },
  cardTitle: { color: "#FFF", fontSize: 14, fontWeight: "800" },
  cardSub: { color: "#666", fontSize: 11, marginTop: 2 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  cardPrice: { color: "#FFF", fontSize: 14, fontWeight: "700" },
  cardRating: { color: "#FF8A00", fontSize: 12, fontWeight: "600" },
  errorBox: {
    padding: 10,
    backgroundColor: "#300",
    borderRadius: 10,
    marginTop: 10,
  },
  errorText: { color: "#F00", textAlign: "center" },
});
