<script>
    import { auth, db } from '$lib/fbconfig';
    import { doc, getDoc } from 'firebase/firestore';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { updateUserRole } from '$lib/data/AuthFunctions';
    import {
        allKeys,
        allUsers,
        currUser,
        currPage,
        activePackages,
        incomingPackages,
        interfacePref,
        activatePackage,
        deactivatePackage
    } from '$lib/stores';
    import { generateRandomAPIKey, createNewAPIKey, destroyKey } from '$lib/data/APIKeys';
    import {
        AboutIcon,
        AddIcon,
        RefreshIcon,
        TrashIcon,
        VisibleIcon,
        VisibleOffIcon
    } from '$lib/icons';
    import { themes } from '$lib/data/Themes';
    import { enhance } from '$app/forms';
    import ThemePreview from '$lib/components/ThemePreview.svelte';

    let user = null;
    let message = '';
    let customKey = '';

    let newHomeLink;
    let newImageLink;
    let newTheme;
    let changes = false;

    $: {
        newHomeLink = newHomeLink ? newHomeLink : $interfacePref.homeLink;
        newImageLink = newImageLink ? newImageLink : $interfacePref.homeImage;
        if (
            newHomeLink !== $interfacePref.homeLink ||
            newImageLink !== $interfacePref.homeImage ||
            newTheme !== undefined
        ) {
            changes = true;
        }
    }

    function setTheme(theme) {
        newTheme = theme;
    }

    const submitUpdateSettings = ({ action }) => {
        const img = action.searchParams.get('img');
        const link = action.searchParams.get('lnk');
    };

    const submitUpdateTheme = ({ action }) => {
        const theme = action.searchParams.get('theme');

        if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    };

    onMount(() => {
        auth.onAuthStateChanged(async (userData) => {
            if (!userData) {
                // If unauthenticated, redirect the user to the login page
                goto('/login');
            } else {
                // Store auth user data in user object and call for additional user data
                user = userData;
                const userRef = doc(db, 'users', userData.uid);
                const userSnapshot = await getDoc(userRef);

                // If additional info is found, update current user store
                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    if (userData.role === 'user' || userData.role === 'admin') {
                        currUser.set({
                            ...userData,
                            uid: user.uid,
                            userInitials: `${userData.firstname
                                .toUpperCase()
                                .charAt(0)}${userData.lastname.toUpperCase().charAt(0)}`
                        });

                        // check if user has administrative priviledges
                        if ($currUser.role !== 'admin') {
                            currUser.set({
                                ...$currUser,
                                isAdmin: false
                            });
                        } else {
                            currUser.set({
                                ...$currUser,
                                isAdmin: true
                            });
                        }
                    } else {
                        message =
                            "Sorry, but you don't have permissions yet! Please contact an administrator for access.";
                    }
                } else {
                    message = 'User information could not be found.';
                }
            }
        });
    });
</script>

<svelte:head>
    <title>Admin</title>
</svelte:head>

