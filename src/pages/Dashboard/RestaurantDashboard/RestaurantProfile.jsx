import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RestaurantProfile = () => {
  const { dbUser } = useContext(AuthContext); // logged-in user
  const [restaurant, setRestaurant] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (dbUser?.email) {
      axiosSecure
        .get(`/restaurant-requests/owner/${dbUser.email}`)
        .then((res) => {
          if (res.data && res.data.status === "Approved") {
            setRestaurant(res.data);
          }
        })
        .catch((err) => console.error("Error fetching restaurant:", err));
    }
  }, [dbUser, axiosSecure]);

  if (!restaurant) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Banner */}
      <div className="relative w-full h-72 md:h-96">
        <img
          src={restaurant.imageUrl || "/default-banner.jpg"}
          alt="Restaurant Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            {restaurant.restaurantName}
          </h1>
          <p className="text-gray-200 text-lg">{restaurant.location}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* About */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">About Us</h2>
          <p className="text-gray-600">{restaurant.about}</p>
        </div>

        <hr />

        {/* Food Type */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Food Type</h2>
          <p className="text-gray-600">{restaurant.foodType}</p>
        </div>

        <hr />

        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Contact Info</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong>Owner Email:</strong> {restaurant.ownerEmail}
            </p>
            <p>
              <strong>Restaurant Email:</strong> {restaurant.restaurantEmail}
            </p>
            <p>
              <strong>Phone:</strong> {restaurant.phone}
            </p>
            <p>
              <strong>Opening Hours:</strong> {restaurant.openingTime} –{" "}
              {restaurant.closingTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
