import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const Auth = createStackNavigator();

const AuthStack = () => (
  <Auth.Navigator headerMode="none">
    <Auth.Screen name="Login" component={Login} />
    <Auth.Screen name="Signup" component={Signup} />
  </Auth.Navigator>
);

export default AuthStack;
