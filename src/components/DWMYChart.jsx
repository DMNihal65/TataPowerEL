import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const generateRandomDataWithDates = () => {
  const generateRandomDate = (start, end) => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  // Generate random dates and data
  const dates = Array.from({ length: 6 }, () => generateRandomDate(new Date(2012, 0, 1), new Date(2017, 11, 31)));
  const daily = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));
  const weekly = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));
  const monthly = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));
  const yearly = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));

  return { dates, daily, weekly, monthly, yearly };
};

const ChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    
    // Generate random data with dates
    const randomData = generateRandomDataWithDates();

    // Chart configuration
    const option = {
      legend: {},
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      dataset: {
        source: [
          ['product', ...randomData.dates],
          ['Daily', ...randomData.daily],
          ['Weekly', ...randomData.weekly],
          ['Monthly', ...randomData.monthly],
          ['Yearly', ...randomData.yearly],
        ]
      },
      xAxis: { type: 'category' },
      yAxis: { gridIndex: 0 },
      grid: { top: '55%' },
      series: [
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '25%'],
          emphasis: {
            focus: 'self'
          },
          label: {
            formatter: `{b}: {@${randomData.dates[0]}} `
          },
          encode: {
            itemName: 'product',
            value: randomData.dates[0],
            tooltip: randomData.dates[0]
          }
        }
      ]
    };

    chartInstance.setOption(option);

    // Handle axis pointer updates
    chartInstance.on('updateAxisPointer', function (event) {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        chartInstance.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: `{b}: {@${randomData.dates[dimension - 1]}}`
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        });
      }
    });

    return () => {
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default ChartComponent;
