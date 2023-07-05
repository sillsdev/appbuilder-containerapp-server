import { db } from '$lib/fbconfig.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const load = () => {
    const fetchActive = async () => {
        // query
        let active = [];
        const ref = collection(db, 'packages');
        const q = query(ref, where('accepted', '!=', ''));
        const querySnapshot = await getDocs(q);
        active = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return active;
    };

    const fetchInactive = async () => {
        // query
        let pending = [];
        const ref = collection(db, 'packages');
        const q = query(ref, where('accepted', '==', ''));
        const querySnapshot = await getDocs(q);
        pending = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return pending;
    };

    return {
        activePacks: fetchActive(),
        inactivePacks: fetchInactive()
    };
};
