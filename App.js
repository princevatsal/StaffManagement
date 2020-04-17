import React from 'react';

// Initialize Firebase
import firebaseConfig from './config';
import Fire from './src/Fire';
Fire.shared.initializeFirebase(firebaseConfig);

// App Navigator
import Loading from './src/screens/Loading';

const App = () => <Loading />;

export default App;
