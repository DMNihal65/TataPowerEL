
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Printer } from 'lucide-react';

const data = [
  { month: 'Jan', Subscribers: 150, NewVisitors: 100, ActiveUsers: 300 },
  { month: 'Feb', Subscribers: 180, NewVisitors: 80, ActiveUsers: 400 },
  { month: 'Mar', Subscribers: 170, NewVisitors: 90, ActiveUsers: 350 },
  { month: 'Apr', Subscribers: 200, NewVisitors: 120, ActiveUsers: 450 },
  { month: 'May', Subscribers: 220, NewVisitors: 100, ActiveUsers: 500 },
  { month: 'Jun', Subscribers: 230, NewVisitors: 110, ActiveUsers: 420 },
  { month: 'Jul', Subscribers: 250, NewVisitors: 130, ActiveUsers: 380 },
  { month: 'Aug', Subscribers: 280, NewVisitors: 140, ActiveUsers: 460 },
  { month: 'Sep', Subscribers: 270, NewVisitors: 160, ActiveUsers: 520 },
  { month: 'Oct', Subscribers: 300, NewVisitors: 180, ActiveUsers: 580 },
  { month: 'Nov', Subscribers: 320, NewVisitors: 200, ActiveUsers: 600 },
  { month: 'Dec', Subscribers: 350, NewVisitors: 220, ActiveUsers: 650 },
];

const UserStatisticsChart = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">User Statistics</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">
            Export
          </button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 flex items-center">
            <Printer size={16} className="mr-1" />
            Print
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="Subscribers" stackId="1" stroke="#FF6B6B" fill="#FF6B6B" />
          <Area type="monotone" dataKey="NewVisitors" stackId="1" stroke="#FFD93D" fill="#FFD93D" />
          <Area type="monotone" dataKey="ActiveUsers" stackId="1" stroke="#6BCB77" fill="#6BCB77" />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#FF6B6B] rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Subscribers</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#FFD93D] rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">New Visitors</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#6BCB77] rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Active Users</span>
        </div>
      </div>
    </div>
  );
};

export default UserStatisticsChart;