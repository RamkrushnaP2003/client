import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai"; // Import the menu icon

const Sidebar = () => {
  // State to control sidebar open/close
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function to open/close sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to toggle sidebar visibility */}
      <button
        onClick={toggleSidebar}
        className="text-white bg-gray-800 p-3 rounded-md md:hidden"
      >
        <AiOutlineMenu size={30} /> {/* Menu icon */}
      </button>

      {/* Sidebar - Conditional Rendering Based on State */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-transform duration-300 ease-in-out ${
          isOpen ? "transform translate-x-0" : "transform -translate-x-full"
        } md:transform-none md:relative md:flex md:justify-start md:space-x-4`}
      >
        <div className="flex flex-col items-start space-y-4 p-4 text-white">
          {/* Logo Section */}
          <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Logo"
              className="w-10 h-10 mr-2"
            />
            <span className="text-xl font-bold">BookStore</span>
          </div>

          {/* Left Section: Auth Buttons and Cart */}
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
            Login
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg">
            Register
          </button>
          <div className="relative">
            <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg">
              Cart
            </button>

            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-2 -translate-y-2">
              3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
