import {
    PUBLIC_API_KEY,
    PUBLIC_AUTH_DOMAIN,
    PUBLIC_PROJECT_ID,
    PUBLIC_STORAGE_BUCKET,
    PUBLIC_MESSAGING_SENDER_ID,
    PUBLIC_APP_ID
    // PUBLIC_MEASUREMENT_ID
} from '$env/static/public';

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: '' + { PUBLIC_API_KEY },
    authDomain: '' + { PUBLIC_AUTH_DOMAIN },
    projectId: '' + { PUBLIC_PROJECT_ID },
    storageBucket: '' + { PUBLIC_STORAGE_BUCKET },
    messagingSenderId: '' + { PUBLIC_MESSAGING_SENDER_ID },
    appId: '' + { PUBLIC_APP_ID }
    // measurementId: '' + { PUBLIC_MEASUREMENT_ID }
};

let firebaseapp;

firebaseapp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseapp);
