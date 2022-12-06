import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
    plugins: [sveltekit()],
    // if uncommented, resources load as expected
    // server: {
    //     fs: {
    //         allow: ['..']
    //     }
    // }
};

export default config;
