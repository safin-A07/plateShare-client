import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import PlateShareLogo from '../pages/shared/PlateShareLogo ';

import { FaCreditCard, FaHandsHelping, FaStar, FaUser } from 'react-icons/fa';

const DashboardLayout = () => {
  const { dbUser } = useContext(AuthContext);

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
              <li className="flex items-center gap-2">
                <FaUser className="w-5 h-5" />
                <Link to="/dashboard/my-profile">My Profile</Link>
              </li>
              <li className="flex items-center gap-2">
                <FaCreditCard className="w-5 h-5" />
                <Link to="/dashboard/transaction-history">Transaction History</Link>
              </li>
              <li className="flex items-center gap-2">
                <FaStar className="w-5 h-5" />
                <Link to="/dashboard/my-reviews">My Reviews</Link>
              </li>
              <li className="flex items-center gap-2">
                <FaHandsHelping className="w-5 h-5" />
                <Link to="/dashboard/request-charity-role">Request Charity Role</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
