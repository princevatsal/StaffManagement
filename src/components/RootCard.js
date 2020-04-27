import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const RootCard = ({heading}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardText}>
        <Text style={styles.cardHeading}>{heading}</Text>
      </View>
    </View>
  );
};
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7777',
    marginBottom: 10,
    elevation: 5,
    marginHorizontal: 30,
  },
  cardText: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  cardHeading: {
    fontSize: 20,
  },
});
export default RootCard;
