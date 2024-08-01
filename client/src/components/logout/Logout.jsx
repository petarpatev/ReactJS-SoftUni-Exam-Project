import { useEffect, useContext } from "react";
import { userContext } from "../../contexts/user";
import { useNavigate } from "react-router-dom";

import * as authService from "../../api/auth"

export default function Logout() {
    const navigate = useNavigate();
    const { setUserWrapper } = useContext(userContext);
    useEffect(() => {
        (async () => {
            authService.logout();
            setUserWrapper(null);
            navigate('/');
        })()
    }, [])
}