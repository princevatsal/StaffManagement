import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Drawer from '../components/Drawer';

// Screens
import Home from '../screens/Home';
import Schedule from '../screens/Schedule';
import Profile from '../screens/Profile';
const App = createDrawerNavigator();

const AppStack = () => (
  <Drawer>
    <App.Navigator>
      <App.Screen name="Home" component={Home} />
      <App.Screen name="Profile" component={Profile} />
      <App.Screen name="Schedule" component={Schedule} />
    </App.Navigator>
  </Drawer>
);

export default AppStack;
