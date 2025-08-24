import React from "react";
import { motion } from "framer-motion";

const CharityRequest = () => {
  const requests = [
    {
      id: 1,
      charityName: "Hope Foundation",
      logo: "https://i.ibb.co/9yhDdz0/charity1.png",
      description:
        "We are requesting fresh bakery items to distribute among homeless families tonight.",
      foodTitle: "Bakery Surplus from Sweet Treats Bakery",
    },
    {
      id: 2,
      charityName: "Feed the Future",
      logo: "https://i.ibb.co/N96h8Yf/charity2.png",
      description:
        "Looking for fresh produce to supply our community kitchen serving 200+ people daily.",
      foodTitle: "Vegetables from Green Garden Restaurant",
    },
    {
      id: 3,
      charityName: "Nourish Together",
      logo: "https://i.ibb.co/DLPZzHk/charity3.png",
      description:
        "We need cooked meals to serve children in need at our evening education center.",
      foodTitle: "Cooked Meals from Foodie’s Hub",
    },
  ];

  return (
    <div className="py-12 px-6 md:px-12 lg:px-20 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Latest Charity Requests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {requests.map((req, index) => (
          <motion.div
            key={req.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="rounded-2xl shadow-lg hover:shadow-2xl transition bg-gray-50 flex flex-col p-6 border border-gray-100"
          >
            {/* Charity Header */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={req.logo}
                alt={req.charityName}
                className="w-14 h-14 rounded-full border-2 border-green-600"
              />
              <h3 className="text-xl font-semibold">{req.charityName}</h3>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 flex-grow">{req.description}</p>

            {/* Food Title */}
            <div className="bg-green-100 p-3 rounded-lg mb-4">
              <p className="text-sm text-green-800 font-medium">
                🍽 Donation: {req.foodTitle}
              </p>
            </div>

            {/* CTA Button */}
            <a
              href={`/charity/${req.id}`}
              className="btn btn-sm bg-green-600 text-white hover:bg-green-700 w-full"
            >
              View Request
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CharityRequest;
