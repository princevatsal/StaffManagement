import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import firebase from 'firebase';

// Screens
import Loading from '../screens/Loading';

// Stacks
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const AppNavigator = () => {
  [loading, setLoading] = useState(true);
  [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(res => setUser(res));
    if (loading) setLoading(false);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
