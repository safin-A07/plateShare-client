import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RequestCharityRole = () => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [organization, setOrganization] = useState("");
  const [mission, setMission] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);

  // Check for existing pending/approved request
  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/charity-requests?email=${user.email}`)
      .then(res => {
        const existing = res.data.find(
          r => r.status === "Pending" || r.status === "Approved"
        );
        if (existing) setHasPendingRequest(true);
      })
      .catch(err => console.error(err));
  }, [user?.email, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (hasPendingRequest) {
      toast.error("You already have a pending or approved Charity Role request!");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create Payment Intent via secure axios
      const { data: clientSecret } = await axiosSecure.post("/create-payment-intent", {
        amount: 2500, // $25 in cents
      });

      // 2️⃣ Confirm Card Payment
      const card = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (error) throw error;

      // 3️⃣ Save role request
      const requestData = {
        userEmail: user.email,
        userName: user.displayName,
        organization,
        mission,
        transactionId: paymentIntent.id,
        status: "Pending",
        createdAt: new Date(),
      };

      await axiosSecure.post("/charity-requests", requestData);

      // 4️⃣ Save transaction
      await axiosSecure.post("/transactions", {
        transactionId: paymentIntent.id,
        userEmail: user.email,
        amount: 25,
        date: new Date(),
        purpose: "Charity Role Request",
      });

      toast.success("Charity role request submitted successfully!");
      setOrganization("");
      setMission("");
      setHasPendingRequest(true);

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Request Charity Role</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Organization Name</label>
          <input
            type="text"
            value={organization}
            onChange={e => setOrganization(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Mission Statement</label>
          <textarea
            value={mission}
            onChange={e => setMission(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Card Details</label>
          <div className="p-2 border rounded">
            <CardElement />
          </div>
        </div>
        <button
          type="submit"
          className={`btn btn-green w-full mt-4 ${loading ? "loading" : ""}`}
          disabled={!stripe || loading || hasPendingRequest}
        >
          Pay $25 & Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestCharityRole;
