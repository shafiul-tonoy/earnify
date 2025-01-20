import Loading from "../../../components/Loading";
import useUserInfo from "../../../hooks/useUserInfo";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function PaymentHistory() {
  const { data: userInfo } = useUserInfo();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders", userInfo],

    queryFn: async () => {
      const response = await axiosSecure.get(`/orders/${userInfo.email}`);
      return response.data;
    },
  });


  if (isLoading) return <Loading />
  if (isError) return <h1>Error: {error.message}</h1>;

  return (
    <>
      <h1>Payment History</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Payment</th>
              <th>Get Coin</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
          {data.map((item, index) => (
          <tr key={index}>
            <td>${item.cost}</td>
            <td>{item.coins}</td>
            <td>{item.transactionId}</td>
          </tr>
        ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
