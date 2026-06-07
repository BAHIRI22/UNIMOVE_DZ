'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, MapPin, TrendingUp } from 'lucide-react';

export function AdminOverview() {
  const { t, language } = useLanguage();

  const stats = [
    { label: language === 'ar' ? 'المشتركون النشطون' : 'Abonnés actifs', value: '250', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: language === 'ar' ? 'الإيرادات المتوقعة Y1' : 'Revenus prévisionnels Y1', value: '10,883,000 DA', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: language === 'ar' ? 'عقود الشراكة' : 'Contrats partenariat', value: '2', icon: MapPin, color: 'bg-purple-100 text-purple-600' },
    { label: language === 'ar' ? 'نمو الإيرادات Y1→Y2' : 'Croissance revenus Y1→Y2', value: '+78.8%', icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 500000 },
    { month: 'Feb', revenue: 600000 },
    { month: 'Mar', revenue: 700000 },
    { month: 'Apr', revenue: 800000 },
    { month: 'May', revenue: 900000 },
    { month: 'Jun', revenue: 1100000 },
    { month: 'Jul', revenue: 1200000 },
    { month: 'Aug', revenue: 1000000 },
    { month: 'Sep', revenue: 1300000 },
    { month: 'Oct', revenue: 1400000 },
    { month: 'Nov', revenue: 1200000 },
    { month: 'Dec', revenue: 1183000 },
  ];

  const userGrowthData = [
    { week: 'W1', users: 45 },
    { week: 'W2', users: 78 },
    { week: 'W3', users: 125 },
    { week: 'W4', users: 180 },
    { week: 'W5', users: 220 },
    { week: 'W6', users: 250 },
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
