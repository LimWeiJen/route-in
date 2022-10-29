// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBplCy1Nn6mR4-08We_VBOBj6yFRv0dRXI",
  authDomain: "route-in.firebaseapp.com",
  projectId: "route-in",
  storageBucket: "route-in.appspot.com",
  messagingSenderId: "260620632544",
  appId: "1:260620632544:web:b1085b0ddec8e75e846b85",
  measurementId: "G-3NC8S13C2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);