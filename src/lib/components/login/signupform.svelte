<script>
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

<div class="form">
    <div class="space" />
    <input
        class="input input-bordered w-full max-w-xs"
        bind:value={firstname}
        type="firstname"
        labelText="FirstName"
        placeholder="Enter Your First Name"
        name="firstname"
    />
    <div class="space" />
    <input
        class="input input-bordered w-full max-w-xs"
        bind:value={lastname}
        type="lastname"
        labelText="LastName"
        placeholder="Enter Your Last Name"
        name="lastname"
    />
    <div class="space" />
    <input
        class="input input-bordered w-full max-w-xs"
        bind:value={email}
        type="email"
        labelText="Email"
        placeholder="Enter your email"
        name="email"
    />
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
    <button class="btn" on:click={signup}>Sign Up</button>
</div>
<div class="psbtn">
    <button class="btn btn-xs" on:click={togglePasswordVisibility}>
        {showPassword ? 'Hide Password' : 'Show Password'}
    </button>
</div>

<style>
    .form {
        width: 30%;
    }
    .form .space {
        margin: 20px 0;
    }

    .psbtn {
        position: absolute;
        top: 56%;
        right: 38%;
    }
</style>
