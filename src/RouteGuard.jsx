import { useContext } from "react";
import { AuthContext } from "./services/AuthContext";
import { Navigate } from "react-router-dom";

function RouteGuard ({children}) {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <></>
  }

  if (!user) {
    return <Navigate to='/sign-in'/>
  }

  return children;
}

export default RouteGuard;