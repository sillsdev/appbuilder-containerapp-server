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
                lastname: event.detail.lastname,
                role: 'none'
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
<div class="flex flex-col">
    <div class="flex justify-center mt-8 text-4xl">
        <h4>Sign Up</h4>
    </div>
    <div class="flex w-full justify-center">
        <div class="flex w-full lg:w-3/4 justify-center">
            {#if errors}
                {#each errors as error, i (i)}
                    <div class="notification-block">
                        <p>{error}</p>
                    </div>
                {/each}
            {/if}
            <SignUp on:signup={signUp} />
        </div>
    </div>
</div>

<div class="flex flex-row justify-center gap-2">
    Already have an account? <a class="link link-hover gap-2" href="/login">Sign In</a>
</div>

<style>
    .notification-block {
        min-width: 20vw;
        padding: 1.2em 0.75em;
        border-radius: 5px;
        background-color: #fe634e;
    }
</style>
