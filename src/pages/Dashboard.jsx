import { useState, useEffect } from 'react';
import { shopsAPI } from '../services/api';
import { TrendingUp, Building2, Users, DollarSign, Calendar } from 'lucide-react';
import RevenueChart from '../components/dashboard/RevenueChart';
import OccupancyChart from '../components/dashboard/OccupancyChart';
import CategoryChart from '../components/dashboard/CategoryChart';
import SEOHead from '../components/common/SEOHead';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    revenue: 0,
    occupied: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await shopsAPI.getAll();
      const shops = response.data || [];
      
      const total = shops.length;
      const available = shops.filter(shop => shop.status === 'available').length;
      const occupied = total - available;
      const revenue = shops.reduce((sum, shop) => sum + (shop.price || 0), 0);
      
      setStats({ total, available, revenue, occupied });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // KPI Cards Data
  const kpiData = [
    {
      title: 'Total Shops',
      value: stats.total,
      change: '+2 from last month',
      changeType: 'positive',
      icon: Building2,
      color: 'blue'
    },
    {
      title: 'Monthly Revenue',
      value: `₹${stats.revenue.toLocaleString()}`,
      change: '+12% from last month',
      changeType: 'positive',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Occupancy Rate',
      value: `${stats.total > 0 ? ((stats.occupied / stats.total) * 100).toFixed(1) : 0}%`,
      change: '+5% from last month',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Available Now',
      value: stats.available,
      change: '-3 from last week',
      changeType: 'negative',
      icon: Users,
      color: 'orange'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 bg-blue-50',
      green: 'bg-green-500 text-green-600 bg-green-50',
      purple: 'bg-purple-500 text-purple-600 bg-purple-50',
      orange: 'bg-orange-500 text-orange-600 bg-orange-50'
    };
    return colors[color].split(' ');
  };

  return (
    <>
      <SEOHead 
        title="Analytics Dashboard - Balram Complex | Real Estate Management"
        description="Comprehensive analytics dashboard for Balram Complex showing occupancy rates, revenue trends, and shop performance metrics."
        canonicalUrl="https://balramcomplex.com/dashboard"
        keywords="real estate dashboard, analytics, occupancy rates, revenue tracking, balram complex"
        imageUrl="https://balramcomplex.com/images/dashboard-preview.jpg"
      />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Real-time insights for Balram Complex</p>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const [bgColor, textColor, lightBg] = getColorClasses(kpi.color);
            const Icon = kpi.icon;
            
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className={`${lightBg} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${textColor}`} />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`text-sm ${kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Revenue Trends</h2>
            <RevenueChart />
          </div>

          {/* Occupancy Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Shop Occupancy</h2>
            <OccupancyChart />
          </div>
        </div>

        {/* Category Chart - Full Width */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Revenue by Category</h2>
          <CategoryChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
