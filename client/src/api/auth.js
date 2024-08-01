import { setUserData, clearUserData } from "../utils/user.js";
import * as apiService from "./requester.js";

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
}

export const login = async (email, password) => {
    const user = await apiService.post(endpoints.login, { email, password });
    setUserData(user);
    return user;
}

export const register = async (email, password) => {
    const user = await apiService.post(endpoints.register, { email, password });
    setUserData(user);
    return user;
}

export const logout = () => {
    apiService.get(endpoints.logout);
    clearUserData();
}