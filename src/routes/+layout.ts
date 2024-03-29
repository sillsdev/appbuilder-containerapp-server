import '$lib/i18n';
import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { locale, waitLocale } from 'svelte-i18n';
import { initPackages, initInterface } from '$lib/stores';

export const load: LayoutLoad = async () => {
    if (browser) {
        locale.set(window.navigator.language);
    }
    await waitLocale();
    await initInterface();
    await initPackages();
};
