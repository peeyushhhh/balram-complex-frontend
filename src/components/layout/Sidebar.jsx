import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen">
      <nav className="p-4 space-y-2">
        <Link 
          to="/" 
          className={`w-full text-left px-3 py-2 rounded-lg block ${
            isActive('/') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
          }`}
        >
          📊 Dashboard
        </Link>
        <Link 
          to="/shops" 
          className={`w-full text-left px-3 py-2 rounded-lg block ${
            isActive('/shops') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
          }`}
        >
          🏪 Shops
        </Link>
        <Link 
          to="/add-shop" 
          className={`w-full text-left px-3 py-2 rounded-lg block ${
            isActive('/add-shop') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
          }`}
        >
          ➕ Add Shop
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
