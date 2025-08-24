import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/homePage/Home";
import Login from "../pages/Login";
import Register from "../pages/Registration";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../provider/PrivateRoute ";
import MyProfile from "../pages/Dashboard/MyProfile";
import TransactionHistory from "../pages/Dashboard/TransactionHistory";
import MyReviews from "../pages/Dashboard/MyReviews";
import RequestCharityRole from "../pages/Dashboard/RequestCharityRole";
import { stripePromise } from "../stripe/stripe";
import { Elements } from "@stripe/react-stripe-js";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children : [
      {
        index: true,
        Component : Home
      }
    ]
  },
  {
    path: "/dashboard",
    element:<PrivateRoute><DashboardLayout /></PrivateRoute>,
    children : [
      {
        path : "my-profile",
        element : <MyProfile />
      },
      {
        path : "transaction-history",
        element : <TransactionHistory />
      },
      {
        path : "my-reviews",
        element : <MyReviews />
      },
      {
        path : "request-charity-role",
       element: (
          <Elements stripe={stripePromise}>
            <RequestCharityRole />
          </Elements>
        )
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
  
]);