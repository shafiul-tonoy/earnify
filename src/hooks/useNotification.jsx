import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

export default function useNotification() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/notifications/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email, // Only fetch if the user email exists
  });

  return { notifications, isLoading };
}
