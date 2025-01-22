import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { successAlert, errorAlert } from "../../../utilities/sweetalert2";

export default function TaskToReview() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Fetch all pending submissions
  const {
    data: submissions,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["buyerSubmissions", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/pendingSubmissions/${user?.email}`
      );
      return response.data;
    },
    enabled: !!user?.email,
  });

  // Handle approve action
  const handleApprove = async (submission) => {
    try {
      const response = await axiosSecure.patch(
        `/approveSubmission/${submission._id}`
      );
      if (response.data.modifiedCount > 0) {
        successAlert("Submission approved successfully!");
        refetch();
      }
    } catch (err) {
      errorAlert("Failed to approve submission!");
      console.log(err);
    }
  };

  // Handle reject action
  const handleReject = async (submission) => {
    try {
      const response = await axiosSecure.patch(
        `/rejectSubmission/${submission._id}`
      );
      if (response.data.modifiedCount > 0) {
        successAlert("Submission rejected successfully!");
        refetch();
      }
    } catch (err) {
      errorAlert("Failed to reject submission!");
      console.log(err);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Pending Submissions</h1>
      {submissions?.length === 0 ? (
        <p>No pending submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Worker Name</th>
                <th>Task Title</th>
                <th>Payable Amount ($)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={submission._id}>
                  <td>{index + 1}</td>
                  <td>{submission.worker_name}</td>
                  <td>{submission.task_title}</td>
                  <td>${submission.payable_amount.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      View Submission
                    </button>
                    <button
                      onClick={() => handleApprove(submission)}
                      className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(submission)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal to view submission details */}
      {selectedSubmission && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "16px",
              }}
            >
              Submission Details
            </h2>
            <p>
              <strong>Worker Name:</strong> {selectedSubmission.worker_name}
            </p>
            <p>
              <strong>Task Title:</strong> {selectedSubmission.task_title}
            </p>
            <p>
              <strong>Payable Amount:</strong> $
              {selectedSubmission.payable_amount.toFixed(2)}
            </p>
            <p>
              <strong>Submission Info:</strong>{" "}
              {selectedSubmission.submission_info}
            </p>
            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <button
                onClick={() => setSelectedSubmission(null)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#555",
                  color: "#fff",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
