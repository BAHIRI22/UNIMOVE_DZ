'use client';

import { useState, useEffect, useMemo } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Map as MapIcon, Navigation, Radio, Clock, Bus, User } from 'lucide-react';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

interface Booking {
  id: string;
  userId: string;
  fullName: string;
  fromPoint: string;
  toDestination: string;
  date: string;
  time: string;
  status: string;
  assignedDriverName?: string;
  assignedVehicleNumber?: string;
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
  const { language } = useLanguage();
  const { user } = useAuth();
  const isAr = language === 'ar';

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [locations, setLocations] = useState<TripLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const isAdmin = user?.role === 'admin';
  const isDriver = user?.role === 'driver';

  // Fetch active bookings
  useEffect(() => {
    if (!user?.id) return;

    let q;
    if (isAdmin) {
      q = query(
        collection(db, 'bookings'),
        where('status', 'in', ['approved', 'assigned', 'started'])
      );
    } else if (isDriver) {
      q = query(
        collection(db, 'bookings'),
        where('assignedDriverId', '==', user.id),
        where('status', 'in', ['approved', 'assigned', 'started'])
      );
    } else {
      q = query(
        collection(db, 'bookings'),
        where('userId', '==', user.id),
        where('status', 'in', ['approved', 'assigned', 'started'])
      );
    }

    const unsub = onSnapshot(q, (snap) => {
      const items: Booking[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() } as Booking));
      setBookings(items);
      setLoading(false);
    });

