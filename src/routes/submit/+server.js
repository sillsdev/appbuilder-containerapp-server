import { db } from '$lib/fbconfig.js';
import {
    PUBLIC_NODEMAILER_HOST,
    PUBLIC_NODEMAILER_PORT,
    PUBLIC_NODEMAILER_USER,
    PUBLIC_NODEMAILER_PASSWORD,
    PUBLIC_NODEMAILER_SENDER,
    PUBLIC_NODEMAILER_SECURE
} from '$env/static/public';
import { addDoc, collection } from 'firebase/firestore';
import { allKeys, initKeys } from '$lib/stores/keys.js';
import { initPackages } from '$lib/stores/packages.js';
import { adminUsers, initUsers } from '$lib/stores/users.js';
import Notify from '$lib/emails/notify.svelte';
import nodemailer from 'nodemailer';
import { render } from 'svelte-email';

const transporter = nodemailer.createTransport({
    host: PUBLIC_NODEMAILER_HOST,
    port: PUBLIC_NODEMAILER_PORT,
    auth: {
        user: PUBLIC_NODEMAILER_USER,
        pass: PUBLIC_NODEMAILER_PASSWORD
    },
    secure: PUBLIC_NODEMAILER_SECURE
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
            from: PUBLIC_NODEMAILER_SENDER,
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
