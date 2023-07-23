import { db, auth } from '$lib/fbconfig';
import { signOut } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import { goto } from '$app/navigation';

export async function updateUserRole(userId, newRole) {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { role: newRole }, { merge: true });
}

export async function logOut() {
    console.log('attempting to sign out');
    await signOut(auth);
    await goto('/login');
}
