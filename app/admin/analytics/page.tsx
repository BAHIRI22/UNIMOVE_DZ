'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, orderBy, getDocs, where } from 'firebase/firestore';
import { BarChart3, TrendingUp, Users, XCircle, DollarSign, Bus, Star, Calendar } from 'lucide-react';

interface Booking {
  id: string;
  status: string;
  price: number;
  date: string;
  fromPoint: string;
  toDestination: string;
  passengersCount: number;
  vehicleType: string;
  assignedDriverId?: string;
  assignedDriverName?: string;
  createdAt?: any;
}

interface DriverRating {
  driverId: string;
  driverName: string;
  average: number;
  count: number;
}

export default function AdminAnalyticsPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [ratings, setRatings] = useState<DriverRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month'>('today');

  useEffect(() => {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const items: Booking[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() } as Booking));
      setBookings(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const loadRatings = async () => {
      try {
        const snap = await getDocs(collection(db, 'ratings'));
        const map: Record<string, { sum: number; count: number; name: string }> = {};
        snap.forEach((d) => {
          const r = d.data();
          const did = r.driverId || 'unknown';
          if (!map[did]) map[did] = { sum: 0, count: 0, name: r.driverId || 'Unknown' };
          map[did].sum += r.rating || 0;
          map[did].count += 1;
        });
        const result = Object.entries(map).map(([driverId, v]) => ({
          driverId,
          driverName: v.name,
          average: Math.round((v.sum / v.count) * 10) / 10,
          count: v.count,
        }));
        setRatings(result);
      } catch (e) {
        console.error('[Analytics] ratings load error:', e);
      }
    };
    loadRatings();
  }, []);

  const filteredBookings = bookings.filter((b) => {
    if (dateRange === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return b.date === today;
    }
    if (dateRange === 'week') {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const created = b.createdAt?.toDate?.() || new Date(b.createdAt);
      return created >= weekAgo;
    }
    if (dateRange === 'month') {
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const created = b.createdAt?.toDate?.() || new Date(b.createdAt);
      return created >= monthAgo;
    }
    return true;
  });

  const totalBookings = filteredBookings.length;
  const totalRevenue = filteredBookings.reduce((sum, b) => sum + (b.price || 0), 0);
  const completed = filteredBookings.filter((b) => b.status === 'completed').length;
  const cancelled = filteredBookings.filter((b) => b.status === 'cancelled').length;
  const occupancyRate = totalBookings > 0 ? Math.round((completed / totalBookings) * 100) : 0;
  const cancellationRate = totalBookings > 0 ? Math.round((cancelled / totalBookings) * 100) : 0;

  // Route stats
  const routeStats: Record<string, { count: number; revenue: number }> = {};
  filteredBookings.forEach((b) => {
    const key = `${b.fromPoint} → ${b.toDestination}`;
    if (!routeStats[key]) routeStats[key] = { count: 0, revenue: 0 };
    routeStats[key].count += 1;
    routeStats[key].revenue += b.price || 0;
  });
  const topRoutes = Object.entries(routeStats)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  const StatCard = ({
    icon: Icon,
    label,
    value,
    sub,
    color,
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
    sub?: string;
    color: string;
  }) => (
    <Card className="p-6 border border-slate-200 hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-semibold">{label}</p>
          <p className="text-3xl font-black text-slate-900 mt-2">{value}</p>
          {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );

  return (
    <DashboardLayout role="admin">
      <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {isAr ? 'لوحة التحليلات' : 'Tableau de bord analytique'}
            </h1>
            <p className="text-gray-600">
              {isAr ? 'إحصائيات وأداء الرحلات' : 'Statistiques et performance des trajets'}
            </p>
          </div>
          <div className="flex gap-2">
            {(['today', 'week', 'month'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                  dateRange === r
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {r === 'today' ? (isAr ? 'اليوم' : 'Aujourd\'hui') : r === 'week' ? (isAr ? 'أسبوع' : 'Semaine') : (isAr ? 'شهر' : 'Mois')}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500">{isAr ? 'جاري التحميل...' : 'Chargement...'}</div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={BarChart3}
                label={isAr ? 'إجمالي الحجوزات' : 'Total réservations'}
                value={String(totalBookings)}
                sub={isAr ? 'حجوزات في الفترة' : 'Réservations dans la période'}
                color="bg-blue-500"
              />
              <StatCard
                icon={DollarSign}
                label={isAr ? 'الإيرادات' : 'Revenus'}
                value={`${totalRevenue} DA`}
                sub={isAr ? 'إجمالي المبالغ' : 'Montant total'}
                color="bg-emerald-500"
              />
              <StatCard
                icon={TrendingUp}
                label={isAr ? 'معدل الامتلاء' : 'Taux d\'occupation'}
                value={`${occupancyRate}%`}
                sub={`${completed} ${isAr ? 'مكتملة' : 'terminées'}`}
                color="bg-indigo-500"
              />
              <StatCard
                icon={XCircle}
                label={isAr ? 'نسبة الإلغاء' : 'Taux d\'annulation'}
                value={`${cancellationRate}%`}
                sub={`${cancelled} ${isAr ? 'ملغاة' : 'annulées'}`}
                color="bg-rose-500"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue by Route */}
              <Card className="p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Bus className="w-5 h-5 text-emerald-600" />
                  {isAr ? 'الإيرادات حسب الخط' : 'Revenus par ligne'}
                </h3>
                <div className="space-y-3">
                  {topRoutes.length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-4">{isAr ? 'لا توجد بيانات' : 'Aucune donnée'}</p>
                  )}
                  {topRoutes.map(([route, stats]) => {
                    const max = topRoutes[0]?.[1].revenue || 1;
                    const pct = Math.round((stats.revenue / max) * 100);
                    return (
                      <div key={route}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-semibold text-slate-700 truncate max-w-[70%]">{route}</span>
                          <span className="font-bold text-emerald-600">{stats.revenue} DA</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Occupancy Chart */}
              <Card className="p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  {isAr ? 'توزيع الحالة' : 'Répartition des statuts'}
                </h3>
                <div className="flex items-end justify-center gap-4 h-48">
                  {['pending', 'approved', 'assigned', 'started', 'completed', 'cancelled'].map((status) => {
                    const count = filteredBookings.filter((b) => b.status === status).length;
                    const max = Math.max(...['pending', 'approved', 'assigned', 'started', 'completed', 'cancelled'].map((s) =>
                      filteredBookings.filter((b) => b.status === s).length
                    ), 1);
                    const height = max > 0 ? (count / max) * 100 : 0;
                    const colors: Record<string, string> = {
                      pending: 'bg-amber-400',
                      approved: 'bg-emerald-400',
                      assigned: 'bg-indigo-400',
                      started: 'bg-sky-400',
                      completed: 'bg-blue-500',
                      cancelled: 'bg-rose-400',
                    };
                    const labels: Record<string, string> = {
                      pending: isAr ? 'قيد الانتظار' : 'En attente',
                      approved: isAr ? 'مقبول' : 'Approuvé',
                      assigned: isAr ? 'معين' : 'Assigné',
                      started: isAr ? 'بدأ' : 'Commencé',
                      completed: isAr ? 'مكتمل' : 'Terminé',
                      cancelled: isAr ? 'ملغى' : 'Annulé',
                    };
                    return (
                      <div key={status} className="flex flex-col items-center gap-2 flex-1">
                        <span className="text-xs font-bold text-slate-700">{count}</span>
                        <div className="w-full bg-slate-100 rounded-t-lg relative h-32">
                          <div
                            className={`absolute bottom-0 w-full rounded-t-lg ${colors[status]} transition-all`}
                            style={{ height: `${height}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-500 text-center leading-tight">{labels[status]}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Driver Ratings */}
            <Card className="p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                {isAr ? 'تقييمات السائقين' : 'Évaluations des chauffeurs'}
              </h3>
              {ratings.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4">{isAr ? 'لا توجد تقييمات بعد' : 'Aucune évaluation pour le moment'}</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ratings.map((r) => (
                    <div key={r.driverId} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-slate-800">{r.driverName}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-slate-900">{r.average}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {r.count} {isAr ? 'تقييم' : 'évaluation'}{r.count > 1 ? (isAr ? 'ات' : 's') : ''}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Recent Bookings Table */}
            <Card className="p-6 border border-slate-200 overflow-x-auto">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-600" />
                {isAr ? 'آخر الحجوزات' : 'Dernières réservations'}
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 px-3 font-bold text-slate-700">{isAr ? 'الرحلة' : 'Trajet'}</th>
                    <th className="text-left py-2 px-3 font-bold text-slate-700">{isAr ? 'التاريخ' : 'Date'}</th>
                    <th className="text-left py-2 px-3 font-bold text-slate-700">{isAr ? 'السعر' : 'Prix'}</th>
                    <th className="text-left py-2 px-3 font-bold text-slate-700">{isAr ? 'الحالة' : 'Statut'}</th>
                    <th className="text-left py-2 px-3 font-bold text-slate-700">{isAr ? 'السائق' : 'Chauffeur'}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.slice(0, 10).map((b) => (
                    <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-2 px-3">{b.fromPoint} → {b.toDestination}</td>
                      <td className="py-2 px-3">{b.date} {(b as any).time || ''}</td>
                      <td className="py-2 px-3 font-bold text-emerald-600">{b.price} DA</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          b.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                          b.status === 'cancelled' ? 'bg-rose-100 text-rose-700' :
                          b.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-2 px-3">{b.assignedDriverName || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
