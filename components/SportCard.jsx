import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function SportCard({ sport, index }) {
  const router = useRouter();

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      style={styles.cardContainer}
    >
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => router.push(`/sport/${sport.id}`)}
      >
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: sport.image }} style={styles.image} />

          {/* Heart Button Overlay (بلاصة كود Person B) */}
          <TouchableOpacity style={styles.heartButton}>
            {/* COLOR: لون القلب الوردي لي فالتصميم */}
            <FontAwesome name="heart" size={16} color="#FF66B2" />
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{sport.name}</Text>

          {/* Category Badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{sport.category}</Text>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {sport.description}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: (width - 52) / 2, // كيحسب العرض التلقائي باش يجي 2 كارتات ف السطر مقادين
    marginBottom: 16,
  },
  card: {
    // COLOR: خلفية الكارت بيضاء
    backgroundColor: "#FFF",
    borderRadius: 18,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 110,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    // COLOR: خلفية دائرية رمادية شفافة للقلب
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    // COLOR: لون عنوان الرياضة (إما أسود أو كحلي غامق)
    color: "#111827",
    textTransform: "uppercase",
  },
  badge: {
    // COLOR: خلفية الـ Badge (وردي/موف فاتح كيف فالتصميم)
    backgroundColor: "#EAA2DC",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 6,
  },
  badgeText: {
    // COLOR: لون كتابة الـ Badge
    color: "#FFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    // COLOR: لون الوصف (رمادي)
    color: "#6B7280",
    lineHeight: 16,
  },
});
