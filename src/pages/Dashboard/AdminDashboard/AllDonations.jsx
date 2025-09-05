import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllDonations = () => {
  const [donations, setDonations] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Fetch all donations
  useEffect(() => {
    axiosSecure
      .get("/donations")
      .then((res) => setDonations(res.data))
      .catch((err) => console.error("❌ Error fetching donations:", err));
  }, [axiosSecure]);

  // Handle status update using PUT
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.put(`/donations/${id}`, { status: newStatus });

      setDonations((prev) =>
        prev.map((d) =>
          d._id === id ? { ...d, status: newStatus } : d
        )
      );

      Swal.fire("Updated!", `Donation marked as ${newStatus}`, "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">All Donations</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Food Type</th>
            <th>Quantity</th>
            <th>Restaurant Name</th>
            <th>Restaurant Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation._id}>
              <td>{donation.title}</td>
              <td>{donation.foodType}</td>
              <td>{donation.quantity}</td>
              <td>{donation.restaurantName}</td>
              <td>{donation.restaurantEmail}</td>
              <td>
                {donation.status === "Pending" && (
                  <span className="badge badge-warning">Pending</span>
                )}
                {donation.status === "Verified" && (
                  <span className="badge badge-success">Verified</span>
                )}
                {donation.status === "Rejected" && (
                  <span className="badge badge-error">Rejected</span>
                )}
              </td>
              <td className="space-x-2">
                <button
                  className="btn btn-xs btn-success text-white"
                  onClick={() => handleStatusChange(donation._id, "Verified")}
                  disabled={donation.status === "Verified"}
                >
                  Verify
                </button>
                <button
                  className="btn btn-xs btn-error text-white"
                  onClick={() => handleStatusChange(donation._id, "Rejected")}
                  disabled={donation.status === "Rejected"}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDonations;
