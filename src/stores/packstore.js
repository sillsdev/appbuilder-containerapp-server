import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { writable } from 'svelte/store';
import { db } from '../lib/fbconfig';

/**
 * @type {any}
 */

export const packs = [];
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
            data.image.baseurl,
            data.listing,
            data.publish_url,
            data.size
        );
    }
};

export async function initPackages() {
    const colq = collection(db, 'packages');

    const snapshot = await getDocs(colq);

    snapshot.forEach((doc) => {
        packs.push(doc.data());
    });

    // @ts-ignore
    const loadedPack = packs.map((data, index) => {
        return {
            id: index + 1,
            name: data.app_lang.name,
            altNames: data.app_lang.names,
            country: data.app_lang.regionname,
            code: data.app_lang.iso639_3,
            image: data.image.baseurl + '/' + data.image.files[0].src,
            size: data.size,
            // should be PERMALINK
            permalink: data.publish_url
        };
    });

    packages.set(loadedPack);
}
