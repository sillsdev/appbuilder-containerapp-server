import { db } from '$lib/fbconfig.js';
import { doc, getDoc } from 'firebase/firestore';

export const load = ({ params }) => {
    const fetchPackage = async (id) => {
        const ref = doc(db, 'incoming', `${id}`);
        const res = await getDoc(ref);
        const snap = res.data();
        return snap;
    };

    return {
        pack: fetchPackage(params.incomingId)
    };
};
