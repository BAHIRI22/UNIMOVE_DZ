'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, getDoc, orderBy, limit } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import { calculateETA, formatETAMessage } from '@/lib/eta';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Clock, Bus, ArrowRight, Route, Activity, Radio } from 'lucide-react';

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
  fromLat?: number;
  fromLng?: number;
  toLat?: number;
  toLng?: number;
}

interface TripLocation {
  id: string;
  bookingId: string;
  latitude: number;
  longitude: number;
  speed?: number;
  updatedAt?: any;
}

type TripState = 'waiting' | 'heading_to_pickup' | 'arrived_at_pickup' | 'trip_started' | 'trip_completed';

function getTripState(status: string): TripState {
  switch (status) {
    case 'pending': return 'waiting';
    case 'approved': return 'heading_to_pickup';
    case 'assigned': return 'arrived_at_pickup';
    case 'started': return 'trip_started';
    case 'completed': return 'trip_completed';
    default: return 'waiting';
  }
}

function getTripStateLabel(state: TripState, isAr: boolean) {
  const labels: Record<TripState, { ar: string; fr: string; color: string }> = {
    waiting: { ar: 'في الانتظار ⏳', fr: 'En attente ⏳', color: '#f59e0b' },
    heading_to_pickup: { ar: 'السائق في الطريق 🚗', fr: 'Chauffeur en route 🚗', color: '#3b82f6' },
    arrived_at_pickup: { ar: 'وصل لنقطة الالتقاط 📍', fr: 'Arrivé au point de prise 📍', color: '#8b5cf6' },
    trip_started: { ar: 'الرحلة جارية 🚌', fr: 'Trajet en cours 🚌', color: '#10b981' },
    trip_completed: { ar: 'تم إنجاز الرحلة ✅', fr: 'Trajet terminé ✅', color: '#059669' },
  };
  return labels[state] || labels.waiting;
}

function getTripProgress(state: TripState): number {
  switch (state) {
    case 'waiting': return 0;
    case 'heading_to_pickup': return 25;
    case 'arrived_at_pickup': return 50;
    case 'trip_started': return 75;
    case 'trip_completed': return 100;
    default: return 0;
  }
}

const TRIP_STEPS: TripState[] = ['waiting', 'heading_to_pickup', 'arrived_at_pickup', 'trip_started', 'trip_completed'];

