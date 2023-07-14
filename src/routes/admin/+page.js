import { initKeys, initUsers } from '../../lib/stores/packstore';

export async function load() {
    await initUsers();
    await initKeys();
}
