'use client';

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
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
import routesData from '@/data/sidi-bel-abbes-routes.json';
import dairasData from '@/data/dairas.json';
import universityData from '@/data/university-destinations.json';

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
      title: 'Active Routes',
      titleAr: 'المسارات النشطة',
      value: routesData.routes.length,
      icon: MapPin,
      trend: { value: 15, isPositive: true },
    },
    {
      title: 'Total Daïras',
      titleAr: 'إجمالي الدوائر',
      value: dairasData.dairas.length,
      icon: MapPin,
      trend: { value: 0, isPositive: true },
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

        {/* Transport Statistics */}
        <Card className="border border-slate-200 rounded-3xl shadow-xl">
          <div className="p-8 border-b border-slate-200">
            <h3 className="font-bold text-gray-900 text-2xl">
              {language === 'ar' ? 'إحصائيات النقل الجامعي' : 'Statistiques Transport Universitaire'}
            </h3>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200">
                <div className="flex items-center gap-3 mb-3">
                  <Bus className="w-6 h-6 text-emerald-600" />
                  <span className="font-bold text-gray-900">{language === 'ar' ? 'المسارات النشطة' : 'Routes Actives'}</span>
                </div>
                <p className="text-3xl font-black text-emerald-700">{routesData.routes.length}</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <span className="font-bold text-gray-900">{language === 'ar' ? 'الدوائر المغطاة' : 'Daïras Couvertes'}</span>
                </div>
                <p className="text-3xl font-black text-blue-700">{dairasData.dairas.length}</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  <span className="font-bold text-gray-900">{language === 'ar' ? 'الوجهات الجامعية' : 'Destinations Universitaires'}</span>
                </div>
                <p className="text-3xl font-black text-purple-700">{universityData.university.faculties.length + universityData.university.institutes.length + universityData.university.residences.length}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Routes Overview */}
        <Card className="border border-slate-200 rounded-3xl shadow-xl">
          <div className="p-8 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-2xl">
                {language === 'ar' ? 'نظرة عامة على المسارات' : 'Aperçu des Routes'}
              </h3>
              <Button variant="outline" size="lg" className="h-12 text-lg font-semibold rounded-2xl">
                {language === 'ar' ? 'عرض الكل' : 'Voir tout'}
              </Button>
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {routesData.routes.slice(0, 5).map((route: any) => (
                <div key={route.id} className="p-5 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-gray-900">{route.from.point} → {route.to.name}</h4>
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                          {route.transport.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{route.transport.distance} km</span>
                        <span>•</span>
                        <span>{route.transport.duration} min</span>
                        <span>•</span>
                        <span className="font-bold text-emerald-600">{route.transport.price} DA</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <span>{language === 'ar' ? 'السائق:' : 'Chauffeur:'} {route.transport.driver.name}</span>
                        <span className="mx-2">•</span>
                        <span>{language === 'ar' ? 'المركبة:' : 'Véhicule:'} {route.transport.vehicle.model}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">{language === 'ar' ? 'مقاعد متاحة' : 'Places disponibles'}</div>
                      <div className="text-2xl font-black text-emerald-600">{route.transport.seatsAvailable}/{route.transport.totalSeats}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

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
              {language === 'ar' ? 'إدارة المسارات' : 'Gérer routes'}
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-3 h-16 text-lg font-semibold rounded-2xl border-2 border-slate-200 hover:border-emerald-500 transition-all">
              <Calendar className="w-6 h-6" />
              {language === 'ar' ? 'إدارة الحجوزات' : 'Gérer réservations'}
            </Button>
          </div>
        </Card>

        {/* Daïras Management */}
        <Card className="border border-slate-200 rounded-3xl shadow-xl">
          <div className="p-8 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-2xl">
                {language === 'ar' ? 'إدارة الدوائر' : 'Gestion des Daïras'}
              </h3>
              <Button variant="outline" size="lg" className="h-12 text-lg font-semibold rounded-2xl flex items-center gap-2">
                <Plus className="w-5 h-5" />
                {language === 'ar' ? 'إضافة دائرة' : 'Ajouter daïra'}
              </Button>
            </div>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-4">
              {dairasData.dairas.slice(0, 6).map((daïra: any) => (
                <div key={daïra.id} className="p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:border-emerald-300 transition-all">
                  <h4 className="font-bold text-gray-900 mb-2">{language === 'ar' ? daïra.name : daïra.nameFr}</h4>
                  <p className="text-sm text-gray-600">{language === 'ar' ? 'البلديات:' : 'Communes:'} {daïra.communes.length}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
