import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


export default function useTotalEarning(){
    const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["total earning"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/approvedSubmissions/totalPayable/${user.email}`);
      return data;
    },
    staleTime: 0,
    cacheTime: 0,
    retry: 2,
  });
}