<script>
    import { createEventDispatcher } from 'svelte';
    let dispatch = createEventDispatcher();
    let username, email, password;

    function signup() {
        dispatch('signup', {
            username,
            email,
            password
        });
    }
</script>

<div class="form">
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
        labelText="Password"
        bind:value={password}
        placeholder="Enter password"
        tooltipAlignment="start"
        tooltipPosition="left"
        name="password"
    />
    <div class="space" />
    <button class="btn" on:click={signup}>Sign Up</button>
</div>

<style>
    .form {
        width: 30%;
    }
    .form .space {
        margin: 20px 0;
    }
</style>
