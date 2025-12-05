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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);

