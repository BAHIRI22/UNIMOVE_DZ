'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Star, Phone, Mail } from 'lucide-react';

export default function AdminDriversPage() {
  const { language } = useLanguage();

  const drivers = [
    {
      id: 1,
      fullName: 'Mohamed Ahmed',
      phone: '+213555123456',
      email: 'mohamed@example.com',
      licenseNumber: 'DL-12345',
      busId: '12345 ABC',
      rating: 4.5,
      status: 'active',
    },
    {
      id: 2,
      fullName: 'Ali Bouzid',
      phone: '+213556789012',
      email: 'ali@example.com',
      licenseNumber: 'DL-67890',
      busId: '67890 DEF',
      rating: 4.8,
      status: 'active',
    },
    {
      id: 3,
      fullName: 'Youssef Karim',
      phone: '+213557890123',
      email: 'youssef@example.com',
      licenseNumber: 'DL-11223',
      busId: '11223 GHI',
      rating: 4.2,
      status: 'inactive',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      ar: {
        active: 'نشط',
        inactive: 'غير نشط',
      },
      fr: {
        active: 'Actif',
        inactive: 'Inactif',
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
              {language === 'ar' ? 'إدارة السائقين' : 'Gestion des chauffeurs'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'إدارة فريق السائقين'
                : 'Gérer l\'équipe de chauffeurs'}
            </p>
          </div>
          <Button className="bg-primary hover:bg-secondary text-white flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {language === 'ar' ? 'إضافة سائق' : 'Ajouter un chauffeur'}
          </Button>
        </div>

        {/* Search */}
        <Card className="p-4 border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={language === 'ar' ? 'بحث سائق...' : 'Rechercher un chauffeur...'}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Drivers Table */}
        <Card className="border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'الاسم الكامل' : 'Nom complet'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'الهاتف' : 'Téléphone'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'البريد' : 'Email'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'رقم الرخصة' : 'N° permis'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'الحافلة' : 'Bus'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'التقييم' : 'Note'}
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
              {drivers.map((driver) => (
                <TableRow key={driver.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{driver.fullName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{driver.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{driver.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{driver.licenseNumber}</TableCell>
                  <TableCell>{driver.busId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{driver.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                      {getStatusLabel(driver.status)}
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
