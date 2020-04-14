import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import Fire from '../Fire';
var fire = Fire.shared;
const Home = ({navigation}) => {
  useEffect(() => {});
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'green',
          height: '20%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 35}}>Header</Text>
      </View>

      <Text onPress={navigation.toggleDrawer}>Drawer</Text>
      <Text>Home</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
