import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import PlateShareLogo from '../pages/shared/PlateShareLogo ';

import {
  FaCreditCard, FaHandsHelping, FaHeart, FaStar, FaUser, FaUserShield,
  FaUserCircle,
  FaHandHoldingUsd,
  FaUsers,
  FaUserCheck,
  FaClipboardList, FaBox, FaHandHoldingHeart,
  FaPlusCircle,
  FaGift,
  FaUtensils
} from 'react-icons/fa';

const DashboardLayout = () => {
  const { User, dbUser } = useContext(AuthContext);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar (only visible on small screens) */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 font-bold">Dashboard</div>
        </div>

        {/* Nested Pages will render here */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Logo at the top */}
          <div className="mb-6 flex justify-center">
            <PlateShareLogo></PlateShareLogo>
          </div>
          {dbUser && dbUser.role === "user" && (
            <>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/my-profile"> <FaUser></FaUser>My Profile</Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/restaurant">
                  <FaUtensils /> Restaurant
                </Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/request-charity-role"> <FaHandsHelping></FaHandsHelping>Request Charity Role</Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/favorites"><FaHeart></FaHeart>Favorites</Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/transaction-history"> <FaCreditCard></FaCreditCard>Transaction History</Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/my-reviews"> <FaStar></FaStar>My Reviews</Link>
              </li>


            </>
          )}
          {dbUser && dbUser.role === "admin" && (
            <>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/make-admin">
                  <FaUserShield className="text-blue-600" /> Make Admin
                </Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/admin-profile">
                  <FaUserCircle className="text-green-600" /> Admin Profile
                </Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/admin-restaurant-requests">
                  <FaHandHoldingUsd className="text-purple-600" /> Manage Restaurant
                </Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/manage-users">
                  <FaUsers className="text-orange-600" /> Manage Users
                </Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/all-donations">
                  <FaHandHoldingUsd className="text-green-600" /> Manage donations
                </Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/manage-role-requests">
                  <FaUserCheck className="text-pink-600" /> Manage Role Requests
                </Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/manage-requests">
                  <FaClipboardList className="text-indigo-600" /> Manage Requests
                </Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/feature-donations">
                  <FaStar className="text-yellow-500" /> Feature Donations
                </Link>
              </li>
            </>
          )}
          {dbUser && dbUser.role === "charity" && (
            <>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/charity-profile">
                  <FaUserCircle className="text-green-600" /> Charity Profile
                </Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/my-requests">
                  <FaClipboardList className="text-purple-600" /> My Requests
                </Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/my-pickups">
                  <FaBox className="text-orange-600" /> My Pickups
                </Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/received-donations">
                  <FaHandHoldingHeart className="text-red-600" /> Received Donations
                </Link>
              </li>
            </>
          )}
          {dbUser && dbUser.role === "restaurant" && (
            <>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/restaurant-profile">
                  <FaUserCircle className="text-blue-600" /> Restaurant Profile
                </Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/add-donation">
                  <FaPlusCircle className="text-green-600" /> Add Donation
                </Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/my-donations">
                  <FaGift className="text-purple-600" /> My Donations
                </Link>
              </li>
              <li className="flex items-left gap-2">
                <Link to="/dashboard/requested-donations">
                  <FaClipboardList className="text-orange-600" /> Requested Donations
                </Link>
              </li>
            </>
          )}

        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
