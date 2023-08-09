import { writable } from 'svelte/store';
import { db } from '$lib/fbconfig.js';
import { auth } from '$lib/fbconfig.js';
import { derived } from 'svelte/store';
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

export const adminUsers = derived([allUsers], ([$users]) => {
    return $users.filter((user) => user.role === 'admin');
});
