import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {

  const token = localStorage.getItem("token"); 

  if (token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;