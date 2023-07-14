import { writable } from "svelte/store";
import { db } from '$lib/fbconfig.js'
import { collection, getDocs } from "firebase/firestore";

export const allKeys = writable([]);

export async function initKeys() {
    const colq = collection(db, 'keys');

    const snapshot = await getDocs(colq);

    const loadedKeys = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    allKeys.set(loadedKeys);
}