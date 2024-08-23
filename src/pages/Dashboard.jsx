import React, { useState } from 'react';
import ChartComponent from '../components/DWMYChart';

const Dashboard = () => {
  // Sample data - replace with actual data fetching logic

  return (
    <div className="flex h-full flex-col p-4">
      <h1 className="text-3xl font-bold mb-4 text-center ">Analytics</h1>
      <ChartComponent/>
    </div>
  );
};

export default Dashboard;
