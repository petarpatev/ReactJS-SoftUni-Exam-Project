export const getUserData = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export const clearUserData = () => {
    localStorage.removeItem('user');
}

export const setUserData = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
}

export const getToken = () => {
    const user = getUserData();
    if (user) {
        return user.accessToken;
    } else {
        return null;
    }
}