import React from 'react';
import ShiftSummaryChart from '../components/ShiftSummaryChart';
import ImageTransferGauge from '../components/ImageTransferGauge';
import StorageStatusChart from '../components/StorageStatusChart';
import UserStatisticsChart from '../components/UserStatisticsChart';

const StatCard = ({ title, children }) => (
  <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-md flex flex-col h-full">
    <h4 className="text-gray-700 text-lg font-medium mb-4">{title}</h4>
    {children}
  </div>
);

const Dashboard = () => {
  return (
    <div className="flex h-full bg-gray-100"> {/* Use h-full instead of h-screen */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-200"> {/* Allow only vertical scrolling */}
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium mb-6">Dashboard</h3>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatCard title="Shift Summary">
                <ShiftSummaryChart />
              </StatCard>
              <StatCard title="Image Transfer Status">
                <ImageTransferGauge progress={60} />
              </StatCard>
              <StatCard title="Storage Status">
                <StorageStatusChart />
              </StatCard>
              <StatCard title="User Statistics">
                <UserStatisticsChart />
              </StatCard>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
