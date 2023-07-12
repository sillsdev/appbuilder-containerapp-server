import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { writable, derived } from 'svelte/store';
import { db } from '../lib/fbconfig';

/**
 * @type {any}
 */

export const packs = [];
export const allPackages = writable([]);

export async function initPackages() {
    const colq = collection(db, 'packages');

    const snapshot = await getDocs(colq);

    const loadedPack = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .map((project) => ({
            ...project,
            img: project.image.baseurl + '/' + project.image.files[0].src
        }));

    allPackages.set(loadedPack);
}

export const incomingPackages = derived([allPackages], ([$packages]) => {
    return $packages.filter((pack) => pack.accepted === '');
});

export const activePackages = derived([allPackages], ([$packages]) => {
    return $packages.filter((pack) => pack.accepted !== '');
});

export async function activatePackage(id) {
    const timestamp = new Date().toISOString();
    const docRef = doc(db, 'packages', id);

    allPackages.update((packages) => {
        return packages.map((obj) => {
            if (obj.id === id) {
                return {
                    ...obj,
                    accepted: timestamp
                };
            }
            return obj;
        });
    });

    await updateDoc(docRef, {
        accepted: timestamp
    });
}

export async function deactivatePackage(id) {
    const docRef = doc(db, 'packages', id);

    allPackages.update((packages) => {
        return packages.map((obj) => {
            if (obj.id === id) {
                return {
                    ...obj,
                    accepted: ''
                };
            }
            return obj;
        });
    });

    await updateDoc(docRef, {
        accepted: ''
    });
}
