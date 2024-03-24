// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD9BEGueM5ACLLWsuJ9V58Vr7oYkrR_0r0",
    authDomain: "rn-cici.firebaseapp.com",
    projectId: "rn-cici",
    storageBucket: "rn-cici.appspot.com",
    messagingSenderId: "529848189131",
    appId: "1:529848189131:web:a030b049a97969a2831b4e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)

export const usersCol = collection(db, "users")
export const ibadahCol = collection(db, "ibadah")
export const nikahCol = collection(db, "nikah")
export const baptisCol = collection(db, "baptis")