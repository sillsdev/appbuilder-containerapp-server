import { db } from '$lib/fbconfig';
import { collection, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { initKeys } from '$lib/stores';
import toast from 'svelte-french-toast';

export function generateRandomAPIKey() {
    let date = new Date().getTime();
    var key = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function rand(c) {
        var r = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return key;
}

export async function createNewAPIKey(key, user) {
    const colRef = collection(db, 'keys');
    if (key !== '') {
        try {
            await addDoc(colRef, {
                key: key,
                user: user,
                timestamp: new Date().toISOString()
            });
            await initKeys();
            toast.success('New key added.');
        } catch (e) {}
    } else {
        toast.error('Empty key could not be added.');
        throw new Error('Please define a key value');
    }
}

export async function destroyKey(keyID) {
    const docRef = doc(db, 'keys', keyID);
    await deleteDoc(docRef);
    await initKeys();
}
