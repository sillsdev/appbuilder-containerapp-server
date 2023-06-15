import { db } from '../../../lib/fbconfig.js';
import { doc, getDoc } from 'firebase/firestore';

export const load = ({ params }) => {
    console.log('PARAMS : \n' + params);

    const fetchPackage = async (id) => {
        const ref = doc(db, 'packages', `${id}`);
        const res = await getDoc(ref);
        const snap = res.data();
        return snap;
    };

    return {
        pack: fetchPackage(params.packageId)
    };
};
