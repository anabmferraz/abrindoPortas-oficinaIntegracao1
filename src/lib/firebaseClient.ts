import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOuqVLZs0qh_edVflIOaJ9AmyECuzehXA",
  authDomain: "abrindo-portas-96752.firebaseapp.com",
  projectId: "abrindo-portas-96752",
  storageBucket: "abrindo-portas-96752.firebasestorage.app",
  messagingSenderId: "16024501014",
  appId: "1:16024501014:web:1ca258399ac1c29279ae37",
  measurementId: "G-YV1QWDR6SG"
};

const app = initializeApp(firebaseConfig);


let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
