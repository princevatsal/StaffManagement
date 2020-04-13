import React from 'react';
import {Text, View, StyleSheet,Button} from 'react-native';
import firebase from 'firebase'
const Home = () => (
  <View styles={styles.container}>
    <Text>HomeScreen</Text>
    <Button onPress={()=>{firebase.auth().signOut()}} title="Sign out"/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
