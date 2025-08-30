import React, { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";



const MyProfile = () => {
  const { user, dbUser } = useContext(AuthContext);

  if (!user) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
      {/* User Image */}
      <div className="flex justify-center">
        <img
          src={user.photoURL || dbUser?.profileLink || "https://via.placeholder.com/150"}
          alt="User"
          className="w-28 h-28 rounded-full border-4 border-green-500 shadow-md"
        />
      </div>

      {/* User Info */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">{user.displayName || dbUser?.name}</h2>
        <p className="text-gray-600">{user.email}</p>

        {/* Show role only if not regular user */}
        {dbUser?.role && dbUser.role !== "user" && (
          <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            {dbUser.role.toUpperCase()}
          </span>
        )}
      </div>

      {/* Extra Info */}
      <div className="border-t pt-4 space-y-2 text-gray-700">
        {dbUser?.contact && <p><strong>Contact:</strong> {dbUser.contact}</p>}
        {dbUser?.createdAt && (
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(dbUser.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
