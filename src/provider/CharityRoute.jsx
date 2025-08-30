import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthProvider";


const CharityRoute = ({ children }) => {
  const { user, dbUser, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-green-600"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (dbUser?.role !== "charity") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default CharityRoute;
