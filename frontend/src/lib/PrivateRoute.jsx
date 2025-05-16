import { Navigate } from "react-router-dom";
import useStore from "../store/useStore";

export default function PrivateRoute({children}) {
    const {token ,user} = useStore();
    if(!token || !user) {
        return <Navigate to="/signin" />
    }
    return children;
}
