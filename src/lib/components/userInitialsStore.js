import { writable } from 'svelte/store';

const userInitials = writable('');

export { userInitials };