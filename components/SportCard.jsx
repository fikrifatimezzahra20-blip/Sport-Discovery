// import { FontAwesome } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import {
//   Dimensions,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Animated, { FadeInDown } from "react-native-reanimated";

// const { width } = Dimensions.get("window");

// export default function SportCard({ sport, index }) {
//   const router = useRouter();

//   return (
//     <Animated.View
//       entering={FadeInDown.delay(index * 100).springify()}
//       style={styles.cardContainer}
//     >
//       <TouchableOpacity
//         style={styles.card}
//         activeOpacity={0.9}
//         onPress={() => router.push(`/sport/${sport.id}`)}
//       >
//         {/* Image Section */}
//         <View style={styles.imageContainer}>
//           <Image source={{ uri: sport.image }} style={styles.image} />

//           {/* Heart Button Overlay (بلاصة كود Person B) */}
//           <TouchableOpacity style={styles.heartButton}>
//             {/* COLOR: لون القلب الوردي لي فالتصميم */}
//             <FontAwesome name="heart" size={16} color="#FF66B2" />
//           </TouchableOpacity>
//         </View>

//         {/* Content Section */}
//         <View style={styles.infoContainer}>
//           <Text style={styles.title}>{sport.name}</Text>

//           {/* Category Badge */}
//           <View style={styles.badge}>
//             <Text style={styles.badgeText}>{sport.category}</Text>
//           </View>

//           <Text style={styles.description} numberOfLines={2}>
//             {sport.description}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   cardContainer: {
//     width: (width - 52) / 2, // كيحسب العرض التلقائي باش يجي 2 كارتات ف السطر مقادين
//     marginBottom: 16,
//   },
//   card: {
//     // COLOR: خلفية الكارت بيضاء
//     backgroundColor: "#FFF",
//     borderRadius: 18,
//     overflow: "hidden",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//   },
//   imageContainer: {
//     position: "relative",
//     width: "100%",
//     height: 110,
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   heartButton: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//     // COLOR: خلفية دائرية رمادية شفافة للقلب
//     backgroundColor: "rgba(255, 255, 255, 0.7)",
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   infoContainer: {
//     padding: 12,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//     // COLOR: لون عنوان الرياضة (إما أسود أو كحلي غامق)
//     color: "#111827",
//     textTransform: "uppercase",
//   },
//   badge: {
//     // COLOR: خلفية الـ Badge (وردي/موف فاتح كيف فالتصميم)
//     backgroundColor: "#EAA2DC",
//     alignSelf: "flex-start",
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 10,
//     marginTop: 4,
//     marginBottom: 6,
//   },
//   badgeText: {
//     // COLOR: لون كتابة الـ Badge
//     color: "#FFF",
//     fontSize: 11,
//     fontWeight: "bold",
//   },
//   description: {
//     fontSize: 12,
//     // COLOR: لون الوصف (رمادي)
//     color: "#6B7280",
//     lineHeight: 16,
//   },
// });

// -----------------------I am the person in charge of the front end  Person A-----------------------------

// import { useRouter } from "expo-router";
// import { Heart } from "lucide-react-native";
// import React, { useEffect } from "react";
// import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withDelay,
//   withTiming,
// } from "react-native-reanimated";
// // import useFavoritesStore from "../store/favoritesStore";import useFavoritesStore from "../store/favoritesStore";

// import { useFavoritesStore } from "../store/favoritesStore"; // 👈 زيد ليها الأقواس هنا تاهي
// ======================
import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

// سطر واحد فقط ونقي وبالأقواس
import { useFavoritesStore } from "../store/favoritesStore"; // 👈 بلا أقواس تما حتى هو
export default function SportCard({ sport, index }) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isFav = isFavorite(sport.id);

  // 🎬 قيم الأنيميشن لظهور الكارت
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    // 💡 تأثير التتابع (Stagger effect): كل كارت غتتعطل شوية على حسب الـ index ديالها باش يطلعو متابعين
    opacity.value = withDelay(index * 100, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(index * 100, withTiming(0, { duration: 500 }));
  }, []);

  return (
    <Animated.View style={[styles.cardContainer, animatedStyle]}>
      <TouchableOpacity
        style={styles.cardInner}
        onPress={() => router.push(`/sport/${sport.id}`)}
        activeOpacity={0.9}
      >
        {/* صورة الرياضة اللي جاية من الـ API */}
        <Image source={{ uri: sport.image }} style={styles.image} />

        {/* معلومات الرياضة أسفل الصورة */}
        <View style={styles.infoContainer}>
          <View style={styles.textColumn}>
            <Text style={styles.category}>{sport.category?.toUpperCase()}</Text>
            <Text style={styles.name}>{sport.name?.toUpperCase()}</Text>
          </View>

          {/* زر القلب السريع المرتبط بالـ Store ديال Person B */}
          <TouchableOpacity
            style={styles.heartIconCircle}
            onPress={(e) => {
              e.stopPropagation(); // باش فاش يضغط على القلب ما يديهش لصفحة التفاصيل
              toggleFavorite(sport.id);
            }}
          >
            <Heart
              size={18}
              color={isFav ? "#FF69B4" : "#4A154B"}
              fill={isFav ? "#FF69B4" : "transparent"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  cardInner: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#F3EFFB",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  textColumn: {
    flex: 1,
  },
  category: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4A154B", // الحفاظ على اللون البنفسجي ديال البروجي
    letterSpacing: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A1A24",
    marginTop: 4,
  },
  heartIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F3EFFB",
    justifyContent: "center",
    alignItems: "center",
  },
});
