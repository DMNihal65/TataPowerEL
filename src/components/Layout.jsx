import React from 'react';
import Sidebar from './Sidebar'; // Adjust the import path as needed
import Header from './Header'; // Adjust the import path as needed
import Footer from './Footer'; // Import the Footer component

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-grow p-4 overflow-y-auto"> {/* Allow scrolling in the content area */}
          {children}
        </div>
        <Footer /> {/* Footer remains at the bottom */}
      </div>
    </div>
  );
};

export default Layout;
