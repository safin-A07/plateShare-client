import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";


const Favorites = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch user's favorites
    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/favorites/${user.email}`)
                .then((res) => {
                    setFavorites(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("❌ Error fetching favorites:", err);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

    // ✅ Remove favorite
    const handleRemoveFavorite = async (favoriteId) => {
        try {
            await axiosSecure.delete(`/favorites/${favoriteId}`);
            setFavorites(favorites.filter((fav) => fav._id !== favoriteId));

            Swal.fire({
                icon: "success",
                title: "Removed",
                text: "Donation removed from favorites.",
            });
        } catch (err) {
            console.error("❌ Error removing favorite:", err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to remove favorite.",
            });
        }
    };

    if (loading) return <p className="text-center">Loading favorites...</p>;
    if (favorites.length === 0)
        return <p className="text-center">No favorites saved yet.</p>;

    return (
        <div className="py-12 px-6 md:px-12 lg:px-20 bg-gray-50">
            <h2 className="text-3xl font-bold mb-6">My Favorites</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((fav) => (
                    <div
                        key={fav._id}
                        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col"
                    >
                        <img
                            src={fav.imageUrl || "/placeholder.jpg"}
                            alt={fav.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-bold mb-2">{fav.title}</h3>
                        <p className="text-gray-600 mb-1">{fav.restaurantName}</p>
                        <p className="text-gray-500 mb-1">{fav.location}</p>
                        <p className="text-sm mb-1">Quantity: {fav.quantity}</p>
                        <span
                            className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium ${fav.status === "Available"
                                    ? "bg-green-100 text-green-700"
                                    : fav.status === "Picked Up"
                                        ? "bg-red-100 text-red-600"
                                        : "bg-yellow-100 text-yellow-600"
                                }`}
                        >
                            {fav.status}
                        </span>

                        {/* Buttons */}
                        <div className="mt-4 flex justify-between gap-2">
                            <Link
                                to={`/donations/${fav.donationId}`}
                                className="btn btn-primary btn-sm flex-1"
                            >
                                Details
                            </Link>
                            <button
                                className="btn btn-error btn-sm flex-1"
                                onClick={() => handleRemoveFavorite(fav._id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
