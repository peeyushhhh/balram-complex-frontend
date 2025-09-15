const Header = () => {
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
      </div>
    </header>
  );
};

export default Header;
