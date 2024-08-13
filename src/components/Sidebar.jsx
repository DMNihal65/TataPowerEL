import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray text-black w-64  p-4 shadow-md">
      <ul>
        <li className="my-2">
            
          <Link to="/dashboard" className="block p-2 hover:bg-sky-500 hover:text-white rounded">Dashboard</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
