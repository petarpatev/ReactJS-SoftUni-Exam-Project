import { useContext } from "react";
import { userContext } from "../../contexts/user";

import { Navigate } from "react-router-dom";

export default function RouteGuardPublic({ children }) {
    const { user } = useContext(userContext);

    if (user) {
        return <Navigate to="/" replace />
    }
    return (
        <>
            {children}
        </>
    )
}