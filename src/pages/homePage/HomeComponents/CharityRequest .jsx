import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";

;

const PublicCharityRequests = () => {
  const [requests, setRequests] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get("/requests/public");
        setRequests(res.data);
      } catch (err) {
        console.error("❌ Error fetching public requests:", err);
      }
    };
    fetchRequests();
  }, [axiosSecure]);

  const handleViewDonation = (donationId) => {
    if (!user) {
      navigate("/login"); // redirect to login if not logged in
    } else {
      navigate(`/donations/${donationId}`);
    }
  };

  return (
    <div className="py-12 px-6 md:px-12 lg:px-20 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Latest Charity Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {requests.map((req, index) => (
            <motion.div
              key={req._id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="rounded-2xl shadow-lg hover:shadow-2xl transition bg-gray-50 flex flex-col p-6 border border-gray-100"
            >
              {/* Charity Header */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={req.charityLogo || "https://i.ibb.co/9yhDdz0/charity1.png"}
                  alt={req.charityName}
                  className="w-14 h-14 rounded-full border-2 border-green-600"
                />
                <h3 className="text-xl font-semibold">{req.charityName}</h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 flex-grow">
                {req.description || "No description provided"}
              </p>

              {/* Food Title */}
              <div className="bg-green-100 p-3 rounded-lg mb-4">
                <p className="text-sm text-green-800 font-medium">
                  🍽 Donation: {req.donationTitle}
                </p>
              </div>

              {/* Status */}
              <span
                className={`inline-block px-3 py-1 text-sm rounded-full font-medium mb-4
                  ${
                    req.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : req.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
              >
                {req.status}
              </span>

              {/* CTA Button */}
              <button
                onClick={() => handleViewDonation(req.donationId)}
                className="btn btn-sm bg-green-600 text-white hover:bg-green-700 w-full"
              >
                View Donation
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicCharityRequests;
