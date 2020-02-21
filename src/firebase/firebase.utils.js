import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDUDl_B3QqTwYDSJmcbe_dkZwsU0GHW5CM",
  authDomain: "crwn-db-a09c6.firebaseapp.com",
  databaseURL: "https://crwn-db-a09c6.firebaseio.com",
  projectId: "crwn-db-a09c6",
  storageBucket: "crwn-db-a09c6.appspot.com",
  messagingSenderId: "496513906298",
  appId: "1:496513906298:web:3e381d01b87feb8736edc3",
  measurementId: "G-XFTMKTXSBQ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
