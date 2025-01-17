import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname} />;
}