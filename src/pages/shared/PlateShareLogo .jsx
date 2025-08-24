import React from "react";
import { Link } from "react-router";

const PlateShareLogo = () => {
  return (
    <Link to="/" className="relative inline-block cursor-pointer select-none">
      {/* Brand Name */}
      <p className="text-3xl font-extrabold text-green-600 tracking-wide">
        Plate<span className="text-yellow-500">Share</span>
      </p>

      {/* Decorative underline */}
      <span className="absolute left-0 -bottom-1 w-full h-1 bg-gradient-to-r from-green-600 via-yellow-400 to-yellow-500 rounded-full"></span>
    </Link>
  );
};

export default PlateShareLogo;
