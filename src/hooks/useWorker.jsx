import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useWorker() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isWorker, isPending: isWorkerLoading } = useQuery({
    queryKey: [user?.email, 'isWorker'],
    enabled: !loading,
    queryFn: async () => {
      // console.log('Checking if user is a worker', user)
      const res = await axiosSecure.get(`/users/worker/${user.email}`);
      return res.data?.worker;
    }
  });
  return [isWorker, isWorkerLoading];
}
