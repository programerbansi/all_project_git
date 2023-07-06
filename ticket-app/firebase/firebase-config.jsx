import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC93o-81Qhg_lP9ruk6IuDw-tEE-vz8p8U",
    authDomain: "ticket-next-js.firebaseapp.com",
    projectId: "ticket-next-js",
    storageBucket: "ticket-next-js.appspot.com",
    messagingSenderId: "638036865678",
    appId: "1:638036865678:web:18cc4a901c95fca8568fdf",
    measurementId: "G-V7ZZFJ3YTP"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {auth,db,storage};
