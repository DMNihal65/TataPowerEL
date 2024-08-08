import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Add your signup logic here
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-6 text-center text-gray-800">Signup</h2>
        <Input 
          placeholder="Username" 
          className="mb-4" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <Input 
          placeholder="Email" 
          className="mb-4" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Input.Password 
          placeholder="Password" 
          className="mb-6" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button type="primary" block onClick={handleSignup}>Signup</Button>
        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-500 hover:text-blue-700">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
