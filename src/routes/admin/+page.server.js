/** @type {import('./$types').Actions} */

import { db } from '$lib/fbconfig';
import { initInterface } from '$lib/stores';
import { doc, updateDoc } from 'firebase/firestore';

export const actions = {
    setTheme: async ({ url, cookies }) => {
        const theme = url.searchParams.get('theme');

        if (theme) {
            cookies.set('colortheme', theme, {
                path: '/',
                maxAge: 60 * 60 * 24 * 365
            });
        }
    },

    submitChanges: async ({ request, cookies }) => {
        const data = await request.formData();
        console.log('data submitted', data);
        const newHomeLink = data.get('homelink');
        const newHomeImage = data.get('homeimage');
        const newTheme = cookies.get('colortheme');

        const docRef = doc(db, 'preferences', 'primary');

        console.log({
            newHomeLink,
            newHomeImage,
            newTheme
        });

        await updateDoc(docRef, {
            homeImage: newHomeImage,
            homeLink: newHomeLink,
            theme: newTheme
        });

        await initInterface();
    }
};
