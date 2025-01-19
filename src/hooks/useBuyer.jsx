import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useBuyer() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isBuyer, isPending: isBuyerLoading } = useQuery({
    queryKey: [user?.email, 'isBuyer'],
    enabled: !loading,
    queryFn: async () => {
    //   console.log('Checking if user is a buyer', user);
      const res = await axiosSecure.get(`/users/buyer/${user.email}`);
      return res.data?.buyer;
    }
  });
  return [isBuyer, isBuyerLoading];
}
