import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Stack
import AuthStack from './AuthStack';

// Drawer Navigator
import AppDrawerNavigator from './AppDrawerNavigator';

// Loading Screen
import Loading from '../screens/Loading';

const Navigator = () => (
  <NavigationContainer initialState="Loading">
    <Loading />
    <AuthStack />
    <AppDrawerNavigator />
  </NavigationContainer>
);

export default Navigator;
