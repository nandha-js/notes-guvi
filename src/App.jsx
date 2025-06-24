import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setupOfflineListener } from './utils/storage';

import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Archives from './pages/Archives';
import Trash from './pages/Trash';
import OfflineIndicator from './components/OfflineIndicator';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(reg => console.log('✅ Service Worker registered:', reg))
        .catch(err => console.error('❌ Service Worker registration failed:', err));
    }

    // Setup online/offline event listeners
    const cleanup = setupOfflineListener(() => {
      setIsOnline(navigator.onLine);
      console.log(navigator.onLine ? '🌐 Back online' : '📴 Went offline');
    });

    return cleanup;
  }, []);

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Offline Notice */}
          {!isOnline && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 animate-pulse">
              <p className="text-yellow-700">
                ⚠️ You are currently offline. Some features may be limited.
              </p>
            </div>
          )}

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/trash" element={<Trash />} />
          </Routes>
        </main>

        {/* Floating Online/Offline Status */}
        <OfflineIndicator />
      </div>
    </Router>
  );
}

export default App;
