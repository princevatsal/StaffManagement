import React from 'react';

// Initialize Firebase
import firebaseConfig from './config';
import Fire from './src/Fire';
Fire.shared.initializeFirebase(firebaseConfig);

// User Context Provider
import {UserProvider} from './src/context/userContext';

// App Navigator
import AppNavigator from './src/navigation/AppNavigator';

const App = () => (
  <UserProvider>
    <AppNavigator />
  </UserProvider>
);

export default App;
