// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHha5VHJPMPQJWoW9S15jjb-7YvgmdbA4",
  authDomain: "creatorsphere-srajp.firebaseapp.com",
  databaseURL: "https://creatorsphere-srajp-default-rtdb.firebaseio.com",
  projectId: "creatorsphere-srajp",
  storageBucket: "creatorsphere-srajp.firebasestorage.app",
  messagingSenderId: "479719049222",
  appId: "1:479719049222:web:2289f56e8a520eba555b87",
  measurementId: "G-L6QFDM1JRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);