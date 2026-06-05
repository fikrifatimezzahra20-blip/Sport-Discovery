// import { FontAwesome5 } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import {
//   Image,
//   ImageBackground,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// // --- Data ---
// const TRENDING_SPORTS = [
//   {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500",
//     title: "Trending sports",
//   },
//   {
//     id: 2,
//     image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500",
//     title: "Trending sports",
//   },
//   {
//     id: 3,
//     image: "https://images.unsplash.com/photo-1519315901367-f34f11ce3c1c?w=500",
//     title: "Trending sports",
//   },
// ];

// const CATEGORIES = [
//   { id: 1, name: "Football", icon: "soccer-ball-o", type: "font-awesome" },
//   { id: 2, name: "Basketball", icon: "basketball-ball", type: "font-awesome" },
//   { id: 3, name: "Tennis", icon: "tennisball", type: "ionicons" },
//   { id: 4, name: "Trending", icon: "running", type: "font-awesome" },
//   { id: 5, name: "Cycling", icon: "bicycle", type: "font-awesome" },
//   { id: 6, name: "Swimming", icon: "swimmer", type: "font-awesome" },
// ];

// export default function Home() {
//   return (
//     <LinearGradient
//       colors={["#FDFBFB", "#C9A7EB", "#4A154B"]}
//       style={styles.container}
//     >
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* Header Section */}
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.mainTitle}>Discover now</Text>
//             <Text style={styles.mainTitle}>sports</Text>
//             <Text style={styles.subTitle}>Trending sports</Text>
//           </View>
//           {/* حطينا بلاصتها صورة تقريبية للتينيس */}
//           <Image
//             source={{
//               uri: "https://cdn-icons-png.flaticon.com/512/3254/3254060.png",
//             }}
//             style={styles.headerImage}
//           />
//         </View>

//         {/* Trending Sports Section */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.trendingContainer}
//         >
//           {TRENDING_SPORTS.map((item) => (
//             <ImageBackground
//               key={item.id}
//               source={{ uri: item.image }}
//               style={styles.trendingCard}
//               imageStyle={{ borderRadius: 15 }}
//             >
//               <Text style={styles.trendingText}>{item.title}</Text>
//             </ImageBackground>
//           ))}
//         </ScrollView>

//         {/* Categories Section */}
//         <Text style={styles.sectionTitle}>Categories</Text>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.categoriesContainer}
//         >
//           {CATEGORIES.map((cat) => (
//             <View key={cat.id} style={styles.categoryItem}>
//               <TouchableOpacity style={styles.categoryCircle}>
//                 <FontAwesome5 name={cat.icon} size={24} color="#D4FF2A" />
//               </TouchableOpacity>
//               <Text style={styles.categoryName}>{cat.name}</Text>
//             </View>
//           ))}
//         </ScrollView>

//         {/* Featured Sport of the Day 1 */}
//         <View style={styles.featuredCard}>
//           <View style={styles.featuredContent}>
//             <Text style={styles.featuredTitle}>Featured Sport of the day</Text>
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>Deals</Text>
//             </View>
//             <View style={styles.smallImagesRow}>
//               <Image
//                 source={{
//                   uri: "https://images.unsplash.com/photo-1518605368461-1e12d537dbb0?w=200",
//                 }}
//                 style={styles.smallImg}
//               />
//               <Image
//                 source={{
//                   uri: "https://images.unsplash.com/photo-1516731415730-0c607149933a?w=200",
//                 }}
//                 style={styles.smallImg}
//               />
//               <Image
//                 source={{
//                   uri: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200",
//                 }}
//                 style={styles.smallImg}
//               />
//             </View>
//           </View>
//           <Image
//             source={{
//               uri: "https://cdn-icons-png.flaticon.com/512/3048/3048386.png",
//             }}
//             style={styles.featuredIllustration}
//           />
//         </View>

