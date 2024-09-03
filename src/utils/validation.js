export function isEmpty(string){
    return string.trim().length === 0;
}

export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePassword(password, minLen=6) {
    return isEmpty(password) && password.trim().length >= minLen;
}