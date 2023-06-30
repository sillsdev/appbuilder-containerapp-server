import { db } from '$lib/fbconfig.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const load = () => {
    const fetchActive = async (id) => {
        // query 
        const ref = collection(db, 'packages');
        const q = query( ref, where("accepted", "!=", "null"));
        const querySnapshot = await getDocs(q);
        const snap = querySnapshot;
        // debug
        // querySnapshot.forEach( (doc) => {
        //     console.log( doc.id, " => ", doc.data() );
        // })
        return snap;
    };

    const fetchInactive = async (id) => {
        // query
        const ref = collection(db, 'packages');
        const q = query( ref, where("accepted", "==", "null"));
        const querySnapshot = await getDocs(q);
        const snap = querySnapshot;
        // debug
        querySnapshot.forEach( (doc) => {
            console.log( doc.id, " => ", doc.data() );
        })
        return snap;
    }

    return {
        activePacks: fetchActive(),
        inactivePacks: fetchInactive()
    };
};