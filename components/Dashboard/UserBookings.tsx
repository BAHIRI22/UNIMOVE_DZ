'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Loader2 } from 'lucide-react';

interface Booking {
  id: string;
  fromPoint: string;
  toDestination: string;
  date: string;
  time: string;
  vehicleType: string;
  price: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  paymentStatus: string;
  reservationNumber?: string;
  createdAt?: any;
}

const STATUS_LABELS_AR: Record<string, string> = {
  pending: 'قيد الانتظار',
  approved: 'مقبول',
  rejected: 'مرفوض',
  completed: 'مكتمل',
};

const STATUS_LABELS_FR: Record<string, string> = {
  pending: 'En attente',
  approved: 'Accepté',
  rejected: 'Refusé',
  completed: 'Terminé',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  rejected: 'bg-rose-100 text-rose-700 border-rose-200',
  completed: 'bg-blue-100 text-blue-700 border-blue-200',
};

export function UserBookings() {
  const { user } = useAuth();
  const { language, isRTL } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

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
          // Sort client-side by createdAt desc
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

  if (loading) {
    return (
      <Card className="p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
      </Card>
    );
  }

  if (!bookings.length) {
    return (
      <Card className="p-8 text-center text-slate-500">
        {language === 'ar' ? 'لا توجد حجوزات بعد' : 'Aucune réservation pour le moment'}
      </Card>
    );
  }

  const labels = language === 'ar' ? STATUS_LABELS_AR : STATUS_LABELS_FR;

  return (
    <div className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <h2 className="text-2xl font-extrabold text-gray-900">
        {language === 'ar' ? 'حجوزاتي' : 'Mes réservations'}
      </h2>
      <div className="grid gap-4">
        {bookings.map((b) => (
          <Card key={b.id} className="p-5 border border-slate-200 hover:shadow-md transition">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 text-gray-900 font-bold">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>{b.fromPoint}</span>
                  <span className="text-slate-400">→</span>
                  <span>{b.toDestination}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{b.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{b.time}</span>
                  {b.vehicleType && <span>• {b.vehicleType}</span>}
                  {b.price ? <span className="font-bold text-emerald-700">{b.price} DZD</span> : null}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold border ${STATUS_COLORS[b.status] || STATUS_COLORS.pending}`}
              >
                {labels[b.status] || b.status}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
