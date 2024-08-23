// import React from 'react';
// import Sidebar from './Sidebar'; // Adjust the import path as needed
// import Header from './Header'; // Adjust the import path as needed
// import Footer from './Footer'; // Import the Footer component

// const Layout = ({ children }) => {
//   return (
//     <div className="flex flex-col h-screen">
//       <Header />
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar className="w-64 bg-gray-800 text-white hidden md:block " /> {/* Sidebar visible on medium screens and up */}
//         <div className="flex-1 p-4 overflow-y-auto">
//           {children}
//         </div>
//       </div>
//       <Footer /> {/* Footer remains at the bottom */}
//     </div>
//   );
// };

// export default Layout;


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
