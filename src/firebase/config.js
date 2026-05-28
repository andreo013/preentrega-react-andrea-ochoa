import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-XczPiFaS9Vsyo9EYr2XRaTnCynljrcc",
  authDomain: "cajadidactica-react-and-ochoa.firebaseapp.com",
  projectId: "cajadidactica-react-and-ochoa",
  storageBucket: "cajadidactica-react-and-ochoa.firebasestorage.app",
  messagingSenderId: "348070686797",
  appId: "1:348070686797:web:9591ec448213c8d551ac04"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);