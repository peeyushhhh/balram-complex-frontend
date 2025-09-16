import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import { shopsAPI } from '../services/api';

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const response = await shopsAPI.getAll();
      console.log('Full API Response:', response);
      
      const apiResponse = response.data || response || [];
      let shopsData = apiResponse.data || apiResponse;
      
      if (!Array.isArray(shopsData)) {
        shopsData = [];
      }
      
      console.log('Raw shops data:', shopsData);
      
      // ✅ FIXED - Use correct field names and syntax
      const completeShops = shopsData.filter(shop => 
        shop && 
        ((shop.name && shop.name.trim() !== '') || (shop.title && shop.title.trim() !== '')) &&
        (shop.category || shop.propertyType)
      );
      
      console.log(`Filtered shops: ${completeShops.length} complete out of ${shopsData.length} total`);
      console.log('Complete shops:', completeShops);
      
      setShops(completeShops);
    } catch (error) {
      console.error('Error fetching shops:', error);
      setShops([]);
    } finally {
      setLoading(false);
    }
  };

  const handleShopClick = (shop) => {
    // ✅ FIXED - Handle both old and new field names
    if (shop && shop._id && (shop.name || shop.title)) {
      navigate(`/shops/${shop._id}`);
    }
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
            <p className="text-gray-400 text-sm mt-2">Add a new shop to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => (
              <div 
                key={shop._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleShopClick(shop)}
              >
                {shop.images && shop.images[0] && shop.images[0].url && (
                  <img 
                    src={shop.images[0].url} 
                    alt={shop.images[0].altText || shop.name || shop.title || 'Shop image'}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                    }}
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {shop.name || shop.title || 'Unnamed Shop'}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {shop.category || shop.propertyType || 'Category not specified'}
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    {shop.description ? shop.description.substring(0, 100) + '...' : 'No description available'}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">
                      {shop.price ? `₹${shop.price}/month` : (shop.contact?.phone ? `Contact: ${shop.contact.phone}` : 'Contact for details')}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      shop.status === 'available' ? 'bg-green-100 text-green-800' : 
                      'bg-gray-100 text-gray-800'
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
