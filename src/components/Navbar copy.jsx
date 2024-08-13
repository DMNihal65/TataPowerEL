import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Dropdown } from 'antd'; // Import Ant Design components
import { UserOutlined, DownOutlined } from '@ant-design/icons'; // Import Ant Design icons
import logo from '../assets/cmti.png'; // Import the logo
import { FaBars, FaTimes, } from 'react-icons/fa'; 

const Navbar = ({ toggleSidebar, isSidebarVisible }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSignOut = () => {
    // Implement sign-out logic here, e.g., clearing auth tokens, etc.
    console.log('User signed out');
    navigate('/login'); // Redirect to login page after sign-out
  };

  // Dropdown menu for the user profile
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span className="font-bold">Username</span> {/* Replace with actual username */}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={handleSignOut}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="bg-gray-800 p-4 text-white shadow-md">
      <div className="container flex items-center justify-between">
        {/* Logo and Sidebar Toggle Button on the left */}
        <div className="flex">
          <button onClick={toggleSidebar} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 flex items-center mr-5">
            {isSidebarVisible ? <FaTimes /> : <FaBars />}
          </button>
          <Link to="/" className="flex items-start mr-4">
            <img src={logo} alt="Logo" className="h-10 w-20 mr-2" />
            <span className="text-xl font-bold">EL Image</span>
          </Link>
        </div>

        {/* Links */}
        <div className="flex items-end">
          {/* <Link to="/login" className="px-4 text-gray-300 hover:text-white">Login</Link>
          <Link to="/signup" className="px-4 text-gray-300 hover:text-white">Signup</Link> */}

          {/* User Profile Dropdown */}
          <Dropdown overlay={menu} trigger={['click']} className="ml-4">
            <a onClick={e => e.preventDefault()} className="ant-dropdown-link flex items-center text-white">
              <UserOutlined style={{ fontSize: '24px' }} /> {/* User icon */}
              <DownOutlined className="ml-1" /> {/* Down arrow icon */}
            </a>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
