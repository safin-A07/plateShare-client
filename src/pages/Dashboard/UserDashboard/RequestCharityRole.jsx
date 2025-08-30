
import React, { useContext, useEffect, useState } from "react";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RequestCharityRole = () => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [organization, setOrganization] = useState("");
  const [mission, setMission] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  // ✅ Check for existing pending/approved request
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/role-requests/status?email=${encodeURIComponent(user.email)}`)
      .then((res) => {
        console.log("status response:", res.data); // 👀 Debug log
        const status = res.data?.status;
        if (status === "Pending" || status === "Approved") {
          setHasPendingRequest(true);
        } else {
          setHasPendingRequest(false); // ✅ allow fresh requests
        }
      })
      .catch((err) => {
        console.error("status check failed", err);
      });
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
      // 1) Create PaymentIntent
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: 2500, // $25 -> cents
        email: user.email,
        purpose: "Charity Role Request",
      });
      const clientSecret = data.clientSecret;
      if (!clientSecret) throw new Error("No client secret returned from server");

      // 2) Confirm payment
      const card = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName || "Anonymous",
            email: user.email,
          },
        },
      });

      if (error) throw error;
      if (paymentIntent.status !== "succeeded") {
        throw new Error("Payment failed to complete.");
      }

      // ✅ Optional: show quick toast for payment success
      toast.success("💳 Payment successful!");

      // 3) Save role request
      await axiosSecure.post("/role-requests", {
        email: user.email,
        name: user.displayName,
        organization,
        mission,
        amount: 25, // dollars
        transactionId: paymentIntent.id,
      });

      // 4) Save transaction
      await axiosSecure.post("/transactions", {
        transactionId: paymentIntent.id,
        email: user.email,
        amount: 25,
        purpose: "Charity Role Request",
      });

      // ✅ Final success toast after everything done
      toast.success("🎉 Charity role request submitted successfully!");

      // reset form
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

      {hasPendingRequest && (
        <div className="mb-4 p-3 rounded bg-yellow-100 text-yellow-800">
          You already have a pending or approved request. You can’t submit another.
        </div>
      )}

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
            onChange={(e) => setOrganization(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Mission Statement</label>
          <textarea
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Card Details</label>
          <div className="p-2 border rounded">
            <CardElement
              onChange={(e) => setCardComplete(e.complete)}
              options={{ hidePostalCode: true }}
            />
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-green w-full mt-4 ${loading ? "loading" : ""}`}
          disabled={
            !stripe ||
            !cardComplete ||
            !organization ||
            !mission ||
            loading ||
            hasPendingRequest
          }
        >
          Pay $25 & Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestCharityRole;
