import { writable } from 'svelte/store';
import { collection, getDocs } from '@firebase/firestore';
import { db } from "../firebase";

/**
 * @type {any[]}
 */
export const languages = [];

const packagesReference = collection( db, 'packages'); 
const snapshot = await getDocs( packagesReference );


snapshot.forEach((doc) => {
    languages.push({ ...doc.data(), id: doc.id });
});

// console.log(languages);