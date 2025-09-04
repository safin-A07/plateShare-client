import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";

const RestaurantRequestForm = () => {
  const { dbUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    restaurantName: "",
    about: "",
    location: "",
    openingTime: "",
    closingTime: "",
    foodType: "",
    imageUrl: "",
    email: dbUser?.email || "",
    status: "Pending",
    createdAt: new Date(),
  });

  const axiosSecure = useAxiosSecure();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post("/restaurant-requests", formData);
      Swal.fire("✅ Success", "Your request has been submitted!", "success");
      setFormData({
        restaurantName: "",
        about: "",
        location: "",
        openingTime: "",
        closingTime: "",
        foodType: "",
        imageUrl: "",
        email: "",
        phone: "",
        status: "Pending",
        createdAt: new Date(),
      });
    } catch (err) {
      Swal.fire("❌ Error", "Failed to submit request.", "error");
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-base-100 shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">🏪 Become a Restaurant</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Restaurant Name */}
        <div className="form-control">
          <label className="label">Restaurant Name</label>
          <input
            type="text"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        {/* Restaurant email */}
        <div className="form-control">
          <label className="label">Restaurant email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        {/* Restaurant Phone number */}
        <div className="form-control">
          <label className="label">Restaurant Phone number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
  
        {/* About */}
        <div className="form-control">
          <label className="label">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        {/* Location */}
        <div className="form-control">
          <label className="label">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Opening Time */}
        <div className="form-control">
          <label className="label">Opening Time</label>
          <input
            type="time"
            name="openingTime"
            value={formData.openingTime}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Closing Time */}
        <div className="form-control">
          <label className="label">Closing Time</label>
          <input
            type="time"
            name="closingTime"
            value={formData.closingTime}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Food Type */}
        <div className="form-control">
          <label className="label">Type of Food</label>
          <input
            type="text"
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Image URL */}
        <div className="form-control">
          <label className="label">Restaurant Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <button type="submit" className="btn btn-green w-full">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RestaurantRequestForm;
