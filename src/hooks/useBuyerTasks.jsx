import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useBuyerTasks = (email) => {
    const axiosSecure = useAxiosSecure()
  const fetchTasks = async () => {
    const { data } = await axiosSecure.get(`/tasks/${email}`);
    return data;
  };

  return useQuery({
    queryKey: ["tasks", email], // Unique query key
    queryFn: fetchTasks, // Fetch function
    enabled: !!email, // Only fetch if email is not null or undefined
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: 2, // Retry failed requests up to 2 times
  });
};

export default useBuyerTasks;
