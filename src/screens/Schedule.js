import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Schedule = () => (
  <View style={styles.container}>
    <Text>Schedule Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Schedule;
