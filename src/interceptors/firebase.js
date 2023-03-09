// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoQRKJuImUH7a8_6Fc89uhnHmHkx3UquI",
  authDomain: "vyaparselllocations.firebaseapp.com",
  projectId: "vyaparselllocations",
  storageBucket: "vyaparselllocations.appspot.com",
  messagingSenderId: "234302381400",
  appId: "1:234302381400:web:be6125216d7d00672e592d",
  measurementId: "G-M4B3LRCLT7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const analytics = getAnalytics(app);

 
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);