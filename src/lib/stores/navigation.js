import { writable } from 'svelte/store';

export const currPage = writable('Active Packages');

export function updatePage(page) {
    currPage.set(page);
    return currPage;
}
