import AddShopForm from "../components/dashboard/AddShopForm";
import SEOHead from "../components/common/SEOHead";
import telemetry from "../services/telemetry"; // ← ADD THIS IMPORT
import { useEffect } from 'react'; // ← ADD THIS IMPORT

const AddShop = () => {
  useEffect(() => {
    // Track page view when component mounts
    telemetry.trackPageView('add_shop_page');
  }, []);

  return (
    <>
      <SEOHead 
        title="Add New Shop - Balram Complex | Commercial Space Management"
        description="Add a new commercial shop to Balram Complex. Complete form with shop details, images, amenities and SEO information."
        canonicalUrl="https://balramcomplex.com/add-shop"
        keywords="add shop, commercial space, shop management, balram complex"
      />
      
      <div className="space-y-6">
        <AddShopForm />
      </div>
    </>
  );
};

export default AddShop;
