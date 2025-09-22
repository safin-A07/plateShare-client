import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";


const MyPickups = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get("/requests") // get all requests for this charity
        .then((res) => {
          // filter only "Accepted" requests
          const accepted = res.data.filter(
            (req) =>
              req.charityEmail === user.email && req.status === "Accepted"
          );
          setPickups(accepted);
        })
        .catch((err) => console.error("❌ Error fetching pickups:", err));
    }
  }, [user]);

  return (
    <div className="py-12 px-6 md:px-12 lg:px-20 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8">My Pickups</h2>

      {pickups.length === 0 ? (
        <p className="text-gray-500">No accepted pickups yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pickups.map((pickup) => (
            <div
              key={pickup._id}
              className="bg-white p-6 rounded-xl shadow-lg border"
            >
              <h3 className="text-xl font-semibold mb-2">
                {pickup.donationTitle}
              </h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Restaurant:</span>{" "}
                {pickup.restaurantName}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Location:</span>{" "}
                {pickup.location || "N/A"}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Food Type:</span>{" "}
                {pickup.foodType || "N/A"}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Quantity:</span>{" "}
                {pickup.quantity || "N/A"}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Pickup Time:</span>{" "}
                {pickup.pickupTime}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPickups;
