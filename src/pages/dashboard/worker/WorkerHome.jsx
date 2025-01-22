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
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Worker Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Submissions */}
        <div className="p-4 bg-blue-500 text-white rounded shadow-md">
          <h2 className="text-lg font-semibold">Total Submissions</h2>
          <p className="text-3xl">{totalSubmissions}</p>
        </div>

        {/* Total Pending Submissions */}
        <div className="p-4 bg-yellow-500 text-white rounded shadow-md">
          <h2 className="text-lg font-semibold">Total Pending Submissions</h2>
          <p className="text-3xl">{totalPendingSubmissions}</p>
        </div>

        {/* Total Earnings */}
        <div className="p-4 bg-green-500 text-white rounded shadow-md">
          <h2 className="text-lg font-semibold">Total Earnings</h2>
          <p className="text-3xl">{earn} Coin</p>
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Approved Submissions</h2>
        {approvedSubmissions?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Task Title</th>
                  <th className="border border-gray-300 px-4 py-2">Payable Amount</th>
                  <th className="border border-gray-300 px-4 py-2">Buyer Name</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedSubmissions.map((submission) => (
                  <tr key={submission._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{submission.task_title}</td>
                    <td className="border border-gray-300 px-4 py-2">{submission.payable_amount} Coin</td>
                    <td className="border border-gray-300 px-4 py-2">{submission.buyer_name}</td>
                    <td className="border border-gray-300 px-4 py-2 capitalize text-green-500">
                      {submission.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No approved submissions found.</p>
        )}
      </div>
    </div>
  );
}
