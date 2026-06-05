// import { FontAwesome } from "@expo/vector-icons";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   RefreshControl,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import CategoryFilter from "../components/CategoryFilter";
// import SportCard from "../components/SportCard";
// // import useSportsStore from "../store/sportsStore";
// import { useSportsStore } from "../store/sportsStore";

// export default function Home() {
//   // كنعيطو على الداتا والوجيك لي صاوب Person B ف الـ Store
//   const { sports, loading, error, loadSports } = useSportsStore();

//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     loadSports();
//   }, []);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadSports();
//     setRefreshing(false);
//   };

//   // لـ Logic ديال الفلترة ب السيرش والـ Category معاً
//   const filteredSports = sports.filter((sport) => {
//     const matchesSearch = sport.name
//       .toLowerCase()
//       .includes(search.toLowerCase());
//     const matchesCategory = selectedCategory
//       ? sport.category === selectedCategory
//       : true;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     // COLOR: الخلفية العامة للتطبيق (بياض مائل للموف خفيف جداً كيف فالتصميم)
//     <View style={styles.container}>
//       {/* FlatList كتحكم ف كولشي باش يكون الـ Scroll ناضي */}
//       <FlatList
//         data={filteredSports}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={2} // هادي لي كتخليهم يطلو 2 كارتات ف السطر
//         columnWrapperStyle={styles.row}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//         // Header ديال الصفحة (عوض ما نديروه بوحدو باش ما يخسرش السكرول)
//         ListHeaderComponent={
//           <View>
//             {/* Header Titles */}
//             <Text style={styles.welcomeText}>Hello User Name 👋</Text>
//             <Text style={styles.mainTitle}>Discover Your Next Passion</Text>

//             {/* Search Bar */}
//             <View style={styles.searchContainer}>
//               {/* COLOR: لون أيقونة البحث */}
//               <FontAwesome
//                 name="search"
//                 size={18}
//                 color="#9CA3AF"
//                 style={styles.searchIcon}
//               />
//               <TextInput
//                 style={styles.searchInput}
//                 placeholder="Search for..."
//                 placeholderTextColor="#9CA3AF"
//                 value={search}
//                 onChangeText={setSearch}
//               />
//             </View>

//             {/* Category Filter Component */}
//             <CategoryFilter
//               selectedCategory={selectedCategory}
//               setSelectedCategory={setSelectedCategory}
//             />
//           </View>
//         }
//         // ايلى كانت الداتا كتحمل (Loading)
//         ListEmptyComponent={
//           loading ? (
//             <View style={styles.center}>
//               <ActivityIndicator size="large" color="#4A154B" />
//             </View>
//           ) : error ? (
//             <View style={styles.center}>
//               <Text style={styles.errorText}>Error: {error}</Text>
//             </View>
//           ) : (
//             <View style={styles.center}>
//               <Text style={styles.emptyText}>No sports found</Text>
//             </View>
//           )
//         }
//         // رندر ديال البطاقات
//         renderItem={({ item, index }) => (
//           <SportCard sport={item} index={index} />
//         )}
//         // Pull to Refresh
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             tintColor="#4A154B"
//           />
//         }
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // COLOR: خلفية الصفحة الرئيسية
//     backgroundColor: "#F8F6FA",
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingTop: 60,
//     paddingBottom: 100, // مساحة للـ bottom bar لي لتحت
//   },
//   row: {
//     justifyContent: "space-between", // كتخلي الفراغ بين الكارتات متساوي
//   },
//   welcomeText: {
//     fontSize: 16,
//     // COLOR: لون نص الترحيب
//     color: "#6B7280",
//     marginBottom: 4,
//   },
//   mainTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     // COLOR: لون العنوان الرئيسي
//     color: "#111827",
//     marginBottom: 20,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     // COLOR: خلفية خانة البحث البيضاء
//     backgroundColor: "#FFF",
//     borderRadius: 25,
//     height: 50,
//     paddingHorizontal: 16,
//     marginBottom: 20,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 17,
//     color: "#111827",
//   },
//   center: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 41,
//   },
//   emptyText: {
//     color: "#6B7280",
//     fontSize: 15,
//   },
//   errorText: {
//     color: "#DC2626",
//     fontSize: 15,
//   },
// });

// -----------------------I am the person in charge of the front end  Person A-----------------------------

import { Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CategoryFilter from "../components/CategoryFilter";
import Loading from "../components/Loading";
import SportCard from "../components/SportCard";

// import useFavoritesStore from "../store/favoritesStore";
// // import useSportsStore from "../store/sportsStore";
// import { useSportsStore } from "../store/sportsStore"; // 👈 زدنا الأقواس هنا

// import { useSportsStore } from '../store/sportsStore';    // 👈 بالأقواس
// import { useFavoritesStore } from '../store/favoritesStore'; // 👈 زيد ليها الأقواس دابا
// =========================================
import useFavoritesStore from "../store/favoritesStore"; // 👈 هادي حيد ليها الأقواس بصفة نهائية
import { useSportsStore } from "../store/sportsStore"; // 👈 هادي بالأقواس (صحية)

// الـ Imports النقيين بجوج بالأقواس

export default function HomeScreen() {
  // جلب البيانات والوظائف من الـ Stores لي قاد صاحبك (Person B)
  const { sports, loading, error, loadSports } = useSportsStore();
  const { loadFavorites } = useFavoritesStore();

  // الحالات (States) الخاصة بالبحث والفلترة
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  // تحميل البيانات والـ Favorites غير كتحل الشاشة
  useEffect(() => {
    loadSports();
    loadFavorites();
  }, []);

  // دالة التحديث عند سحب الشاشة (Pull-to-refresh)
  const onRefresh = async () => {
    setRefreshing(true);
    await loadSports();
    setRefreshing(false);
  };

  // تصفية الرياضات ديناميكياً على حساب شنو كتب المستخدم فالبحث وشنو اختار فالفلتر
  const filteredSports = sports.filter((sport) => {
    const matchesSearch = sport.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      sport.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // إذا كانت البيانات كتحمل لأول مرة، غنبينو الـ Spinner لي صاوب Person B
  if (loading && !refreshing) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hello, Discoverer 👋</Text>
        <Text style={styles.titleText}>Find Your Sport</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#4A154B" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search sports..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter Component (المكون لي دمجنا فيه كود All و الأيقونات) */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Error State - في حالة وقع مشكل فالـ API */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Sports List - القائمة الذكية */}
      <FlatList
        data={filteredSports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <SportCard sport={item} index={index} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4A154B"]}
            tintColor="#4A154B"
          />
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No sports found matching your criteria.
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8E9FF", // لون الخلفية البنفسجي الفاتح المتناسق مع البروجي
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  titleText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A24",
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    paddingHorizontal: 15,
    borderRadius: 16,
    height: 50,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#1A1A24",
  },
  listContent: {
    paddingBottom: 30,
    marginTop: 10,
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    color: "#FF4500",
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: {
    color: "#666",
    fontSize: 14,
  },
});
