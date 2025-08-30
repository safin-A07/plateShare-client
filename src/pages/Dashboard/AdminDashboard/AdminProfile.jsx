import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminProfile = () => {
  const { user } = useContext(AuthContext); // logged-in user
  const [admin, setAdmin] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => setAdmin(res.data))
        .catch((err) => console.error("Error fetching admin:", err));
    }
  }, [user, axiosSecure]);

  if (!admin) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={admin?.profileLink || "/default-avatar.png"}
            alt="Admin Avatar"
            className="rounded-full w-28 h-28 border-4 border-primary"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{admin?.name || "Unknown Admin"}</h2>
          <p className="text-sm text-gray-500">{admin?.email}</p>
          <div className="badge badge-success gap-2 mt-2">
            {admin?.role || "Admin"}
          </div>
          {admin?.lastLogin && (
            <p className="mt-2 text-xs text-gray-400">
              Last login: {new Date(admin.lastLogin).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
