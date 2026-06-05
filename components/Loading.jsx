import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF4500" /> 
      <Text style={styles.text}>Loading sports data...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4cbef', 
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: '#776c7d',
    fontWeight: '500',
  },
});

export default Loading;