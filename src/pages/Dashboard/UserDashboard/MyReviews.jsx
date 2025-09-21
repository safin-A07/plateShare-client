import { useContext, useEffect, useState } from "react";

   
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";

const MyReviews = () => {
   const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get(`/reviews/user/${user.email}`);
        setReviews(res.data);
      } catch (err) {
        console.error("❌ Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, [user?.email]);

  // Delete review
  const handleDelete = async (reviewId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((rev) => rev._id !== reviewId));

      Swal.fire("Deleted!", "Your review has been removed.", "success");
    } catch (err) {
      console.error("❌ Error deleting review:", err);
      Swal.fire("Error", "Failed to delete review", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">You haven’t submitted any reviews yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="card bg-base-100 shadow-md border rounded-xl p-4"
            >
              {rev.imageUrl && (
                <img
                  src={rev.imageUrl}
                  alt={rev.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}

              <h3 className="text-lg font-semibold">{rev.title}</h3>
              <p className="text-sm text-gray-500">{rev.restaurantName}</p>
              <p className="text-xs text-gray-400">
                {new Date(rev.createdAt).toLocaleString()}
              </p>

              <p className="mt-2 text-gray-700">{rev.description}</p>

              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => handleDelete(rev._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
