import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Dropdown, Input } from 'antd';
import { UserOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import logo from '../assets/cmti.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ toggleSidebar, isSidebarVisible }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log('User signed out');
    navigate('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span className="font-bold">Username</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={handleSignOut}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="bg-white-600 p-4 text-black shadow-md">
      <div className="container flex items-center justify-between">
      <button onClick={toggleSidebar} className="bg-white px-4 py-2 rounded hover:bg-white-500 flex items-center ml-4 mr-2">
            {isSidebarVisible ? <FaTimes /> : <FaBars />}
          </button>
        {/* Logo and Sidebar Toggle Button on the left */}
        <div className="flex items-center">
          
          <Link to="/" className="flex items-start">
            <img src={logo} alt="Logo" className="h-10 w-20 mr-2" />
            <span className="text-xl font-bold">EL Image</span>
          </Link>
        
        </div>

        <div className="flex items-center ml-24">
            <Input
              placeholder="Search"
              className="rounded-l-md"
              style={{ borderRadius: '8px 0 0 8px', width: '200px' }} // Set desired width
            />
            <button className="bg-white-600 p-2 rounded-r-md">
              <SearchOutlined style={{ color: 'black' }} />
            </button>
          </div>

        {/* Search bar with icon on the right side */}
        <div className="flex items-center ml-auto">
         

          {/* User Profile Dropdown aligned to the right */}
          <Dropdown overlay={menu} trigger={['click']} className="ml-4">
            <a onClick={e => e.preventDefault()} className="ant-dropdown-link flex items-center text-black">
              <UserOutlined style={{ fontSize: '24px' }} />
              <DownOutlined className="ml-1" />
            </a>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
