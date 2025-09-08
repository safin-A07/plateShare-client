import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

;

const RequestedDonation = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosSecure.get("/restaurant/requests")
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("❌ Error fetching requests:", err));
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/requests/${id}`, { status });
      Swal.fire("Success", `Request ${status}`, "success");

      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status } : req
        )
      );
    } catch (err) {
      console.error("❌ Error updating request:", err);
      Swal.fire("Error", "Failed to update request", "error");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Donation Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Donation Title</th>
              <th>Charity Name</th>
              <th>Charity Email</th>
              <th>Description</th>
              <th>Pickup Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.donationTitle}</td>
                <td>{req.charityName}</td>
                <td>{req.charityEmail}</td>
                <td>{req.description}</td>
                <td>{req.pickupTime}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      req.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : req.status === "Accepted"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td>
                  {req.status === "Pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateStatus(req._id, "Accepted")}
                        className="btn btn-success btn-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(req._id, "Rejected")}
                        className="btn btn-error btn-sm"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedDonation;
