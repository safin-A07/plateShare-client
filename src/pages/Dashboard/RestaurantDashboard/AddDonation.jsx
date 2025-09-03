// AddDonation.jsx
import React, { useContext, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";

const AddDonation = () => {
  const { dbUser } = useContext(AuthContext);
  const [donationData, setDonationData] = useState({
    title: "",
    foodType: "",
    quantity: "",
    pickupTime: "",
    restaurantName: dbUser?.name || "",
    restaurantEmail: dbUser?.email || "",
    location: "",
    imageUrl: "", 
    status: "Pending",
  });

  const axiosSecure = useAxiosSecure();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData({ ...donationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.post("/donations", donationData);
      Swal.fire("✅ Success", "Donation added successfully!", "success");
      setDonationData({
        title: "",
        foodType: "",
        quantity: "",
        pickupTime: "",
        restaurantName: dbUser?.name || "",
        restaurantEmail: dbUser?.email || "",
        location: "",
        imageUrl: "",
        status: "Pending",
      });
    } catch (err) {
      Swal.fire("❌ Error", "Failed to add donation.", "error");
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-base-100 shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">🍴 Add Donation</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Donation Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Donation Title</span>
          </label>
          <input
            type="text"
            name="title"
            value={donationData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Food Type */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Food Type</span>
          </label>
          <input
            type="text"
            name="foodType"
            value={donationData.foodType}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Quantity */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Quantity</span>
          </label>
          <input
            type="text"
            name="quantity"
            value={donationData.quantity}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Pickup Time */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pickup Time Window</span>
          </label>
          <input
            type="text"
            name="pickupTime"
            value={donationData.pickupTime}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Restaurant Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Restaurant Name</span>
          </label>
          <input
            type="text"
            value={donationData.restaurantName}
            readOnly
            className="input input-bordered w-full bg-base-200 cursor-not-allowed"
          />
        </div>

        {/* Restaurant Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Restaurant Email</span>
          </label>
          <input
            type="email"
            value={donationData.restaurantEmail}
            readOnly
            className="input input-bordered w-full bg-base-200 cursor-not-allowed"
          />
        </div>

        {/* Location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <textarea
            name="location"
            value={donationData.location}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        {/* Image URL */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="text"
            name="imageUrl"
            value={donationData.imageUrl}
            onChange={handleChange}
            placeholder="Paste image link"
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-success w-full mt-2 text-white">
          Add Donation
        </button>
      </form>
    </div>
  );
};

export default AddDonation;
