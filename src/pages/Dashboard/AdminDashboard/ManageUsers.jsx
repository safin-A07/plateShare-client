import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ Fetch all users
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await axiosSecure.get("/users");
            setUsers(data);
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to fetch users", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ✅ Update role
    const updateRole = async (id, role) => {
        try {
            await axiosSecure.patch(`/users/${id}/role`, { role });
            Swal.fire("Success", `User role updated to ${role}`, "success");
            fetchUsers(); // refresh table
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to update role", "error");
        }
    };

    // ✅ Delete user
    const deleteUser = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/users/${id}`);
                Swal.fire("Deleted!", "User has been deleted.", "success");
                fetchUsers();
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to delete user", "error");
            }
        }
    };

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
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
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span
                                            className={`badge ${user.role === "admin"
                                                    ? "badge-success"
                                                    : user.role === "restaurant"
                                                        ? "badge-info"
                                                        : user.role === "charity"
                                                            ? "badge-warning"
                                                            : "badge-outline"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="flex gap-2">
                                        <button
                                            onClick={() => updateRole(user._id, "admin")}
                                            className="btn btn-xs btn-success"
                                            disabled={user.role === "admin"}
                                        >
                                            Make Admin
                                        </button>
                                        <button
                                            onClick={() => updateRole(user._id, "restaurant")}
                                            className="btn btn-xs btn-info"
                                            disabled={user.role === "restaurant"}
                                        >
                                            Make Restaurant
                                        </button>
                                        <button
                                            onClick={() => updateRole(user._id, "charity")}
                                            className="btn btn-xs btn-warning"
                                            disabled={user.role === "charity"}
                                        >
                                            Make Charity
                                        </button>
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="btn btn-xs btn-error"
                                            
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
