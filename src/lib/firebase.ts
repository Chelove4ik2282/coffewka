// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCE8omwN5eAmoy27_eWFaVmiQlQYG5HfxY",
    authDomain: "coffewka.firebaseapp.com",
    projectId: "coffewka",
    storageBucket: "coffewka.firebasestorage.app",
    messagingSenderId: "341595211834",
    appId: "1:341595211834:web:d51914bfff3ffd5cf3cd03",
    measurementId: "G-QEW3FY7K7T"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
