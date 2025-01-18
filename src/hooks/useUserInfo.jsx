import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const useUserInfo = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const fetchUserByEmail = async () => {
    const { data } = await axiosSecure.get(`/users/${user.email}`);
    return data;
  };

  return useQuery({
    queryKey: ["user", user.email], // Unique key for caching
    queryFn: fetchUserByEmail,
    enabled: !!user.email, // Only run the query if email exists
    staleTime: 15 * 60 * 1000, // Cache data for 5 minutes
    retry: 2, // Retry failed requests up to 2 times
  });
};

export default useUserInfo;
