import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// User Context Provider
import {UserProvider} from '../context/userContext';
// Stack
import AuthStack from './AuthStack';

// Drawer Navigator
import AppStack from './AppStack';
import AdminStack from './AdminStack';
// Loading Screen
import Loading from '../screens/Loading';
//creating Main Stack
const MainStack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <UserProvider>
      <MainStack.Navigator initialRouteName="Loading" headerMode="none">
        <MainStack.Screen name="Loading" component={Loading} />
        <MainStack.Screen name="Auth" component={AuthStack} />
        <MainStack.Screen name="App" component={AppStack} />
        <MainStack.Screen name="Admin" component={AdminStack} />
      </MainStack.Navigator>
    </UserProvider>
  </NavigationContainer>
);

export default AppNavigator;
