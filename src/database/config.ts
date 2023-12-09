import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDJG4c1mt-WEYRpm2ubKE856OWr-_KXGkM",
  authDomain: "expenseapp-fanshawe.firebaseapp.com",
  projectId: "expenseapp-fanshawe",
  storageBucket: "expenseapp-fanshawe.appspot.com",
  messagingSenderId: "726413986466",
  appId: "1:726413986466:web:1afee192df9a13030765fb",
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export const firestore = getFirestore(app);

export const requestForToken = () => {
  navigator.serviceWorker
    .register(process.env.PUBLIC_URL + "/firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful");

      getToken(messaging, {
        vapidKey: "BL4nlcoopPxY4JbtGI3t82vQ2SNSvDJej4I12qzcLl95DbN6kpdpEUImJrqmumuggB3yL86iSIrRF6EMbYiA0Mg",
        serviceWorkerRegistration: registration
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("current token for client: ", currentToken);
          } else {
            console.log("No registration token available. Request permission to generate one.");
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
