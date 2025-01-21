import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function useGetAllTask() {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["allTasks"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/allTasks");
      return data;
    },
    staleTime: 0,
    cacheTime: 0,
    retry: 2,
  });
}
