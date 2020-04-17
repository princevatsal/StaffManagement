import React, {useEffect} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import firebase from 'firebase';

// Custom Firebase Connections
import Fire from '../Fire';

const Loading = ({navigation}) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // FIND NAME OF USER
        Fire.shared
          .getUserData(user.uid)
          .then(userData => {
            if (userData.isAdmin) {
              navigation.navigate('AppStack', {screen: 'Admin'});
            } else if (userData.credentials.name) {
              navigation.navigate('AppStack', {screen: 'Home'});
            } else {
              navigation.navigate('AuthStack', {screen: 'UserInfo'});
            }
          })
          .catch(err => console.log(err)); // TODO : MAKE CHANGES
      } else {
        navigation.navigate('AuthStack');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
