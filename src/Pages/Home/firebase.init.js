// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCedG1KA5uUpOei0mT8c4Ml7lnaw_NGpck",
  authDomain: "todoapp-151c3.firebaseapp.com",
  projectId: "todoapp-151c3",
  storageBucket: "todoapp-151c3.appspot.com",
  messagingSenderId: "46351459771",
  appId: "1:46351459771:web:b7d776cac1dcafea89509e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;