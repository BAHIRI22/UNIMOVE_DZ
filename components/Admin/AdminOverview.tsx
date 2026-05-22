'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, MapPin, TrendingUp } from 'lucide-react';

export function AdminOverview() {
  const { t, language } = useLanguage();

  const stats = [
    { label: t('admin.activeUsers'), value: '245', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: t('admin.revenue'), value: '2,450,000 DA', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: t('admin.reservations'), value: '1,238', icon: MapPin, color: 'bg-purple-100 text-purple-600' },
    { label: t('admin.activeUsers'), value: '+12.5%', icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 180000 },
    { month: 'Feb', revenue: 220000 },
    { month: 'Mar', revenue: 245000 },
    { month: 'Apr', revenue: 300000 },
    { month: 'May', revenue: 350000 },
    { month: 'Jun', revenue: 400000 },
  ];

  const userGrowthData = [
    { week: 'W1', users: 45 },
    { week: 'W2', users: 78 },
    { week: 'W3', users: 125 },
    { week: 'W4', users: 180 },
    { week: 'W5', users: 220 },
    { week: 'W6', users: 245 },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'الإيرادات' : 'Revenus'}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#0A3E5A" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* User Growth Chart */}
        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'نمو المستخدمين' : 'Croissance des utilisateurs'}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#1E5A7A" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
