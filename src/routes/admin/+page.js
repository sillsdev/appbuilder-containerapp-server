import { initUsers, initKeys } from '$lib/stores';

export async function load() {
    await initUsers();
    await initKeys();
}
