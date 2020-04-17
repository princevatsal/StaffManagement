import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import UserInfo from '../screens/Userinfo';

// Authentication Stack
const Auth = createStackNavigator();

const AuthStack = ({route}) => (
  <Auth.Navigator headerMode="none">
    <Auth.Screen name="Login" component={Login} />
    <Auth.Screen name="Signup" component={Signup} />
    <Auth.Screen name="UserInfo" component={UserInfo} />
  </Auth.Navigator>
);

export default AuthStack;
