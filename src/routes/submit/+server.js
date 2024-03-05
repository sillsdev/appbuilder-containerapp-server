import { db } from '$lib/fbconfig.js';
import {
    NODEMAILER_HOST,
    NODEMAILER_PORT,
    NODEMAILER_USER,
    NODEMAILER_PASSWORD,
    NODEMAILER_SENDER,
    NODEMAILER_SECURE
} from '$env/static/private';
import { addDoc, collection } from 'firebase/firestore';
import { allKeys, initKeys } from '$lib/stores/keys.js';
import { initPackages } from '$lib/stores/packages.js';
import { adminUsers, initUsers } from '$lib/stores/users.js';
import Notify from '$lib/emails/notify.svelte';
import nodemailer from 'nodemailer';
import { render } from 'svelte-email';
import { get } from 'svelte/store';

const transporter = nodemailer.createTransport({
    host: NODEMAILER_HOST,
    port: NODEMAILER_PORT,
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASSWORD
    },
    secure: NODEMAILER_SECURE
});

const sender = NODEMAILER_SENDER;

export async function POST({ request }) {
    await initKeys();
    await initUsers();

    let valid = false;
    const recipients = [];

    const bearer = request.headers.get('authorization');

    const keys = get(allKeys);
    keys.forEach((key) => {
        if (bearer.includes(key.key)) {
            valid = true;
        }
    });

    if (valid) {
        const pack = await request.json();

        const col = collection(db, 'packages');

        await addDoc(col, {
            accepted: '',
            ...pack
        });

        const users = get(adminUsers);
        users.forEach((user) => recipients.push(user.email));

        const emailHtml = render({
            template: Notify,
            props: {
                pack: pack
            }
        });

        const options = {
            from: sender,
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
