import { initUsers, initKeys, initCurrUser } from '$lib/stores';

export async function load() {
    await initUsers();
    await initKeys();
    await initCurrUser();
}
