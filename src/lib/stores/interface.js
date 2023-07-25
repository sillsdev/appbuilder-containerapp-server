import { db } from '$lib/fbconfig';
import { doc, getDoc } from 'firebase/firestore';
import { writable } from 'svelte/store';

export const interfacePref = writable({
    homeImage: '/earth_cut.png',
    homeLink: 'https:/google.com',
    theme: 'business'
});

export async function initInterface() {
    const docRef = doc(db, 'interface', 'primary');
    const snap = await getDoc(docRef);
    const preferences = snap.data();
    interfacePref.set(preferences);
}
