import React from 'react';
import firebase from 'firebase';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Set up firebase
import Fire from './src/Fire';

// Screens
import Loading from './src/screens/Loading';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';

// Stacks
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

const Auth = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Signup" component={Signup} />
  </AuthStack.Navigator>
);

const HomeStackScreens = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
);

const context = React.createContext(null);

const App = () => {
  [loading, setLoading] = React.useState(true);
  [user, setUser] = React.useState(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(res => setUser(res));
    if (loading) setLoading(false);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      {user ? <HomeStackScreens /> : <Auth />}
    </NavigationContainer>
  );
};

export default App;
