import React from 'react';
import {
  View,
  StyleSheet,
  Linking,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

const App = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
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
        <Text>Scope Securities Version 1.0 </Text>
        <Text>designed and developed by</Text>
        <View style={styles.dev}>
          <Text
            onPress={() => Linking.openURL('http://ayushk.dx.am')}
            style={{color: 'skyblue', fontSize: 20}}>
            Ayush
          </Text>
          <Text
            onPress={() => Linking.openURL('http://priyanshvatsal.com')}
            style={{color: 'skyblue', fontSize: 20}}>
            Priyansh
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  dev: {
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
