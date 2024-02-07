import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCo0CVWCEQ-GJn8a_EntcF1iTDH8_SGg9Y",
    authDomain: "ultimatetictactoern.firebaseapp.com",
    projectId: "ultimatetictactoern",
    storageBucket: "ultimatetictactoern.appspot.com",
    messagingSenderId: "321115848083",
    appId: "1:321115848083:web:1a5beb154c64db4446fc66",
    measurementId: "G-ZLVF58YZP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export {firestore, auth};