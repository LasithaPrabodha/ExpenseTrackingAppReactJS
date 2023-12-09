import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJG4c1mt-WEYRpm2ubKE856OWr-_KXGkM",
  authDomain: "expenseapp-fanshawe.firebaseapp.com",
  projectId: "expenseapp-fanshawe",
  storageBucket: "expenseapp-fanshawe.appspot.com",
  messagingSenderId: "726413986466",
  appId: "1:726413986466:web:1afee192df9a13030765fb",
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
