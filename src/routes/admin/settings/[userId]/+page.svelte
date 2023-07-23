<script>
    import { ArrowBackIcon } from '$lib/icons';

    export let data;
    const { user } = data;
    console.log(user);

    let isAdmin;

    if (user.role === 'admin') {
        isAdmin = true;
    }
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
    <div class="card flex flex-col w-4/5 bg-primary p-4 m-2 rounded-xl">
        <div class="card-title">
            <h1>User Info</h1>
        </div>

        <div class="card-body">
            <div class="overflow-x-auto">
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
                            <td>{user.firstname}</td>
                            <td>
                                <button class="btn btn-ghost rounded-lg"> Change Name </button>
                            </td>
                        </tr>
                        <tr class="border-opacity-20">
                            <th>Last Name</th>
                            <td>{user.lastname}</td>
                            <td>
                                <button class="btn btn-ghost rounded-lg"> Change Name </button>
                            </td>
                        </tr>
                        <tr class="border-opacity-20">
                            <th>Email</th>
                            <td>{user.email}</td>
                            <td>
                                <button class="btn btn-ghost rounded-lg"> Change Email </button>
                            </td>
                        </tr>
                        <tr class="border-opacity-20">
                            <th>Role</th>
                            <td>{user.role}</td>
                            {#if !isAdmin}
                                <td>
                                    <button class="btn btn-ghost rounded-lg" disabled>
                                        Contact Admin for Role
                                    </button>
                                </td>
                            {/if}
                        </tr>
                    </tbody>
                </table>
                <div class="flex justify-center">
                    <button class="btn btn-accent rounded-lg mt-4"> Reset Password </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
</style>
