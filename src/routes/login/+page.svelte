<script>
    import SignIn from '$lib/components/login/loginForm.svelte';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { auth } from '$lib/fbconfig';
    import { goto } from '$app/navigation';
    import toast from 'svelte-french-toast';

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
            toast.error('Error signing in.');
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
    <div class="flex justify-center items-center gap-2 mt-4">
        <button class="btn btn-wide btn-ghost rounded-xl hover:underline hover:bg-base-100">
            Forgot your password?
        </button>
    </div>
</div>
