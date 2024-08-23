// src/components/TotalImagesChart.jsx

import React from 'react';
import ReactECharts from 'echarts-for-react';

const TotalImagesChart = () => {
  // Static data for the chart
  const data = [
    { production_line: 'Mercury', count: 120 },
    { production_line: 'Galaxy', count: 150 },
    { production_line: 'Vega', count: 80 },
    { production_line: 'Jigani', count: 200 },
  ];

  const xAxisData = data.map((item) => item.production_line);
  const countsData = data.map((item) => item.count);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Total Images'],
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Count',
      },
    ],
    series: [
      {
        name: 'Total Images',
        type: 'bar',
        data: countsData,
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color: '#42a5f5',
        },
      },
    ],
  };

  return (
    <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-md">
      <h4 className="text-gray-700 text-lg font-medium mb-4">Total Images Count by Production Line</h4>
      <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default TotalImagesChart;
