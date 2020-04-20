import React from 'react';

// Initialize Firebase
import firebaseConfig from './config';
import Fire from './src/Fire';
Fire.shared.initializeFirebase(firebaseConfig);

// App Navigator
import AppNavigator from './src/navigation/AppNavigator';

const App = () => <AppNavigator />;

export default App;
