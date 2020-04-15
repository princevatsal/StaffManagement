import firebase from 'firebase';

class Fire {
  initializeFirebase = config => {
    firebase.initializeApp(config);
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
        .then(data => resolve(data))
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
