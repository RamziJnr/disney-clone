// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import storage

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAQ9V3LNPqBgMZlCbhUT5DDD6WWoXt9RoQ",
  authDomain: "disneyclone-34230.firebaseapp.com",
  projectId: "disneyclone-34230",
  storageBucket: "disneyclone-34230.appspot.com",
  messagingSenderId: "648583679496",
  appId: "1:648583679496:web:9421155bd3d52bf0dc8bbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);  // Authentication service
const db = getFirestore(app);  // Firestore database
const storage = getStorage(app);  // Storage service
const provider = new GoogleAuthProvider();  // Google authentication provider

// Export the services for use in other parts of your app
export { auth, provider, storage };
export default db;
