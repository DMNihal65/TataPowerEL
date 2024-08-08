import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons from react-icons
import logo from '../assets/cmti.png'; // Import the image

const Navbar = ({ toggleSidebar, isSidebarVisible }) => {
  return (
    <nav className="bg-gray-800 p-4 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Sidebar Toggle Button on the left */}
        <div className="flex ">
          <Link to="/" className="flex items-start mr-4">
            <img src={logo} alt="Logo" className="h-8 mr-2" />
            <span className="text-xl font-bold">EL Image</span>
          </Link>
          <button onClick={toggleSidebar} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 flex items-center">
            {isSidebarVisible ? <FaTimes /> : <FaBars />} {/* Toggle icon based on sidebar visibility */}
          </button>
        </div>

        {/* Links */}
        <div>
          <Link to="/login" className="px-4 text-gray-300 hover:text-white">Login</Link>
          <Link to="/signup" className="px-4 text-gray-300 hover:text-white">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
