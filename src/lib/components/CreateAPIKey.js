import { db } from '$lib/fbconfig';
import { collection, addDoc } from 'firebase/firestore';
import { initKeys } from '../../stores/packstore';

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
        } catch (e) {}
    } else {
        throw new Error('Please define a key value');
    }
}
