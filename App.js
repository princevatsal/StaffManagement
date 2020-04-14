import React from 'react';

// Set up firebase
import firebaseConfig from './config';
import Fire from './src/Fire';

Fire.shared.initializeFirebase(firebaseConfig);

// App Navigator
import AppNavigator from './src/navigation/navigator';

const App = () => <AppNavigator />;

export default App;
