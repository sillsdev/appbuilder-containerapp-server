import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../fbconfig';
import { writable } from 'svelte/store';

/**
 * @type {any}
 */

export const packages = writable([]);

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

// const docRef = doc(db, 'packages', 'TJ3OqolmsLWpdlRxBKrb');
// export const docSnap = await getDoc(docRef);

const colq = collection(db, 'packages');
const dq = doc(db, 'packages', 'TJ3OqolmsLWpdlRxBKrb').withConverter(langPackConverter);

// const snap = await getDocs(colq);
export const snap = await getDoc(dq);
if (snap.exists()) {
    packages.set(snap.data());
}
export const snapshot = await getDocs(colq);
