import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View, } from "react-native";

import { useSportsStore } from "../store/sportsStore";

export default function Home() {
  const {sports,loading,error,loadSports,} = useSportsStore();

  useEffect(() => {
    loadSports();
  }, [loadSports]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
        <Text>Loading sports...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={sports}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={{
            padding: 20,
            margin: 10,
            borderWidth: 1,
            borderRadius: 20,
          }}
        >
          <Text>{item.name}</Text>
          <Text>{item.category}</Text>
          <Text>
            {item.shortDescription}
          </Text>
        </View>
      )}
    />
  );
}