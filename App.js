import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';

// Firebase Keys
import firebaseConfig from './config';

// Init Firebase
if (!firebase.app().name) firebase.initializeApp(firebaseConfig);

const App = () => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    console.log('Btn Clicked');
    firestore()
      .collection('users')
      .add({
        new: text,
      })
      .then(docRef => console.log('Written to ', docRef))
      .catch(err => console.log(err));
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        type="text"
        style={styles.input}
        value={text}
        onChangeText={text => setText(text)}
      />
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '60%',
    backgroundColor: '#eee',
  },
  submitBtn: {
    marginTop: 32,
    width: 20,
    height: 10,
    backgroundColor: 'purple',
    alignSelf: 'center',
  },
});

export default App;
