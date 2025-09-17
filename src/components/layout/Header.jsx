const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <span className="text-white font-bold">BC</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Balram Complex</h1>
            <p className="text-sm text-gray-500">Shop Management CMS</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Welcome, {user?.name || 'Admin'}
          </span>
          <button
            onClick={onLogout}
            className="text-sm text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-200 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
