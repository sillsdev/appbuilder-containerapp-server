<script>
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

<div class="form-control">
    <div class="space">
        <input
            class="input input-bordered w-full max-w-xs"
            bind:value={email}
            type="email"
            labelText="Email"
            placeholder="Enter your email"
            name="email"
        />
    </div>
    <div class="space">
        <div class="password-container">
            <input
                class="input input-bordered w-full max-w-xs"
                id="password-input"
                labelText="Password"
                type="password"
                bind:value={password}
                placeholder="Enter password"
                tooltipAlignment="start"
                tooltipPosition="left"
                name="password"
            />
            <button class="btn btn-xs show-password" on:click={togglePasswordVisibility}>
                {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
        </div>
    </div>
    <div class="space">
        <button class="btn" on:click={login}>Sign In</button>
    </div>
</div>

<style>
    .form-control {
        width: 30%;
        min-width: 150px;
    }
    .form-control .space {
        margin: 20px 0;
    }
    .password-container {
        display: flex;
        align-items: center;
    }
    .input {
        flex-grow: 1;
        min-width: 150px;
    }
    .show-password {
        margin-left: 5px;
    }
</style>
