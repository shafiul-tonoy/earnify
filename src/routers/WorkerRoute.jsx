import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useWorker from "../hooks/useWorker";
import Loading from "../components/Loading";

export default function WorkerRoute({ children }) {
  const { user, loading } = useAuth();
  const [isWorker, isWorkerLoading] = useWorker();
  const location = useLocation();

  if (loading || isWorkerLoading) {
    return <Loading />;
  }

  if (user && isWorker) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
}
