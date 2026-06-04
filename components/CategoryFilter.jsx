import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <View style={styles.container}>
      {/* Button 1: Collectif */}
      <TouchableOpacity
        style={[
          styles.button,
          // COLOR: هنا كيتغير اللون يلا كان الزر نشط (Active)
          selectedCategory === "Collectif"
            ? styles.activeButton
            : styles.inactiveButton,
        ]}
        onPress={() =>
          setSelectedCategory(
            selectedCategory === "Collectif" ? null : "Collectif",
          )
        }
      >
        <FontAwesome5
          name="users"
          size={18}
          // COLOR: لون الأيقونة على حساب واش نشط أولا
          color={selectedCategory === "Collectif" ? "#FFF" : "#4A154B"}
        />
        <Text
          style={[
            styles.buttonText,
            // COLOR: لون النص على حساب واش نشط أولا
            selectedCategory === "Collectif"
              ? styles.activeText
              : styles.inactiveText,
          ]}
        >
          Collectif
        </Text>
      </TouchableOpacity>

      {/* Button 2: Individuel */}
      <TouchableOpacity
        style={[
          styles.button,
          // COLOR: هنا كيتغير اللون يلا كان الزر نشط (Active)
          selectedCategory === "Individuel"
            ? styles.activeButton
            : styles.inactiveButton,
        ]}
        onPress={() =>
          setSelectedCategory(
            selectedCategory === "Individuel" ? null : "Individuel",
          )
        }
      >
        <FontAwesome5
          name="user"
          size={18}
          // COLOR: لون الأيقونة
          color={selectedCategory === "Individuel" ? "#FFF" : "#4A154B"}
        />
        <Text
          style={[
            styles.buttonText,
            // COLOR: لون النص
            selectedCategory === "Individuel"
              ? styles.activeText
              : styles.inactiveText,
          ]}
        >
          Individuel
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    height: 45,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  // COLOR: خلفية الزر النشط (Active) - بنفسجي مغلوق كيف فالتصميم
  activeButton: {
    backgroundColor: "#4A154B",
  },
  // COLOR: خلفية الزر غير النشط (Inactive) - بنفسجي فاتح خفيف
  inactiveButton: {
    backgroundColor: "#F3EFFB",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  // COLOR: لون نص الزر النشط
  activeText: {
    color: "#FFF",
  },
  // COLOR: لون نص الزر غير النشط
  inactiveText: {
    color: "#4A154B",
  },
});
