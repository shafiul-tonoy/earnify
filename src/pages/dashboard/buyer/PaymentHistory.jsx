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
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Payment History</h1>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="table-auto w-full text-left border-collapse">
            {/* Table Head */}
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2 border-b">Payment</th>
                <th className="px-4 py-2 border-b">Get Coin</th>
                <th className="px-4 py-2 border-b">Transaction ID</th>
              </tr>
            </thead>
  
            {/* Table Body */}
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b text-green-600 font-semibold">${item.cost}</td>
                    <td className="px-4 py-2 border-b text-blue-600 font-semibold">{item.coins}</td>
                    <td className="px-4 py-2 border-b text-gray-800">{item.transactionId}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center text-gray-500 py-4 border-b"
                  >
                    No payment history available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
  
}
