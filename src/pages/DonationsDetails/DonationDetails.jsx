import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, dbUser } = useContext(AuthContext);
  const [donation, setDonation] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [request, setRequest] = useState(null); // ✅ Track current request
  const [loading, setLoading] = useState(true);
  const [reviewDesc, setReviewDesc] = useState("");
  const [reviewRating, setReviewRating] = useState("");

  useEffect(() => {
    axiosSecure
      .get(`/donations/${id}`)
      .then((res) => {
        setDonation(res.data.donation);
        setReviews(res.data.reviews || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching donation:", err);
        setLoading(false);
      });
  }, [id]);

  // ✅ Fetch charity's request for this donation
  useEffect(() => {
    if (dbUser?.role === "charity") {
      axiosSecure
        .get("/requests")
        .then((res) => {
          const myReq = res.data.find((r) => r.donationId === id);
          setRequest(myReq || null);
        })
        .catch((err) => console.error("❌ Error fetching requests:", err));
    }
  }, [id, dbUser]);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const requestData = {
      donationId: donation._id,
      donationTitle: donation.title,
      restaurantName: donation.restaurantName,
      restaurantEmail: donation.restaurantEmail,
      charityName: user?.displayName,
      charityEmail: user?.email,
      description: form.description.value,
      pickupTime: form.pickupTime.value,
      status: "Pending",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/requests", requestData);
      setRequest(res.data.result); // ✅ Save request in state
      Swal.fire({
        icon: "success",
        title: "Request Submitted!",
        text: "Your donation request is now pending approval.",
      });
      form.reset();
      document.getElementById("requestModal").checked = false;
    } catch (err) {
      console.error("❌ Error submitting request:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to submit your request. Please try again.",
      });
    }
  };

  const handleConfirmPickup = async (requestId) => {
    try {
      const res = await axiosSecure.patch(`/requests/${requestId}/pickup`);
      Swal.fire("Success", "Donation marked as Picked Up", "success");

      // update local request state
      setRequest({ ...request, status: "Picked Up" });

      // also update donation status locally
      setDonation({ ...donation, status: "Picked Up" });

    } catch (err) {
      console.error("❌ Error confirming pickup:", err);
      Swal.fire("Error", "Failed to confirm pickup", "error");
    }
  };

  //  Submit review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      donationId: donation._id,
      reviewerName: user?.displayName,
      description: reviewDesc,
      rating: Number(reviewRating),
    };

    try {
      const res = await axiosSecure.post("/reviews", newReview);

      // ✅ update reviews list locally
      setReviews([...reviews, res.data]);

      // reset form & close modal
      setReviewDesc("");
      setReviewRating("");
      document.getElementById("reviewModal").checked = false;

      Swal.fire("Success", "Review submitted successfully", "success");
    } catch (err) {
      console.error("❌ Error posting review:", err);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };


  if (loading) return <p className="text-center">Loading...</p>;
  if (!donation) return <p className="text-center">Donation not found</p>;

  return (
    <div className="py-12 px-6 md:px-12 lg:px-20 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        {/* Image */}
        <img
          src={donation.imageUrl || "/placeholder.jpg"}
          alt={donation.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />

        {/* Donation Info */}
        <h2 className="text-3xl font-bold mb-2">{donation.title}</h2>
        <h2 className="text-xl font-bold mb-2">{donation.restaurantEmail}</h2>
        <p className="text-gray-600 mb-2">
          {donation.foodType} • {donation.quantity} portions
        </p>
        <p className="text-gray-700 mb-2">
          {donation.restaurantName} • {donation.location}
        </p>
        <p className="text-gray-500 mb-2">Pickup Time: {donation.pickupTime}</p>
        <span
          className={`inline-block mt-2 px-4 py-2 text-sm rounded-full font-medium ${donation.status === "Available"
            ? "bg-green-100 text-green-700"
            : donation.status === "Picked Up"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
            }`}
        >
          {donation.status}
        </span>

        {/* Buttons */}
        <div className="mt-6 flex gap-4 flex-wrap">
          <button className="btn btn-primary">Save to Favorites</button>

          {dbUser && dbUser.role === "charity" && (
            <>
              {/* ✅ Request button only if no request yet */}
              {!request && donation.status === "Verified" && (
                <>
                  <label htmlFor="requestModal" className="btn btn-success">
                    Request Donation
                  </label>

                  {/* Request Donation Modal */}
                  <input
                    type="checkbox"
                    id="requestModal"
                    className="modal-toggle"
                  />
                  <div className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Request Donation</h3>
                      <form
                        onSubmit={handleRequestSubmit}
                        className="mt-4 space-y-3"
                      >
                        <input
                          type="text"
                          value={donation.title}
                          readOnly
                          className="input input-bordered w-full"
                        />
                        <input
                          type="text"
                          value={donation.restaurantEmail}
                          readOnly
                          className="input input-bordered w-full"
                        />
                        <input
                          type="text"
                          value={donation.restaurantName}
                          readOnly
                          className="input input-bordered w-full"
                        />
                        <input
                          type="text"
                          value={user?.displayName}
                          readOnly
                          className="input input-bordered w-full"
                        />
                        <input
                          type="email"
                          value={user?.email}
                          readOnly
                          className="input input-bordered w-full"
                        />
                        <textarea
                          name="description"
                          placeholder="Request description"
                          className="textarea textarea-bordered w-full"
                        ></textarea>
                        <input
                          type="text"
                          name="quantity"
                          placeholder="Quantity"
                          className="input input-bordered w-full"
                        />
                        <input
                          type="text"
                          name="pickupTime"
                          placeholder="Preferred pickup time"
                          className="input input-bordered w-full"
                        />
                        <div className="modal-action">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                          <label htmlFor="requestModal" className="btn">
                            Cancel
                          </label>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}

              {/* ✅ Confirm Pickup button if request is Accepted */}
              {request && request.status === "Accepted" && (
                <button
                  className="btn btn-warning"
                  onClick={() => handleConfirmPickup(request._id)}
                >
                  Confirm Pickup
                </button>
              )}
            </>
          )}
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Reviews</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li
                  key={review._id}
                  className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                >
                  <p className="font-semibold">{review.reviewerName}</p>
                  <p className="text-gray-700">{review.description}</p>
                  <p className="text-yellow-500">⭐ {review.rating}</p>
                </li>
              ))}
            </ul>
          )}

          <label htmlFor="reviewModal" className="btn btn-secondary mt-4">
            Add Review
          </label>

          {/* Review Modal */}
          <input type="checkbox" id="reviewModal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Add Review</h3>
              <form className="mt-4 space-y-3" onSubmit={handleReviewSubmit} >
                <input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className="input input-bordered w-full"
                />
                <textarea
                  placeholder="Write your review"
                  value={reviewDesc}
                  onChange={(e) => setReviewDesc(e.target.value)}
                  className="textarea textarea-bordered w-full"
                />
                <input
                  type="number"
                  placeholder="Rating (1-5)"
                  min="1"
                  max="5"
                  value={reviewRating}
                  onChange={(e) => setReviewRating(e.target.value)}
                  className="input input-bordered w-full"
                />
                <div className="modal-action">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <label htmlFor="reviewModal" className="btn">
                    Cancel
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DonationDetails;
