import React from "react";
import { motion } from "framer-motion";

const FoodDonation = () => {
  const donations = [
    {
      id: 1,
      image: "https://i.ibb.co/Q9mf6Wf/bread.jpg",
      type: "Bakery",
      restaurant: "Sweet Treats Bakery",
      location: "Dhaka, Bangladesh",
      status: "Available",
    },
    {
      id: 2,
      image: "https://i.ibb.co/3vFfWwC/vegetables.jpg",
      type: "Produce",
      restaurant: "Green Garden Restaurant",
      location: "Chattogram, Bangladesh",
      status: "Picked Up",
    },
    {
      id: 3,
      image: "https://i.ibb.co/3B6BNfS/food.jpg",
      type: "Cooked Meals",
      restaurant: "Foodie’s Hub",
      location: "Sylhet, Bangladesh",
      status: "Available",
    },
    {
      id: 4,
      image: "https://i.ibb.co/vdhhQyh/fruits.jpg",
      type: "Fruits",
      restaurant: "Fresh Corner",
      location: "Rajshahi, Bangladesh",
      status: "Available",
    },
  ];

  return (
    <div className="py-12 px-6 md:px-12 lg:px-20 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Latest Food Donations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {donations.map((donation, index) => (
          <motion.div
            key={donation.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
          >
            <img
              src={donation.image}
              alt={donation.type}
              className="w-full h-40 object-cover"
            />
            {/* Card Body */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2">{donation.type}</h3>
              <p className="text-gray-600">
                {donation.restaurant} • {donation.location}
              </p>
              <span
                className={`inline-block mt-4 px-3 py-1 text-sm rounded-full font-medium ${
                  donation.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {donation.status}
              </span>

              {/* Push button to bottom */}
              <div className="mt-auto pt-4">
                <a
                  href={`/donation/${donation.id}`}
                  className="btn btn-sm w-full bg-green-600 text-white hover:bg-green-700"
                >
                  View Details
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FoodDonation;
