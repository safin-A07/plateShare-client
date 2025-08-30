import { useState } from "react";

import { toast } from "react-hot-toast";
import { FaUserShield, FaUserMinus } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeAdmin = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  // ✅ Search users
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const { data } = await axiosSecure.get(`/users/search?q=${query}`);
      if (data.length > 0) {
        setUsers(data);
      } else {
        setUsers([]);
        toast.error("No user found!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to search user");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Make admin
  const makeAdmin = async (id) => {
    try {
      await axiosSecure.patch(`/users/${id}/role`, { role: "admin" });
      toast.success("User promoted to Admin");
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: "admin" } : u))
      );
    } catch (err) {
      toast.error("Failed to make admin");
    }
  };

  // ✅ Remove admin
  const removeAdmin = async (id) => {
    try {
      await axiosSecure.patch(`/users/${id}/role`, { role: "user" });
      toast.success("Admin role removed");
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: "user" } : u))
      );
    } catch (err) {
      toast.error("Failed to remove admin");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Admins</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by email or name..."
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && <p>Searching...</p>}

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "badge-success"
                          : "badge-info"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="flex gap-2">
                    {user.role !== "admin" ? (
                      <button
                        onClick={() => makeAdmin(user._id)}
                        className="btn btn-sm btn-success flex items-center gap-1"
                      >
                        <FaUserShield /> Make Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => removeAdmin(user._id)}
                        className="btn btn-sm btn-error flex items-center gap-1"
                      >
                        <FaUserMinus /> Remove Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;
