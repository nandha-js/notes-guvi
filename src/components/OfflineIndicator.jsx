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
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-xl text-white transition-colors duration-300
        ${isOnline ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}
      role="status"
      aria-live="polite"
    >
      {isOnline ? (
        <FiWifi className="text-xl" title="You are online" />
      ) : (
        <FiWifiOff className="text-xl" title="You are offline" />
      )}
      <span className="text-sm font-medium">
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );
};

export default OfflineIndicator;
