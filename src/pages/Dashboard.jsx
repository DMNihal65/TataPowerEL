import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
      <div className="flex">
        {isSidebarVisible && <Sidebar />} {/* Conditional rendering of the sidebar */}
        <div className={`flex-1 p-6 bg-gray-100 min-h-screen ${isSidebarVisible ? 'ml-0' : 'ml-0'}`}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome to the Dashboard</h2>
          {/* Add dashboard content here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
