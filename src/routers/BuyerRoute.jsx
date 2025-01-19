import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useBuyer from "../hooks/useBuyer";
import Loading from "../components/Loading";

export default function BuyerRoute({ children }) {
  const { user, loading } = useAuth();
  const [isBuyer, isBuyerLoading] = useBuyer();
  const location = useLocation();

  if (loading || isBuyerLoading) {
    return <Loading />;
  }

  if (user && isBuyer) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
}
