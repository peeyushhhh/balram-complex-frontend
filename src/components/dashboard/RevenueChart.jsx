import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RevenueChart = () => {
  const revenueData = [
    { month: 'Jan', revenue: 285000, shops: 20 },
    { month: 'Feb', revenue: 298000, shops: 21 },
    { month: 'Mar', revenue: 312000, shops: 22 },
    { month: 'Apr', revenue: 295000, shops: 21 },
    { month: 'May', revenue: 334000, shops: 23 },
    { month: 'Jun', revenue: 345000, shops: 24 },
    { month: 'Jul', revenue: 358000, shops: 24 },
    { month: 'Aug', revenue: 342000, shops: 23 },
    { month: 'Sep', revenue: 367000, shops: 24 },
    { month: 'Oct', revenue: 378000, shops: 24 },
    { month: 'Nov', revenue: 389000, shops: 25 },
    { month: 'Dec', revenue: 401000, shops: 25 }
  ];

  const formatCurrency = (value) => {
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: '#666' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            tickFormatter={formatCurrency}
            tick={{ fontSize: 12, fill: '#666' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
            labelStyle={{ color: '#374151' }}
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
