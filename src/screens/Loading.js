import React from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
    <Text>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
