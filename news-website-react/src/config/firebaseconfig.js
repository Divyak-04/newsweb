import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVidFF1uEYXFs51F_ftoyzl32_2r3jIoc",
  authDomain: "news-website-19201.firebaseapp.com",
  projectId: "news-website-19201",
  storageBucket: "news-website-19201.firebasestorage.app",
  messagingSenderId: "1025156195095",
  appId: "1:1025156195095:web:bcece2346569dd10b50d52",
  measurementId: "G-XV5HL64XGY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  client_id: "1025156195095-1jnl9et0cj3ij1mao8kfedskgdan5mk2", // Paste your Web client ID
});