import { useNavigate } from "react-router-dom";

// interface PrivateRouteProps
interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
        navigate('/login', { replace: true });
        return null; // or a loading spinner, etc.
    }

    return <>{children}</>;
}

export default PrivateRoute;