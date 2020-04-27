import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const LocationCard = ({time, details}) => (
  <View style={styles.card}>
    <Image
      source={require('../assets/imgs/location.png')}
      style={styles.cardIcon}
    />
    <View style={styles.cardText}>
      <Text style={styles.cardHeading}>{time}</Text>
      <Text style={styles.cardStr}>{details}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: '#000',
    padding: 15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    marginBottom: 20,
  },
  cardIcon: {
    height: 60,
    width: 60,
  },
  cardText: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  cardHeading: {
    fontSize: 20,
  },
  cardStr: {
    color: '#999',
    width: 220,
  },
});

export default LocationCard;
