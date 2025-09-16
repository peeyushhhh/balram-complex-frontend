import { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';
// import telemetry from '../../services/telemetry'; // TEMPORARILY DISABLED

const AddShopForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    area: '',
    price: '',
    status: 'available',
    description: '',
    amenities: [],
    seoTitle: '',
    seoDescription: '',
    keywords: [],
    canonicalUrl: ''
  });

  const [images, setImages] = useState([]);
  const [amenityInput, setAmenityInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // DISABLED - Track user input changes
    // telemetry.trackEvent('form_input_change', {
    //   field: name,
    //   value_length: value.length,
    //   form: 'add_shop'
    // });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // DISABLED - Track image upload attempts
    // telemetry.trackEvent('image_upload_attempt', {
    //   file_count: files.length,
    //   total_size: files.reduce((sum, file) => sum + file.size, 0)
    // });
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [...prev, {
          url: event.target.result,
          file: file,
          altText: '',
          caption: ''
        }]);
        
        // DISABLED - Track successful image upload
        // telemetry.trackEvent('image_upload_success', {
        //   file_name: file.name,
        //   file_size: file.size,
        //   file_type: file.type
        // });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const removedImage = images[index];
    setImages(prev => prev.filter((_, i) => i !== index));
    
    // DISABLED - Track image removal
    // telemetry.trackEvent('image_remove', {
    //   index,
    //   file_name: removedImage?.file?.name,
    //   total_images_remaining: images.length - 1
    // });
  };

  const addAmenity = () => {
    if (amenityInput.trim() && !formData.amenities.includes(amenityInput.trim())) {
      const newAmenity = amenityInput.trim();
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity]
      }));
      
      // DISABLED - Track amenity addition
      // telemetry.trackEvent('amenity_add', {
      //   amenity: newAmenity,
      //   total_amenities: formData.amenities.length + 1
      // });
      
      setAmenityInput('');
    }
  };

  const removeAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }));
    
    // DISABLED - Track amenity removal
    // telemetry.trackEvent('amenity_remove', {
    //   amenity,
    //   remaining_count: formData.amenities.length - 1
    // });
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      const newKeyword = keywordInput.trim();
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword]
      }));
      
      // DISABLED - Track keyword addition
      // telemetry.trackEvent('keyword_add', {
      //   keyword: newKeyword,
      //   total_keywords: formData.keywords.length + 1
      // });
      
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
    
    // DISABLED - Track keyword removal
    // telemetry.trackEvent('keyword_remove', {
    //   keyword,
    //   remaining_count: formData.keywords.length - 1
    // });
  };

  // ✅ MAIN FIX - Updated handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // ✅ FIXED - Send as JSON instead of FormData
      const submitData = {
        ...formData,
        images: images.map(img => ({
          url: img.url,
          altText: img.altText || formData.name,
          caption: img.caption || `Image of ${formData.name}`
        }))
      };

      console.log('Submitting data:', submitData);

      const response = await fetch('https://balram-backend-clean-production.up.railway.app/api/shops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // ✅ JSON headers
        },
        body: JSON.stringify(submitData) // ✅ JSON body
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success response:', result);
        
        alert('Shop added successfully!');
        
        // Reset form
        setFormData({
          name: '', category: '', location: '', area: '', price: '',
          status: 'available', description: '', amenities: [],
          seoTitle: '', seoDescription: '', keywords: [], canonicalUrl: ''
        });
        setImages([]);
        setAmenityInput('');
        setKeywordInput('');
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        alert(`Error: ${errorData.message || 'Please try again'}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Shop</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shop Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="Enter shop name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              >
                <option value="">Select category</option>
                <option value="Clothing & Fashion">Clothing & Fashion</option>
                <option value="Electronics">Electronics</option>
                <option value="Food & Restaurants">Food & Restaurants</option>
                <option value="Beauty & Wellness">Beauty & Wellness</option>
                <option value="Books & Stationery">Books & Stationery</option>
                <option value="Home & Furniture">Home & Furniture</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="e.g., Ground Floor, Shop No. 12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area (sq ft) *
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="e.g., 500 sq ft"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Rent (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="25000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              >
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="maintenance">Under Maintenance</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              disabled={isSubmitting}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              placeholder="Describe the shop, its features, and benefits..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isSubmitting}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className={`flex flex-col items-center cursor-pointer ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <span className="text-sm font-medium text-gray-600">
                  Click to upload images
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 10MB each
                </span>
              </label>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      disabled={isSubmitting}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 disabled:opacity-50"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                disabled={isSubmitting}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="Add amenity (e.g., AC, Parking, WiFi)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
              />
              <button
                type="button"
                onClick={addAmenity}
                disabled={isSubmitting}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {amenity}
                  <button
                    type="button"
                    onClick={() => removeAmenity(amenity)}
                    disabled={isSubmitting}
                    className="ml-2 text-blue-600 hover:text-blue-800 disabled:opacity-50"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* SEO Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Information</h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  placeholder="Shop Name - Category - Balram Complex"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Description
                </label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleInputChange}
                  rows={3}
                  disabled={isSubmitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  placeholder="Brief description for search engines (150-160 characters)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    disabled={isSubmitting}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder="Add SEO keyword"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    disabled={isSubmitting}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        disabled={isSubmitting}
                        className="ml-2 text-green-600 hover:text-green-800 disabled:opacity-50"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Canonical URL
                </label>
                <input
                  type="url"
                  name="canonicalUrl"
                  value={formData.canonicalUrl}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  placeholder="https://balramcomplex.com/shops/shop-name"
                />
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-green-600 mr-2">✅</span>
                  <h4 className="font-semibold text-green-800">SEO Benefits</h4>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Better search engine rankings</li>
                  <li>• Rich snippets in search results</li>
                  <li>• Improved click-through rates</li>
                  <li>• Enhanced user accessibility</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              disabled={isSubmitting}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding Shop...
                </>
              ) : (
                'Add Shop'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShopForm;
