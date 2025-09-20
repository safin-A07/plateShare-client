import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/homePage/Home";
import Login from "../pages/Login";
import Register from "../pages/Registration";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../provider/PrivateRoute ";


import MyReviews from "../pages/Dashboard/UserDashboard/MyReviews";
import RequestCharityRole from "../pages/Dashboard/UserDashboard/RequestCharityRole";
import { stripePromise } from "../stripe/stripe";
import { Elements } from "@stripe/react-stripe-js";
import MakeAdmin from "../pages/Dashboard/AdminDashboard/MakeAdmin";
import MyProfile from "../pages/Dashboard/UserDashboard/MyProfile";
import TransactionHistory from "../pages/Dashboard/UserDashboard/TransactionHistory";
import ManageRoleRequests from "../pages/Dashboard/AdminDashboard/ManageRoleRequests";
import AdminRoute from "../provider/AdminRoute";
import AdminProfile from "../pages/Dashboard/AdminDashboard/AdminProfile";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";

import CharityRoute from "../provider/CharityRoute";
import ReceivedDonations from "../pages/Dashboard/CharityDashboard/ReceivedDonations";
import MyRequests from "../pages/Dashboard/CharityDashboard/MyRequests";
import MyPickups from "../pages/Dashboard/CharityDashboard/MyPickups";
import CharityProfile from "../pages/Dashboard/CharityDashboard/CharityProfile";
import AddDonation from "../pages/Dashboard/RestaurantDashboard/AddDonation";
import RestaurantRequestForm from "../pages/Dashboard/UserDashboard/RestaurantRequestForm ";
import AdminRestaurantRequests from "../pages/Dashboard/AdminDashboard/AdminRestaurantRequests";
import RestaurantProfile from "../pages/Dashboard/RestaurantDashboard/RestaurantProfile";
import MyDonations from "../pages/Dashboard/RestaurantDashboard/MyDonations";
import AllDonations from "../pages/Dashboard/AdminDashboard/AllDonations";
import DonationDetails from "../pages/DonationsDetails/DonationDetails";
import RequestedDonation from "../pages/Dashboard/RestaurantDashboard/RequestedDonation";
import NotFound from "../pages/NotFound";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children : [
      {
        index: true,
        Component : Home
      },
      {
        path: "/donations/:id",
        element: <PrivateRoute><DonationDetails /></PrivateRoute>
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
        path : "restaurant",
        element : <RestaurantRequestForm  />
      },
      {
        path : "request-charity-role",
       element: (
          <Elements stripe={stripePromise}>
            <RequestCharityRole />
          </Elements>
        )
      },
      {
        path : "make-admin",
        element : <AdminRoute><MakeAdmin /></AdminRoute>
      },
      {
        path : "admin-restaurant-requests",
        element : <AdminRoute><AdminRestaurantRequests /></AdminRoute>
      },
      {
        path : "all-donations",
        element : <AllDonations />
      },
      {
        path : "manage-role-requests",
        element :<AdminRoute><ManageRoleRequests /></AdminRoute>
      },
      {
        path : "admin-profile",
        element : <AdminRoute><AdminProfile /></AdminRoute>
      },
      {
        path : "manage-users",
        element : <AdminRoute><ManageUsers /></AdminRoute>
      },
      //charity router 
      {
        path :"charity-profile",
        element : <CharityRoute><CharityProfile /></CharityRoute>
      },
      {
        path :"received-donations",
        element : <CharityRoute><ReceivedDonations /></CharityRoute>
      },
      {
        path :"my-requests",
        element : <CharityRoute><MyRequests /></CharityRoute>
      },
      {
        path :"my-pickups",
        element : <CharityRoute><MyPickups /></CharityRoute>
     },
     //restaurant router
     {
      path:"add-donation",
      element : <AddDonation />
     },
     {
      path:"restaurant-profile",
      element : <RestaurantProfile />
     },
     {
      path:"my-donations",
      element : <MyDonations />
     },
     {
      path:"requested-donations",
      element : <RequestedDonation />
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
  },
  {
    path: "*",
    element: <NotFound />,
  }
  
]);