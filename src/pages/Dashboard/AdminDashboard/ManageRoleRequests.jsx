// src/pages/Dashboard/Admin/ManageRoleRequests.jsx
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageRoleRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch role requests
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get("/role-requests");
      setRequests(data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load role requests", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle approve/reject
  const handleAction = async (id, status) => {
    try {
      await axiosSecure.patch(`/role-requests/${id}`, { status });
      Swal.fire("Success", `Request ${status}`, "success");
      setSelectedRequest(null); // close drawer
      fetchRequests();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Action failed", "error");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Role Requests</h2>

      {requests.length === 0 ? (
        <p>No role requests found</p>
      ) : (
        <div className="overflow-x-auto max-w-4xl">
          <table className="table table-compact w-full border">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th>Name</th>
                <th>Organization</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.name}</td>
                  <td>{req.organization}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        req.status === "Pending"
                          ? "bg-yellow-500"
                          : req.status === "Approved"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    <label
                      htmlFor="request-drawer"
                      className="btn btn-xs btn-primary"
                      onClick={() => setSelectedRequest(req)}
                    >
                      View Details
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Drawer */}
      <div className="drawer drawer-end">
        <input id="request-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="request-drawer"
            aria-label="close drawer"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-base-100 text-base-content min-h-full w-96 p-6">
            {selectedRequest ? (
              <>
                <h3 className="text-xl font-bold mb-2">{selectedRequest.name}</h3>
                <p className="mb-1">
                  <strong>Email:</strong> {selectedRequest.email}
                </p>
                <p className="mb-1">
                  <strong>Organization:</strong> {selectedRequest.organization}
                </p>
                <p className="mb-1">
                  <strong>Mission:</strong> {selectedRequest.mission}
                </p>
                <p className="mb-1">
                  <strong>Transaction ID:</strong> {selectedRequest.transactionId}
                </p>
                <p className="mb-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      selectedRequest.status === "Pending"
                        ? "bg-yellow-500"
                        : selectedRequest.status === "Approved"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {selectedRequest.status}
                  </span>
                </p>
                <div className="flex gap-2 mt-4">
                  <button
                    className="btn btn-success flex-1"
                    disabled={selectedRequest.status !== "Pending"}
                    onClick={() =>
                      handleAction(selectedRequest._id, "Approved")
                    }
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-error flex-1"
                    disabled={selectedRequest.status !== "Pending"}
                    onClick={() =>
                      handleAction(selectedRequest._id, "Rejected")
                    }
                  >
                    Reject
                  </button>
                </div>
              </>
            ) : (
              <p>Select a request to see details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRoleRequests;
