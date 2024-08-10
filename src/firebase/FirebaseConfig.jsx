import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyANnScOz7DowWRt5BfZmk8Ad6oLltEwA54",
  authDomain: "shopping-mall-app-4b796.firebaseapp.com",
  projectId: "shopping-mall-app-4b796",
  storageBucket: "shopping-mall-app-4b796.appspot.com",
  messagingSenderId: "1032362777283",
  appId: "1:1032362777283:web:1d1443b050a67d1392a076"
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth};