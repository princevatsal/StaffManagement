import React, {useState, useEffect, createContext} from 'react';
import firebase from 'firebase';

// Loading Screen
import Loading from '../screens/Loading';

// Stacks
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export const AuthContext = createContext(null);

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function userStateChanged(result) {
    setUser(result);
    if (loading) setLoading(false);
  }

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(userStateChanged);

    // unsubscribe on unmount
    return authSubscriber;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return user ? (
    <AuthContext.Provider value={user}>
      <AppStack />
    </AuthContext.Provider>
  ) : (
    <AuthStack />
  );
};

export default AppNavigator;
