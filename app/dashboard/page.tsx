'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MembershipCard } from '@/components/Dashboard/MembershipCard';
import { ReservationsList } from '@/components/Dashboard/ReservationsList';
import { BookingModal } from '@/components/Dashboard/BookingModal';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Plus, Calendar, MapPin, CreditCard, Bell, TrendingUp, Users, Wallet, Star, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ reservations: 0, trips: 0, savings: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Animated counters
  useEffect(() => {
    if (isLoading) return;
    
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setAnimatedStats({
        reservations: Math.floor(progress * 12),
        trips: Math.floor(progress * 45),
        savings: Math.floor(progress * 15),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [isLoading]);

  const handleBooking = (_date: string, _route: string) => {
    setIsBookingOpen(false);
  };

  const stats = [
    {
      icon: Calendar,
      label: language === 'ar' ? 'الحجوزات' : 'Réservations',
      value: animatedStats.reservations.toString(),
      color: 'from-blue-500 to-blue-600',
      shadowColor: 'shadow-blue-500/30',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    },
    {
      icon: MapPin,
      label: language === 'ar' ? 'الرحلات' : 'Trajets',
      value: animatedStats.trips.toString(),
      color: 'from-emerald-500 to-emerald-600',
      shadowColor: 'shadow-emerald-500/30',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    },
    {
      icon: CreditCard,
      label: language === 'ar' ? 'الاشتراك' : 'Abonnement',
      value: language === 'ar' ? 'نشط' : 'Actif',
      color: 'from-purple-500 to-purple-600',
      shadowColor: 'shadow-purple-500/30',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
    },
    {
      icon: TrendingUp,
      label: language === 'ar' ? 'المدخرات' : 'Économies',
      value: `${animatedStats.savings}%`,
      color: 'from-orange-500 to-orange-600',
      shadowColor: 'shadow-orange-500/30',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
    },
  ];

  const businessStats = [
    {
      icon: Wallet,
      label: language === 'ar' ? 'قيمة الاشتراك' : 'Valeur abonnement',
      value: '3,500 DA',
      detail: language === 'ar' ? 'خطة طالب شهرية' : 'Plan étudiant mensuel',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Users,
      label: language === 'ar' ? 'مؤشر الولاء' : 'Score fidélité',
      value: '92%',
      detail: language === 'ar' ? 'نشاط ممتاز' : 'Activité excellente',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Star,
      label: language === 'ar' ? 'النقاط' : 'Points',
      value: '740',
      detail: language === 'ar' ? 'قابلة للاستبدال' : 'Échangeables',
      color: 'from-purple-500 to-fuchsia-600',
    },
  ];

  const activityFeed = [
    {
      icon: CreditCard,
      title: language === 'ar' ? 'اشتراك شهري نشط' : 'Abonnement mensuel actif',
      time: language === 'ar' ? 'اليوم' : 'Aujourd’hui',
    },
    {
      icon: MapPin,
      title: language === 'ar' ? 'تم حجز رحلة جامعية' : 'Trajet universitaire réservé',
      time: language === 'ar' ? 'منذ ساعتين' : 'Il y a 2h',
    },
    {
      icon: Bell,
      title: language === 'ar' ? 'إشعار تحديث المسار' : 'Notification de mise à jour trajet',
      time: language === 'ar' ? 'أمس' : 'Hier',
    },
  ];

  return (
    <DashboardLayout role="user">
      <div className="space-y-6 md:space-y-8 lg:space-y-10">
        {isLoading ? (
          // Loading Skeleton
          <>
            <Skeleton className="h-16 w-64 md:h-20 md:w-96" />
            <Skeleton className="h-5 w-48 md:h-6 md:w-64" />
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-6 md:p-8 lg:p-10 border-2 border-slate-200 rounded-2xl md:rounded-3xl">
                  <div className="flex items-center gap-4 md:gap-6">
                    <Skeleton className="w-16 h-16 md:w-20 md:h-20 rounded-2xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-8 w-12 md:h-10 md:w-16" />
                      <Skeleton className="h-5 w-20 md:h-6 md:w-24" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-10">
              <Skeleton className="h-80 md:h-96 rounded-2xl md:rounded-3xl" />
              <div className="md:col-span-2 space-y-6 md:space-y-8">
                <Skeleton className="h-40 md:h-48 rounded-2xl md:rounded-3xl" />
                <Skeleton className="h-56 md:h-64 rounded-2xl md:rounded-3xl" />
              </div>
            </div>
          </>
        ) : (
          // Actual Content
          <>
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl -z-10 opacity-50" />
              <div className="p-8 md:p-10 lg:p-12 rounded-3xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-3 md:mb-4 tracking-tight">
                  {language === 'ar' ? 'مرحباً' : 'Bienvenue'},{' '}
                  <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">{user?.fullName?.split('/')[0].trim()}</span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-7 md:leading-8">
                  {language === 'ar'
                    ? `حسابك نشط حتى ${user?.validUntil}`
                    : `Votre compte est actif jusqu'au ${user?.validUntil}`}
                </p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={`p-6 md:p-8 lg:p-10 border-2 border-slate-200 hover:shadow-2xl transition-all duration-500 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white to-slate-50 hover:${stat.shadowColor}`}>
                      <div className="flex items-center gap-4 md:gap-6">
                        <motion.div
                          className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </motion.div>
                        <div>
                          <p className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900">{stat.value}</p>
                          <p className="text-sm md:text-base lg:text-lg text-slate-600 font-bold">{stat.label}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-10"
            >
              {/* Left Column - Membership Card */}
              <div className="md:col-span-1">
                <MembershipCard />
              </div>

              {/* Right Column - Reservations & Actions */}
              <div className="md:col-span-2 space-y-6 md:space-y-8">
                {/* Quick Actions */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 md:p-8 border border-slate-200 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 bg-gradient-to-br from-white to-slate-50">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                      {language === 'ar' ? 'إجراءات سريعة' : 'Actions rapides'}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={() => setIsBookingOpen(true)}
                          className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white h-14 md:h-16 text-base md:text-xl font-bold rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-emerald-500/30 w-full"
                        >
                          <Plus className="w-5 h-5 md:w-6 md:h-6" />
                          {language === 'ar' ? 'حجز رحلة' : 'Réserver un trajet'}
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          className="h-14 md:h-16 text-base md:text-xl font-bold rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all w-full"
                        >
                          {language === 'ar' ? 'بطاقتي' : 'Ma carte'}
                        </Button>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>

                {/* Reservations */}
                <ReservationsList />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
            >
              <Card className="lg:col-span-2 p-6 md:p-8 rounded-3xl border border-slate-200 bg-white/85 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900">
                      {language === 'ar' ? 'مؤشرات الأعمال الشخصية' : 'Indicateurs business personnels'}
                    </h2>
                    <p className="text-sm text-slate-600">
                      {language === 'ar' ? 'تحليلات اشتراكك واستخدامك داخل المنصة' : 'Analytique de votre abonnement et usage plateforme'}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {businessStats.map((item, index) => (
                    <motion.div key={item.label} whileHover={{ y: -4 }} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5">
                      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg`}>
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-2xl font-black text-slate-900">{item.value}</p>
                      <p className="mt-1 text-sm font-bold text-slate-700">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 md:p-8 rounded-3xl border border-slate-200 bg-white/85 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6">
                  {language === 'ar' ? 'النشاط الأخير' : 'Activité récente'}
                </h2>
                <div className="space-y-4">
                  {activityFeed.map((item) => (
                    <div key={item.title} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{item.title}</p>
                        <p className="text-xs font-semibold text-slate-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBook={handleBooking}
      />
    </DashboardLayout>
  );
}
