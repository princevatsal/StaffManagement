import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';

import firebase from 'firebase';

const Drawer = ({children}) => (
  <ScrollView>
    <ImageBackground
      source={require('../assets/background.png')}
      style={{width: undefined, padding: 16, paddingTop: 48}}>
      <Image
        source={require('../assets/tempAvatar.jpg')}
        style={styles.profile}
      />
      <Text style={styles.name}>{firebase.auth().currentUser.displayName}</Text>

      <View style={{flexDirection: 'row'}}>
        <Text style={styles.followers}>Verified User</Text>
      </View>
    </ImageBackground>

    <View style={styles.container}>{children}</View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 8,
  },
  followers: {
    color: 'rgba(300, 300, 300, 0.9)',
    fontSize: 13,
    marginRight: 4,
  },
});

export default Drawer;
