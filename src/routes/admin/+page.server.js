/** @type {import('./$types').Actions} */

import { db } from '$lib/fbconfig';
import { initInterface } from '$lib/stores';
import { auth } from '$lib/fbconfig';
import { doc, updateDoc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { redirect } from '@sveltejs/kit';

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

        const newHomeLink = data.get('homelink');
        const newHomeImage = data.get('homeimage');
        const newTheme = cookies.get('colortheme');

        const docRef = doc(db, 'interface', 'primary');

        signInAnonymously(auth)
            .then(() => {
                updateDoc(docRef, {
                    homeImage: newHomeImage,
                    homeLink: newHomeLink,
                    theme: newTheme
                });
            })
            .catch((error) => {
                console.log('error:', error);
            });

        await initInterface();
        throw redirect(303, '/admin');
    }
};
