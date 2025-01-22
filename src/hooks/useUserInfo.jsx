import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const useUserInfo = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const fetchUserByEmail = async () => {
    if (!user?.email) return null; // Safeguard against missing email
    const { data } = await axiosSecure.get(`/users/${user.email}`);
    return data;
  };

  return useQuery({
    queryKey: ["user", user?.email], // Unique key for caching
    queryFn: fetchUserByEmail,
    enabled: !!user?.email, // Only run the query if email exists
    staleTime: 15 * 60 * 1000, // Cache data for 15 minutes
    retry: 2, // Retry failed requests up to 2 times
    onError: (error) => {
      console.error("Error fetching user info:", error);
    },
  });
};

export default useUserInfo;

