import { collection, getDocs } from 'firebase/firestore';
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

    const loadedPack = snapshot.docs.map( (doc) => ( { id: doc.id, ...doc.data() }));

    allPackages.set(loadedPack);
}

export const incomingPackages = derived([allPackages], ([$packages]) => {
    return $packages.filter((pack) => pack.accepted === '');
})

export const activePackages = derived([allPackages], ([$packages]) => {
    return $packages.filter((pack) => pack.accepted !== '');
})

export function activatePackage( id ) {
    allPackages.update((packages) => {
        return packages.map( obj => {
            if( obj.id === id ) {
                return {
                    ...obj, accepted: new Date().toISOString()
                };
            }
            return obj;
        })
    })
}

export function deactivatePackage( id ) {
    allPackages.update((packages) => {
        return packages.map( obj => {
            if( obj.id === id ) {
                return {
                    ...obj, accepted: ""
                };
            }
            return obj;
        })
    })
}



