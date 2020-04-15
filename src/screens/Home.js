import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Button, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {Icon} from 'react-native-elements';
const Home = ({navigation}) => {
  useEffect(() => {});
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          height: '13%',
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

            width: 0.32 * width,
          }}>
          <Icon name="menu" size={46} color="#99" />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              color: 'black',
              fontFamily: 'sans-serif-light',
              marginTop: 7,
            }}>
            Tasks
          </Text>
        </View>
        <Icon name="account-circle" color="#999" size={40} />
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
