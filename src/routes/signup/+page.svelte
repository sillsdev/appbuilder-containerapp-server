<script>
    import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
    import SignUp from '$lib/components/login/signupform.svelte';
    import { doc, setDoc } from 'firebase/firestore';
    import { goto } from '$app/navigation';
    import { db, auth } from '$lib/fbconfig';

    let errors;

    async function signUp(event) {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                event.detail.email,
                event.detail.password
            );

            await updateProfile(user.user, {
                displayName: `${event.detail.firstname} ${event.detail.lastname}`
            });

            await setDoc(doc(db, 'users', user.user.uid), {
                email: user.user.email,
                firstname: event.detail.firstname,
                lastname: event.detail.lastname
            });

            await goto('/admin');
        } catch (e) {
            console.log('error from creating user', e);
        }
    }
</script>

<svelte:head>
    <title>Register</title>
</svelte:head>
<div>
    <div class="header">
        <h4>Sign Up</h4>
    </div>
    <div class="form-container">
        {#if errors}
            {#each errors as error, i (i)}
                <div class="notification-block">
                    <p>{error}</p>
                </div>
            {/each}
        {/if}
        <SignUp on:signup={signUp} />
        <div>Already have an account? <a class="link link-hover" href="/login">Sign In</a></div>
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
    .form-container {
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
