<script>
    import SignIn from '$lib/components/login/loginForm.svelte';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { auth, userDoc } from '$lib/fbconfig';
    import { goto } from '$app/navigation';
    import { setDoc } from 'firebase/firestore';
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
<div>
    <div class="header">
        <h4>Login</h4>
    </div>
    <div class="signin-form">
        {#if error}
            <div class="notification-block">
                <p>{error}</p>
            </div>
        {/if}
        <SignIn on:login={signIn} />
        <div>Don't have an account? <a class="link link-hover" href="/signup">Sign Up</a></div>
    </div>
</div>

<style>
    .header {
        width: 100vw;
        padding: 2em 0;
        min-height: 20vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .header h4 {
        font-weight: 600;
        font-size: 3rem;
    }
    .signin-form {
        min-height: 80vh;
        display: grid;
        place-items: center;
    }
    .notification-block {
        min-width: 20vw;
        padding: 1.2em 0.75em;
        border-radius: 5px;
        background-color: #fe634e;
    }
</style>
