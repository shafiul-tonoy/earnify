import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

export default function MySubmissions() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: submissions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/submissions/${user?.email}`);
      return response.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <h1>Error: {error.message}</h1>;

  return (
    <>
      <h3 className="font-subheading text-lg font-bold">My Submissions</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Submission Detail</th>
              <th>Payable Amount</th>
              <th>Status</th>
              <th>Buyer</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td>{submission.task_title}</td>
                <td>{submission.submission_details}</td>
                <td>{submission.payable_amount}</td>
                {/* Highlight status based on its value */}
                <td
                  style={{
                    color:
                      submission.status === "approved"
                        ? "green"
                        : submission.status === "pending"
                        ? "orange"
                        : "red", // Defaults to red for 'Rejected'
                    fontWeight: "bold",
                  }}
                >
                  {submission.status}
                </td>
                <td>{submission.buyer_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
