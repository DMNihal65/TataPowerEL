// src/components/SelectPeriod.jsx

import React from 'react';

const SelectPeriod = ({ selectedPeriod, onPeriodChange }) => {
  return (
    <div className="mb-6">
      <label className="text-lg font-semibold mr-4">Select Period:</label>
      <input
        type="radio"
        id="daily"
        name="period"
        value="daily"
        checked={selectedPeriod === 'daily'}
        onChange={() => onPeriodChange('daily')}
      />
      <label htmlFor="daily" className="mr-4">Daily</label>

      <input
        type="radio"
        id="weekly"
        name="period"
        value="weekly"
        checked={selectedPeriod === 'weekly'}
        onChange={() => onPeriodChange('weekly')}
      />
      <label htmlFor="weekly" className="mr-4">Weekly</label>

      <input
        type="radio"
        id="monthly"
        name="period"
        value="monthly"
        checked={selectedPeriod === 'monthly'}
        onChange={() => onPeriodChange('monthly')}
      />
      <label htmlFor="monthly">Monthly</label>
    </div>
  );
};

export default SelectPeriod;