export default function LiveTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { language, isRTL } = useLanguage();
  const isAr = language === 'ar';

  const tripId = params?.tripId as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [location, setLocation] = useState<TripLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [etaInfo, setEtaInfo] = useState<{ distanceKm: number; etaMinutes: number } | null>(null);

  // Fetch booking and verify ownership
  useEffect(() => {
    if (authLoading) return;
    if (!user || !tripId) {
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      const snap = await getDoc(doc(db, 'bookings', tripId));
      if (!snap.exists()) {
        setLoading(false);
        return;
      }
      const data = { id: snap.id, ...(snap.data() as any) } as Booking;

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
  }, [user, authLoading, tripId, router]);

  // Subscribe to tripLocations for this booking
  useEffect(() => {
    if (!tripId) return;

    const q = query(
      collection(db, 'tripLocations'),
      where('bookingId', '==', tripId),
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
  }, [tripId]);

  // Calculate ETA when location updates
  useEffect(() => {
    if (!location || !booking) return;
    if (booking.toLat && booking.toLng) {
      const eta = calculateETA(location.latitude, location.longitude, booking.toLat, booking.toLng);
      setEtaInfo(eta);
    } else if (booking.estimatedDistanceKm) {
      const remainingKm = booking.estimatedDistanceKm * 0.5;
      const etaMinutes = Math.ceil((remainingKm / 40) * 60);
      setEtaInfo({ distanceKm: Math.round(remainingKm * 100) / 100, etaMinutes });
    } else {
      setEtaInfo({ distanceKm: 5, etaMinutes: 8 });
    }
  }, [location, booking]);

  const tripState = useMemo(() => getTripState(booking?.status || 'pending'), [booking?.status]);
  const stateInfo = getTripStateLabel(tripState, isAr);
  const progress = getTripProgress(tripState);
  const currentStepIndex = TRIP_STEPS.indexOf(tripState);

  // Default center (Sidi Bel Abbes area) if no location yet
  const defaultCenter: [number, number] = [34.85, -0.6333];
  const vehiclePos = location
    ? { lat: location.latitude, lng: location.longitude }
    : null;

  const fromCoords = booking?.fromLat && booking?.fromLng
    ? { lat: booking.fromLat, lng: booking.fromLng }
    : null;
  const toCoords = booking?.toLat && booking?.toLng
    ? { lat: booking.toLat, lng: booking.toLng }
    : null;

  const mapCenter: [number, number] = vehiclePos
    ? [vehiclePos.lat, vehiclePos.lng]
    : fromCoords
    ? [fromCoords.lat, fromCoords.lng]
    : defaultCenter;

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

      {/* Trip State Steps */}
      <Card className="p-5 border-2 border-emerald-500/10 bg-black/40 backdrop-blur-md rounded-2xl mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold opacity-60">{isAr ? 'تقدم الرحلة' : 'Progression du trajet'}</span>
          <span className="text-xs font-black" style={{ color: stateInfo.color }}>{isAr ? stateInfo.ar : stateInfo.fr}</span>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-2.5 mb-4 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%`, background: stateInfo.color }}
          />
        </div>
        {/* Step indicators */}
        <div className="flex justify-between items-center">
          {TRIP_STEPS.map((step, idx) => {
            const isActive = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const stepLabels: Record<TripState, { ar: string; fr: string }> = {
              waiting: { ar: 'انتظار', fr: 'Attente' },
              heading_to_pickup: { ar: 'في الطريق', fr: 'En route' },
              arrived_at_pickup: { ar: 'التقاط', fr: 'Prise' },
              trip_started: { ar: 'انطلاق', fr: 'Départ' },
              trip_completed: { ar: 'وصول', fr: 'Arrivée' },
            };
            return (
              <div key={step} className="flex flex-col items-center gap-1.5 flex-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all"
                  style={{
                    background: isActive ? stateInfo.color : 'transparent',
                    borderColor: isActive ? stateInfo.color : 'rgba(255,255,255,0.2)',
                    color: isActive ? 'white' : 'rgba(255,255,255,0.4)',
                    boxShadow: isCurrent ? `0 0 12px ${stateInfo.color}80` : 'none',
                  }}
                >
                  {isActive ? (idx + 1) : (idx + 1)}
                </div>
                <span className="text-[9px] font-bold opacity-70 hidden md:block">
                  {isAr ? stepLabels[step].ar : stepLabels[step].fr}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Status & Info Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-5 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl flex items-center gap-3">
          <Bus className="w-6 h-6 text-emerald-400" />
          <div>
            <p className="text-xs opacity-60 font-bold">{isAr ? 'الحالة' : 'Statut'}</p>
            <p className="text-sm font-extrabold" style={{ color: stateInfo.color }}>{isAr ? stateInfo.ar : stateInfo.fr}</p>
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

        <Card className="p-5 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl flex items-center gap-3">
          <Route className="w-6 h-6 text-emerald-400" />
          <div>
            <p className="text-xs opacity-60 font-bold">{isAr ? 'المسافة المتبقية' : 'Distance restante'}</p>
            <p className="text-sm font-extrabold text-white">
              {etaInfo ? `${etaInfo.distanceKm} km` : '-'}
            </p>
          </div>
        </Card>
      </div>

      {/* Map */}
      <Card className="border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden" style={{ height: '60vh', minHeight: 400 }}>
        <MapView
          center={mapCenter}
          vehiclePos={vehiclePos}
          fromPoint={booking.fromPoint}
          fromCoords={fromCoords}
          toDestination={booking.toDestination}
          toCoords={toCoords}
        />
      </Card>

      {/* Location details & Last Update */}
      {location && (
        <Card className="mt-6 p-5 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-emerald-400" />
            <p className="text-xs opacity-60 font-bold">{isAr ? 'آخر تحديث للموقع' : 'Dernière position connue'}</p>
            <span className="ml-auto flex items-center gap-1 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <Radio className="w-3 h-3" /> LIVE
            </span>
          </div>
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
