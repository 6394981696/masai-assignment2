import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAlrjj9ZCW7hzpjxwBVEBVv0k_Mv2vzpdQ",
  authDomain: "task-app-33c3a.firebaseapp.com",
  projectId: "task-app-33c3a",
  storageBucket: "task-app-33c3a.firebasestorage.app",
  messagingSenderId: "750099743681",
  appId: "1:750099743681:web:db9b65523c35f08245e540",
  measurementId: "G-N6NWFJJGFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
