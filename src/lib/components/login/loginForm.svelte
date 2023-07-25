<script>
    import VisibleIcon from '$lib/icons/VisibleIcon.svelte';
    import VisibleOffIcon from '$lib/icons/VisibleOffIcon.svelte';
    import { createEventDispatcher } from 'svelte';

    let email,
        password,
        showPassword = false;

    const dispatcher = createEventDispatcher();

    function login() {
        dispatcher('login', {
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

<div class="flex flex-col w-full align-middle justify-center items-center">
    <div class="card flex flex-col bg-base-200 rounded-xl w-11/12 lg:w-4/5 lg:p-4 p-2">
        <div class="card-body items-center lg:p-4 p-2">
            <label class="label label-text"><span>Email</span></label>
            <div class="flex w-full justify-center">
                <input
                    class="input border border-black border-opacity-25 bg-base w-4/5 lg:w-3/4 rounded-xl m-2 p-2"
                    bind:value={email}
                    type="email"
                    labelText="Email"
                    placeholder="Enter your email"
                    name="email"
                />
            </div>

            <label class="label label-text"><span>Password</span></label>
            <div
                class="join w-4/5 lg:w-3/4 join-horizontal rounded-xl border border-base-300 border-opacity-20"
            >
                <input
                    class="input input-ghost w-full bg-base-100 join-item rounded-l-xl"
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
                    class="btn btn-ghost bg-base-100 join-item rounded-r-full"
                    on:click={togglePasswordVisibility}
                >
                    {#if showPassword}
                        <VisibleOffIcon />
                    {:else}
                        <VisibleIcon />
                    {/if}
                </button>
            </div>

            <div class="flex justify-center w-full m-2 p-2">
                <button class="btn btn-primary w-4/5 lg:w-1/5 rounded-xl p-2 m-2" on:click={login}
                    >Sign In</button
                >
            </div>
        </div>
    </div>
</div>
