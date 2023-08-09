import { db } from '$lib/fbconfig.js';
import { addDoc, collection } from 'firebase/firestore';
import { allKeys, initKeys } from '$lib/stores/keys.js';
import { initPackages } from '$lib/stores/packages.js';
import { adminUsers, initUsers } from '$lib/stores/users.js';
import Notify from '$lib/emails/notify.svelte';
import nodemailer from 'nodemailer';
import { render } from 'svelte-email';

const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    auth: {
        user: 'project.1',
        pass: 'secret.1'
    }
});

let recipients = [];

export async function POST({ request }) {
    await initKeys();
    await initUsers();

    let valid = false;

    const bearer = request.headers.get('authorization');

    allKeys.subscribe((keys) => {
        keys.forEach((key) => {
            if (bearer.includes(key.key)) {
                valid = true;
            }
        });
    });

    if (valid) {
        const pack = await request.json();

        const col = collection(db, 'packages');

        await addDoc(col, {
            accepted: '',
            ...pack
        });

        adminUsers.subscribe((users) => {
            users.forEach((user) => {
                recipients.push(user.email);
            });
        });

        const emailHtml = render({
            template: Notify,
            props: {
                pack: pack
            }
        });

        const options = {
            from: 'containerappserver@gmail.com',
            to: recipients,
            subject: 'New Package Pending Review',
            html: emailHtml
        };

        transporter.sendMail(options);

        await initPackages();

        return new Response(201);
    } else {
        return new Response(401);
    }
}
