import firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';

//using database
const db = firestore();
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
        .then(user => resolve(user))
        .catch(err => reject(err));
    });
  };

  signUp = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => resolve(user))
        .catch(err => reject(err));
    });
  };

  signOutUser = () => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve();
        })
        .catch(err => reject(err));
    });
  };

  getUserData = uid => {
    console.log(uid);
    return new Promise((resolve, reject) => {
      db.collection('users')
        .doc(uid)
        .get()
        .then(res => {
          resolve(res.data());
        })
        .catch(err => reject(err));
    });
  };
  writeUserData = (uid, data) => {
    return new Promise((resolve, reject) => {
      db.collection('users')
        .doc(uid)
        .set({
          ...data,
        })
        .then(() => resolve());
    });
  };

  getAllUserNames = () => {
    return new Promise((resolve, reject) => {
      db.collection('users')
        .get()
        .then(data => resolve(data.docs.map(data => data.data())))
        .catch(err => reject(err));
    });
  };

  getUserTask(uid) {
    return new Promise((resolve, reject) => {
      db.collection('tasks')
        .doc(uid)
        .get()
        .then(res => {
          resolve(res.data());
        })
        .catch(err => reject(err));
    });
  }
}

Fire.shared = new Fire();
export default Fire;
