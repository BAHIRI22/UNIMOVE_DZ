'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Bus } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Reservation {
  id: string;
  route: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  from: string;
  to: string;
}

export function ReservationsList() {
  const { t, language } = useLanguage();
  const [reservations] = useState<Reservation[]>([
    {
      id: '1',
      route: 'سيدي بلعباس - وهران',
      date: '2026-03-10',
      time: '08:00',
      status: 'upcoming',
      from: 'محطة سيدي بلعباس',
      to: 'محطة وهران',
    },
    {
      id: '2',
      route: 'سيدي بلعباس - مستغانم',
      date: '2026-03-05',
      time: '09:30',
      status: 'completed',
      from: 'محطة سيدي بلعباس',
      to: 'محطة مستغانم',
    },
    {
      id: '3',
      route: 'سيدي بلعباس - تلمسان',
      date: '2026-02-28',
      time: '06:30',
      status: 'completed',
      from: 'محطة سيدي بلعباس',
      to: 'محطة تلمسان',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300';
      case 'completed':
        return 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-300';
      case 'cancelled':
        return 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300';
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming':
        return language === 'ar' ? 'قادمة' : 'À venir';
      case 'completed':
        return language === 'ar' ? 'مكتملة' : 'Terminée';
      case 'cancelled':
        return language === 'ar' ? 'ملغاة' : 'Annulée';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('dashboard.myReservations')}</h2>

      {reservations.length === 0 ? (
        <Card className="p-12 border-2 border-dashed border-gray-300 text-center bg-gradient-to-br from-gray-50 to-white">
          <div className="flex flex-col items-center gap-6">
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bus className="w-12 h-12 text-emerald-600" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {language === 'ar' ? 'لا توجد حجوزات بعد' : 'Aucune réservation pour le moment'}
              </h3>
              <p className="text-gray-600 text-lg">
                {language === 'ar'
                  ? 'ابدأ بحجز رحلتك الأولى لتظهر هنا'
                  : 'Commencez par réserver votre premier trajet pour qu\'il apparaisse ici'}
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {reservations.map((reservation, index) => (
            <motion.div
              key={reservation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <Card className="p-6 md:p-8 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 border-2 border-slate-200 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white to-slate-50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div className="flex items-start gap-4 md:gap-6">
                    <motion.div
                      className="p-4 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Bus className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-xl md:text-2xl text-gray-900 mb-3">
                        {reservation.route}
                      </h3>
                      <div className="space-y-2 text-base md:text-lg text-gray-600">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-emerald-600" />
                          <span>
                            {language === 'ar' ? 'من' : 'De'}: {reservation.from}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-emerald-600" />
                          <span>
                            {language === 'ar' ? 'إلى' : 'À'}: {reservation.to}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Badge className={`px-4 py-2 text-base md:text-lg font-bold border-2 ${getStatusColor(reservation.status)}`}>
                    {getStatusLabel(reservation.status)}
                  </Badge>
                </div>

                <div className="border-t-2 border-slate-200 pt-6 flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="p-2 bg-emerald-100 rounded-xl">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-base md:text-lg font-medium">{reservation.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="p-2 bg-emerald-100 rounded-xl">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-base md:text-lg font-medium">{reservation.time}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
