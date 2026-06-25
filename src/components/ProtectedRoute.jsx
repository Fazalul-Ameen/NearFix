import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return token ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
