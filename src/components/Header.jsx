import React, { useState } from 'react';
import { Search, Mail, Bell, Files, ChevronDown, User } from 'lucide-react';
import { useUser } from '../components/UserContext'; // Import the UserContext
import logo from '../assets/tatapower.svg';
import tata from '../assets/tata.jpeg';
import cmti from '../assets/cmti.png';

const Header = () => {
  const { user, setUser } = useUser(); // Get the user data and setter function from the context
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMailOpen, setIsMailOpen] = useState(false);

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);
  const toggleMail = () => setIsMailOpen(!isMailOpen);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    window.location.href = '/login'; // Change this to your login page route
  };

  return (
    <header className="bg-white shadow-sm relative ">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={tata}
              alt="Logo"
              style={{
                overflow: 'auto',
                height: '32px',
                position: 'fixed',
              }}
            />
            {/* <div className="relative mr-6">
              <input
                type="text"
                placeholder="Search ..."
                className="bg-gray-100 text-gray-700 border-0 rounded-lg p-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div> */}
          </div>
          <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4 mr-10">
            <img
              src={cmti}
              alt="Logo"
              style={{
                overflow: 'auto',
                height: '36px',
                position: 'fixed',
              }}
            />
            {/* <div className="relative mr-6">
              <input
                type="text"
                placeholder="Search ..."
                className="bg-gray-100 text-gray-700 border-0 rounded-lg p-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div> */}
          </div>
            {/* <div className="relative">
              <Mail onClick={toggleMail} className="text-gray-400 cursor-pointer" size={20} />
              {isMailOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Inbox</a>
                  
                </div>
              )}
            </div> */}
            <div className="relative">
              <Bell onClick={toggleNotification} className="text-gray-400 cursor-pointer" size={20} />
              <span className="absolute -top-1 -right-1 bg-green-500 text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">4</span>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">New Notification</a>
                  {/* Add more notification options here */}
                </div>
              )}
            </div>
            {/* <Files className="text-gray-400" size={20} /> */}
            <div className="relative">
              <div className="flex items-center space-x-2 cursor-pointer">
                <User className="h-8 w-8 text-gray-600" />
                <span>{user ? user.username : 'User'}</span> {/* Dynamically show username */}
                <ChevronDown onClick={toggleUserMenu} className="text-gray-400" size={16} />
              </div>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
                  {user && (
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm leading-5 font-medium text-gray-900">{user.username}</p>
                      <p className="text-sm leading-5 text-gray-500">{user.email}</p> {/* Dynamically show email */}
                      <button className="mt-2 px-4 py-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                        View Profile
                      </button>
                    </div>
                  )}
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</a>
                  {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Balance</a> */}
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account Setting</a>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
