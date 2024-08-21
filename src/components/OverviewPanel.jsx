// OverviewPanel.js
import React from 'react';

const OverviewPanel = ({ alerts }) => (
  <div className="bg-white rounded shadow p-4">
    <h4 className="text-lg font-semibold">Overview Panel</h4>
    <ul>
      {alerts.map((alert, index) => (
        <li key={index} className="text-gray-600">
          {alert}
        </li>
      ))}
    </ul>
  </div>
);

export default OverviewPanel;
