/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDJG4c1mt-WEYRpm2ubKE856OWr-_KXGkM",
  authDomain: "expenseapp-fanshawe.firebaseapp.com",
  projectId: "expenseapp-fanshawe",
  storageBucket: "expenseapp-fanshawe.appspot.com",
  messagingSenderId: "726413986466",
  appId: "1:726413986466:web:1afee192df9a13030765fb",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    data: {
      click_action: payload.notification.click_action,
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
self.addEventListener("notificationclick", function (event) {
  var action_click = event.notification.data.click_action;
  event.notification.close();

  event.waitUntil(clients.openWindow(action_click));
});
