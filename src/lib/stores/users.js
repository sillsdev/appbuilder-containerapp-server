import { writable } from 'svelte/store';
import { db } from '$lib/fbconfig.js';
import { collection, getDocs } from 'firebase/firestore';

export const allUsers = writable([]);

export async function initUsers() {
    const colq = collection(db, 'users');

    const snapshot = await getDocs(colq);

    const loadedUsers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    allUsers.set(loadedUsers);
}

export const currUser = writable([]);
export const userInitials = writable([]);
