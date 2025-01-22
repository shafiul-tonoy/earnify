import Loading from "../../../components/Loading";
import useGetAllSubmissions from "../../../hooks/useGetAllSubmissions";

export default function WorkerHome() {
  const { data: submissions, isLoading, error } = useGetAllSubmissions();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error?.message}</div>;

  const totalSubmissions = submissions?.length || 0;
  const totalPendingSubmissions =
    submissions?.filter((submission) => submission.status === "pending")
      .length || 0;
  const earn = submissions
    ?.filter((submission) => submission.status === "approved")
    .map((submission) => submission.payable_amount)
    .reduce((acc, price) => acc + price, 0);

  const approvedSubmissions = submissions?.filter(
    (submission) => submission.status === "approved"
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Worker Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Submissions */}
        <div className="p-6 bg-blue-500 text-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Submissions</h2>
          <p className="text-4xl font-bold">{totalSubmissions}</p>
        </div>
  
        {/* Total Pending Submissions */}
        <div className="p-6 bg-yellow-500 text-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Pending Submissions</h2>
          <p className="text-4xl font-bold">{totalPendingSubmissions}</p>
        </div>
  
        {/* Total Earnings */}
        <div className="p-6 bg-green-500 text-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Earnings</h2>
          <p className="text-4xl font-bold">{earn} Coins</p>
        </div>
      </div>
  
      {/* Approved Submissions Table */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Approved Submissions</h2>
        {approvedSubmissions?.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="table-auto w-full text-left border-collapse">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="px-6 py-3 border-b">Task Title</th>
                  <th className="px-6 py-3 border-b">Payable Amount</th>
                  <th className="px-6 py-3 border-b">Buyer Name</th>
                  <th className="px-6 py-3 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedSubmissions.map((submission) => (
                  <tr key={submission._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">{submission.task_title}</td>
                    <td className="px-6 py-4 border-b">{submission.payable_amount} Coin</td>
                    <td className="px-6 py-4 border-b">{submission.buyer_name}</td>
                    <td className="px-6 py-4 border-b capitalize text-green-600">{submission.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No approved submissions found.</p>
        )}
      </div>
    </div>
  );
  
}
