import { useEffect, useState } from 'react';
import { FiWifi, FiWifiOff } from 'react-icons/fi';
import { setupOfflineListener } from '../utils/storage';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    return setupOfflineListener(() => {
      setIsOnline(navigator.onLine);
    });
  }, []);

  return (
    <div className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg ${
      isOnline ? 'bg-green-500' : 'bg-red-500'
    } text-white`}>
      {isOnline ? (
        <FiWifi className="text-xl" />
      ) : (
        <FiWifiOff className="text-xl" />
      )}
      <span className="sr-only">
        {isOnline ? 'Online' : 'Offline'}
      </span>
      <div className="absolute -top-2 -right-2 bg-white text-xs text-gray-800 rounded-full px-2 py-1 shadow">
        {isOnline ? 'Online' : 'Offline'}
      </div>
    </div>
  );
};

export default OfflineIndicator;