{#if message}
    <div class="message-container">
        <p>{message}</p>
    </div>
{/if}

{#if user && !message}
    <!-- DASHBOARD -->
    {#if $currPage === 'Dashboard'}
        <h1 class="text-base-content">Welcome to the Home Page</h1>

        <!-- ACTIVE PACKAGES -->
    {:else if $currPage === 'Active Packages'}
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
                                <td>
                                    <a
                                        href="/admin/{project.id}"
                                        class="btn btn-ghost btn-circle btn-sm"
                                    >
                                        <AboutIcon color="hsl(var(--bc))" />
                                    </a>
                                    {#if $currUser.isAdmin}
                                        <button
                                            class="btn btn-ghost btn-circle btn-sm"
                                            on:click={() => deactivatePackage(project.id)}
                                        >
                                            <VisibleOffIcon color="hsl(var(--bc))" />
                                        </button>
                                    {/if}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {:else}
                <p>No active packages found.</p>
            {/if}
        </div>

        <!-- INCOMING PACKAGES -->
    {:else if $currPage === 'Incoming Packages'}
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
                                        <AboutIcon color="hsl(var(--bc))" />
                                    </a>
                                    {#if $currUser.isAdmin}
                                        <button
                                            class="btn btn-ghost btn-circle btn-sm"
                                            on:click={() => activatePackage(project.id)}
                                        >
                                            <VisibleIcon color="hsl(var(--bc))" />
                                        </button>
                                    {/if}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {:else}
                <p>No inactive packages found.</p>
            {/if}
        </div>
    {:else if $currPage === 'Users'}
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
                                        on:change={(option) => {
                                            updateUserRole(user.id, option.target.value);
                                            user.role = option.target.value;
                                        }}
                                    >
                                        <option value="none">None</option>
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
    {:else if $currPage === 'API Keys'}
        <div class="overflow-x-auto w-full m-1 p-1 lg:w-3/4">
            <div class="form-control w-full m-1 p-1 max-w-xs sm:max-w-md lg:w-3/4">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label">
                    <span class="label-text">Add new custom key or Auto-Generate Key:</span>
                    <button
                        class="btn btn-ghost btn-circle btn-xs"
                        on:click={() => (customKey = generateRandomAPIKey())}
                    >
                        <RefreshIcon color="hsl(var(--bc))" size="20" />
                    </button>
                </label>
            </div>
            <div
                class="flex join align-items-center rounded-xl border border-base-content border-opacity-25"
            >
                <input
                    type="text"
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    class="input input-md rounded-lg w-full join-item focus:outline-none"
                    bind:value={customKey}
                />
                <button
                    class="btn btn-ghost rounded-lg btn-md join-item"
                    on:click={() => {
                        createNewAPIKey(
                            customKey,
                            `${$currUser.firstName.toNormalCase()}, ${$currUser.firstName.toNormalCase()}`
                        );
                        customKey = '';
                    }}><AddIcon color="hsl(var(--bc))" size="32" /></button
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
                                <td>
                                    <button
                                        class="btn btn-ghost btn-circle btn-sm"
                                        on:click={() => destroyKey(key.id)}
                                    >
                                        <TrashIcon />
                                    </button></td
                                >
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {:else}
                <p>No users found.</p>
            {/if}
        </div>
    {:else if $currPage === 'Interface Preferences'}
        <div class="w-full flex justify-center m-4">
            <div class="card flex flex-col w-full bg-base-200 p-4 m-2 rounded-xl">
                <div class="card-title">
                    <h1>Application Interface Preferences</h1>
                </div>

                <div class="card-body">
                    <div class="flex flex-row-reverse w-full justify-between">
                        <form method="POST" use:enhance={submitUpdateTheme}>
                            <div class="dropdown dropdown-end">
                                <label
                                    for="theme"
                                    tabindex="-1"
                                    class="btn btn-md btn-outline rounded-xl m-2 p-2"
                                    >Change Theme</label
                                >
                                <ul
                                    tabindex="-1"
                                    class="dropdown-content z-[1] menu bg-base-100 shadow-xl w-min-12 max-h-96 block overflow-y-scroll lg:rounded-tl-xl rounded-b-xl"
                                >
                                    {#each themes as theme}
                                        <li>
                                            <button
                                                class="no-animation hover:bg-base-100 active:animate-none focus:animate-none"
                                                value={newTheme}
                                                formaction="?/setTheme&theme={theme}"
                                                on:click={() => setTheme(theme)}
                                            >
                                                <ThemePreview {theme} />
                                            </button>
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        </form>
                    </div>
                    <form method="POST" action="?/submitChanges">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th> Attribute </th>
                                    <th> Currently </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th> Home Link </th>
                                    <td>
                                        <input
                                            class="input input-ghost rounded-xl w-full"
                                            placeholder="Please enter a web link"
                                            bind:value={newHomeLink}
                                            name="homelink"
                                            type="text"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th> Home Image </th>
                                    <td>
                                        <input
                                            class="input input-ghost rounded-xl w-full"
                                            placeholder="Please enter an image link"
                                            bind:value={newImageLink}
                                            name="homeimage"
                                            type="text"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            disabled={!changes}
                            class="btn btn-md rounded-xl m-2 p-2"
                            formaction="?/submitChanges"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    {/if}
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

    ::-webkit-scrollbar {
        display: none;
    }
</style>
