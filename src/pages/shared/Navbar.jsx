import React, { useContext } from 'react';
import { Link } from 'react-router';   

import { AuthContext } from '../../provider/AuthProvider';
import PlateShareLogo from './PlateShareLogo ';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  // ✅ Handle Firebase logout
  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const navLinks = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/browse">Browse</Link></li>
      {
        user && <li><Link to="/dashboard">Dashboard</Link></li>
      }
    </>
  );

  return (
    <div className="navbar bg-white text-gray-800 shadow-md px-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 text-gray-800"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <PlateShareLogo/>
      </div>

      {/* Navbar Center (Desktop Menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-gray-800">
          {navLinks}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end space-x-2">
        {user ? (
          <>
            <span className="hidden md:inline font-medium text-gray-600">
              Hi, {user.displayName || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="btn bg-green-600 hover:bg-green-700 text-white border-none"
            >
              LogOut
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn bg-green-600 hover:bg-green-700 text-white border-none"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-outline border-green-600 text-green-600 hover:bg-green-50"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
