import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function useFindTasks() {
  const axiosSecure = useAxiosSecure();

  const fetchTasks = async () => {
    const {data} = await axiosSecure.get("/worker/taskList");
    return data;
  };

  return useQuery({
    queryKey: ["buyerTaskList"], // Unique key for caching
    queryFn: fetchTasks,    
    staleTime: 0,
    retry: 2, // Retry failed requests up to 2 times
  });

}

