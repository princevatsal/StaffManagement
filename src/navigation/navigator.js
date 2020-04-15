import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {updateUserUid} from '../redux/actions/userActions';
// Screens
import Loading from '../screens/Loading';

// Stacks
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const AppNavigator = ({user, updateUserUid}) => {
  [loading, setLoading] = useState(true);
  [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(res => {
      setUser(res);
      if (res) {
        updateUserUid(res.uid);
      } else updateUserUid(null);
    });
    if (loading) setLoading(false);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
mapToProps = state => ({
  user: state.user,
});
export default connect(
  mapToProps,
  {updateUserUid},
)(AppNavigator);
