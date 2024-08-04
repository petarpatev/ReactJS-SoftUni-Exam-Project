export const isValid = (data) => {
    return !Object.values(data).some(x => x == '');
}

export const equalPasswords = (pass, rePass) => {
    return pass == rePass;
}