import Loading from "../../../components/Loading";
import useBuyerTasks from "../../../hooks/useBuyerTasks";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TaskToReview from "./TaskToReview";

export default function BuyerHome() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: tasks, isLoading, error } = useBuyerTasks(user?.email);

  // Fetch total payment paid by the buyer
  const { data: totalPaymentData } = useQuery({
    queryKey: ["totalCost", user?.email],
    queryFn: async () => {
      if (!user?.email) return 0; // Default to 0 if user email is missing
      const response = await axiosSecure.get(`/buyerPayment/${user.email}`);
 

      return response.data.totalCost;
    },
    initialData: 0, // Set an initial value of 0
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  // Calculate values with safeguards
  const totalTasks = tasks?.length || 0;
  const pendingTaskCount = tasks?.reduce(
    (sum, task) => sum + (task.required_workers || 0),
    0
  );
  const totalPayment = totalPaymentData || 0; // Ensure totalPayment defaults to 0

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Buyer Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Tasks */}
          <div className="p-4 bg-blue-100 rounded-md shadow">
            <h2 className="text-lg font-medium text-blue-600">Total Tasks</h2>
            <p className="text-3xl font-bold">{totalTasks}</p>
          </div>

          {/* Pending Tasks */}
          <div className="p-4 bg-yellow-100 rounded-md shadow">
            <h2 className="text-lg font-medium text-yellow-600">
              Pending Tasks
            </h2>
            <p className="text-3xl font-bold">{pendingTaskCount}</p>
          </div>

          {/* Total Payment Paid */}
          <div className="p-4 bg-green-100 rounded-md shadow">
            <h2 className="text-lg font-medium text-green-600">
              Total Payments
            </h2>
            <p className="text-3xl font-bold">${totalPayment.toFixed(2)}</p>
          </div>
        </div>

        {/* task to review */}
        <TaskToReview />
      </div>
    </>
  );
}
