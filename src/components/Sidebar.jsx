import React, { useState } from 'react';
import { Home,BarChart, Search, Upload, FileText, Users, BarChart2, Bell, Menu, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/tatapower.svg';

const Logo = ({ isCollapsed }) => (
  <div className={`flex items-center px-4 py-5 ${isCollapsed ? 'justify-center' : ''}`}>
    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-white to-white flex items-center justify-center text-white font-bold text-xl">
      <img
        src={logo}
        alt="Logo"
        style={{
          height: '100%',
          maxWidth: '100%',
          objectFit: 'contain', // Ensure the logo fits within the container
        }}
      />
    </div>
    {!isCollapsed && (
      <span className="ml-2 text-white text-lg font-semibold">
        <div
          className="logo"
          style={{
            height: '100px', // Adjust height when sidebar is collapsed or open
            margin: '16px',
            textAlign: 'center',
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              height: '100%',
              maxWidth: '100%',
              objectFit: 'contain', // Ensure the logo fits within the container
            }}
          />
        </div>
      </span>
    )}
  </div>
);

const MenuItem = ({ icon: Icon, label, onClick, isActive, hasNotification, notificationCount, isCollapsed }) => (
  <div
    className={`flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'} rounded-lg cursor-pointer`}
    onClick={onClick}
  >
    <Icon size={20} className={`${isActive ? 'text-white' : 'text-gray-400'}`} />
    {!isCollapsed && (
      <>
        <span className={`ml-3 ${isActive ? 'text-white' : 'text-gray-300'}`}>{label}</span>
        {hasNotification && (
          <div className="ml-auto bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notificationCount}
          </div>
        )}
      </>
    )}
  </div>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Initially collapsed
  const [activeItem, setActiveItem] = useState('dashboard');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  const handleMenuClick = (path) => {
    setActiveItem(path);
    navigate(`/${path}`);
    setIsCollapsed(true); // Collapse the sidebar after navigating
  };

  return (
    <div
      className={`bg-gray-800 text-white h-full flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex justify-between items-center p-4">
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {isCollapsed ? <ChevronRight size={24} /> : <Menu size={24} />}
        </button>
        <img
          src={logo}
          alt="Logo"
          className="ml-20"
          style={{
            overflow: 'auto',
            height: '15vh',
            position: 'fixed',
          }}
        />
      </div>
      <div className="flex-grow overflow-y-auto">
        <MenuItem 
          icon={BarChart} 
          label="Analytics" 
          isActive={activeItem === 'dashboard'}
          onClick={() => handleMenuClick('dashboard')} 
          isCollapsed={isCollapsed} 
        />
        {/* {!isCollapsed && <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Components</div>} */}
        <MenuItem 
          icon={Search} 
          label="Image Search and Retrieval" 
          isActive={activeItem === 'imageSearchRetrieval'} 
          onClick={() => handleMenuClick('image-search')} 
          isCollapsed={isCollapsed} 
        />
        {/* <MenuItem 
          icon={Upload} 
          label="Upload & Transfer Management" 
          isActive={activeItem === 'uploadTransfer'} 
          onClick={() => handleMenuClick('upload-transfer')} 
          isCollapsed={isCollapsed} 
        />
        <MenuItem 
          icon={FileText} 
          label="Reports & Monitoring" 
          isActive={activeItem === 'reportsMonitoring'} 
          onClick={() => handleMenuClick('reports-monitoring')} 
          isCollapsed={isCollapsed} 
        />
        <MenuItem 
          icon={Users} 
          label="User Management & Security" 
          isActive={activeItem === 'userManagement'} 
          onClick={() => handleMenuClick('user-management')} 
          isCollapsed={isCollapsed} 
        />
        <MenuItem icon={BarChart2} label="Charts" isCollapsed={isCollapsed} />
        <MenuItem icon={Bell} label="Notification" hasNotification={true} notificationCount={1} isCollapsed={isCollapsed} /> */}
      </div>
      <Logo isCollapsed={isCollapsed} />
    </div>
  );
};

export default Sidebar;
