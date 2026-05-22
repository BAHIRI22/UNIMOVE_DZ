'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bus, User, Phone, Clock, Navigation, Wifi, MapPin, Radio } from 'lucide-react';
import { LiveBus } from '@/types/routes';
import { motion } from 'framer-motion';

interface LiveBusCardProps {
  bus: LiveBus;
  currentStopName: string;
  nextStopName: string;
  onViewTracking?: () => void;
}

export function LiveBusCard({ bus, currentStopName, nextStopName, onViewTracking }: LiveBusCardProps) {
  const { language } = useLanguage();

  const seatPercentage = Math.round((bus.availableSeats / bus.totalSeats) * 100);

  return (
    <motion.div whileHover={{ y: -6 }}>
    <Card className="overflow-hidden p-6 border border-emerald-100 bg-white/90 backdrop-blur-xl rounded-3xl hover:shadow-2xl hover:shadow-emerald-500/15 transition-all">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{bus.busNumber}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{language === 'ar' ? bus.driverNameAr : bus.driverName}</span>
              </div>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black ${
            bus.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
          }`}>
            <Radio className="w-3 h-3" />
            {bus.status === 'active' ? (language === 'ar' ? 'نشط' : 'Actif') : (language === 'ar' ? 'غير نشط' : 'Inactif')}
          </div>
        </div>

        <div className="relative h-36 overflow-hidden rounded-3xl bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.35),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.30),transparent_32%)]" />
          <div className="absolute left-8 right-8 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/15">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" initial={{ width: '25%' }} animate={{ width: `${Math.max(35, 100 - bus.eta * 8)}%` }} transition={{ duration: 1.2 }} />
          </div>
          <motion.div className="absolute left-8 top-1/2 -translate-y-1/2 rounded-2xl bg-emerald-300 p-3 text-slate-950 shadow-xl" animate={{ x: [0, 150, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <Bus className="h-5 w-5" />
          </motion.div>
          <MapPin className="absolute left-5 top-5 h-6 w-6 text-emerald-300" />
          <MapPin className="absolute bottom-5 right-5 h-6 w-6 text-cyan-300" />
        </div>

        {/* Current Location */}
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl">
          <Navigation className="w-5 h-5 text-blue-600" />
          <div className="flex-1">
            <div className="text-xs text-gray-600">
              {language === 'ar' ? 'الموقع الحالي' : 'Position actuelle'}
            </div>
            <div className="font-medium text-gray-900">{currentStopName}</div>
          </div>
        </div>

        {/* Next Stop & ETA */}
        <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-xs text-gray-600">
                {language === 'ar' ? 'المحطة التالية' : 'Prochain arrêt'}
              </div>
              <div className="font-medium text-gray-900">{nextStopName}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600">{bus.eta}</div>
            <div className="text-xs text-gray-600">
              {language === 'ar' ? 'دقيقة' : 'min'}
            </div>
          </div>
        </div>

        {/* Seats */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>
                {language === 'ar' ? 'ال places disponibles' : 'Places disponibles'}
              </span>
            </div>
            <span className="font-bold text-gray-900">
              {bus.availableSeats} / {bus.totalSeats}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                seatPercentage > 50 ? 'bg-emerald-500' :
                seatPercentage > 20 ? 'bg-orange-500' :
                'bg-red-500'
              }`}
              style={{ width: `${seatPercentage}%` }}
            />
          </div>
        </div>

        {/* Driver Contact */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
          <Phone className="w-5 h-5 text-gray-600" />
          <div className="flex-1">
            <div className="text-xs text-gray-600">
              {language === 'ar' ? 'رقم السائق' : 'Numéro chauffeur'}
            </div>
            <div className="font-medium text-gray-900">{bus.driverPhone}</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`tel:${bus.driverPhone}`)}
          >
            {language === 'ar' ? 'اتصال' : 'Appeler'}
          </Button>
        </div>

        {/* WiFi */}
        <div className="flex items-center gap-2 p-4 bg-emerald-50 rounded-2xl">
          <Wifi className="w-5 h-5 text-emerald-600" />
          <div className="flex-1">
            <div className="text-xs text-gray-600">
              {language === 'ar' ? 'كلمة مرور WiFi' : 'Mot de passe WiFi'}
            </div>
            <div className="font-medium text-gray-900">UNIMOVE_DZ</div>
          </div>
        </div>

        {/* Action */}
        {onViewTracking && (
          <Button
            onClick={onViewTracking}
            className="w-full bg-primary hover:bg-secondary text-white"
          >
            {language === 'ar' ? 'عرض التتبع المباشر' : 'Voir le suivi en direct'}
          </Button>
        )}
      </div>
    </Card>
    </motion.div>
  );
}
