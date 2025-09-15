import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';

const ShopDetail = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShop();
  }, [id]);

  const fetchShop = async () => {
    try {
      const response = await fetch(`https://balram-backend-clean-production.up.railway.app/api/shops/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setShop(data.data);
      } else {
        setError('Shop not found');
      }
    } catch (error) {
      setError('Error loading shop details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading shop details...</div>
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop Not Found</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link to="/shops" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Back to Shops
        </Link>
      </div>
    );
  }

  // Generate SEO data from shop data
  const seoTitle = shop.seoTitle || `${shop.name} - Available for Rent at Balram Complex`;
  const seoDescription = shop.seoDescription || `${shop.description.substring(0, 150)}. Located at ${shop.location}. ₹${shop.price}/month. Contact for viewing.`;
  const seoKeywords = shop.keywords ? shop.keywords.join(', ') : `${shop.category}, shop for rent, ${shop.location}, commercial space`;
  const shopImageUrl = shop.images && shop.images[0] ? shop.images[0].url : '';

  return (
    <>
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={shop.canonicalUrl || `https://balramcomplex.com/shops/${shop.slug || shop.id}`}
        keywords={seoKeywords}
        imageUrl={shopImageUrl}
      />
      
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/shops" className="text-blue-600 hover:text-blue-800">← Back to Shops</Link>
        </nav>

        {/* Shop Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="md:flex">
            {/* Main Image */}
            {shop.images && shop.images[0] && (
              <div className="md:w-1/2">
                <img 
                  src={shop.images[0].url} 
                  alt={shop.images[0].altText}
                  className="w-full h-96 object-cover"
                />
              </div>
            )}
            
            {/* Shop Info */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{shop.name}</h1>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <span className="text-gray-600 w-24">Category:</span>
                  <span className="font-medium">{shop.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-24">Location:</span>
                  <span className="font-medium">{shop.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-24">Area:</span>
                  <span className="font-medium">{shop.area}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-24">Rent:</span>
                  <span className="text-2xl font-bold text-green-600">₹{shop.price}/month</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-24">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    shop.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {shop.status}
                  </span>
                </div>
              </div>

              {shop.status === 'available' && (
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold">
                  Contact for Viewing
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Description & Amenities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Description */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{shop.description}</p>
          </div>

          {/* Amenities */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {shop.amenities && shop.amenities.map((amenity, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Images */}
        {shop.images && shop.images.length > 1 && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shop.images.slice(1).map((image, index) => (
                <img 
                  key={index}
                  src={image.url} 
                  alt={image.altText}
                  title={image.caption}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopDetail;
