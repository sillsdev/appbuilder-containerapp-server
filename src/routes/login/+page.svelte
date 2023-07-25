<script>
    import SignIn from '$lib/components/login/loginForm.svelte';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { auth } from '$lib/fbconfig';
    import { goto } from '$app/navigation';

    let error;

    async function signIn(event) {
        try {
            let user = await signInWithEmailAndPassword(
                auth,
                event.detail.email,
                event.detail.password
            );
            await goto('/admin');
        } catch (err) {
            console.log('error signin in', err.message);
            error = err.message;
            if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
                error = 'Wrong email or password';
            } else {
                error = err.message;
            }
        }
    }
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<div class="flex flex-col w-full justify-center">
    <div class="flex text-4xl font-bold justify-center m-2 p-2">
        <h4>Welcome Back!</h4>
    </div>

    <div class="flex w-full justify-center">
        {#if error}
            <div>
                <p>{error}</p>
            </div>
        {/if}

        <SignIn on:login={signIn} />
    </div>

    <div class="flex justify-center items-center gap-2 mt-4">
        Don't have an account? <a class="link link-hover" href="/signup"> Sign Up </a>
    </div>
</div>
