import { db } from '$lib/fbconfig.js';
import { doc, getDoc } from 'firebase/firestore';
import { initCurrUser } from '$lib/stores/users.js';

export const load = ({ params }) => {
    const fetchUserData = async (userId) => {
        const ref = doc(db, 'users', `${userId}`);
        const res = await getDoc(ref);
        const snap = res.data();
        initCurrUser();
        return snap;
    };

    return {
        user: fetchUserData(params.userId)
    };
};
