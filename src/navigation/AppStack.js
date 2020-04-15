import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Screens
import Home from '../screens/Home';
import Schedule from '../screens/Schedule';
import Profile from '../screens/Profile';
const App = createDrawerNavigator();

const AppStack = () => (
  <App.Navigator>
    <App.Screen name="Home" component={Home} />
    <App.Screen name="Profile" component={Profile} />
    <App.Screen name="Schedule" component={Schedule} />
  </App.Navigator>
);

export default AppStack;
