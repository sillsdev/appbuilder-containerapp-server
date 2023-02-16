<script>
    import SignUp from '../../lib/components/login/signupform.svelte';
    import { Link } from 'carbon-components-svelte';
    import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import { auth, userDoc } from '../../lib/fbconfig';
    import { setDoc } from 'firebase/firestore';
    let errors;
    async function signUp(event) {
        try {
            let user = await createUserWithEmailAndPassword(
                auth,
                event.detail.email,
                event.detail.password
            );
            await updateProfile(user.user, { displayName: event.detail.username });
            await setDoc(userDoc(auth.currentUser.uid), {
                username: user.user.displayName,
                email: user.user.email
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
        <div>Already have an account? <Link href="/login">Sign In</Link></div>
    </div>
</div>
