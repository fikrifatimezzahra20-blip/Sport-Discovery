// // import { useEffect } from "react";
// // import { ActivityIndicator, FlatList, Text, View, } from "react-native";

// // import { useSportsStore } from "../store/sportsStore";

// // export default function Home() {
// //   const {sports,loading,error,loadSports,} = useSportsStore();

// //   useEffect(() => {
// //     loadSports();
// //   }, [loadSports]);

// //   if (loading) {
// //     return (
// //       <View
// //         style={{
// //           flex: 1,
// //           justifyContent: "center",
// //           alignItems: "center",
// //         }}
// //       >
// //         <ActivityIndicator size="large" />
// //         <Text>Loading sports...</Text>
// //       </View>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <View>
// //         <Text>{error}</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <FlatList
// //       data={sports}
// //       keyExtractor={(item) => item.id}
// //       renderItem={({ item }) => (
// //         <View
// //           style={{
// //             padding: 20,
// //             margin: 10,
// //             borderWidth: 1,
// //             borderRadius: 20,
// //           }}
// //         >
// //           <Text>{item.name}</Text>
// //           <Text>{item.category}</Text>
// //           <Text>
// //             {item.shortDescription}
// //           </Text>
// //         </View>
// //       )}
// //     />
// //   );
// // }
// import { useEffect } from "react";
// import { Text, View } from "react-native";
// import { fetchSports } from "../services/api";

// export default function HomeScreen() {
//   useEffect(() => {
//     fetchSports()
//       .then((data) => console.log("✅ Sports loaded:", data))
//       .catch((err) => console.log("❌ Error:", err));
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Sports App 🏆</Text>
//     </View>
//   );
// }

//

// ==================================================================

import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- Data ---
const TRENDING_SPORTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500",
    title: "Trending sports",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500",
    title: "Trending sports",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519315901367-f34f11ce3c1c?w=500",
    title: "Trending sports",
  },
];

const CATEGORIES = [
  { id: 1, name: "Football", icon: "soccer-ball-o", type: "font-awesome" },
  { id: 2, name: "Basketball", icon: "basketball-ball", type: "font-awesome" },
  { id: 3, name: "Tennis", icon: "tennisball", type: "ionicons" },
  { id: 4, name: "Trending", icon: "running", type: "font-awesome" },
  { id: 5, name: "Cycling", icon: "bicycle", type: "font-awesome" },
  { id: 6, name: "Swimming", icon: "swimmer", type: "font-awesome" },
];

export default function Home() {
  return (
    <LinearGradient
      colors={["#FDFBFB", "#C9A7EB", "#4A154B"]}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.mainTitle}>Discover now</Text>
            <Text style={styles.mainTitle}>sports</Text>
            <Text style={styles.subTitle}>Trending sports</Text>
          </View>
          {/* حطينا بلاصتها صورة تقريبية للتينيس */}
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3254/3254060.png",
            }}
            style={styles.headerImage}
          />
        </View>

        {/* Trending Sports Section */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.trendingContainer}
        >
          {TRENDING_SPORTS.map((item) => (
            <ImageBackground
              key={item.id}
              source={{ uri: item.image }}
              style={styles.trendingCard}
              imageStyle={{ borderRadius: 15 }}
            >
              <Text style={styles.trendingText}>{item.title}</Text>
            </ImageBackground>
          ))}
        </ScrollView>

        {/* Categories Section */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {CATEGORIES.map((cat) => (
            <View key={cat.id} style={styles.categoryItem}>
              <TouchableOpacity style={styles.categoryCircle}>
                <FontAwesome5 name={cat.icon} size={24} color="#D4FF2A" />
              </TouchableOpacity>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Featured Sport of the Day 1 */}
        <View style={styles.featuredCard}>
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle}>Featured Sport of the day</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Deals</Text>
            </View>
            <View style={styles.smallImagesRow}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1518605368461-1e12d537dbb0?w=200",
                }}
                style={styles.smallImg}
              />
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1516731415730-0c607149933a?w=200",
                }}
                style={styles.smallImg}
              />
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200",
                }}
                style={styles.smallImg}
              />
            </View>
          </View>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3048/3048386.png",
            }}
            style={styles.featuredIllustration}
          />
        </View>

        {/* Featured Sport of the Day 2 */}
        <View style={styles.featuredCard}>
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle}>Featured Sport of the day</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Deals</Text>
            </View>
            <View style={styles.smallImagesRow}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200",
                }}
                style={styles.smallImg}
              />
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200",
                }}
                style={styles.smallImg}
              />
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200",
                }}
                style={styles.smallImg}
              />
            </View>
          </View>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3048/3048386.png",
            }}
            style={styles.featuredIllustration}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 100, // باش يبقا سباس للـ Bottom Bar
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "900",
    fontStyle: "italic",
    color: "#000",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    color: "#000",
  },
  headerImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  trendingContainer: {
    flexDirection: "row",
    marginBottom: 25,
  },
  trendingCard: {
    width: 110,
    height: 110,
    marginRight: 10,
    justifyContent: "flex-end",
    padding: 8,
  },
  trendingText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#3B185F",
    marginBottom: 15,
  },
  categoriesContainer: {
    flexDirection: "row",
    marginBottom: 25,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 15,
  },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4A154B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    borderWidth: 2,
    borderColor: "#7A3B8C",
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3B185F",
  },
  featuredCard: {
    backgroundColor: "#6C3E9A",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  featuredContent: {
    flex: 1,
    zIndex: 2,
  },
  featuredTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  badge: {
    backgroundColor: "#D4FF2A",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    marginBottom: 15,
  },
  badgeText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
  },
  smallImagesRow: {
    flexDirection: "row",
    gap: 8,
  },
  smallImg: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  featuredIllustration: {
    width: 120,
    height: 140,
    position: "absolute",
    right: -10,
    bottom: -10,
    resizeMode: "contain",
    zIndex: 1,
    opacity: 0.8,
  },
});
