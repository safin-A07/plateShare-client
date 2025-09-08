import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../../../provider/AuthProvider";
import { useNavigate } from "react-router";

const FoodDonation = () => {
  const [donations, setDonations] = useState([]);
  const { user } = useContext(AuthContext); // logged-in user
  const navigate = useNavigate();

  // Fetch public donations
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/donations`) // public API
      .then((res) => setDonations(res.data))
      .catch((err) => console.error("Error fetching donations:", err));
  }, []);

  // Handle View Details
  const handleViewDetails = (donationId) => {
    if (!user) {
      alert("You must be logged in to view donation details!");
      navigate("/login"); // redirect to login
      return;
    }
    navigate(`/donations/${donationId}`);
  };

  return (
    <div className="py-12 px-6 md:px-12 lg:px-20 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Latest Food Donations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {donations.map((donation, index) => (
          <motion.div
            key={donation._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
          >
            <img
              src={donation.imageUrl || "/placeholder.jpg"}
              alt={donation.foodType}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2">{donation.restaurantName}</h3>
              <p className="text-gray-600">
                {donation.foodType} • {donation.location}
              </p>

              <span
                className={`inline-block mt-4 px-3 py-1 text-sm rounded-full font-medium ${
                  donation.status === "Pending"
                    ? "bg-green-100 text-green-700"
                    : donation.status === "Picked Up"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {donation.status}
              </span>

              <div className="mt-auto pt-4">
                <button
                  onClick={() => handleViewDetails(donation._id)}
                  className="btn btn-sm w-full bg-green-600 text-white hover:bg-green-700"
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FoodDonation;
