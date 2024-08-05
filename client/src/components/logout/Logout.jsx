import { useEffect, useContext } from "react";
import { userContext } from "../../contexts/user";
import { useNavigate } from "react-router-dom";

import * as authService from "../../api/auth"

export default function Logout() {
    const navigate = useNavigate();
    const { setUserWrapper } = useContext(userContext);
    useEffect(() => {
        (async () => {
            try {
                authService.logout();
                setUserWrapper(null);
                navigate('/');
            } catch (err) {
                console.error("Failed to logout:", err);
                alert("Failed to logout! Please try again");
            }
        })()
    }, [])
}