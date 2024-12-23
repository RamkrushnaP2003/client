import React from "react";
import { LOGO } from "../../utils/constant";

const Logo = () => {
  return (
    <div className="relative inline-block">
      <img className="h-16 w-16" src={LOGO} alt="Logo" />
      <h3 className="absolute inset-0 text-gray-900 text-center text-l font-semibold flex items-center justify-center">
        Book
        <br />
        Nest
      </h3>
    </div>
  );
};

export default Logo;
