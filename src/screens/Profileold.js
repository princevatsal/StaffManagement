import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Fire from '../Fire';

const Profile = () => (
  <View style={styles.container}>
    <Text>Profile Screen</Text>
    <Button onPress={() => Fire.shared.signOutUser()} title="Sign out" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
