<script>
    import { createEventDispatcher } from 'svelte';
    let email, password;
    const dispatcher = createEventDispatcher();
    function login() {
        dispatcher('login', {
            email,
            password
        });
    }
</script>

<div class="form-container">
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
        labelText="Password"
        bind:value={password}
        placeholder="Enter password"
        tooltipAlignment="start"
        tooltipPosition="left"
        name="password"
    />
    <div class="space" />
    <button class="btn" on:click={login}>Sign In</button>
</div>

<style>
    .form-container {
        width: 30%;
    }
    .form-container .space {
        margin: 20px 0;
    }
</style>
