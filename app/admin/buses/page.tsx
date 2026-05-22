'use client';

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Wifi, Car, Users } from 'lucide-react';

export default function AdminBusesPage() {
  const { language } = useLanguage();

  const buses = [
    {
      id: 1,
      plateNumber: '12345 ABC',
      capacity: 20,
      driver: 'Mohamed Ahmed',
      route: 'Route Centrale',
      status: 'active',
      wifi: true,
      ac: true,
    },
    {
      id: 2,
      plateNumber: '67890 DEF',
      capacity: 25,
      driver: 'Ali Bouzid',
      route: 'Route Nord',
      status: 'active',
      wifi: true,
      ac: false,
    },
    {
      id: 3,
      plateNumber: '11223 GHI',
      capacity: 20,
      driver: 'Youssef Karim',
      route: 'Route Sud',
      status: 'maintenance',
      wifi: false,
      ac: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      case 'maintenance':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      ar: {
        active: 'نشط',
        inactive: 'غير نشط',
        maintenance: 'صيانة',
      },
      fr: {
        active: 'Actif',
        inactive: 'Inactif',
        maintenance: 'Maintenance',
      },
    };
    return labels[language][status as keyof typeof labels.ar] || status;
  };

  return (
    <DashboardLayout role="admin">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'إدارة الحافلات' : 'Gestion des bus'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'إدارة أسطول الحافلات'
                : 'Gérer la flotte de bus'}
            </p>
          </div>
          <Button className="bg-primary hover:bg-secondary text-white flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {language === 'ar' ? 'إضافة حافلة' : 'Ajouter un bus'}
          </Button>
        </div>

        {/* Search */}
        <Card className="p-4 border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={language === 'ar' ? 'بحث حافلة...' : 'Rechercher un bus...'}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Buses Table */}
        <Card className="border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'رقم اللوحة' : 'N° plaque'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'السعة' : 'Capacité'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'السائق' : 'Chauffeur'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'المسار' : 'Route'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'المميزات' : 'Équipements'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'الحالة' : 'Statut'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'إجراءات' : 'Actions'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buses.map((bus) => (
                <TableRow key={bus.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{bus.plateNumber}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{bus.capacity}</span>
                    </div>
                  </TableCell>
                  <TableCell>{bus.driver}</TableCell>
                  <TableCell>{bus.route}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {bus.wifi && (
                        <div className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                          <Wifi className="w-3 h-3" />
                          <span>WiFi</span>
                        </div>
                      )}
                      {bus.ac && (
                        <div className="flex items-center gap-1 text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">
                          <Car className="w-3 h-3" />
                          <span>AC</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(bus.status)}`}>
                      {getStatusLabel(bus.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="p-2">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2 text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
}
