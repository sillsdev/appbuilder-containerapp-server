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
    <div class="space" />
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
    <div class="space" />
    <button class="btn" on:click={login}>Sign In</button>
</div>
<div class="psbtn">
    <button class="btn btn-xs" on:click={togglePasswordVisibility}>
        {showPassword ? 'Hide Password' : 'Show Password'}
    </button>
</div>

<style>
    .form-control {
        width: 30%;
    }
    .form-control .space {
        margin: 20px 0;
    }
    .psbtn {
        position: absolute;
        top: 47.5%;
        right: 38%;
    }
</style>
