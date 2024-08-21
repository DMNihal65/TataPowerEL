import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ImageSearchRetrieval from './components/ImageSearchRetrieval';
import Layout from './components/Layout'; // Import the Layout component
import UploadTransferManagement from './components/UploadTransferManagement '; 
import ReportsMonitoring from './components/ReportsMonitoring'; 
import UserManagementSecurity from './components/UserManagementSecurity'; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route 
          path="/image-search" 
          element={isAuthenticated ? (
            <Layout>
              <ImageSearchRetrieval />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route 
          path="/upload-transfer" 
          element={isAuthenticated ? (
            <Layout>
              <UploadTransferManagement />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
          <Route 
            path="/reports-monitoring" 
            element={isAuthenticated ? (
              <Layout>
                <ReportsMonitoring />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route 
            path="/user-management" 
            element={isAuthenticated ? (
              <Layout>
                <UserManagementSecurity  />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )}
          />
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
    </UserProvider>
  );
};

export default App;
