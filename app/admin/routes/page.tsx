'use client';

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { AdminTable } from '@/components/AdminTable';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, MapPin, Clock, Users, DollarSign, Bus, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { adminRoutes } from '@/mock/admin-data';
import { AdminRoute } from '@/types/admin';

export default function AdminRoutesPage() {
  const { language } = useLanguage();

  const columns = [
    {
      key: 'name',
      label: 'Route',
      labelAr: 'الطريق',
      render: (row: AdminRoute) => (
        <div>
          <p className="font-medium text-gray-900">{language === 'ar' ? row.nameAr : row.name}</p>
          <p className="text-xs text-gray-500">{row.id}</p>
        </div>
      ),
    },
    {
      key: 'departure',
      label: 'Départ',
      labelAr: 'الانطلاق',
      render: (row: AdminRoute) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{language === 'ar' ? row.departureAr : row.departure}</span>
        </div>
      ),
    },
    {
      key: 'destination',
      label: 'Destination',
      labelAr: 'الوجهة',
      render: (row: AdminRoute) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{language === 'ar' ? row.destinationAr : row.destination}</span>
        </div>
      ),
    },
    {
      key: 'time',
      label: 'Temps',
      labelAr: 'الوقت',
      render: (row: AdminRoute) => (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{row.estimatedTime} min</span>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Prix',
      labelAr: 'السعر',
      render: (row: AdminRoute) => (
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="font-bold text-primary">{row.price} DA</span>
        </div>
      ),
    },
    {
      key: 'seats',
      label: 'Places',
      labelAr: 'المقاعد',
      render: (row: AdminRoute) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span>{row.availableSeats}</span>
        </div>
      ),
    },
    {
      key: 'vehicle',
      label: 'Véhicule',
      labelAr: 'المركبة',
      render: (row: AdminRoute) => (
        <div className="flex items-center gap-2">
          <Bus className="w-4 h-4 text-gray-400" />
          <span>{row.vehiclePlate || '-'}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Statut',
      labelAr: 'الحالة',
      render: (row: AdminRoute) => {
        const statusConfig = {
          active: { icon: CheckCircle, color: 'bg-green-100 text-green-700 border-green-200' },
          inactive: { icon: XCircle, color: 'bg-red-100 text-red-700 border-red-200' },
        };
        const config = statusConfig[row.status as keyof typeof statusConfig];
        const Icon = config.icon;
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${config.color}`}>
            <Icon className="w-3 h-3" />
            <span>{row.status === 'active' ? (language === 'ar' ? 'نشط' : 'Actif') : (language === 'ar' ? 'غير نشط' : 'Inactif')}</span>
          </span>
        );
      },
    },
  ];

  const handleEdit = (_route: AdminRoute) => {
  };

  const handleDelete = (_route: AdminRoute) => {
  };

  return (
    <DashboardLayout role="admin">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'إدارة الطرق' : 'Gestion des routes'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'إدارة جميع طرق النقل الجامعي'
                : 'Gérer toutes les routes de transport universitaire'}
            </p>
          </div>
          <Button className="bg-primary hover:bg-secondary text-white flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {language === 'ar' ? 'إضافة طريق' : 'Ajouter une route'}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">{adminRoutes.length}</p>
            <p className="text-sm text-gray-600">{language === 'ar' ? 'إجمالي الطرق' : 'Total routes'}</p>
          </Card>
          <Card className="p-4 border border-gray-200">
            <p className="text-2xl font-bold text-green-600">{adminRoutes.filter(r => r.status === 'active').length}</p>
            <p className="text-sm text-gray-600">{language === 'ar' ? 'نشطة' : 'Actives'}</p>
          </Card>
          <Card className="p-4 border border-gray-200">
            <p className="text-2xl font-bold text-primary">{adminRoutes.reduce((sum, r) => sum + r.availableSeats, 0)}</p>
            <p className="text-sm text-gray-600">{language === 'ar' ? 'مقاعد متاحة' : 'Places disponibles'}</p>
          </Card>
          <Card className="p-4 border border-gray-200">
            <p className="text-2xl font-bold text-orange-600">{adminRoutes.filter(r => r.availableSeats < 20).length}</p>
            <p className="text-sm text-gray-600">{language === 'ar' ? 'مقاعد محدودة' : 'Places limitées'}</p>
          </Card>
        </div>

        {/* Table */}
        <AdminTable
          columns={columns}
          data={adminRoutes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
}