//         {/* Featured Sport of the Day 2 */}
//         <View style={styles.featuredCard}>
//           <View style={styles.featuredContent}>
//             <Text style={styles.featuredTitle}>Featured Sport of the day</Text>
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>Deals</Text>
//             </View>
//             <View style={styles.smallImagesRow}>
//               <Image
//                 source={{
//                   uri: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200",
//                 }}
//                 style={styles.smallImg}
//               />
//               <Image
//                 source={{
//                   uri: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200",
//                 }}
//                 style={styles.smallImg}
//               />
//               <Image
//                 source={{
//                   uri: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200",
//                 }}
//                 style={styles.smallImg}
//               />
//             </View>
//           </View>
//           <Image
//             source={{
//               uri: "https://cdn-icons-png.flaticon.com/512/3048/3048386.png",
//             }}
//             style={styles.featuredIllustration}
//           />
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 20,
//     paddingTop: 60,
//     paddingBottom: 100, // باش يبقا سباس للـ Bottom Bar
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   mainTitle: {
//     fontSize: 32,
//     fontWeight: "900",
//     fontStyle: "italic",
//     color: "#000",
//   },
//   subTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginTop: 5,
//     color: "#000",
//   },
//   headerImage: {
//     width: 100,
//     height: 100,
//     resizeMode: "contain",
//   },
//   trendingContainer: {
//     flexDirection: "row",
//     marginBottom: 25,
//   },
//   trendingCard: {
//     width: 110,
//     height: 110,
//     marginRight: 10,
//     justifyContent: "flex-end",
//     padding: 8,
//   },
//   trendingText: {
//     color: "#FFF",
//     fontSize: 12,
//     fontWeight: "bold",
//     textShadowColor: "rgba(0, 0, 0, 0.75)",
//     textShadowOffset: { width: -1, height: 1 },
//     textShadowRadius: 10,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     fontStyle: "italic",
//     color: "#3B185F",
//     marginBottom: 15,
//   },
//   categoriesContainer: {
//     flexDirection: "row",
//     marginBottom: 25,
//   },
//   categoryItem: {
//     alignItems: "center",
//     marginRight: 15,
//   },
//   categoryCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#4A154B",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 5,
//     borderWidth: 2,
//     borderColor: "#7A3B8C",
//   },
//   categoryName: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#3B185F",
//   },
//   featuredCard: {
//     backgroundColor: "#6C3E9A",
//     borderRadius: 15,
//     padding: 15,
//     flexDirection: "row",
//     marginBottom: 20,
//     position: "relative",
//     overflow: "hidden",
//   },
//   featuredContent: {
//     flex: 1,
//     zIndex: 2,
//   },
//   featuredTitle: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "bold",
//     fontStyle: "italic",
//     marginBottom: 10,
//   },
//   badge: {
//     backgroundColor: "#D4FF2A",
//     alignSelf: "flex-start",
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 15,
//     marginBottom: 15,
//   },
//   badgeText: {
//     color: "#000",
//     fontWeight: "bold",
//     fontSize: 12,
//   },
//   smallImagesRow: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   smallImg: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//   },
//   featuredIllustration: {
//     width: 120,
//     height: 140,
//     position: "absolute",
//     right: -10,
//     bottom: -10,
//     resizeMode: "contain",
//     zIndex: 1,
//     opacity: 0.8,
//   },
// });

// -----------------------I am the person in charge of the front end  Person A-----------------------------

import { useRouter } from "expo-router";
import { ArrowRight, Compass, Flame, Star, Trophy } from "lucide-react-native";
import { useEffect } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import useSportsStore from "../store/sportsStore";

export default function DiscoverScreen() {
  const router = useRouter();
  const { sports } = useSportsStore();

  // غناخدو أول رياضة ف الـ API نديروها هي الـ Featured (مثلا Football أو اللي متوفر)
  const featuredSport = sports[0] || {
    id: "1",
    name: "Football",
    category: "Collectif",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
    description: "The most popular team sport in the world.",
  };

  // الرياضات الأخرى غنبرزها كـ Trending (من الرياضة رقم 2 لفوق)
  const trendingSports = sports.slice(1, 5);

  // 🎬 قيم الأنيميشن لظهور عناصر الشاشة
  const headerOpacity = useSharedValue(0);
  const featuredScale = useSharedValue(0.9);
  const listTranslateX = useSharedValue(100);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));
  const featuredStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ scale: featuredScale.value }],
  }));
  const listStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: listTranslateX.value }],
  }));

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 600 });
    featuredScale.value = withTiming(1, { duration: 600 });
    listTranslateX.value = withDelay(200, withTiming(0, { duration: 600 }));
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View style={[styles.header, headerStyle]}>
        <View style={styles.headerTitleRow}>
          <Compass size={28} color="#4A154B" />
          <Text style={styles.headerTitle}>Discover Sports</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Explore disciplines and find your passion
        </Text>
      </Animated.View>

      {/* Featured Sport Section */}
      <Animated.View style={[styles.featuredSection, featuredStyle]}>
        <Text style={styles.sectionTitle}>
          <Star size={18} color="#FFD700" fill="#FFD700" /> Featured Discipline
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push(`/sport/${featuredSport.id}`)}
        >
          <ImageBackground
            source={{ uri: featuredSport.image }}
            style={styles.featuredCard}
            imageStyle={{ borderRadius: 24 }}
          >
            {/* Overlay لحماية وضوح النص */}
            <View style={styles.gradientOverlay}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>
                  {featuredSport.category?.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.featuredName}>
                {featuredSport.name?.toUpperCase()}
              </Text>
              <Text style={styles.featuredDesc} numberOfLines={2}>
                {featuredSport.description}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </Animated.View>

      {/* Trending Sports Section (Horizontal Scroll) */}
      <View style={styles.trendingSection}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            <Flame size={18} color="#FF4500" fill="#FF4500" /> Trending Now
          </Text>
          <Trophy size={18} color="#4A154B" />
        </View>

        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trendingScrollContent}
          style={listStyle}
        >
          {trendingSports.map((sport) => (
            <TouchableOpacity
              key={sport.id}
              style={styles.trendingCard}
              onPress={() => router.push(`/sport/${sport.id}`)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: sport.image }}
                style={styles.trendingImage}
              />
              <View style={styles.trendingInfo}>
                <Text style={styles.trendingCategory}>{sport.category}</Text>
                <Text style={styles.trendingName}>
                  {sport.name?.toUpperCase()}
                </Text>
                <View style={styles.actionRow}>
                  <Text style={styles.viewText}>Details</Text>
                  <ArrowRight size={14} color="#4A154B" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8E9FF",
  },
  header: {
    paddingTop: 65,
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1A1A24",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
    fontWeight: "500",
  },
  featuredSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A1A24",
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  featuredCard: {
    height: 220,
    justifyContent: "flex-end",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  gradientOverlay: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: "100%",
    justifyContent: "flex-end",
  },
  tag: {
    backgroundColor: "#4A154B",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  tagText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "700",
  },
  featuredName: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "800",
  },
  featuredDesc: {
    color: "#E0E0E0",
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  trendingSection: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  trendingScrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  trendingCard: {
    width: 160,
    backgroundColor: "#FFF",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  trendingImage: {
    width: "100%",
    height: 110,
    backgroundColor: "#F3EFFB",
  },
  trendingInfo: {
    padding: 12,
  },
  trendingCategory: {
    fontSize: 10,
    fontWeight: "700",
    color: "#888",
    textTransform: "uppercase",
  },
  trendingName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1A1A24",
    marginTop: 2,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },
  viewText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4A154B",
  },
});
