import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../fbconfig';

/**
 * @type {import("@firebase/firestore").QueryDocumentSnapshot<langPackage>[]}
 */

export let packages = [];

class langPackage {
    /**
     * @param {any} app_lang
     * @param {any} image
     * @param {any} listing
     * @param {any} publish_url
     * @param {any} size
     */
    constructor(app_lang, image, listing, publish_url, size) {
        this.app_lang = app_lang;
        this.image = image;
        this.listing = listing;
        this.publish_url = publish_url;
        this.size = size;
    }
}

const langPackConverter = {
    toFirestore: (/** @type {any} */ langPackage) => {
        return {
            app_lang: langPackage.app_lang,
            image: langPackage.image,
            listing: langPackage.listing,
            publish_url: langPackage.publish_url,
            size: langPackage.size
        };
    },

    fromFirestore: (
        /** @type {{ data: (arg0: any) => any; }} */ snapshot,
        /** @type {any} */ options
    ) => {
        const data = snapshot.data(options);
        return new langPackage(
            data.app_lang,
            data.image,
            data.listing,
            data.publish_url,
            data.size
        );
    }
};

const docRef = doc(db, 'packages', 'TJ3OqolmsLWpdlRxBKrb');
export const docSnap = await getDoc(docRef);


const snapshot = await getDocs(collection(db, 'packages'));
console.log(snapshot);
// snapshot.forEach((doc) => {
//     packages.push(doc);
// });
