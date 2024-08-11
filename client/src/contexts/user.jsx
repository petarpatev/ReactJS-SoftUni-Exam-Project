
import { useState, useEffect, createContext } from "react";

import * as utilsService from "../utils/user"

export const userContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = utilsService.getUserData();
        return savedUser ? savedUser : null;
    });

    const setUserWrapper = (data) => {
        setUser(data)
    }

    useEffect(() => {
        if (user) {
            utilsService.setUserData(user);
        } else {
            utilsService.clearUserData();
        }
    }, [user])

    return (
        <userContext.Provider value={{ user, setUserWrapper }}>
            {children}
        </userContext.Provider>
    )
}