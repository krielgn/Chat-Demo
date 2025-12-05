// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCpqqH37xS2TUm11LuKoZrHW_1XsdhBRrQ",
  authDomain: "chatdemo-21e84.firebaseapp.com",
  projectId: "chatdemo-21e84",
  storageBucket: "chatdemo-21e84.firebasestorage.app",

  messagingSenderId: "816295511536",
  appId: "1:816295511536:web:fa50d202788b8e99de8935"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fs = getFirestore(app);
