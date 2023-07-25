<script>
    import VisibleIcon from '$lib/icons/VisibleIcon.svelte';
    import VisibleOffIcon from '$lib/icons/VisibleOffIcon.svelte';
    import { createEventDispatcher } from 'svelte';

    let dispatch = createEventDispatcher();

    let firstname,
        lastname,
        email,
        password,
        showPassword = false;

    function signup() {
        dispatch('signup', {
            firstname,
            lastname,
            email,
            password
        });
    }

    function togglePasswordVisibility() {
        const passwordInput = document.querySelector('#password-input');
        showPassword = !showPassword;

        if (showPassword) {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    }
</script>

<div class="card w-full rounded-xl bg-base-200 m-4 p-4">
    <div class="card-body">
        <div class="flex flex-col gap-2">
            <div class="flex flex-col w-full">
                <label class="label-text"><span>First Name</span></label>
                <input
                    class="input input-bordered rounded-xl w-full"
                    bind:value={firstname}
                    type="firstname"
                    labelText="FirstName"
                    placeholder="Enter Your First Name"
                    name="firstname"
                />
            </div>

            <div class="flex flex-col w-full">
                <label class="label-text"><span>Last Name</span></label>
                <input
                    class="input input-bordered rounded-xl w-full"
                    bind:value={lastname}
                    type="lastname"
                    labelText="LastName"
                    placeholder="Enter Your Last Name"
                    name="lastname"
                />
            </div>

            <div class="flex flex-col w-full">
                <label class="label label-text"><span>Email</span></label>
                <input
                    class="input input-bordered rounded-xl w-full"
                    bind:value={email}
                    type="email"
                    labelText="Email"
                    placeholder="Enter your email"
                    name="email"
                />
            </div>

            <div class="flex flex-col">
                <label class="label label-text"><span>Password</span></label>
                <div class="join join-horizontal border border-base-300 w-full rounded-xl">
                    <input
                        class="input w-full join-item rounded-l-xl"
                        id="password-input"
                        labelText="Password"
                        type="password"
                        bind:value={password}
                        placeholder="Enter password"
                        tooltipAlignment="start"
                        tooltipPosition="left"
                        name="password"
                    />
                    <button
                        class="btn btn-ghost bg-base-100 join-item align-middle items-center rounded-r-xl"
                        on:click={togglePasswordVisibility}
                    >
                        {#if showPassword}
                            <VisibleOffIcon />
                        {:else}
                            <VisibleIcon />
                        {/if}
                    </button>
                </div>
            </div>
            <button class="btn btn-primary w-full rounded-xl mt-8" on:click={signup}>
                Sign Up
            </button>
        </div>
    </div>
</div>
