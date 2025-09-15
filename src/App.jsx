import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Shops from './pages/Shops';
import ShopDetail from './pages/ShopDetail';
import AddShop from './pages/AddShop';
import telemetry from './services/telemetry'; // ← ADD THIS IMPORT

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Track app initialization
    telemetry.trackPageView('app_initialization');
  }, []);

  // Track route changes
  useEffect(() => {
    telemetry.trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/shops" element={<Shops />} />
             <Route path="/shops/:id" element={<ShopDetail />} />
            <Route path="/add-shop" element={<AddShop />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
