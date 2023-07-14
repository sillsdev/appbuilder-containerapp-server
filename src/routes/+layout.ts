import '$lib/i18n';
import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { locale, waitLocale } from 'svelte-i18n';
import { initPackages } from '$lib/stores/packages';

export const load: LayoutLoad = async () => {
    if (browser) {
        locale.set(window.navigator.language);
    }
    await waitLocale();

    await initPackages();
};
