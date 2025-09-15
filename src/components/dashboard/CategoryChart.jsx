import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CategoryChart = () => {
  const categoryData = [
    { category: 'Clothing & Fashion', revenue: 145000, shops: 8, avgRent: 18125 },
    { category: 'Electronics', revenue: 98000, shops: 4, avgRent: 24500 },
    { category: 'Food & Restaurants', revenue: 87000, shops: 6, avgRent: 14500 },
    { category: 'Beauty & Wellness', revenue: 76000, shops: 3, avgRent: 25333 },
    { category: 'Books & Stationery', revenue: 54000, shops: 2, avgRent: 27000 },
    { category: 'Home & Furniture', revenue: 43000, shops: 2, avgRent: 21500 }
  ];

  const formatCurrency = (value) => {
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={categoryData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="category" 
            tick={{ fontSize: 11, fill: '#666' }}
            tickLine={false}
            axisLine={false}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            tickFormatter={formatCurrency}
            tick={{ fontSize: 12, fill: '#666' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'revenue') return [`₹${value.toLocaleString()}`, 'Monthly Revenue'];
              return [value, name];
            }}
            labelStyle={{ color: '#374151' }}
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar 
            dataKey="revenue" 
            fill="#3b82f6" 
            radius={[4, 4, 0, 0]}
            name="revenue"
          />
        </BarChart>
      </ResponsiveContainer>
      
      {/* Category Stats */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        {categoryData.slice(0, 3).map((item, index) => (
          <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="font-semibold text-blue-600">{item.category}</div>
            <div className="text-gray-600">{item.shops} shops • ₹{item.avgRent.toLocaleString()}/mo avg</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryChart;
