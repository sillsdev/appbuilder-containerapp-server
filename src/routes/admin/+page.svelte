<script>
    import { signOut } from 'firebase/auth';
    import { auth, db } from '$lib/fbconfig';
    import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { userInitials } from '$lib/components/userInitialsStore';
    import { generateRandomAPIKey } from '$lib/components/KeyGenerator';
    import { createNewAPIKey } from '$lib/components/CreateAPIKey';
    import {
        HamburgerIcon,
        AboutIcon,
        VisibleIcon,
        VisibleOffIcon,
        AddIcon,
        RefreshIcon
    } from '$lib/icons';
    import {
        activePackages,
        incomingPackages,
        allUsers,
        allKeys,
        activatePackage,
        deactivatePackage
    } from '../../stores/packstore';

    let user = null;
    let role;
    let firstName;
    let lastName;

    let message = '';
    let isAdmin = false;

    let customKey = '';

    onMount(() => {
        auth.onAuthStateChanged(async (userData) => {
            if (!userData) {
                // Redirect the user to the login page
                goto('/login');
            } else {
                user = userData;

                const userRef = doc(db, 'users', user.uid);
                console.log(user.uid);
                const userSnapshot = await getDoc(userRef);

                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    role = userData.role || 'user';
                    firstName = userData.firstname || '';
                    lastName = userData.lastname || '';
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
        });
    });

    async function logOut() {
        await signOut(auth);
        await goto('/login');
    }

    function home() {
        goto('/');
    }

    // default page
    let currentPage = 'Active Packages';

    const setCurrentPage = (page) => {
        currentPage = page;
    };

    function navigate(page) {
        setCurrentPage(page);
        const drawerToggle = document.getElementById('my-drawer-2');
        drawerToggle.checked = false;
    }

    async function updateUserRole(userId, newRole) {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, { role: newRole }, { merge: true });
    }
</script>

<svelte:head>
    <title>Admin</title>
</svelte:head>

