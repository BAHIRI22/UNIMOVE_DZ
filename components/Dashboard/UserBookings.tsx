'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Loader2, Navigation, Star, WifiOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RatingModal } from '@/components/RatingModal';
import { hasUserRatedBooking } from '@/lib/ratings';

interface Booking {
  id: string;
  fromPoint: string;
  toDestination: string;
  date: string;
  time: string;
  vehicleType: string;
  price: number;
  status: 'pending' | 'approved' | 'assigned' | 'started' | 'completed' | 'cancelled' | 'rejected';
  paymentStatus: string;
  reservationNumber?: string;
  createdAt?: any;
  // Phase 10 fields
  tripCategory?: string;
  vehicleRecommended?: string;
  comfortLevel?: string;
  roundTrip?: boolean;
  estimatedDistanceKm?: number;
  estimatedTravelTime?: number;
  estimatedPrice?: number;
  finalPrice?: number;
  assignedDriverName?: string;
  assignedDriverPhone?: string;
  assignedVehicleNumber?: string;
  passengersCount?: number;
  transportNatureLabelAr?: string;
  transportNatureLabelFr?: string;
  trackingEnabled?: boolean;
}

const STATUS_LABELS_AR: Record<string, string> = {
  pending: 'قيد الانتظار',
  approved: 'مقبول',
  assigned: 'تم تعيين السائق',
  started: 'الرحلة بدأت',
  rejected: 'مرفوض',
  cancelled: 'ملغاة',
  completed: 'مكتمل',
};

const STATUS_LABELS_FR: Record<string, string> = {
  pending: 'En attente',
  approved: 'Accepté',
  assigned: 'Chauffeur assigné',
  started: 'Trajet commencé',
  rejected: 'Refusé',
  cancelled: 'Annulé',
  completed: 'Terminé',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  assigned: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  started: 'bg-sky-100 text-sky-700 border-sky-200',
  rejected: 'bg-rose-100 text-rose-700 border-rose-200',
  cancelled: 'bg-slate-100 text-slate-700 border-slate-200',
  completed: 'bg-blue-100 text-blue-700 border-blue-200',
};

