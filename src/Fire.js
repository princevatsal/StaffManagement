import firebase from 'firebase';



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
