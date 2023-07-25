import { writable } from 'svelte/store';
import { db, auth } from '$lib/fbconfig.js';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

export const allUsers = writable([]);

export async function initUsers() {
    const colq = collection(db, 'users');

    const snapshot = await getDocs(colq);

    const loadedUsers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    allUsers.set(loadedUsers);
}

export const currUser = writable([]);

export async function initCurrUser() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
        user.providerData.forEach((profile) => {
            currUser.set({
                ...currUser,
                profile
            });
        });
    }
}
