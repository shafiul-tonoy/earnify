import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

export default function useGetAllSubmissions() {
    const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["allSubmissions"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/allSubmissions/${user.email}`);
      return data;
    },
    staleTime: 0,
    cacheTime: 0,
    retry: 2,
  });
}
