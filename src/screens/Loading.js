import React, {useEffect, useContext} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import firebase from 'firebase';

// Custom Firebase Connections
import Fire from '../Fire';

// Global User Context
import {UserContext} from '../context/userContext';

const Loading = ({navigation}) => {
  const {setGlobalUid, setGlobalUser} = useContext(UserContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Set User Id to Global
        setGlobalUid(user.uid);

        // FIND NAME OF USER
        Fire.shared
          .getUserData(user.uid)
          .then(userData => {
            console.log(userData);
            if (!userData) {
              navigation.navigate('Auth', {screen: 'UserInfo', uid: user.uid});
              return null;
            }
            if (userData.isAdmin) {
              navigation.navigate('App', {screen: 'Admin'});
            } else if (userData.credentials.name) {
              setGlobalUser(userData);
              navigation.navigate('App', {screen: 'Home'});
            } else {
              navigation.navigate('Auth', {screen: 'UserInfo'});
            }
          })
          .catch(err => console.log(err)); // TODO : MAKE CHANGES
      } else {
        navigation.navigate('Auth');
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
