'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { BookingCard, Booking, BookingStatus } from '@/components/BookingCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

export default function MyTripsPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', user.id),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: Booking[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          items.push({
            id: docSnap.id,
            reservationNumber: data.reservationNumber || docSnap.id,
            userId: data.userId || '',
            fromPoint: data.fromPoint || '',
            toDestination: data.toDestination || '',
            date: data.date || '',
            time: data.time || '',
            vehicleType: data.vehicleType || 'bus',
            passengersCount: data.passengersCount || 1,
            price: data.price || data.finalPrice || 0,
            status: (data.status as BookingStatus) || 'pending',
            paymentStatus: data.paymentStatus || 'unpaid',
            createdAt: data.createdAt,
          });
        });
        setBookings(items);
        setLoading(false);
      },
      (err) => {
        console.error('[MyTrips] Firestore error:', err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.id]);

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming')
      return booking.status === 'pending' || booking.status === 'approved' || booking.status === 'assigned' || booking.status === 'started';
    if (filter === 'completed') return booking.status === 'completed';
    if (filter === 'cancelled')
      return booking.status === 'cancelled' || booking.status === 'rejected';
    return true;
  });

  const stats = {
    total: bookings.length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    upcoming: bookings.filter(
      (b) =>
        b.status === 'pending' ||
        b.status === 'approved' ||
        b.status === 'assigned' ||
        b.status === 'started'
    ).length,
    cancelled: bookings.filter(
      (b) => b.status === 'cancelled' || b.status === 'rejected'
    ).length,
  };

  const isAr = language === 'ar';

  return (
    <DashboardLayout role="user" videoOverlay>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {isAr ? 'رحلاتي' : 'Mes trajets'}
            </h1>
            <p className="text-gray-600">
              {isAr
                ? 'سجل رحلاتك وحجوزاتك'
                : 'Historique de vos trajets et réservations'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() =>
                window.history.length > 1
                  ? router.back()
                  : router.push('/dashboard')
              }
            >
              {isAr ? 'رجوع' : 'Retour'}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              {isAr ? 'تصفية' : 'Filtrer'}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">
              {isAr ? 'إجمالي الرحلات' : 'Total trajets'}
            </p>
          </Card>
          <Card className="p-4 border border-gray-200">
            <p className="text-2xl font-bold text-green-600">
              {stats.completed}
            </p>
            <p className="text-sm text-gray-600">
              {isAr ? 'مكتملة' : 'Terminés'}
            </p>
          </Card>
          <Card className="p-4 border border-gray-200">
            <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
            <p className="text-sm text-gray-600">
              {isAr ? 'قادمة' : 'À venir'}
            </p>
          </Card>
          <Card className="p-4 border border-gray-200">
            <p className="text-2xl font-bold text-orange-600">
              {stats.cancelled}
            </p>
            <p className="text-sm text-gray-600">
              {isAr ? 'ملغاة' : 'Annulés'}
            </p>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {[
            { value: 'all', label: isAr ? 'الكل' : 'Tous' },
            { value: 'upcoming', label: isAr ? 'قادمة' : 'À venir' },
            { value: 'completed', label: isAr ? 'مكتملة' : 'Terminés' },
            { value: 'cancelled', label: isAr ? 'ملغاة' : 'Annulés' },
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
          {loading ? (
            <Card className="p-12 border border-gray-200 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
              <p className="text-gray-600">
                {isAr ? 'جاري التحميل...' : 'Chargement...'}
              </p>
            </Card>
          ) : filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                showQR={filter === 'upcoming'}
              />
            ))
          ) : (
            <Card className="p-12 border border-gray-200 text-center">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isAr ? 'لا توجد رحلات' : 'Aucun trajet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isAr
                  ? 'ابدأ بحجز رحلتك الأولى'
                  : 'Commencez par réserver votre premier trajet'}
              </p>
              <Button
                className="bg-primary hover:bg-secondary text-white"
                onClick={() => router.push('/reservation')}
              >
                {isAr ? 'حجز رحلة' : 'Réserver un trajet'}
              </Button>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
