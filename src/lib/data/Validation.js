const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export function validateEmail(email) {
    if (email.value.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}
