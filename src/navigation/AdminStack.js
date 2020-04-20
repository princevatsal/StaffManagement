import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Screens
import Profile from '../screens/Profile';
import AdminScreen from '../screens/Admin';
import DrawerContent from '../components/DrawerContent';
import Support from '../screens/Support';
// Authentication Stack
const Admin = createDrawerNavigator();

const AdminStack = ({props}) => (
  <Admin.Navigator
    headerMode="none"
    drawerContent={props => <DrawerContent {...props} />}>
    <Admin.Screen name="Admin" component={AdminScreen} />
    <Admin.Screen name="Profile" component={Profile} />
    <Admin.Screen name="Support" component={Support} />
  </Admin.Navigator>
);

export default AdminStack;
