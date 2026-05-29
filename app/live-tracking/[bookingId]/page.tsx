'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, getDoc, orderBy, limit } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import { calculateETA, formatETAMessage } from '@/lib/eta';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Clock, Bus, ArrowRight } from 'lucide-react';

const MapView = dynamic(() => import('./MapView'), { ssr: false });

interface Booking {
  id: string;
  userId: string;
  fullName: string;
  fromPoint: string;
  toDestination: string;
  date: string;
  time: string;
  status: string;
  assignedVehicleId?: string;
  assignedDriverId?: string;
  assignedDriverName?: string;
  assignedVehicleNumber?: string;
  estimatedDistanceKm?: number;
}

interface TripLocation {
  id: string;
  bookingId: string;
  latitude: number;
  longitude: number;
  speed?: number;
  updatedAt?: any;
}

export default function LiveTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { language, isRTL } = useLanguage();
  const isAr = language === 'ar';

  const bookingId = params?.bookingId as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [location, setLocation] = useState<TripLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [etaInfo, setEtaInfo] = useState<{ distanceKm: number; etaMinutes: number } | null>(null);

  // Fetch booking and verify ownership
  useEffect(() => {
    if (authLoading) return;
    if (!user || !bookingId) {
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      const snap = await getDoc(doc(db, 'bookings', bookingId));
      if (!snap.exists()) {
        setLoading(false);
        return;
      }
      const data = { id: snap.id, ...(snap.data() as any) } as Booking;

      // Safety: only owner or admin or assigned driver can view
      const isOwner = data.userId === user.id;
      const isAdmin = user.role === 'admin';
      const isDriver = user.role === 'driver' && data.assignedDriverId && data.assignedDriverId === user.id;

      if (!isOwner && !isAdmin && !isDriver) {
        router.replace('/dashboard');
        return;
      }

      setBooking(data);
      setLoading(false);
    };

    fetchBooking();
  }, [user, authLoading, bookingId, router]);

  // Subscribe to tripLocations for this booking
  useEffect(() => {
    if (!bookingId) return;

    const q = query(
      collection(db, 'tripLocations'),
      where('bookingId', '==', bookingId),
      orderBy('updatedAt', 'desc'),
      limit(1)
    );

    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        const doc = snap.docs[0];
        const data = { id: doc.id, ...(doc.data() as any) } as TripLocation;
        setLocation(data);
      }
    });

    return () => unsub();
  }, [bookingId]);

  // Calculate ETA when location updates
  useEffect(() => {
    if (!location || !booking) return;
    // We don't have real destination coordinates, so use a simulated approach
    // If estimatedDistanceKm exists, subtract based on last known distance
    if (booking.estimatedDistanceKm) {
      // Simple mock: assume vehicle is 50% through the trip if no better data
      const remainingKm = booking.estimatedDistanceKm * 0.5;
      const etaMinutes = Math.ceil((remainingKm / 40) * 60);
      setEtaInfo({ distanceKm: Math.round(remainingKm * 100) / 100, etaMinutes });
    } else {
      setEtaInfo({ distanceKm: 5, etaMinutes: 8 });
    }
  }, [location, booking]);

  if (authLoading || loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#02100d', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <div style={{ width: 50, height: 50, border: '4px solid #10b981', borderTop: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          <p className="mt-4 text-emerald-400 font-bold">{isAr ? 'جاري تحميل التتبع...' : 'Chargement du suivi...'}</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!booking) {
    return (
      <div style={{ minHeight: '100vh', background: '#02100d', color: 'white', padding: '40px 24px' }} dir={isRTL ? 'rtl' : 'ltr'}>
        <p className="text-center text-slate-400 font-bold">{isAr ? 'لم يتم العثور على الرحلة.' : 'Trajet introuvable.'}</p>
      </div>
    );
  }

  // Default center (Algiers center) if no location yet
  const defaultCenter: [number, number] = [36.7538, 3.0588];
  const vehiclePos = location
    ? { lat: location.latitude, lng: location.longitude }
    : null;
  const mapCenter: [number, number] = vehiclePos
    ? [vehiclePos.lat, vehiclePos.lng]
    : defaultCenter;

  const statusLabel =
    booking.status === 'started'
      ? isAr
        ? 'الرحلة جارية 🚌'
        : 'Trajet en cours 🚌'
      : isAr
      ? 'الرحلة لم تبدأ بعد'
      : 'Le trajet n\'a pas encore commencé';

  return (
    <div style={{ minHeight: '100vh', background: '#02100d', color: 'white', padding: '24px md:padding-40px' }} className="p-6 md:p-10" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-white flex items-center gap-3">
            <Navigation className="w-8 h-8 text-emerald-400" />
            {isAr ? 'تتبع الرحلة المباشر' : 'Suivi en direct'}
          </h1>
          <p className="text-sm md:text-lg text-emerald-400/80 font-bold mt-1">
            {isAr ? `${booking.fromPoint} → ${booking.toDestination}` : `${booking.fromPoint} → ${booking.toDestination}`}
          </p>
        </div>
        <Button onClick={() => router.back()} variant="outline" className="border-white/10 hover:bg-white/5 text-white font-bold h-12 rounded-xl">
          <ArrowRight className={`w-5 h-5 ${isAr ? 'ml-2 rotate-180' : 'mr-2'}`} />
          {isAr ? 'رجوع' : 'Retour'}
        </Button>
      </div>

      {/* Status & ETA Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-5 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl flex items-center gap-3">
          <Bus className="w-6 h-6 text-emerald-400" />
          <div>
            <p className="text-xs opacity-60 font-bold">{isAr ? 'الحالة' : 'Statut'}</p>
            <p className="text-sm font-extrabold text-emerald-300">{statusLabel}</p>
          </div>
        </Card>

        <Card className="p-5 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl flex items-center gap-3">
          <MapPin className="w-6 h-6 text-emerald-400" />
          <div>
            <p className="text-xs opacity-60 font-bold">{isAr ? 'المركبة' : 'Véhicule'}</p>
            <p className="text-sm font-extrabold text-white">
              {booking.assignedVehicleNumber ? `H-${booking.assignedVehicleNumber}` : isAr ? 'غير معينة' : 'Non assigné'}
            </p>
          </div>
        </Card>

        <Card className="p-5 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl flex items-center gap-3">
          <Clock className="w-6 h-6 text-emerald-400" />
          <div>
            <p className="text-xs opacity-60 font-bold">{isAr ? 'الوصول المتوقع' : 'Arrivée estimée'}</p>
            <p className="text-sm font-extrabold text-white">
              {etaInfo ? formatETAMessage(etaInfo.etaMinutes, language as 'ar' | 'fr') : isAr ? 'جاري الحساب...' : 'Calcul en cours...'}
            </p>
          </div>
        </Card>
      </div>

      {/* Map */}
      <Card className="border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden" style={{ height: '60vh', minHeight: 400 }}>
        <MapView center={mapCenter} vehiclePos={vehiclePos} toDestination={booking.toDestination} />
      </Card>

      {/* Location details */}
      {location && (
        <Card className="mt-6 p-5 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl">
          <p className="text-xs opacity-60 font-bold mb-2">{isAr ? 'آخر تحديث للموقع' : 'Dernière position connue'}</p>
          <div className="flex flex-wrap gap-6 text-sm font-semibold">
            <span>Lat: {location.latitude.toFixed(5)}</span>
            <span>Lng: {location.longitude.toFixed(5)}</span>
            <span>{isAr ? 'السرعة:' : 'Vitesse:'} {location.speed ?? 0} km/h</span>
            <span className="opacity-60 text-xs">
              {location.updatedAt?.toDate
                ? new Date(location.updatedAt.toDate()).toLocaleString(isAr ? 'ar-DZ' : 'fr-FR')
                : '-'}
            </span>
          </div>
        </Card>
      )}
    </div>
  );
}
