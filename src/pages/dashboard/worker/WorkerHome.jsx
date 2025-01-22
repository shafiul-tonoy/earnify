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

  return (
    <>
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
            <p className="text-3xl">{earn}</p>
          </div>
        </div>
      </div>
    </>
  );
}
