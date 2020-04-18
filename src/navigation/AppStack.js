import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Screens
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import DrawerContent from '../components/DrawerContent';
// App Drawer Navigator
const App = createDrawerNavigator();

const AppStack = () => (
  <App.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <App.Screen name="Home" component={Home} />
    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);

export default AppStack;
