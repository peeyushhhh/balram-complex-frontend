import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import { shopsAPI } from '../services/api';
import telemetry from '../services/telemetry'; // ← ADD THIS IMPORT

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShops();
    // Track page view
    telemetry.trackPageView('shops_listing');
  }, []);

  const fetchShops = async () => {
    const startTime = Date.now();
    
    try {
      const response = await shopsAPI.getAll();
      const data = response.data || [];
      
      // Track API performance
      telemetry.trackAPICall('/api/shops', 'GET', Date.now() - startTime, 200);
      
      setShops(Array.isArray(data) ? data : []);
    } catch (error) {
      // Track API error
      telemetry.trackAPICall('/api/shops', 'GET', Date.now() - startTime, 500);
      console.error('Error fetching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  // Track shop clicks
  const handleShopClick = (shop) => {
    telemetry.trackShopView(shop.id || shop._id, shop.name);
  };

  return (
    <>
      <SEOHead 
        title="Available Shops for Rent - Balram Complex"
        description="Browse premium commercial shops for rent at Balram Complex."
        canonicalUrl="https://balramcomplex.com/shops"
      />
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Shops</h1>
          <Link 
            to="/add-shop"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            ➕ Add Shop
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading shops...</p>
          </div>
        ) : shops.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No shops found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => (
              <div 
                key={shop.id || shop._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleShopClick(shop)} // ← ADD THIS TRACKING
              >
                {shop.images && shop.images[0] && (
                  <img 
                    src={shop.images[0].url || 'https://via.placeholder.com/400x200'} 
                    alt={shop.images[0].altText || shop.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{shop.name}</h3>
                  <p className="text-gray-600 mb-2">{shop.category}</p>
                  <p className="text-gray-700 text-sm mb-4">{shop.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">
                      ₹{shop.price?.toLocaleString() || 'N/A'}/month
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      shop.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {shop.status || 'unknown'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Shops;
