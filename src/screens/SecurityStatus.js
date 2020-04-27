import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Fire from '../Fire';
import {UserContext} from '../context/userContext';
import {set} from 'react-native-reanimated';
var PushNotification = require('react-native-push-notification');

const SecurityStatus = ({navigation}) => {
  useEffect(() => {
    // PushNotification.cancelAllLocalNotifications();
  }, []);

  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={{
          margin: 20,
        }}
        onPress={() => {
          console.log('pressed');
          navigation.toggleDrawer();
        }}>
        <Image
          source={require('../assets/imgs/menu2.png')}
          style={{width: 45, height: 45}}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.heading}>Have You any Problem with Security</Text>
        <TouchableOpacity
          style={{...styles.button, backgroundColor: '#f85959'}}
          onPress={() => {
            setLoading(true);
            console.log('updateing status ');
            Fire.shared
              .updateDanger(user.credentials.uid)
              .then(() => {
                alert('Security Status updated to danger');
                setLoading(false);
                navigation.navigate('Home');
              })
              .catch(err => {
                alert(err);
                setLoading(false);
              });
          }}>
          <View style={styles.text}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={{color: '#ffffff', fontSize: 30}}>Yes</Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.button, backgroundColor: '#28c7fa'}}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text style={styles.text}>No</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 25,
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
  },
  button: {
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: 'orange',
    borderRadius: 10,
    marginBottom: 10,
  },
});
export default SecurityStatus;
