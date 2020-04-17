import firebase from 'firebase';
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
}

Fire.shared = new Fire();
export default Fire;
