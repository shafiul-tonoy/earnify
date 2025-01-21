import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function useWithdraw() {
  const axiosSecure = useAxiosSecure();

  const fetchWithdraws = async () => {
    const response = await axiosSecure.get("/AllWithdraws");
    return response.data;
  };

  return useQuery({
    queryKey: ["withdraws"], // Query key for caching and refetching
    queryFn: fetchWithdraws, // Fetch function
    staleTime: 300000, // Cache results for 5 minutes
    retry: 2, // Retry on failure     
  });
}
