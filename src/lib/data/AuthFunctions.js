import { db, auth } from '$lib/fbconfig';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { goto } from '$app/navigation';

export async function updateUserRole(userId, newRole) {
    const userRef = doc(db, 'users', `${userId}`);
    await updateDoc(userRef, {
        role: newRole
    });
}

export async function logOut() {
    console.log('attempting to sign out');
    await signOut(auth);
    await goto('/login');
}

export async function updateFirstName(newName) {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, {
        firstname: newName
    });
}

export async function updateLastName(newName) {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, {
        lastname: newName
    });
}

export async function updateStashedEmail(newEmail) {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, {
        email: newEmail
    });
}

export async function passwordReset() {
    sendPasswordResetEmail(auth, auth.currentUser.email)
        .then(() => {
            console.log('Password reset email sent!');
        })
        .catch((error) => {
            console.log(error);
        });
}
