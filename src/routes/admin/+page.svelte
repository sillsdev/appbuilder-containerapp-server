<script>
    import { signOut } from 'firebase/auth';
    import { auth, db } from '$lib/fbconfig';
    import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
    import { page } from '$app/stores'
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { userInitials } from '$lib/components/userInitialsStore';
    import { HamburgerIcon, AboutIcon, VisibleIcon, VisibleOffIcon } from '$lib/icons';
    import { activePackages, incomingPackages, activatePackage, deactivatePackage } from '../../stores/packstore';

    $: active = $page.data.active;
    $: pending = $page.data.inactive;

    let userList = [];
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

                    await fetchUsers();
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

    async function fetchUsers() {
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        userList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    function navigate(page) {
        setCurrentPage(page);
        const drawerToggle = document.getElementById('my-drawer-2');
        drawerToggle.checked = false;

        if (page === 'Users') {
            fetchUsers();
        }
    }

    async function updateUserRole(userId, newRole) {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, { role: newRole }, { merge: true });
    }

    async function draftPackage ( id ) {
        const docRef = doc(db, 'packages', id);
        await updateDoc( docRef, {
            accepted: ""
        });
        await invalidate("/admin");
    }

    async function publishPackage ( id ) {
        const timestamp = new Date().toISOString();
        const docRef = doc(db, 'packages', id);
        await updateDoc( docRef, {
            accepted: timestamp
        });
        await invalidate("/admin");
    }

</script>

<svelte:head>
    <title>Admin</title>
</svelte:head>

{#if user}
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <label for="my-drawer-2" class="btn btn-ghost btn-circle drawer-button lg:hidden">
                <HamburgerIcon color="white" />
            </label>
            <li class="btn btn-ghost normal-case text-xl">
                <button on:click={home}>Kalaam Media Administrator</button>
            </li>
        </div>
        <div class="navbar-end">
            <div class="dropdown dropdown-end">
                <button class="btn btn-ghost normal-case text-xl">
                    {$userInitials}
                </button>
                <ul
                    class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52"
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
                                                    class="mask mask-squircle w-24"
                                                    src={`${project.image.baseurl}/${project.image.files[0].src}`}
                                                    alt="App Icon"
                                                />
                                            </td>
                                            <td>{project.app_lang.name}</td>
                                            <td>{project.app_lang.regionname}</td>
                                            <td>
                                                <a href="/admin/{project.id}">
                                                    <AboutIcon color="white" />
                                                </a>
                                                <button class="btn btn-ghost btn-circle" on:click={ () => deactivatePackage(project.id) }>
                                                    <VisibleOffIcon color="white"/>
                                                </button>
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
                                                    class="mask mask-squircle w-24"
                                                    src={`${project.image.baseurl}/${project.image.files[0].src}`}
                                                    alt="App Icon"
                                                />
                                            </td>
                                            <td>{project.app_lang.name}</td>
                                            <td>{project.app_lang.regionname}</td>
                                            <td>
                                                <a href="/admin/{project.id}">
                                                    <AboutIcon color="white" />
                                                </a>
                                                <button class="btn btn-ghost btn-circle" on:click={ () => activatePackage(project.id) }>
                                                    <VisibleIcon color="white"/>
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
                        {#if userList.length > 0}
                            <table class="table table-md">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each userList as user}
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
                {/if}
            </div>

            <div class="drawer-side">
                <label for="my-drawer-2" class="drawer-overlay" />
                <ul class="menu p-4 lg:w-64 bg-base-100 text-base-content">
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
