// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoey0atwO-AOXbffuFFwUG8Qat1G1fXbA",
  authDomain: "epersomnia.firebaseapp.com",
  projectId: "epersomnia",
  storageBucket: "epersomnia.firebasestorage.app",
  messagingSenderId: "264484217898",
  appId: "1:264484217898:web:25605c7a57cb5e61becf53"
};

 /* EPERS test de Lucio
  // apiKey: "AIzaSyD5swvDolS_mr1jfdwocr8WwEUQDRS0L7g",
  // authDomain: "epersomniatest.firebaseapp.com",
  // projectId: "epersomniatest",
  // storageBucket: "epersomniatest.firebasestorage.app",
  // messagingSenderId: "319854078662",
  // appId: "1:319854078662:web:8e54222bb0f9087fbe45c7",
  // measurementId: "G-3JWR8LLGLJ"
  */

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);

