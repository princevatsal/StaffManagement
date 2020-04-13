import React from 'react';
import firebase from 'firebase'
import firebaseConfig from './config';
import {NavigationContainer} from '@react-navigation/native'
firebase.initializeApp(firebaseConfig);
console.log('Firebase Initialized');
var user = firebase.auth().currentUser;
        console.log(user)
// App Navigator
import AppNavigator from './src/navigation/AppNavigator';
const App = () => <NavigationContainer><AppNavigator /></NavigationContainer>;

export default App;
