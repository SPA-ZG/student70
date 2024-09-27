import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB4JsXuvPWBt_W7e5j4sXefWP7FCCympQo",
    authDomain: "web-project6-6e3c4.firebaseapp.com",
    projectId: "web-project6-6e3c4",
    storageBucket: "web-project6-6e3c4.appspot.com",
    messagingSenderId: "887097012997",
    appId: "1:887097012997:web:6f5ae89ce33b2ccf7afd6c",
    measurementId: "G-NT0Y5DCC3J"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
  
export { db };
