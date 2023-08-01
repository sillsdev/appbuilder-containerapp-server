/** @type {import('./$types').Actions} */

import { auth } from '$lib/fbconfig';
import { signInWithEmailAndPassword, updateEmail } from 'firebase/auth';
import { updateFirstName, updateLastName, updateStashedEmail } from '$lib/data/AuthFunctions';

export const actions = {
    reauthenticate: async ({ request }) => {
        const data = await request.formData();

        const newFirst = data.get('firstName');
        const newLast = data.get('lastName');
        const newEmail = data.get('newEmail');
        const email = data.get('email');
        const password = data.get('password');

        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            if (newEmail) {
                updateEmail(user, newEmail)
                    .then(() => {
                        updateStashedEmail(newEmail);
                    })
                    .catch((error) => {
                        console.log('Update error: ' + error);
                    })
                    .catch((error) => {
                        console.log('Authentication error: ' + error);
                    });
            }
        });
        if (newFirst) {
            await updateFirstName(newFirst);
        }
        if (newLast) {
            await updateLastName(newLast);
        }
    }
};
