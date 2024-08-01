import { useContext } from "react";
import { userContext } from "../../contexts/user";

import { Navigate } from "react-router-dom";

export default function RouteGuardPrivate({ children }) {
    const { user } = useContext(userContext);

    if (!user) {
        return <Navigate to="/login" replace />
    }
    return (
        <>
            {children}
        </>
    )
}