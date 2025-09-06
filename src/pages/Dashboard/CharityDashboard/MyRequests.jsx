import { useContext, useEffect, useState } from "react";


import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyRequests = () => {
  const { user, dbUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch requests for this charity
  useEffect(() => {
    if (user?.email && dbUser?.role === "charity") {
      axiosSecure
        .get(`/requests?charityEmail=${user.email}`)
        .then((res) => {
          setRequests(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ Error fetching requests:", err);
          setLoading(false);
        });
    }
  }, [user, dbUser, axiosSecure]);

  // Cancel request
  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be cancelled permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/requests/${id}`);
          setRequests((prev) => prev.filter((req) => req._id !== id));
          Swal.fire("Cancelled!", "Your request has been removed.", "success");
        } catch (err) {
          console.error("❌ Error cancelling request:", err);
          Swal.fire("Error", "Failed to cancel request. Try again.", "error");
        }
      }
    });
  };

  if (loading) return <p className="text-center">Loading requests...</p>;

  return (
    <div className="py-10 px-6 md:px-12 lg:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">My Donation Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => (
            <div
              key={req._id}
              className="card bg-white shadow-lg rounded-xl border p-4"
            >
              <h3 className="text-xl font-semibold">{req.donationTitle}</h3>
              <p className="text-gray-600">
                Restaurant: {req.restaurantName}
              </p>
              <p className="text-gray-600">
                Food: {req.foodType} • {req.description}
              </p>
              <span
                className={`inline-block mt-2 px-3 py-1 text-sm rounded-full font-medium ${
                  req.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : req.status === "Accepted"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {req.status}
              </span>

              {req.status === "Pending" && (
                <button
                  onClick={() => handleCancel(req._id)}
                  className="btn btn-error btn-sm mt-4"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
