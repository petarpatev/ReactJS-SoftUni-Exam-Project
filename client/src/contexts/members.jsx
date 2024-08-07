import { useState, createContext } from "react";

export const membersContext = createContext();

export const MembersProvider = ({ children }) => {
    const [members, setMembers] = useState([
        {
            email: "peter@abv.bg",
            username: "Peter",
            _id: '35c62d76-8152-4626-8712-eeb96381bea8'
        },
        {
            email: "george@abv.bg",
            username: "George",
            _id: '847ec027-f659-4086-8032-5173e2f9c93a'
        },
        {
            email: "admin@abv.bg",
            username: "Admin",
            _id: '60f0cf0b-34b0-4abd-9769-8c42f830dffc'
        }
    ]);

    const setMembersWrapper = (data) => {
        setMembers(state => ([...state, data]));
    }

    return (
        <membersContext.Provider value={{ members, setMembersWrapper }}>
            {children}
        </membersContext.Provider>
    )
}