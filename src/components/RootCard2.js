import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import Fire from '../Fire';
const RootCard2 = ({heading, uid, setUidReported, uidReported, setAllOk}) => {
  const [loading, setloading] = useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.cardText}>
        <Text style={styles.cardHeading}>{heading}</Text>
        <TouchableOpacity
          onPress={() => {
            console.log('pressed');
            setloading(true);
            Fire.shared
              .updateSafe(uid)
              .then(() => {
                alert('updated sucessfully');
                setloading(false);
                if (uidReported.length == 1) setAllOk(true);
                setUidReported(
                  uidReported.filter(user => (user.uid == uid ? false : true)),
                );
              })
              .catch(err => {
                alert('unable to update');
                setloading(false);
              });
          }}>
          {loading ? (
            <View style={styles.btn}>
              <ActivityIndicator color="white" />
            </View>
          ) : (
            <Text style={styles.btn}>Resolve</Text>
          )}
        </TouchableOpacity>
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
  btn: {
    padding: 10,
    borderRadius: 6,
    width: 80,
    // height: 80,
    backgroundColor: 'green',
    color: 'white',
  },
});
export default RootCard2;
