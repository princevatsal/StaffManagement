import firebase from 'firebase';

class Fire {
  initializeFirebase = config => {
    firebase.initializeApp(config);
  };

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
