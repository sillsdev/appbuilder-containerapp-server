<script>
    import { auth } from '$lib/fbconfig';
    import { signOut } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let user = null;
    onMount(() => {
        auth.onAuthStateChanged((userData) => {
            if (!userData) {
                // Redirect the user to the login page
                goto('/login');
            } else {
                user = userData;
            }
        });
    });
    async function logOut() {
        await signOut(auth);
        await goto('/login');
    }
    function home() {
        goto('/');
    }
    let currentPage = 'home';
    const setCurrentPage = (page) => {
        currentPage = page;
    };
</script>

{#if user}
    <div class="navbar bg-base-100">
        <div class="flex-1">
            <li class="btn btn-ghost normal-case text-xl">
                <button on:click={home}>Scripture App Builder</button>
            </li>
        </div>
        <div class="flex-none">
            <div class="dropdown dropdown-end">
                <button class="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="inline-block w-5 h-5 stroke-current"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        /></svg
                    >
                </button>
                <ul
                    tabindex="0"
                    class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li><a>Settings</a></li>
                    <li><button on:click={logOut}>Sign Out</button></li>
                </ul>
            </div>
        </div>
    </div>

    <div class="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col items-center justify-center">
            <!-- Page content here -->
            {#if currentPage === 'Dashboard'}
                <h1>Welcome to the Home Page</h1>
                <p>Dashboard content goes here from firebase</p>
            {:else if currentPage === 'Active Projects'}
                <h1>Active Projects</h1>
                <p>Some information about active projects goes here...</p>
            {:else if currentPage === 'Incoming Projects'}
                <h1>Incoming Projects</h1>
                <p>Info about Incoming Projects</p>
            {:else if currentPage === 'Users'}
                <h1>Users and Roles</h1>
            {/if}

            <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden"
                >Open drawer</label
            >
        </div>

        <div class="drawer-side  bg-primary    ">
            <label for="my-drawer-2" class="drawer-overlay" />
            <ul class="menu p-4 w-80 bg-base-100 text-base-content">
                <li><button on:click={() => setCurrentPage('Dashboard')}>Dashboard</button></li>
                <li>
                    <button on:click={() => setCurrentPage('Active Projects')}
                        >Active Projects</button
                    >
                </li>
                <li>
                    <button on:click={() => setCurrentPage('Incoming Projects')}
                        >Incoming Projects</button
                    >
                </li>
                <li>
                    <button on:click={() => setCurrentPage('Users')}>Users</button>
                </li>
            </ul>
        </div>
    </div>
{:else}{/if}

<style>
    .navbar {
        position: relative;
        width: fit-content;
    }
</style>
