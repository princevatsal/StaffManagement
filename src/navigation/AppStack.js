import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Screens
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Admin from '../screens/Admin';
const App = createDrawerNavigator();

const AppStack = () => (
  <App.Navigator>
    <App.Screen name="Home" component={Home} />
    <App.Screen name="Admin" component={Admin} />
    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);

export default AppStack;
