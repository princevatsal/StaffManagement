import firebase from 'firebase';

import firebaseConfig from '../config';
firebase.initializeApp(firebaseConfig)

class Fire {
  signIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log('Successfully Signed In'))
      .catch(err => console.log(err));
  };

  signUp = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => console.log('Successfully Created User'))
      .catch(err => console.log(err));
  };
}

Fire.share = new Fire();
export default Fire;