    return () => unsub();
  }, [user?.id, isAdmin, isDriver]);

  // Fetch trip locations for active bookings
  useEffect(() => {
    if (bookings.length === 0) {
      setLocations([]);
      return;
    }

    const bookingIds = bookings.map((b) => b.id);
    // Firestore 'in' supports up to 10 values
    const chunks: string[][] = [];
    for (let i = 0; i < bookingIds.length; i += 10) {
      chunks.push(bookingIds.slice(i, i + 10));
    }

    const unsubscribes: (() => void)[] = [];

    chunks.forEach((chunk) => {
      const q = query(
        collection(db, 'tripLocations'),
        where('bookingId', 'in', chunk),
        orderBy('updatedAt', 'desc')
      );
      const unsub = onSnapshot(q, (snap) => {
        const items: TripLocation[] = [];
        snap.forEach((d) => items.push({ id: d.id, ...d.data() } as TripLocation));
        // Merge: keep only the latest per bookingId
        setLocations((prev) => {
          const map = new Map<string, TripLocation>();
          prev.forEach((l) => {
            if (!chunk.includes(l.bookingId)) map.set(l.bookingId, l);
          });
          items.forEach((l) => {
            const existing = map.get(l.bookingId);
            if (!existing || (l.updatedAt?.seconds || 0) > (existing.updatedAt?.seconds || 0)) {
              map.set(l.bookingId, l);
            }
          });
          return Array.from(map.values());
        });
        setLastUpdate(new Date());
      });
      unsubscribes.push(unsub);
    });

    return () => unsubscribes.forEach((u) => u());
  }, [bookings.map((b) => b.id).join(',')]);

  const activeTrips = useMemo(() => {
    return bookings
      .map((b) => {
        const loc = locations.find((l) => l.bookingId === b.id);
        return { ...b, location: loc };
      })
      .filter((t) => t.location);
  }, [bookings, locations]);

  const defaultCenter: [number, number] = [34.85, -0.6333];
  const mapCenter: [number, number] = useMemo(() => {
    if (activeTrips.length > 0 && activeTrips[0].location) {
      return [activeTrips[0].location.latitude, activeTrips[0].location.longitude];
    }
    return defaultCenter;
  }, [activeTrips]);

  const handleRefresh = async () => {
    setLoading(true);
    // Re-trigger by touching state
    setBookings((prev) => [...prev]);
    setLoading(false);
  };

  // Create Leaflet icon dynamically (only on client)
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const getVehicleIcon = () => {
    if (typeof window === 'undefined') return null;
    const L = require('leaflet');
    return new L.DivIcon({
      className: 'custom-marker',
      html: `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22c0-7.732-6.268-14-14-14z" fill="#10b981"/>
        <circle cx="14" cy="14" r="5" fill="white"/>
      </svg>`,
      iconSize: [28, 36],
      iconAnchor: [14, 36],
      popupAnchor: [0, -36],
    });
  };

  return (
    <DashboardLayout role={(isAdmin ? 'admin' : 'user') as 'admin' | 'user'}>
      <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
              {isAr ? 'التتبع المباشر' : 'Suivi en direct'}
            </h1>
            <p className="text-gray-600">
              {isAr
                ? 'تتبع حافلات UNIMOVE-DZ في الوقت الفعلي'
                : 'Suivez les bus UNIMOVE-DZ en temps réel'}
            </p>
          </div>
          <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            {isAr ? 'تحديث' : 'Actualiser'}
          </Button>
        </div>

        {/* Map */}
        <Card className="overflow-hidden rounded-3xl border border-emerald-100 bg-slate-950 p-6 text-white shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-emerald-300">{isAr ? 'خريطة مباشرة' : 'Carte live'}</p>
              <h2 className="text-2xl font-black">{isAr ? 'حركة المركبات الآن' : 'Mobilité en temps réel'}</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-300/15 px-3 py-2 text-xs font-black text-emerald-100">
              <Radio className="h-4 w-4" />
              LIVE
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden" style={{ height: '60vh', minHeight: 400 }}>
            {mounted ? (
              <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {activeTrips.map((trip) => {
                  if (!trip.location) return null;
                  const pos: [number, number] = [trip.location.latitude, trip.location.longitude];
                  const icon = getVehicleIcon();
                  return (
                    <Marker key={trip.id} position={pos} icon={icon || undefined}>
                      <Popup>
                        <div style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700, direction: isAr ? 'rtl' : 'ltr' }}>
                          <div className="mb-1 text-emerald-600 font-extrabold text-sm">
                            {trip.fromPoint} → {trip.toDestination}
                          </div>
                          <div className="text-xs text-slate-600 mb-1">
                            {isAr ? 'السائق:' : 'Chauffeur:'} {trip.assignedDriverName || '-'}
                          </div>
                          <div className="text-xs text-slate-600 mb-1">
                            {isAr ? 'السرعة:' : 'Vitesse:'} {trip.location.speed ?? 0} km/h
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {trip.location.updatedAt?.toDate
                              ? new Date(trip.location.updatedAt.toDate()).toLocaleString(isAr ? 'ar-DZ' : 'fr-FR')
                              : '-'}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white font-bold">
                {isAr ? 'جاري تحميل الخريطة...' : 'Chargement de la carte...'}
              </div>
            )}
          </div>

          <p className="mt-4 text-sm text-slate-300">
            {isAr ? 'آخر تحديث:' : 'Dernière mise à jour:'} {lastUpdate?.toLocaleTimeString() || '-'}
          </p>
        </Card>

        {/* Active Trips List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">
            {isAr ? 'الرحلات النشطة' : 'Trajets actifs'}
          </h2>
          {activeTrips.length === 0 ? (
            <Card className="p-12 border border-slate-200 text-center">
              <Bus className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {isAr ? 'لا توجد حافلات نشطة' : 'Aucun bus actif'}
              </h3>
              <p className="text-slate-600">
                {isAr
                  ? 'لا توجد رحلات نشطة حالياً'
                  : 'Aucun trajet actif pour le moment'}
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {activeTrips.map((trip) => (
                <Card key={trip.id} className="p-6 border border-slate-200 hover:shadow-lg transition">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-emerald-600 font-extrabold">
                        <Navigation className="w-5 h-5" />
                        {trip.fromPoint} → {trip.toDestination}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {trip.date} {trip.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {trip.assignedDriverName || '-'}
                        </span>
                      </div>
                      {trip.location && (
                        <div className="text-xs text-slate-500 font-mono">
                          Lat: {trip.location.latitude.toFixed(5)} | Lng: {trip.location.longitude.toFixed(5)}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        trip.status === 'started'
                          ? 'bg-emerald-100 text-emerald-700'
                          : trip.status === 'assigned'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {trip.status === 'started'
                          ? (isAr ? 'جارية' : 'En cours')
                          : trip.status === 'assigned'
                          ? (isAr ? 'معينة' : 'Assigné')
                          : (isAr ? 'مقبولة' : 'Approuvé')}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <Card className="p-6 border border-slate-200 bg-blue-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">
                {isAr ? 'معلومات التتبع' : 'Informations de suivi'}
              </h3>
              <p className="text-sm text-slate-700">
                {isAr
                  ? 'يتم تحديث الموقع تلقائياً من السائق. اضغط على علامة المركبة على الخريطة لعرض التفاصيل.'
                  : 'La position est mise à jour automatiquement par le chauffeur. Cliquez sur le marqueur du véhicule sur la carte pour voir les détails.'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
