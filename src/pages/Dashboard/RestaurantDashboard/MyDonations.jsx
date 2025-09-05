import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyDonations = () => {
  const { dbUser } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [editingDonation, setEditingDonation] = useState(null); // modal state
  const axiosSecure = useAxiosSecure();

  // Fetch donations by restaurant email
  useEffect(() => {
    if (dbUser?.email) {
      axiosSecure
        .get(`/donations/restaurant/${dbUser.email}`)
        .then((res) => setDonations(res.data))
        .catch((err) => console.error("❌ Error fetching donations:", err));
    }
  }, [dbUser, axiosSecure]);

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This donation will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/donations/${id}`)
          .then(() => {
            setDonations(donations.filter((d) => d._id !== id));
            Swal.fire("Deleted!", "Your donation has been removed.", "success");
          })
          .catch(() =>
            Swal.fire("Error", "Failed to delete donation", "error")
          );
      }
    });
  };

  // Handle Update submit
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedDonation = {
      title: form.title.value,
      foodType: form.foodType.value,
      quantity: form.quantity.value,
      pickupTime: form.pickupTime.value,
      imageUrl: form.imageUrl.value,
    };

    try {
      await axiosSecure.patch(`/donations/${editingDonation._id}`, updatedDonation);

      setDonations((prev) =>
        prev.map((d) =>
          d._id === editingDonation._id ? { ...d, ...updatedDonation } : d
        )
      );

      setEditingDonation(null);
      Swal.fire("Updated!", "Donation updated successfully", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update donation", "error");
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {donations.map((donation) => (
        <div
          key={donation._id}
          className="card bg-base-100 shadow-xl border border-gray-200"
        >
          <figure className="h-48 w-full">
            <img
              src={donation.imageUrl || "/placeholder.jpg"}
              alt={donation.title}
              className="object-cover w-full h-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{donation.title}</h2>
            <p className="text-sm text-gray-600">
              {donation.foodType} • {donation.quantity}
            </p>
            <p className="text-gray-500 text-sm">
              From: {donation.restaurantName}
            </p>

            {/* Status Badge */}
            <div className="mt-2">
              {donation.status === "Pending" && (
                <span className="badge badge-warning">Pending</span>
              )}
              {donation.status === "Verified" && (
                <span className="badge badge-success">Verified</span>
              )}
              {donation.status === "Rejected" && (
                <span className="badge badge-error">Rejected</span>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-2">
              {donation.status !== "Rejected" && (
                <button
                  onClick={() => setEditingDonation(donation)}
                  className="btn btn-sm btn-info text-white"
                >
                  Update
                </button>
              )}
              <button
                onClick={() => handleDelete(donation._id)}
                className="btn btn-sm btn-error text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* DaisyUI Modal */}
      {editingDonation && (
        <dialog id="update_modal" className="modal modal-open">
          <div className="modal-box w-11/12 max-w-xl">
            <h3 className="font-bold text-lg mb-4">Update Donation</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input
                type="text"
                name="title"
                defaultValue={editingDonation.title}
                placeholder="Title"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="foodType"
                defaultValue={editingDonation.foodType}
                placeholder="Food Type"
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="quantity"
                defaultValue={editingDonation.quantity}
                placeholder="Quantity"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="pickupTime"
                defaultValue={editingDonation.pickupTime}
                placeholder="Pickup Time"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="imageUrl"
                defaultValue={editingDonation.imageUrl}
                placeholder="Image URL"
                className="input input-bordered w-full"
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-success text-white">
                  Update
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditingDonation(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyDonations;
