import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function useGetUsers() {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
    staleTime: 0,
    cacheTime: 0,
    retry: 2,
  });
}
