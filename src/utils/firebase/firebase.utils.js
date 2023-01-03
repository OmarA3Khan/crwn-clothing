// import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  // signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-LT5qV9HLJemztJC3yW814NpbSs9ghpk",
  authDomain: "crwn-db-2f691.firebaseapp.com",
  projectId: "crwn-db-2f691",
  storageBucket: "crwn-db-2f691.appspot.com",
  messagingSenderId: "828233837177",
  appId: "1:828233837177:web:664d9ef2bd083e21d682a8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInfo) => {
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log('userDocRef:', userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log('userSnapshot: ',userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef,
        {
          displayName,
          email,
          createdAt,
          ...additionalInfo,
        });
    }
    catch(error) {
      console.log('error.message: ', error.message)
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};