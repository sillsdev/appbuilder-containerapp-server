import { db } from '$lib/fbconfig.js';
import { doc, getDoc } from 'firebase/firestore';

export const load = ({ params }) => {
    const fetchUserData = async (userId) => {
        const ref = doc(db, 'users', `${userId}`);
        const res = await getDoc(ref);
        const snap = res.data();
        return snap;
    };

    return {
        user: fetchUserData(params.userId)
    };
};
