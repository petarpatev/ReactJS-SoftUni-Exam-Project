export const isValid = (data) => {
    return !Object.values(data).some(x => x == '');
}