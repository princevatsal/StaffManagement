import React from 'react';

import firebaseConfig from './config';
import Fire from './src/Fire';
import {Provider} from 'react-redux';
import store from './src/redux/store';
Fire.shared.initializeFirebase(firebaseConfig);
// App Navigator
import AppNavigator from './src/navigation/navigator';

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;
