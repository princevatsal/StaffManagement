import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDiNSHCgtwdxbZd_131nsx7CCo7Uaz-TBw',
  authDomain: 'staff-management-753e4.firebaseapp.com',
  databaseURL: 'https://staff-management-753e4.firebaseio.com',
  projectId: 'staff-management-753e4',
  storageBucket: 'staff-management-753e4.appspot.com',
  messagingSenderId: '852955534775',
  appId: '1:852955534775:web:ed8426864083077d158432',
  measurementId: 'G-5RSWJ92NH3',
};

firebase.initializeApp(firebaseConfig);
console.log('Firebase Initialized');

const Fire = () => {
  const checkAuthenticate = () => {
    if (firebase.auth.currentUser) {
      return true;
    } else {
      return false;
    }
  };

  const signIn = (email, password) => {
    firebase
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log('Successfully Signed In'))
      .catch(err => console.log(err));
  };

  const signUp = (email, password) => {
    firebase
      .createUserWithEmailAndPassword(email, password)
      .then(() => console.log('Successfully Created User'))
      .catch(err => console.log(err));
  };

  return {checkAuthenticate, signIn, signUp};
};

export default Fire();
