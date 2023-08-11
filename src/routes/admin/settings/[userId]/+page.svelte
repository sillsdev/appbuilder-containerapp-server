<script>
    import { ArrowBackIcon } from '$lib/icons';
    import { passwordReset } from '$lib/data/AuthFunctions.js';
    import toast from 'svelte-french-toast';
    import { enhance } from '$app/forms';
    import { currUser } from '$lib/stores/users.js';

    export let data;
    const user = data.user;

    let newFirstName = '';
    let newLastName = '';
    let newEmail = '';

    let isAdmin;

    if (user.role === 'admin') {
        isAdmin = true;
    }

    let changes;

    $: {
        changes = `${newFirstName}${newLastName}${newEmail}`;
    }

    const submitProfileChanges = () => {
        return async ({ result, update }) => {
            switch (result.type) {
                case 'success':
                    toast.success('Profile information updated.');
                    reauthenticate_modal.close();
                    await update();
                    break;
                case 'invalid':
                    toast.error('Whoops! Invalid credentials.');
                    await update();
                    break;
                case 'error':
                    toast.error('Unable to update profile. Try again later.');
                    break;
                default:
                    await update();
            }
        };
    };
</script>

<div class="flex flex-row justify-items-stretch columns-2 items-center">
    <div class="btn btn-ghost m-1 p-2">
        <a href="/admin">
            <ArrowBackIcon color="white" />
        </a>
    </div>

    <div class="flex justify-center items-center h-12 p-1 m-1">
        <h1 class="text-center text-lg font-bold">Settings</h1>
    </div>
</div>

<div class="w-full flex justify-center">
    <div class="card flex flex-col w-full lg:w-4/5 bg-base-200 p-2 m-1 rounded-xl">
        <div class="card-title">
            <h1>User Info</h1>
        </div>

        <div class="card-body">
            <div class="overflow-x-visible">
                <table class="table">
                    <thead>
                        <tr class="text-white text-lg font-bold border-opacity-50">
                            {user.firstname}
                            {user.lastname}
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-opacity-20">
                            <th>First Name</th>
                            <td>
                                <input
                                    type="text"
                                    class="input input-sm input-outline bg-base-200"
                                    placeholder={user.firstname}
                                    bind:value={newFirstName}
                                />
                            </td>
                        </tr>
                        <tr class="border-opacity-20">
                            <th>Last Name</th>
                            <td>
                                <input
                                    type="text"
                                    class="input input-sm input-outline bg-base-200"
                                    placeholder={user.lastname}
                                    bind:value={newLastName}
                                />
                            </td>
                        </tr>
                        <tr class="border-opacity-20">
                            <th>Email</th>
                            <td>
                                <input
                                    type="text"
                                    bind:value={newEmail}
                                    placeholder={user.email}
                                    class="input input-sm input-outline bg-base-200"
                                    autocomplete="off"
                                />
                            </td>
                        </tr>
                        <tr class="border-opacity-20">
                            <th>Role</th>
                            <td>
                                <input
                                    type="text"
                                    class="input input-sm input-outline bg-base-200 disabled:placeholder-opacity-100"
                                    placeholder={user.role}
                                    disabled
                                />
                            </td>
                            {#if !isAdmin}
                                <td>
                                    <button
                                        class="btn btn-ghost rounded-lg disabled:text-error disabled:bg-base-200"
                                        disabled
                                    >
                                        Contact Admin for Role
                                    </button>
                                </td>
                            {/if}
                        </tr>
                    </tbody>
                </table>
                <div class="flex col-span-2 p-2">
                    <div class="w-full flex justify-start">
                        <!-- svelte-ignore missing-declaration -->
                        {#if changes !== ''}
                            <button
                                class="btn btn-primary rounded-lg mt-4"
                                on:click={() => reauthenticate_modal.showModal()}
                            >
                                Save Changes
                            </button>
                        {/if}
                    </div>
                    <div class="w-full flex justify-end">
                        <button
                            class="btn btn-error rounded-lg mt-4"
                            on:click={() => passwordReset()}
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<dialog id="reauthenticate_modal" class="modal">
    <div class="modal-box rounded-xl shadow-xl bg-base-100">
        <form method="POST" action="?/reauthenticate" use:enhance={submitProfileChanges}>
            <h3 class="font-bold text-lg flex justify-center">Authentication</h3>
            <p class="text-sm flex justify-center">
                Reauthenticate your account by entering your current email and password.
            </p>
            <p class="text-xs flex justify-center">
                (Leave field blank if you do not wish to submit any changes.)
            </p>
            <div class="flex w-full col-span-2 mt-2 justify-between">
                <label class="label text-xs" for="firstName"><span>First Name</span></label>
                <label class="label text-xs" for="lastName"><span>Last Name</span></label>
            </div>
            <div class="flex w-full col-span-2">
                <div class="flex w-full justify-start">
                    <input
                        placeholder={user.firstname}
                        bind:value={newFirstName}
                        name="firstName"
                        type="text"
                        class="input bg-base-200 rounded-lg input-sm w-11/12"
                        autocomplete="given-name"
                    />
                </div>
                <div class="flex w-full justify-end">
                    <input
                        placeholder={user.lastname}
                        bind:value={newLastName}
                        name="lastName"
                        type="text"
                        class="input bg-base-200 rounded-lg input-sm w-11/12"
                        autocomplete="family-name"
                    />
                </div>
            </div>
            <label class="label text-xs mt-2" for="newEmail"><span>New Email</span></label>
            <input
                placeholder={user.email}
                bind:value={newEmail}
                name="newEmail"
                type="text"
                class="input bg-base-200 rounded-lg input-sm w-full p-2"
                autocomplete="off"
            />

            <label class="label text-xs mt-4" for="email"><span>Current Email</span></label>
            <input
                placeholder="Email"
                bind:value={user.email}
                name="email"
                type="email"
                class="input bg-base-200 rounded-lg input-sm w-full p-2"
                autocomplete="email"
            />
            <label class="label text-xs" for="password"><span>Password</span></label>
            <input
                placeholder="Password"
                name="password"
                type="password"
                class="input bg-base-200 rounded-lg input-sm w-full p-2"
                autocomplete="off"
            />
            <div class="modal-action">
                <button class="btn rounded-lg modal-action" formaction="?/reauthenticate">
                    Save Changes
                </button>
            </div>
        </form>
    </div>
</dialog>

<style>
</style>
