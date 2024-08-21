import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Shift 1', completed: 4000, pending: 2400 },
  { name: 'Shift 2', completed: 3000, pending: 1398 },
  { name: 'Shift 3', completed: 2000, pending: 9800 },
  { name: 'Shift 4', completed: 2780, pending: 3908 },
];

const ShiftSummaryChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#8884d8" />
        <Bar dataKey="pending" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ShiftSummaryChart;