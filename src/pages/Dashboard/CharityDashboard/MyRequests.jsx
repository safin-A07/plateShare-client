import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const StatusBadge = ({ status }) => {
  let bgColor = "bg-gray-300";
  let textColor = "text-gray-700";

  switch (status) {
    case "Pending":
      bgColor = "bg-yellow-200";
      textColor = "text-yellow-800";
      break;
    case "Accepted":
      bgColor = "bg-green-200";
      textColor = "text-green-800";
      break;
    case "Rejected":
      bgColor = "bg-red-200";
      textColor = "text-red-800";
      break;
    default:
      break;
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`px-3 py-1 rounded-full font-semibold text-sm ${bgColor} ${textColor}`}
    >
      {status}
    </motion.div>
  );
};

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get("/role-requests/my-requests");
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      }
    };
    fetchRequests();
  }, [axiosSecure]);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/role-requests/${id}`);
        setRequests(prev => prev.filter(r => r._id !== id));
        Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
      } catch (err) {
        Swal.fire("Error!", "Failed to cancel request.", "error");
        console.error(err);
      }
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {requests.map(req => (
        <motion.div
          key={req._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="card bg-base-100 shadow-lg rounded-xl overflow-hidden"
        >
          <div className="card-body">
            <h2 className="card-title text-lg font-bold">{req.organization}</h2>
            <p className="text-sm text-gray-600 mt-1"><span className="font-semibold">Mission:</span> {req.mission}</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Amount:</span> ${req.amount}</p>
            <div className="mt-2 flex items-center justify-between">
              <StatusBadge status={req.status} />
              {req.status === "Pending" && (
                <button
                  onClick={() => handleCancel(req._id)}
                  className="btn btn-sm btn-error ml-2"
                >
                  Cancel
                </button>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2">Created: {new Date(req.createdAt).toLocaleString()}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MyRequests;
