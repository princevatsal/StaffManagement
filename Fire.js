import firebase from 'firebase';
const admin = require('firebase-admin');
const functions = require('firebase-functions');
class Fire {
  initializeFirebase = config => {
    firebase.initializeApp(config);
  };
  initializeFirestore = () => {
    admin.initializeApp(functions.config().firebase);
  };
  signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  };

  signUp = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  };
  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('Used Signed Out'))
      .catch(err => console.log(err));
  };
}

Fire.shared = new Fire();
export default Fire;
