import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
      <div className="flex flex-1">
        {isSidebarVisible && <Sidebar />} {/* Conditional rendering of the sidebar */}
        <div className={`flex-1 p-6 bg-gray-100 ${isSidebarVisible ? 'ml-0' : 'ml-0'}`}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome to the Dashboard</h2>
          {/* Add dashboard content here */}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Dashboard;
