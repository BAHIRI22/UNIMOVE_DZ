'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { TripCard } from '@/components/TripCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Filter, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Reservation } from '@/types/reservation';
import { useRouter } from 'next/navigation';

export default function MyTripsPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    // Load reservations from localStorage
    const storedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    setReservations(storedReservations);
  }, []);

  const filteredReservations = reservations.filter(reservation => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return reservation.status === 'confirmed' || reservation.status === 'pending';
    if (filter === 'completed') return reservation.status === 'completed';
    if (filter === 'cancelled') return reservation.status === 'cancelled';
    return true;
  });

  const stats = {
    total: reservations.length,
    completed: reservations.filter(r => r.status === 'completed').length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    pending: reservations.filter(r => r.status === 'pending').length,
  };

  return (
    <DashboardLayout role="user">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'رحلاتي' : 'Mes trajets'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'سجل رحلاتك وحجوزاتك'
                : 'Historique de vos trajets et réservations'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.history.length > 1 ? router.back() : router.push('/dashboard')}>
              {language === 'ar' ? 'رجوع' : 'Retour'}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              {language === 'ar' ? 'تصفية' : 'Filtrer'}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">{language === 'ar' ? 'إجمالي الرحلات' : 'Total trajets'}</p>
          </Card>
          <Card className="p-4 border border-gray-200">
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            <p className="text-sm text-gray-600">{language === 'ar' ? 'مكتملة' : 'Terminés'}</p>
          </Card>
          <Card className="p-4 border border-gray-200">
            <p className="text-2xl font-bold text-blue-600">{stats.confirmed}</p>
            <p className="text-sm text-gray-600">{language === 'ar' ? 'مؤكدة' : 'Confirmés'}</p>
          </Card>
          <Card className="p-4 border border-gray-200">
            <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
            <p className="text-sm text-gray-600">{language === 'ar' ? 'قيد الانتظار' : 'En attente'}</p>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {[
            { value: 'all', label: language === 'ar' ? 'الكل' : 'Tous' },
            { value: 'upcoming', label: language === 'ar' ? 'قادمة' : 'À venir' },
            { value: 'completed', label: language === 'ar' ? 'مكتملة' : 'Terminés' },
            { value: 'cancelled', label: language === 'ar' ? 'ملغاة' : 'Annulés' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === tab.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Trips List */}
        <div className="space-y-4">
          {filteredReservations.length > 0 ? (
            filteredReservations.map((reservation) => (
              <TripCard key={reservation.id} reservation={reservation} showQR={filter === 'upcoming'} />
            ))
          ) : (
            <Card className="p-12 border border-gray-200 text-center">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'ar' ? 'لا توجد رحلات' : 'Aucun trajet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'ar'
                  ? 'ابدأ بحجز رحلتك الأولى'
                  : 'Commencez par réserver votre premier trajet'}
              </p>
              <Button className="bg-primary hover:bg-secondary text-white">
                {language === 'ar' ? 'حجز رحلة' : 'Réserver un trajet'}
              </Button>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
