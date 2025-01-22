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
  <h3 className="font-subheading text-2xl font-extrabold text-gray-800 mb-4">My Submissions</h3>
  <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
    <table className="table-auto w-full text-left border-collapse">
      {/* Table Head */}
      <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
        <tr>
          <th className="px-4 py-3">Title</th>
          <th className="px-4 py-3">Submission Detail</th>
          <th className="px-4 py-3">Payable Amount</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Buyer</th>
        </tr>
      </thead>
      <tbody>
        {currentSubmissions.map((submission) => (
          <tr key={submission._id} className="border-t hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-800">{submission.task_title}</td>
            <td className="px-4 py-3 text-gray-600 truncate max-w-xs">{submission.submission_details}</td>
            <td className="px-4 py-3 text-gray-800">${submission.payable_amount}</td>
            <td
              className={`px-4 py-3 font-bold ${
                submission.status === "approved" ? "text-green-600" : submission.status === "pending" ? "text-orange-600" : "text-red-600"
              }`}
            >
              {submission.status}
            </td>
            <td className="px-4 py-3 text-gray-800">{submission.buyer_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination */}
  <div className="flex justify-between items-center mt-6">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md shadow-sm hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>
    <p className="text-gray-700 font-medium">
      Page {currentPage} of {totalPages}
    </p>
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md shadow-sm hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
</div>

  );
}
