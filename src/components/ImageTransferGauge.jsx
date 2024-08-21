import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ImageTransferGauge = ({ progress }) => {
  const data = [
    { name: 'Progress', value: progress },
    { name: 'Remaining', value: 100 - progress },
  ];

  const COLORS = ['#00C49F', '#EAEAEA'];

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-4">
        <span className="text-2xl font-bold">{progress}%</span>
        <p>Transfer Complete</p>
      </div>
    </div>
  );
};

export default ImageTransferGauge;