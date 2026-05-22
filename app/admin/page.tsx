'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { AdminStatsCard } from '@/components/AdminStatsCard';
import { AdminTable } from '@/components/AdminTable';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Calendar,
  MapPin,
  DollarSign,
  TrendingUp,
  Bus,
  Clock,
  CheckCircle,
  Plus
} from 'lucide-react';
import { adminStats, adminBookings } from '@/mock/admin-data';
import { AdminBooking } from '@/types/admin';

export default function AdminPage() {
  const { language } = useLanguage();

  const stats = [
    {
      title: 'Total Users',
      titleAr: 'إجمالي المستخدمين',
      value: adminStats.totalUsers,
      icon: Users,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Total Bookings',
      titleAr: 'إجمالي الحجوزات',
      value: adminStats.totalBookings,
      icon: Calendar,
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Active Buses',
      titleAr: 'الحافلات النشطة',
      value: adminStats.activeBuses,
      icon: Bus,
      trend: { value: 5, isPositive: true },
    },
    {
      title: 'Total Drivers',
      titleAr: 'إجمالي السائقين',
      value: adminStats.totalDrivers,
      icon: Users,
      trend: { value: 3, isPositive: true },
    },
  ];

  const bookingColumns = [
    {
      key: 'bookingNumber',
      label: 'Booking #',
      labelAr: 'حجز #',
      render: (row: AdminBooking) => (
        <span className="font-mono text-sm">{row.bookingNumber}</span>
      ),
    },
    {
      key: 'userName',
      label: 'User',
      labelAr: 'المستخدم',
      render: (row: AdminBooking) => (
        <span>{language === 'ar' ? row.userNameAr : row.userName}</span>
      ),
    },
    {
      key: 'routeName',
      label: 'Route',
      labelAr: 'الطريق',
      render: (row: AdminBooking) => (
        <span>{language === 'ar' ? row.routeNameAr : row.routeName}</span>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      labelAr: 'التاريخ',
      render: (row: AdminBooking) => (
        <span>{row.date}</span>
      ),
    },
    {
      key: 'time',
      label: 'Time',
      labelAr: 'الوقت',
      render: (row: AdminBooking) => (
        <span>{row.time}</span>
      ),
    },
    {
      key: 'totalPrice',
      label: 'Price',
      labelAr: 'السعر',
      render: (row: AdminBooking) => (
        <span className="font-bold text-primary">{row.totalPrice} DA</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      labelAr: 'الحالة',
      render: (row: AdminBooking) => {
        const statusConfig = {
          confirmed: { icon: CheckCircle, color: 'bg-blue-100 text-blue-700 border-blue-200' },
          completed: { icon: CheckCircle, color: 'bg-green-100 text-green-700 border-green-200' },
          pending: { icon: Clock, color: 'bg-orange-100 text-orange-700 border-orange-200' },
          cancelled: { icon: Clock, color: 'bg-red-100 text-red-700 border-red-200' },
        };
        const config = statusConfig[row.status as keyof typeof statusConfig];
        const Icon = config.icon;
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${config.color}`}>
            <Icon className="w-3 h-3" />
            <span>{row.status}</span>
          </span>
        );
      },
    },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {language === 'ar' ? 'لوحة التحكم' : 'Tableau de bord'}
          </h1>
          <p className="text-xl text-slate-600 leading-8">
            {language === 'ar'
              ? 'نظرة عامة على منصة UNIMOVE-DZ'
              : 'Vue d\'ensemble de la plateforme UNIMOVE-DZ'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AdminStatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Revenue & Trips */}
        <div className="grid md:grid-cols-2 gap-8">
          <AdminStatsCard
            title="Estimated Revenue"
            titleAr="الإيرادات المقدرة"
            value={`${adminStats.estimatedRevenue.toLocaleString()} DA`}
            icon={DollarSign}
            trend={{ value: 15, isPositive: true }}
          />
          <AdminStatsCard
            title="Today's Trips"
            titleAr="رحلات اليوم"
            value={adminStats.todayTrips}
            icon={Clock}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Recent Bookings */}
        <Card className="border border-slate-200 rounded-3xl shadow-xl">
          <div className="p-8 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-2xl">
                {language === 'ar' ? 'الحجوزات الأخيرة' : 'Réservations récentes'}
              </h3>
              <Button variant="outline" size="lg" className="h-12 text-lg font-semibold rounded-2xl">
                {language === 'ar' ? 'عرض الكل' : 'Voir tout'}
              </Button>
            </div>
          </div>
          <AdminTable
            columns={bookingColumns}
            data={adminBookings.slice(0, 5)}
            searchable={false}
          />
        </Card>

        {/* Quick Actions */}
        <Card className="p-8 border border-slate-200 rounded-3xl shadow-xl">
          <h3 className="font-bold text-gray-900 text-2xl mb-6">
            {language === 'ar' ? 'إجراءات سريعة' : 'Actions rapides'}
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <Button variant="outline" className="flex items-center justify-center gap-3 h-16 text-lg font-semibold rounded-2xl border-2 border-slate-200 hover:border-emerald-500 transition-all">
              <Users className="w-6 h-6" />
              {language === 'ar' ? 'إدارة المستخدمين' : 'Gérer utilisateurs'}
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-3 h-16 text-lg font-semibold rounded-2xl border-2 border-slate-200 hover:border-emerald-500 transition-all">
              <Bus className="w-6 h-6" />
              {language === 'ar' ? 'إدارة الحافلات' : 'Gérer bus'}
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-3 h-16 text-lg font-semibold rounded-2xl border-2 border-slate-200 hover:border-emerald-500 transition-all">
              <MapPin className="w-6 h-6" />
              {language === 'ar' ? 'إدارة الطرق' : 'Gérer routes'}
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-3 h-16 text-lg font-semibold rounded-2xl border-2 border-slate-200 hover:border-emerald-500 transition-all">
              <Calendar className="w-6 h-6" />
              {language === 'ar' ? 'إدارة الحجوزات' : 'Gérer réservations'}
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
