import { db } from '$lib/fbconfig';
import { doc, deleteDoc } from 'firebase/firestore';
import { initKeys } from '../../stores/packstore';

export async function destroyKey(keyID) {
    const docRef = doc(db, 'keys', keyID);
    await deleteDoc(docRef);
    initKeys();
}
