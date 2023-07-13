import { initKeys, initUsers } from "../../stores/packstore";

export async function load() {
    await initUsers();
    await initKeys();
}
