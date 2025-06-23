import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Archives from './pages/Archives';
import Trash from './pages/Trash';
import OfflineIndicator from './components/OfflineIndicator';
import { setupOfflineListener } from './utils/storage';

function App() {
  useEffect(() => {
    // Initialize service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('ServiceWorker registration successful');
          },
          (err) => {
            console.log('ServiceWorker registration failed: ', err);
          }
        );
      });
    }

    // Setup offline listener
    const cleanup = setupOfflineListener(() => {
      console.log(`Now ${navigator.onLine ? 'online' : 'offline'}`);
    });

    return () => {
      cleanup();
    };
  }, []);

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/trash" element={<Trash />} />
          </Routes>
        </main>
        <OfflineIndicator />
      </div>
    </Router>
  );
}

export default App;