import { initInterface, interfacePref } from '$lib/stores';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
    let theme: string | null = null;

    await initInterface();

    interfacePref.subscribe((item) => {
        if (item.theme) {
            theme = item.theme;
        }
    });

    if (theme) {
        return await resolve(event, {
            transformPageChunk: ({ html }) =>
                html.replace('data-theme="business"', `data-theme="${theme}"`)
        });
    }

    return await resolve(event);
}) satisfies Handle;
