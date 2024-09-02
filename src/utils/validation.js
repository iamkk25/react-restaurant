export function isNotEmpty(string){
    return string.trim().length === 0;
}

export function validateEmail(email) {
    return isNotEmpty(email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePassword(password, minLen=6) {
    return isNotEmpty(password) && password.trim().length >= minLen;
}