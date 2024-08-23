// src/components/ImageCountChart.jsx

import React from 'react';
import ReactECharts from 'echarts-for-react';

// Example data for demonstration
const data = {
  daily: [
    { day: '2024-08-01', count: 20 },
    { day: '2024-08-02', count: 30 },
    { day: '2024-08-03', count: 25 },
    // Add more daily data here
  ],
  weekly: [
    { week: 'Week 1', count: 100 },
    { week: 'Week 2', count: 150 },
    { week: 'Week 3', count: 120 },
    // Add more weekly data here
  ],
  monthly: [
    { month: 'January', count: 300 },
    { month: 'February', count: 250 },
    { month: 'March', count: 270 },
    // Add more monthly data here
  ],
};

const ImageCountChart = ({ period }) => {
  const currentData = data[period] || [];

  const options = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: currentData.map(item => period === 'daily' ? item.day : period === 'weekly' ? item.week : item.month),
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      name: 'Count',
    },
    series: [
      {
        name: `${period.charAt(0).toUpperCase() + period.slice(1)} Count`,
        type: 'line',
        data: currentData.map(item => item.count),
        smooth: true,
        areaStyle: {}, // Adds a filled area under the line
        itemStyle: {
          color: period === 'daily' ? '#ff7f50' : period === 'weekly' ? '#87cefa' : '#32cd32',
        },
      },
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
  };

  return (
    <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-md">
      <ReactECharts option={options} style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default ImageCountChart;
