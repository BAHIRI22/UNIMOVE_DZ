'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Calendar, MapPin, Users, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function AdminBookingsPage() {
  const { language } = useLanguage();

  const bookings = [
    {
      id: 1,
      userId: 'Ahmed Benali',
      route: 'Route Centrale',
      departure: 'Centre-ville',
      destination: 'Université Sidi Bel Abbès',
      date: '2026-05-20',
      time: '08:00',
      seats: 1,
      price: 100,
      status: 'confirmed',
      createdAt: '2026-05-19',
    },
    {
      id: 2,
      userId: 'Fatima Zerhouni',
      route: 'Route Nord',
      departure: 'Quartier El Nour',
      destination: 'Université Sidi Bel Abbès',
      date: '2026-05-21',
      time: '08:30',
      seats: 2,
      price: 240,
      status: 'pending',
      createdAt: '2026-05-20',
    },
    {
      id: 3,
      userId: 'Karim Hadj',
      route: 'Route Sud',
      departure: 'Quartier Es Salam',
      destination: 'Université Sidi Bel Abbès',
      date: '2026-05-22',
      time: '09:00',
      seats: 1,
      price: 110,
      status: 'completed',
      createdAt: '2026-05-18',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      ar: {
        confirmed: 'مؤكد',
        pending: 'قيد الانتظار',
        completed: 'مكتمل',
        cancelled: 'ملغي',
      },
      fr: {
        confirmed: 'Confirmé',
        pending: 'En attente',
        completed: 'Terminé',
        cancelled: 'Annulé',
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
              {language === 'ar' ? 'إدارة الحجوزات' : 'Gestion des réservations'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'إدارة ومراقبة جميع الحجوزات'
                : 'Gérer et surveiller toutes les réservations'}
            </p>
          </div>
          <Button className="bg-primary hover:bg-secondary text-white flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {language === 'ar' ? 'إضافة حجز' : 'Ajouter une réservation'}
          </Button>
        </div>

        {/* Search */}
        <Card className="p-4 border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={language === 'ar' ? 'بحث حجز...' : 'Rechercher une réservation...'}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Bookings Table */}
        <Card className="border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'المستخدم' : 'Utilisateur'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'المسار' : 'Route'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'الرحلة' : 'Trajet'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'التاريخ والوقت' : 'Date et heure'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'المقاعد' : 'Sièges'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'السعر' : 'Prix'}
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
              {bookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{booking.userId}</TableCell>
                  <TableCell>{booking.route}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{booking.departure}</span>
                      <span>→</span>
                      <span>{booking.destination}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{booking.date}</span>
                      <Clock className="w-4 h-4 text-gray-500 ml-2" />
                      <span>{booking.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{booking.seats}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-primary">{booking.price} DA</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusLabel(booking.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button variant="ghost" size="sm" className="p-2 text-green-600 hover:bg-green-50">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-2 text-red-600 hover:bg-red-50">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
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
