// AdminRestaurantRequests.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminRestaurantRequests = () => {
  const [requests, setRequests] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Fetch all restaurant requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get("/restaurant-requests");
        setRequests(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch restaurant requests:", err);
      }
    };
    fetchRequests();
  }, [axiosSecure]);

  // Handle Approve
  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Approve this restaurant request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/restaurant-requests/${id}`, { status: "Approved" });
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: "Approved" } : req
          )
        );
        Swal.fire("✅ Approved!", "Restaurant request approved.", "success");
      } catch (err) {
        Swal.fire("❌ Error", "Failed to approve request.", "error");
      }
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/restaurant-requests/${id}`);
        setRequests((prev) => prev.filter((req) => req._id !== id));
        Swal.fire("🗑️ Deleted!", "Restaurant request deleted.", "success");
      } catch (err) {
        Swal.fire("❌ Error", "Failed to delete request.", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🍽️ Restaurant Requests</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Restaurant Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Food Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={req.imageUrl || "/default-restaurant.png"}
                    alt="restaurant"
                    className="h-12 w-12 rounded object-cover"
                  />
                </td>
                <td className="font-semibold">{req.restaurantName}</td>
                <td>{req.restaurantEmail}</td>
                <td>{req.location}</td>
                <td>{req.foodType}</td>
                <td>
                  <span
                    className={`badge ${
                      req.status === "Pending"
                        ? "badge-warning"
                        : req.status === "Approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  {req.status === "Pending" && (
                    <button
                      onClick={() => handleApprove(req._id)}
                      className="btn btn-xs btn-success text-white"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-xs btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRestaurantRequests;
