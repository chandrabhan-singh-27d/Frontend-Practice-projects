import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({
    children,
    authentication = true
}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        // TODO: refactor
        if (authentication && authStatus !== authentication) {
            navigate("/login");
        } else if (!authentication && authStatus !== authentication) {
            navigate("/");
        }

        setLoading(false)
    }, [authStatus, navigate, authentication])
    return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected;