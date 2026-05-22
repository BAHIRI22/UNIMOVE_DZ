'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { LiveBusCard } from '@/components/LiveBusCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockLiveBuses, mockRoutes, mockStops } from '@/mock/routes-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Map, Navigation, Radio, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LiveTrackingPage() {
  const { language } = useLanguage();
  const [buses, setBuses] = useState(mockLiveBuses);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setBuses(prevBuses =>
        prevBuses.map(bus => ({
          ...bus,
          eta: Math.max(1, bus.eta - 1),
          lastUpdate: new Date().toISOString(),
        }))
      );
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setBuses(mockLiveBuses);
    setLastUpdate(new Date());
  };

  const getStopName = (stopId: string) => {
    const stop = mockStops.find(s => s.id === stopId);
    return stop ? (language === 'ar' ? stop.nameAr : stop.name) : '';
  };

  const filteredBuses = selectedRouteId
    ? buses.filter(bus => bus.routeId === selectedRouteId)
    : buses;

  return (
    <DashboardLayout role="user">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
              {language === 'ar' ? 'التتبع المباشر' : 'Suivi en direct'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'تتبع حافلات UNIMOVE-DZ في الوقت الفعلي'
                : 'Suivez les bus UNIMOVE-DZ en temps réel'}
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            {language === 'ar' ? 'تحديث' : 'Actualiser'}
          </Button>
        </div>

        <Card className="overflow-hidden rounded-3xl border border-emerald-100 bg-slate-950 p-6 text-white shadow-2xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-emerald-300">{language === 'ar' ? 'خريطة مباشرة تجريبية' : 'Mini carte live mock'}</p>
              <h2 className="text-2xl font-black">{language === 'ar' ? 'حركة المركبات الآن' : 'Mobilité en temps réel'}</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-300/15 px-3 py-2 text-xs font-black text-emerald-100">
              <Radio className="h-4 w-4" />
              LIVE
            </div>
          </div>
          <div className="relative h-52 rounded-3xl bg-[radial-gradient(circle_at_18%_20%,rgba(16,185,129,0.35),transparent_25%),radial-gradient(circle_at_78%_70%,rgba(59,130,246,0.30),transparent_30%)]">
            <div className="absolute left-10 right-10 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/15">
              <motion.div initial={{ width: '20%' }} animate={{ width: '78%' }} transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }} className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" />
            </div>
            <motion.div animate={{ x: [0, 260, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-10 top-1/2 -translate-y-1/2 rounded-2xl bg-emerald-300 p-3 text-slate-950 shadow-xl">
              <Navigation className="h-6 w-6" />
            </motion.div>
            <Map className="absolute left-5 top-5 h-7 w-7 text-emerald-300" />
            <Clock className="absolute bottom-5 right-5 h-7 w-7 text-cyan-300" />
          </div>
          <p className="mt-4 text-sm text-slate-300">
            {language === 'ar' ? 'آخر تحديث:' : 'Dernière mise à jour:'} {lastUpdate.toLocaleTimeString()}
          </p>
        </Card>

        {/* Route Filter */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedRouteId === null ? 'default' : 'outline'}
            onClick={() => setSelectedRouteId(null)}
            className="flex items-center gap-2"
          >
            <Map className="w-4 h-4" />
            {language === 'ar' ? 'الكل' : 'Tous'}
          </Button>
          {mockRoutes.map((route) => (
            <Button
              key={route.id}
              variant={selectedRouteId === route.id ? 'default' : 'outline'}
              onClick={() => setSelectedRouteId(route.id)}
              size="sm"
            >
              {language === 'ar' ? route.nameAr.split('→')[0].trim() : route.name.split('→')[0].trim()}
            </Button>
          ))}
        </div>

        {/* Live Buses */}
        {filteredBuses.length === 0 ? (
          <Card className="p-12 border border-gray-200 text-center">
            <Map className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'لا توجد حافلات نشطة' : 'Aucun bus actif'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'لا توجد حافلات نشطة حالياً على هذا المسار'
                : 'Aucun bus actif sur cette ligne pour le moment'}
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredBuses.map((bus) => (
              <LiveBusCard
                key={bus.id}
                bus={bus}
                currentStopName={getStopName(bus.currentStopId)}
                nextStopName={getStopName(bus.nextStopId)}
              />
            ))}
          </div>
        )}

        {/* Info */}
        <Card className="p-6 border border-gray-200 bg-blue-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Map className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                {language === 'ar' ? 'معلومات التتبع' : 'Informations de suivi'}
              </h3>
              <p className="text-sm text-gray-700">
                {language === 'ar'
                  ? 'يتم تحديث الموقع كل 5 ثواني تلقائياً. يمكنك أيضاً النقر على زر التحديث للحصول على أحدث البيانات.'
                  : 'La position est mise à jour automatiquement toutes les 5 secondes. Vous pouvez également cliquer sur le bouton Actualiser pour obtenir les dernières données.'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
