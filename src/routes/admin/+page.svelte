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

    let user = null;
    let message = '';
    let customKey = '';

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

                    currUser.set({
                        ...userData,
                        uid: user.uid,
                        userInitials: `${userData.firstname
                            .toUpperCase()
                            .charAt(0)}${userData.lastname.toUpperCase().charAt(0)}`
                    });

                    // If role is unknown, give base priviledges
                    if (!userData.role) {
                        currUser.set({
                            ...$currUser,
                            role: 'user'
                        });
                    }

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

                    console.log($currUser);
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

{#if user}
    <!-- DASHBOARD -->
    {#if $currPage === 'Dashboard'}
        <h1>Welcome to the Home Page</h1>

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
                                        <AboutIcon />
                                    </a>
                                    {#if $currUser.isAdmin}
                                        <button
                                            class="btn btn-ghost btn-circle btn-sm"
                                            on:click={() => deactivatePackage(project.id)}
                                        >
                                            <VisibleOffIcon />
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
                                        <AboutIcon />
                                    </a>
                                    {#if $currUser.isAdmin}
                                        <button
                                            class="btn btn-ghost btn-circle btn-sm"
                                            on:click={() => activatePackage(project.id)}
                                        >
                                            <VisibleIcon />
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
                        <RefreshIcon size="20" />
                    </button>
                </label>
            </div>
            <div class="flex align-items-center">
                <input
                    type="text"
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    class="input input-bordered input-md p-1 m-1 rounded-lg w-full max-w-xs sm:max-w-md"
                    bind:value={customKey}
                />
                <button
                    class="btn btn-ghost rounded-lg btn-md"
                    on:click={() => {
                        createNewAPIKey(
                            customKey,
                            `${$currUser.firstName.toNormalCase()}, ${$currUser.firstName.toNormalCase()}`
                        );
                        customKey = '';
                    }}><AddIcon size="32" /></button
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
</style>
