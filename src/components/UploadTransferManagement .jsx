import React, { useState } from 'react';

const UploadTransferManagement = () => {
  const [file, setFile] = useState(null);
  const [transferLogs, setTransferLogs] = useState([]);
  const [notification, setNotification] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      // Simulate an upload process
      const logEntry = {
        fileName: file.name,
        status: 'Uploaded',
        timestamp: new Date().toLocaleString(),
      };
      setTransferLogs((prevLogs) => [...prevLogs, logEntry]);
      setNotification(`File "${file.name}" uploaded successfully.`);
      setFile(null);
    } else {
      setNotification('Please select a file to upload.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Upload & Transfer Management</h1>

      <div className="flex space-x-4 mb-4">
        {/* Manual Upload Section */}
        <div className="flex-grow">
          <h2 className="text-xl font-semibold mb-2">Manual Upload</h2>
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="p-2 border rounded" 
          />
          <button 
            onClick={handleUpload} 
            className="ml-2 p-2 bg-blue-500 text-white rounded"
          >
            Upload
          </button>
        </div>

        {/* Transfer Logs Section */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-2">Transfer Logs</h2>
          <div className="border rounded p-2 max-h-60 overflow-y-auto">
            {transferLogs.length > 0 ? (
              <ul>
                {transferLogs.map((log, index) => (
                  <li key={index} className="py-1 border-b">
                    {log.fileName} - {log.status} at {log.timestamp}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transfer logs available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="border rounded p-4 mt-4 bg-gray-100">
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        {notification ? (
          <p className="text-green-600">{notification}</p>
        ) : (
          <p>No notifications.</p>
        )}
      </div>
    </div>
  );
};

export default UploadTransferManagement;
