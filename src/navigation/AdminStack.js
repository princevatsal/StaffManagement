import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Screens
import Profile from '../screens/Profile';
import AdminScreen from '../screens/Admin';

// Authentication Stack
const Admin = createDrawerNavigator();

const AdminStack = ({route}) => (
  <Admin.Navigator headerMode="none">
    <Admin.Screen name="Admin" component={AdminScreen} />
    <Admin.Screen name="Profile" component={Profile} />
  </Admin.Navigator>
);

export default AdminStack;
