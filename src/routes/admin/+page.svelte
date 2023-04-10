<script>
    import { auth, db } from '$lib/fbconfig';
    import { signOut } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { doc, getDoc } from 'firebase/firestore';
    import { userInitials } from '$lib/components/userInitialsStore';
    import HamburgerIcon from '$lib/icons/HamburgerIcon.svelte';

    let user = null;
    let message = '';
    let isAdmin = false;

    onMount(() => {
        auth.onAuthStateChanged(async (userData) => {
            if (!userData) {
                // Redirect the user to the login page
                goto('/login');
            } else {
                user = userData;

                const userRef = doc(db, 'users', user.uid);
                const userSnapshot = await getDoc(userRef);

                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    const role = userData.role || 'user';
                    const firstName = userData.firstname || '';
                    const lastName = userData.lastname || '';
                    userInitials.set(`${firstName.charAt(0)}${lastName.charAt(0)}`);

                    if (role !== 'admin') {
                        // Redirect the user to another page or show an error message
                        message = 'CONTACT ADMINSTRATOR FOR ROLE';
                        isAdmin = false;
                    } else {
                        isAdmin = true;
                    }
                }
            }
            fetchUserData();
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

    function navigate(page) {
        setCurrentPage(page);
        const drawerToggle = document.getElementById('my-drawer-2');
        drawerToggle.checked = false;
    }
</script>

<svelte:head>
    <title>Admin</title>
</svelte:head>

{#if user}
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <label for="my-drawer-2" class="btn btn-ghost btn-circle drawer-button lg:hidden">
                <HamburgerIcon />
            </label>
            <li class="btn btn-ghost normal-case text-xl">
                <button on:click={home}>Scripture App Builder</button>
            </li>
        </div>
        <div class="navbar-end">
            <div class="dropdown dropdown-end">
                <button class="btn btn-ghost normal-case text-xl">
                    {$userInitials}
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

    {#if message}
        <div class="message-container">
            <p>{message}</p>
        </div>
    {/if}

    {#if isAdmin}
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
            </div>

            <div class="drawer-side">
                <label for="my-drawer-2" class="drawer-overlay" />
                <ul class="menu p-4 w-80 bg-base-100 text-base-content">
                    <li><button on:click={() => navigate('Dashboard')}>Dashboard</button></li>
                    <li>
                        <button on:click={() => navigate('Active Projects')}>Active Projects</button
                        >
                    </li>
                    <li>
                        <button on:click={() => navigate('Incoming Projects')}
                            >Incoming Projects</button
                        >
                    </li>
                    <li>
                        <button on:click={() => navigate('Users')}>Users</button>
                    </li>
                </ul>
            </div>
        </div>
    {/if}
{:else}{/if}

<style>
    .message-container {
        text-align: center;
        padding: 1rem;
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
        border-radius: 0.25rem;
        margin: 1rem;
    }
</style>