export function UserBookings() {
  const { user } = useAuth();
  const { language, isRTL } = useLanguage();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  // Rating modal state
  const [ratingBooking, setRatingBooking] = useState<Booking | null>(null);
  const [ratedBookingIds, setRatedBookingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOffline(!navigator.onLine);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const q = query(collection(db, 'bookings'), where('userId', '==', user.id));
      const unsub = onSnapshot(
        q,
        (snap) => {
          const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Booking[];
          items.sort((a, b) => {
            const ta = a.createdAt?.seconds || 0;
            const tb = b.createdAt?.seconds || 0;
            return tb - ta;
          });
          setBookings(items);
          setLoading(false);
        },
        (err) => {
          console.error('[UserBookings] snapshot error:', err);
          setLoading(false);
        }
      );
      return () => unsub();
    } catch (e) {
      console.error('[UserBookings] query error:', e);
      setLoading(false);
    }
  }, [user?.id]);

  // Load waitlist entries
  useEffect(() => {
    if (!user?.id) return;
    try {
      const wq = query(collection(db, 'waitlist'), where('userId', '==', user.id), where('status', '==', 'waiting'));
      const unsub = onSnapshot(wq, (snap) => {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setWaitlist(items);
      });
      return () => unsub();
    } catch (e) {
      console.error('[UserBookings] waitlist error:', e);
    }
  }, [user?.id]);

  // Check which completed bookings have already been rated
  useEffect(() => {
    if (!user?.id) return;
    const checkRatings = async () => {
      const completed = bookings.filter((b) => b.status === 'completed');
      const rated = new Set<string>();
      for (const b of completed) {
        if (await hasUserRatedBooking(user.id, b.id)) {
          rated.add(b.id);
        }
      }
      setRatedBookingIds(rated);
    };
    checkRatings();
  }, [bookings, user?.id]);

  if (loading) {
    return (
      <Card className="p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
      </Card>
    );
  }

  if (!bookings.length && !waitlist.length) {
    return (
      <>
        {isOffline && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-100 text-slate-600 text-sm mb-4">
            <WifiOff className="w-4 h-4" />
            {language === 'ar' ? 'أنت في وضع عدم الاتصال. قد لا تظهر البيانات بشكل كامل.' : 'Vous êtes hors ligne. Les données peuvent être incomplètes.'}
          </div>
        )}
        <Card className="p-8 text-center text-slate-500">
          {language === 'ar' ? 'لا توجد حجوزات بعد' : 'Aucune réservation pour le moment'}
        </Card>
      </>
    );
  }

  const labels = language === 'ar' ? STATUS_LABELS_AR : STATUS_LABELS_FR;

  return (
    <div className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {isOffline && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-100 text-slate-600 text-sm">
          <WifiOff className="w-4 h-4" />
          {language === 'ar' ? 'أنت في وضع عدم الاتصال. قد لا تظهر البيانات بشكل كامل.' : 'Vous êtes hors ligne. Les données peuvent être incomplètes.'}
        </div>
      )}
      <h2 className="text-2xl font-extrabold text-gray-900">
        {language === 'ar' ? 'حجوزاتي' : 'Mes réservations'}
      </h2>

      {/* Waitlist Section */}
      {waitlist.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-amber-700">
            {language === 'ar' ? '📋 قائمة الانتظار' : '📋 Liste d\'attente'}
          </h3>
          {waitlist.map((w) => (
            <Card key={w.id} className="p-4 border border-amber-200 bg-amber-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-amber-900 text-sm">{w.fromPoint} → {w.toDestination}</p>
                  <p className="text-xs text-amber-700 mt-1">
                    <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {w.date}</span>
                    <span className="inline-flex items-center gap-1 mx-2"><Clock className="w-3 h-3" /> {w.time}</span>
                  </p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-bold bg-amber-200 text-amber-800">
                  {language === 'ar' ? 'في الانتظار' : 'En attente'}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="grid gap-4">
        {bookings.map((b) => {
          const isAr = language === 'ar';
          const vehicleLabel = b.vehicleType === 'car' ? (isAr ? '🚗 سيارة' : '🚗 Voiture') : b.vehicleType === 'minibus' ? (isAr ? '🚐 حافلة صغيرة' : '🚐 Mini Bus') : (isAr ? '🚌 حافلة كبيرة' : '🚌 Bus');

          return (
            <Card key={b.id} className="p-5 border border-slate-200 hover:shadow-md transition">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 min-w-[200px] space-y-2">
                  <div className="flex items-center gap-2 text-gray-900 font-bold">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{b.fromPoint}</span>
                    <span className="text-slate-400">→</span>
                    <span>{b.toDestination}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-semibold">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{b.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{b.time}</span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">{vehicleLabel}</span>
                    {b.roundTrip && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-black">
                        {isAr ? 'ذهاب وإياب' : 'Aller-Retour'}
                      </span>
                    )}
                    {b.estimatedDistanceKm && (
                      <span>• {b.estimatedDistanceKm} {isAr ? 'كم' : 'km'}</span>
                    )}
                    {b.estimatedTravelTime && (
                      <span>• {b.estimatedTravelTime} {isAr ? 'دقيقة' : 'min'}</span>
                    )}
                    {b.passengersCount && (
                      <span>• {b.passengersCount} {isAr ? 'ركاب' : 'voyageurs'}</span>
                    )}
                  </div>

                  {/* Pricing break downs */}
                  <div className="text-xs">
                    <span className="opacity-75">{isAr ? 'السعر التقديري:' : 'Tarif estimé :'} </span>
                    <span className="font-bold text-emerald-600">{b.estimatedPrice || b.price} DZD</span>
                    {b.finalPrice !== b.estimatedPrice && b.finalPrice && (
                      <>
                        <span className="opacity-75 mx-2">| {isAr ? 'السعر النهائي المعتمد:' : 'Tarif final :'} </span>
                        <span className="font-extrabold text-teal-600 bg-teal-50 px-2 py-1 rounded border border-teal-200">{b.finalPrice} DZD</span>
                      </>
                    )}
                  </div>

                  {/* Transport Nature */}
                  {(b.transportNatureLabelAr || b.transportNatureLabelFr) && (
                    <div className="mt-2 text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full inline-block">
                      {isAr ? b.transportNatureLabelAr : b.transportNatureLabelFr}
                    </div>
                  )}

                  {/* Driver Assignment display */}
                  {b.assignedDriverName && (
                    <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs space-y-1">
                      <p className="font-bold text-emerald-700">
                        {isAr ? '✅ تم تأكيد رحلتك — تفاصيل التعيين' : '✅ Votre trajet est confirmé — Détails'}
                      </p>
                      <p className="text-slate-800 font-semibold">
                        {isAr ? `السائق: ${b.assignedDriverName}` : `Chauffeur : ${b.assignedDriverName}`}
                        {b.assignedDriverPhone && ` (${b.assignedDriverPhone})`}
                      </p>
                      {b.assignedVehicleNumber && (
                        <p className="text-slate-600">
                          {isAr ? `المركبة: ${b.vehicleType === 'car' ? 'سيارة' : b.vehicleType === 'minibus' ? 'حافلة صغيرة' : 'حافلة كبيرة'} — رقم H-${b.assignedVehicleNumber}` : `Véhicule : ${b.vehicleType === 'car' ? 'Voiture' : b.vehicleType === 'minibus' ? 'Mini Bus' : 'Bus'} — N° H-${b.assignedVehicleNumber}`}
                        </p>
                      )}
                      <p className="text-slate-600">
                        {isAr ? `نقطة الانطلاق: ${b.fromPoint}` : `Départ : ${b.fromPoint}`} · {isAr ? `الوجهة: ${b.toDestination}` : `Destination : ${b.toDestination}`}
                      </p>
                      <p className="text-slate-600">
                        {isAr ? `السعر النهائي: ${b.finalPrice || b.estimatedPrice || b.price} DZD` : `Tarif final : ${b.finalPrice || b.estimatedPrice || b.price} DZD`}
                      </p>
                      {b.trackingEnabled && (
                        <p className="text-sky-700 font-bold">
                          {isAr ? '📍 يمكنك تتبع الرحلة عند انطلاقها' : '📍 Suivi disponible dès le départ'}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3 justify-end self-end md:self-auto shrink-0">
                  {b.status === 'started' && (
                    <button
                      onClick={() => router.push(`/live-tracking/${b.id}`)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-sky-500 text-white hover:bg-sky-600 transition"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      {isAr ? 'تتبع الرحلة' : 'Suivre le trajet'}
                    </button>
                  )}
                  {b.status === 'completed' && !ratedBookingIds.has(b.id) && (
                    <button
                      onClick={() => setRatingBooking(b)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-yellow-400 text-yellow-900 hover:bg-yellow-500 transition"
                    >
                      <Star className="w-3.5 h-3.5" />
                      {isAr ? 'قيّم الرحلة' : 'Évaluer'}
                    </button>
                  )}
                  {b.status === 'completed' && ratedBookingIds.has(b.id) && (
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                      <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                      {isAr ? 'تم التقييم' : 'Évalué'}
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${STATUS_COLORS[b.status] || STATUS_COLORS.pending}`}
                  >
                    {labels[b.status] || b.status}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Rating Modal */}
      {ratingBooking && (
        <RatingModal
          isOpen={!!ratingBooking}
          onClose={() => setRatingBooking(null)}
          bookingId={ratingBooking.id}
          userId={user?.id || ''}
          driverId={ratingBooking.assignedDriverName || ''}
          driverName={ratingBooking.assignedDriverName}
        />
      )}
    </div>
  );
}
