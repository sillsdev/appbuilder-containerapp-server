import { initializeApp } from "firebase/app";
import { 
  getFirestore,
  collection,
  getDocs
 } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJh9cdqity_of6AoWlTDiXrYfCgcsJ2Ss",
  authDomain: "containerappserver.firebaseapp.com",
  projectId: "containerappserver",
  storageBucket: "containerappserver.appspot.com",
  messagingSenderId: "550029847798",
  appId: "1:550029847798:web:fc47c418659ed8062250d7",
  measurementId: "G-F4WV947JPM"
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );
export const db = getFirestore(app);
// const analytics = getAnalytics(app);