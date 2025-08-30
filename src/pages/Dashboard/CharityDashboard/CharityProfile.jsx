import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CharityProfile = () => {
  const { user } = useContext(AuthContext); // logged-in user
  const [charity, setCharity] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`) // Fetch individual charity profile
        .then((res) => setCharity(res.data))
        .catch((err) => console.error("Error fetching charity:", err));
    }
  }, [user, axiosSecure]);

  if (!charity) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={charity?.profileLink || "/default-avatar.png"}
            alt="Charity Logo"
            className="rounded-full w-28 h-28 border-4 border-green-600 object-cover"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{charity?.name || "Unknown Charity"}</h2>
          <p className="text-sm text-gray-500">{charity?.email}</p>
          <div className="badge badge-success gap-2 mt-2">
            {charity?.role || "Charity"}
          </div>
          {charity?.mission && (
            <p className="mt-2 text-gray-600">{charity.mission}</p>
          )}
          {charity?.contact && (
            <p className="mt-1 text-xs text-gray-400">{charity.contact}</p>
          )}
          {charity?.createdAt && (
            <p className="mt-2 text-xs text-gray-400">
              Joined: {new Date(charity.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharityProfile;