{#if user}
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <label
                for="my-drawer-2"
                class="btn btn-ghost btn-circle btn-sm drawer-button lg:hidden"
            >
                <HamburgerIcon />
            </label>
            <li class="btn btn-ghost rounded-lg normal-case text-xl">
                <button on:click={home}>Kalaam Media Administrator</button>
            </li>
        </div>
        <div class="navbar-end">
            <div class="dropdown dropdown-end">
                <button class="btn btn-ghost rounded-lg normal-case text-xl">
                    {$userInitials}
                </button>
                <ul
                    class="menu menu-compact dropdown-content mt-1 p-2 shadow bg-base-200 rounded-box"
                >
                    <li><a href="/#">Settings</a></li>
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
        <div class="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-row items-start justify-start">
                <!-- DASHBOARD -->
                {#if currentPage === 'Dashboard'}
                    <h1>Welcome to the Home Page</h1>

                    <!-- ACTIVE PACKAGES -->
                {:else if currentPage === 'Active Packages'}
                    <div class="overflow-x-auto w-full">
                        {#if $activePackages.length > 0}
                            <table class="table table-md lg:w-3/4">
                                <thead>
                                    <tr>
                                        <th>Icon</th>
                                        <th>Package</th>
                                        <th>Region</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each $activePackages as project}
                                        <tr>
                                            <td>
                                                <img
                                                    class="mask mask-squircle sm:w-12 sm:h-12 lg:w-14 lg:h-14"
                                                    src={project.img}
                                                    alt="App Icon"
                                                />
                                            </td>
                                            <td>{project.app_lang.name}</td>
                                            <td>{project.app_lang.regionname}</td>
                                            {#if isAdmin}
                                                <td>
                                                    <a
                                                        href="/admin/{project.id}"
                                                        class="btn btn-ghost btn-circle btn-sm"
                                                    >
                                                        <AboutIcon />
                                                    </a>
                                                    <button
                                                        class="btn btn-ghost btn-circle btn-sm"
                                                        on:click={() =>
                                                            deactivatePackage(project.id)}
                                                    >
                                                        <VisibleOffIcon />
                                                    </button>
                                                </td>
                                            {/if}
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        {:else}
                            <p>No active packages found.</p>
                        {/if}
                    </div>

                    <!-- INCOMING PACKAGES -->
                {:else if currentPage === 'Incoming Packages'}
                    <div class="overflow-x-auto w-full">
                        {#if $incomingPackages.length > 0}
                            <table class="table table-md lg:w-3/4">
                                <thead>
                                    <tr>
                                        <th>Icon</th>
                                        <th>Package</th>
                                        <th>Region</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each $incomingPackages as project}
                                        <tr>
                                            <td>
                                                <img
                                                    class="mask mask-squircle sm:w-12 sm:h-12 lg:w-14 lg:h-14"
                                                    src={project.img}
                                                    alt="App Icon"
                                                />
                                            </td>
                                            <td>{project.app_lang.name}</td>
                                            <td>{project.app_lang.regionname}</td>
                                            <td>
                                                <a
                                                    href="/admin/{project.id}"
                                                    class="btn btn-ghost btn-circle btn-sm"
                                                >
                                                    <AboutIcon />
                                                </a>
                                                <button
                                                    class="btn btn-ghost btn-circle btn-sm"
                                                    on:click={() => activatePackage(project.id)}
                                                >
                                                    <VisibleIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        {:else}
                            <p>No inactive packages found.</p>
                        {/if}
                    </div>
                {:else if currentPage === 'Users'}
                    <div class="overflow-x-auto w-full lg:w-3/4">
                        {#if $allUsers.length > 0}
                            <table class="table table-md">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each $allUsers as user}
                                        <tr>
                                            <td>{user.firstname} {user.lastname}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <select
                                                    value={user.role}
                                                    on:change={(e) => {
                                                        updateUserRole(user.id, e.target.value);
                                                        user.role = e.target.value;
                                                    }}
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                    <!-- Add more roles here if needed -->
                                                </select>
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        {:else}
                            <p>No users found.</p>
                        {/if}
                    </div>
                {:else if currentPage === 'API Keys'}
                    <div class="overflow-x-auto w-full m-1 p-1 lg:w-3/4">
                        <div class="form-control w-full m-1 p-1 lg:w-3/4">
                            <!-- svelte-ignore a11y-label-has-associated-control -->
                            <label class="label">
                                <span class="label-text"
                                    >Add new custom key or Auto-Generate Key:</span
                                >
                                <button
                                    class="btn btn-ghost btn-circle btn-xs"
                                    on:click={() => (customKey = generateRandomAPIKey())}
                                >
                                    <RefreshIcon size="20" />
                                </button>
                            </label>
                        </div>
                        <div class="flex align-items-center">
                            <input
                                type="text"
                                placeholder="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
                                class="input input-bordered input-md p-1 m-1 rounded-lg w-full max-w-xs sm:max-w-md"
                                bind:value={customKey}
                            />
                            <button
                                class="btn btn-ghost rounded-lg btn-md"
                                on:click={() =>
                                    createNewAPIKey(customKey, `${lastName}, ${firstName}`)}
                                ><AddIcon size="32" /></button
                            >
                        </div>
                        {#if $allKeys.length > 0}
                            <table class="table table-md">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Key</th>
                                        <th>Date Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each $allKeys as key}
                                        <tr>
                                            <td>{key.user}</td>
                                            <td>{key.key}</td>
                                            <td>{new Date(key.timestamp)}</td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        {:else}
                            <p>No users found.</p>
                        {/if}
                    </div>
                {/if}
            </div>

            <div class="drawer-side">
                <label for="my-drawer-2" class="drawer-overlay" />
                <ul
                    class="menu mt-14 lg:mt-0 rounded-r-lg p-4 lg:w-64 bg-base-100 text-base-content"
                >
                    <li><button on:click={() => navigate('Dashboard')}> Dashboard </button></li>
                    <li>
                        <button on:click={() => navigate('Active Packages')}>
                            Active Packages
                        </button>
                    </li>
                    <li>
                        <button on:click={() => navigate('Incoming Packages')}>
                            Incoming Packages
                        </button>
                    </li>
                    <li><button on:click={() => navigate('Users')}> Users </button></li>
                    <li><button on:click={() => navigate('API Keys')}> API Keys </button></li>
                </ul>
            </div>
        </div>
    {/if}
{:else}
    <!-- else nothing -->
{/if}

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
