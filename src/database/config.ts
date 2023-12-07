import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-N-HZHiqlh9uv7-JY7uOa-_uJK5zztg8",
  authDomain: "expensesapp-e4180.firebaseapp.com",
  projectId: "expensesapp-e4180",
  storageBucket: "expensesapp-e4180.appspot.com",
  messagingSenderId: "205813928181",
  appId: "1:205813928181:web:69d8fed2a6a555aa14b5bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);