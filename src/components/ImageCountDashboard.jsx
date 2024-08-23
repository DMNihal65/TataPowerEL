// src/components/ImageCountDashboard.jsx

import React, { useState } from 'react';
import SelectPeriod from './SelectPeriod';
import ImageCountChart from './ImageCountChart';

const ImageCountDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Image Count Dashboard</h1>
      <SelectPeriod selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
      <ImageCountChart period={selectedPeriod} />
    </div>
  );
};

export default ImageCountDashboard;
