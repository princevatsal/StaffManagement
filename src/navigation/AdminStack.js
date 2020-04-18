import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Screens
import Profile from '../screens/Profile';
import AdminScreen from '../screens/Admin';
import DrawerContent from '../components/DrawerContent';

// Authentication Stack
const Admin = createDrawerNavigator();

const AdminStack = ({route}) => (
  <Admin.Navigator
    headerMode="none"
    drawerContent={props => <DrawerContent {...props} />}>
    <Admin.Screen name="Admin" component={AdminScreen} />
    <Admin.Screen name="Profile" component={Profile} />
  </Admin.Navigator>
);

export default AdminStack;
