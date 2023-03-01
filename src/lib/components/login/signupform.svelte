<script>
    import { Form, TextInput, PasswordInput, Button } from 'carbon-components-svelte';
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
    <Form>
        <div class="space" />
        <TextInput
            bind:value={email}
            labelText="Email address"
            placeholder="Enter your email"
            type="email"
            name="email"
        />
        <div class="space" />
        <PasswordInput
            bind:value={password}
            tooltipAlignment="start"
            tooltipPosition="left"
            labelText="Password"
            placeholder="Enter password"
            name="password"
        />
        <div class="space" />
        <Button size="small" on:click={signup}>Sign Up</Button>
    </Form>
</div>

<style>
    .form {
        width: 30%;
    }
    .form .space {
        margin: 20px 0;
    }
</style>
