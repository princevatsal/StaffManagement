import firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';
import {List} from 'react-native-paper';

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

  writeToTasks(uid, tasklist) {
    return new Promise((resolve, reject) => {
      db.collection('tasks')
        .doc(uid)
        .set({taskList: tasklist})
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }
  updateUserActivity = (uid, timestamp, geo) => {
    return new Promise((resolve, reject) => {
      console.log('info from fire :-', uid, timestamp, geo);
      db.collection(`user-activity`)
        .doc(uid)
        .set({[timestamp]: {geo}}, {merge: true})
        .then(() => resolve())
        .catch(err => reject(err));
    });
  };
  updateDanger = uid => {
    return new Promise((resolve, reject) => {
      db.collection('security-status')
        .doc(uid)
        .set({allOk: false})
        .then(() => resolve())
        .catch(err => reject(err));
    });
  };

  getUserActivity = uid => {
    return new Promise((resolve, reject) => {
      db.collection('user-activity')
        .doc(uid)
        .get()
        .then(data => {
          resolve(data.data());
          console.log(data.data());
        })
        .catch(err => reject(err));
    });
  };
  uidReportedDanger = () => {
    return new Promise((resolve, reject) => {
      db.collection('security-status')
        .get()
        .then(list => {
          console.log('requesting');
          let cool = list._docs.map(item => {
            let obj = item.data();
            obj.uid = item.id;
            return obj;
          });
          let finaluidlist = cool
            .filter(item => (item.allOk ? false : true))
            .map(item => item.uid);
          resolve(finaluidlist);
        })
        .catch(err => reject(err));
    });
  };
}

Fire.shared = new Fire();
export default Fire;
