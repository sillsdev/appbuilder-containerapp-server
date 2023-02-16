import {
    PUBLIC_API_KEY,
    PUBLIC_AUTH_DOMAIN,
    PUBLIC_PROJECT_ID,
    PUBLIC_STORAGE_BUCKET,
    PUBLIC_MESSAGING_SENDER_ID,
    PUBLIC_APP_ID,
    PUBLIC_MEASUREMENT_ID
} from '$env/static/public';

import { getApp, initializeApp } from 'firebase/app';
import { doc, getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: `${PUBLIC_API_KEY}`,
    authDomain: `${PUBLIC_AUTH_DOMAIN}`,
    projectId: `${PUBLIC_PROJECT_ID}`,
    storageBucket: `${PUBLIC_STORAGE_BUCKET}`,
    messagingSenderId: `${PUBLIC_MESSAGING_SENDER_ID}`,
    appId: `${PUBLIC_APP_ID}`,
    measurementId: `${PUBLIC_MEASUREMENT_ID}`
};

const initAppIfNeeded = () => {
    try {
        return getApp('containerappserver');
    } catch {
        return initializeApp(firebaseConfig, 'containerappserver');
    }
};

let firebaseapp = initAppIfNeeded();
const auth = getAuth(firebaseapp);
export const db = getFirestore(firebaseapp);
const userDoc = (userId) => doc(db, "users", userId)
export {
    auth, userDoc
}