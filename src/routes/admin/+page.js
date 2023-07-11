import { db } from '$lib/fbconfig.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function load ({ depends }) {

        const activeRef = collection(db, 'packages');
        const activeQ = query(activeRef, where('accepted', '!=', ''));
        const activeQuery = await getDocs(activeQ);
        const active = activeQuery.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // console.log(`Loaded ${active.length} active packages `);

        const inactiveRef = collection(db, 'packages');
        const inactiveQ = query(inactiveRef, where('accepted', '==', ''));
        const inactiveQuery = await getDocs(inactiveQ);
        const inactive = inactiveQuery.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // console.log(`Loaded ${inactive.length} inactive packages `);

    depends("packages")

    return {
        active,
        inactive
    };
};
