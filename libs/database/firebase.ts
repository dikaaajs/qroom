// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkValLF5AdaVy4DVYxTjXKchpPZLZOkuc",
  authDomain: "qroom-d077a.firebaseapp.com",
  projectId: "qroom-d077a",
  storageBucket: "qroom-d077a.appspot.com",
  messagingSenderId: "913592566822",
  appId: "1:913592566822:web:e7e405376b7cb9ae7b52e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
