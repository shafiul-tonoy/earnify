import { useState } from "react";
import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

export default function MySubmissions() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of submissions per page

  const {
    data: submissions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["submissions", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/submissions/${user?.email}`);
      return response.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <h1>Error: {error.message}</h1>;

  // Calculate pagination
  const totalItems = submissions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentSubmissions = submissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <h3 className="font-subheading text-lg font-bold">My Submissions</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Head */}
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
            {currentSubmissions.map((submission) => (
              <tr key={submission._id}>
                <td>{submission.task_title}</td>
                <td>{submission.submission_details}</td>
                <td>{submission.payable_amount}</td>
                <td
                  style={{
                    color:
                      submission.status === "approved"
                        ? "green"
                        : submission.status === "pending"
                        ? "orange"
                        : "red",
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
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm btn-outline"
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-sm btn-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
}
