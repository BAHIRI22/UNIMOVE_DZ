'use client';

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { MembershipCard } from '@/components/Dashboard/MembershipCard';
import { UserBookings } from '@/components/Dashboard/UserBookings';
import { VerificationUpload } from '@/components/Dashboard/VerificationUpload';
import { BookingModal } from '@/components/Dashboard/BookingModal';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { Calendar, MapPin, CreditCard, Bell, TrendingUp, Users, Wallet, Star, Activity, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import StudentDayBanner from '@/components/StudentDayBanner';

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStats, setBookingStats] = useState({ reservations: 0, trips: 0 });
  const [upcomingTrip, setUpcomingTrip] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (authLoading) return;

    console.log('DASHBOARD PAGE ROLE:', user?.role || null);

    if (!user) {
      router.replace('/login');
      return;
    }
  }, [authLoading, router, user]);

  useEffect(() => {
    if (!user?.id) {
      setBookingStats({ reservations: 0, trips: 0 });
      return;
    }

    const q = query(collection(db, 'bookings'), where('userId', '==', user.id));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        let reservations = 0;
        let trips = 0;
        const allBookings: any[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          reservations++;
          if (data.status === 'completed') trips++;
          allBookings.push({ id: doc.id, ...data });
        });
        setBookingStats({ reservations, trips });

        // Find upcoming trip (pending/approved/assigned/started, future date)
        const upcomingStatuses = ['pending', 'approved', 'assigned', 'started'];
        const upcoming = allBookings
          .filter((b) => upcomingStatuses.includes(b.status))
          .sort((a, b) => {
            const dateA = new Date(a.date + 'T' + (a.time || '00:00'));
            const dateB = new Date(b.date + 'T' + (b.time || '00:00'));
            return dateA.getTime() - dateB.getTime();
          })[0] || null;
        setUpcomingTrip(upcoming);
      },
      (error) => {
        console.error('[Dashboard] bookings stats error:', error);
        setBookingStats({ reservations: 0, trips: 0 });
        setUpcomingTrip(null);
      }
    );

    return () => unsubscribe();
  }, [user?.id]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  const handleBooking = (_date: string, _route: string) => {
    setIsBookingOpen(false);
  };

  const isVerified = user?.verified === true || (user as any)?.verificationStatus === 'approved' || (user as any)?.verificationStatus === 'verified';
  const isApproved = user?.status === 'approved' || (user as any)?.accountStatus === 'active';
  const isFullyActive = isVerified && isApproved;

  const isSubActive = user?.subscriptionStatus === 'active';

  let subLabel = language === 'ar' ? 'بدون اشتراك' : 'Aucun';
  let daysRemaining = 0;
  if (isSubActive) {
    if (user?.subscriptionEndDate) {
      const end = new Date(user.subscriptionEndDate);
      const diffTime = end.getTime() - new Date().getTime();
      daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
    
    if (daysRemaining <= 0) {
      daysRemaining = 30; // fallback to 30 days remaining for simulation
    }

    const plansMapping: any = {
      daily: language === 'ar' ? 'يومي' : 'Journalier',
      weekly: language === 'ar' ? 'أسبوعي' : 'Hebdomadaire',
      monthly: language === 'ar' ? 'شهري' : 'Mensuel',
      semester: language === 'ar' ? 'سداسي' : 'Semestriel',
      yearly: language === 'ar' ? 'سنوي' : 'Annuel',
    };
    subLabel = plansMapping[(user.subscriptionPlan as keyof typeof plansMapping)] || (language === 'ar' ? 'نشط' : 'Actif');
  }

  const stats = [
    {
      icon: Calendar,
      label: language === 'ar' ? 'الحجوزات' : 'Réservations',
      value: isFullyActive ? bookingStats.reservations.toString() : '0',
      color: 'from-blue-500 to-blue-600',
      shadowColor: 'shadow-blue-500/30',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    },
    {
      icon: MapPin,
      label: language === 'ar' ? 'الرحلات' : 'Trajets',
      value: isFullyActive ? bookingStats.trips.toString() : '0',
      color: 'from-emerald-500 to-emerald-600',
      shadowColor: 'shadow-emerald-500/30',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    },
    {
      icon: CreditCard,
      label: isSubActive
        ? (language === 'ar' ? `باقي ${daysRemaining} يوم` : `${daysRemaining} j restants`)
        : (language === 'ar' ? 'الاشتراك غير نشط' : 'Abonnement Inactif'),
      value: subLabel,
      color: 'from-purple-500 to-purple-600',
      shadowColor: 'shadow-purple-500/30',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      cta: !isSubActive ? {
        label: language === 'ar' ? 'اختيار اشتراك' : 'Choisir',
        href: '/subscriptions',
      } : undefined,
    },
    {
      icon: TrendingUp,
      label: language === 'ar' ? 'المدخرات' : 'Économies',
      value: '0%',
      color: 'from-orange-500 to-orange-600',
      shadowColor: 'shadow-orange-500/30',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
    },
  ];

  const businessStats = [
    {
      icon: Wallet,
      label: language === 'ar' ? 'قيمة الاشتراك' : 'Valeur abonnement',
      value: '0 DA',
      detail: language === 'ar' ? 'لا توجد بيانات دفع حقيقية بعد' : 'Aucune donnée de paiement réelle',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Users,
      label: language === 'ar' ? 'مؤشر الولاء' : 'Score fidélité',
      value: '0%',
      detail: language === 'ar' ? 'لا توجد بيانات حقيقية بعد' : 'Aucune donnée réelle',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Star,
      label: language === 'ar' ? 'النقاط' : 'Points',
      value: '0',
      detail: language === 'ar' ? 'لا توجد نقاط حقيقية بعد' : 'Aucun point réel',
      color: 'from-purple-500 to-fuchsia-600',
    },
  ];

  const activityFeed: { icon: typeof Bell; title: string; time: string }[] = [];

  return (
    <DashboardLayout role="user">
      <StudentDayBanner />
      <div className="relative">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] z-0">
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <Image src="/images/udl-logo.jpeg" alt="" fill className="object-contain" />
          </div>
        </div>
        <div className="space-y-6 md:space-y-8 lg:space-y-10 relative z-10">
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

            {user?.verified === false && user?.status !== 'rejected' && (
              <Card className="rounded-3xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-sm font-black">
                    {language === 'ar' ? 'قيد التحقق' : 'En attente'}
                  </div>
                </div>
                <h2 className="text-2xl font-black text-amber-900">
                  {language === 'ar' ? 'حسابك قيد التحقق من طرف الإدارة' : 'Votre compte est en attente de vérification administrative'}
                </h2>
                <p className="mt-3 text-lg font-semibold leading-8 text-amber-800">
                  {language === 'ar'
                    ? 'يمكنك تصفح التطبيق، لكن الحجز والدفع الكاملين يتطلبان التحقق من الإدارة'
                    : 'Vous pouvez parcourir l’application, mais la réservation et le paiement complets nécessitent la validation administrative'}
                </p>
              </Card>
            )}

            {user?.verified === true && (
              <Card className="rounded-3xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 text-sm font-black">
                    {language === 'ar' ? 'موثق' : 'Vérifié'}
                  </div>
                </div>
                <h2 className="text-2xl font-black text-emerald-900">
                  {language === 'ar' ? 'تم التحقق من حسابك' : 'Votre compte a été vérifié'}
                </h2>
                <p className="mt-3 text-lg font-semibold leading-8 text-emerald-800">
                  {language === 'ar'
                    ? 'يمكنك الآن حجز الرحلات وإجراء الدفعات الكاملة'
                    : 'Vous pouvez maintenant réserver des trajets et effectuer des paiements complets'}
                </p>
              </Card>
            )}

            {user?.status === 'rejected' && (
              <Card className="rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-rose-50 p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="px-3 py-1 rounded-full bg-red-200 text-red-900 text-sm font-black">
                    {language === 'ar' ? 'مرفوض' : 'Rejeté'}
                  </div>
                </div>
                <h2 className="text-2xl font-black text-red-900">
                  {language === 'ar' ? 'تم رفض التحقق' : 'La vérification a été rejetée'}
                </h2>
                <p className="mt-3 text-lg font-semibold leading-8 text-red-800">
                  {language === 'ar'
                    ? 'يرجى مراجعة المعلومات أو إعادة إرسال الوثائق'
                    : 'Veuillez vérifier vos informations ou renvoyer les documents'}
                </p>
                {user?.adminNote && (
                  <div className="mt-4 p-4 rounded-xl bg-white/60 border border-red-200">
                    <p className="text-sm font-bold text-red-700">
                      {language === 'ar' ? 'ملاحظة الإدارة:' : 'Note de l\'administration:'}
                    </p>
                    <p className="mt-1 text-sm text-red-600">{user.adminNote}</p>
                  </div>
                )}
              </Card>
            )}

            {user?.role === 'admin' && (
              <Link href="/admin-panel">
                <Card className="rounded-3xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-8 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 text-sm font-black">
                      {language === 'ar' ? 'مدير' : 'Admin'}
                    </div>
                  </div>
                  <h2 className="text-2xl font-black text-emerald-900">
                    لوحة الإدارة
                  </h2>
                  <p className="mt-3 text-lg font-semibold leading-8 text-emerald-800">
                    Admin Panel
                  </p>
                </Card>
              </Link>
            )}

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
                        <div className="flex-1">
                          <p className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900">{stat.value}</p>
                          <p className="text-sm md:text-base lg:text-lg text-slate-600 font-bold mb-2">{stat.label}</p>
                          {stat.cta && (
                            <Link href={stat.cta.href}>
                              <Button
                                size="sm"
                                className="h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs mt-1 px-3 py-1"
                              >
                                {stat.cta.label}
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Verification banner for unverified users */}
            {!isFullyActive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <VerificationUpload />
              </motion.div>
            )}

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
                {/* Upcoming Trip */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 md:p-8 border border-slate-200 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 bg-gradient-to-br from-white to-slate-50">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                      {language === 'ar' ? 'رحلتي القادمة' : 'Mon prochain trajet'}
                    </h2>
                    {upcomingTrip ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
                          <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{upcomingTrip.fromPoint}</span>
                          <span className="text-slate-400">→</span>
                          <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <span className="truncate">{upcomingTrip.toDestination}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 font-semibold">
                          <span className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-full">
                            <Calendar className="w-4 h-4 text-emerald-600" />
                            {upcomingTrip.date}
                          </span>
                          <span className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-full">
                            <Clock className="w-4 h-4 text-emerald-600" />
                            {upcomingTrip.time}
                          </span>
                        </div>
                        {upcomingTrip.assignedDriverName && (
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <span className="font-bold">{language === 'ar' ? 'السائق:' : 'Chauffeur :'}</span>
                            <span>{upcomingTrip.assignedDriverName}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full text-sm font-bold border border-emerald-200">
                            {upcomingTrip.vehicleType === 'car' ? '🚗' : upcomingTrip.vehicleType === 'minibus' ? '🚐' : '🚌'}
                            {upcomingTrip.vehicleType === 'car'
                              ? (language === 'ar' ? 'سيارة' : 'Voiture')
                              : upcomingTrip.vehicleType === 'minibus'
                                ? (language === 'ar' ? 'حافلة صغيرة' : 'Mini Bus')
                                : (language === 'ar' ? 'حافلة كبيرة' : 'Bus')}
                          </span>
                          <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                            upcomingTrip.status === 'started'
                              ? 'bg-sky-100 text-sky-700 border-sky-200'
                              : upcomingTrip.status === 'assigned'
                                ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
                                : upcomingTrip.status === 'approved'
                                  ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                  : 'bg-amber-100 text-amber-700 border-amber-200'
                          }`}>
                            {language === 'ar'
                              ? (upcomingTrip.status === 'pending' ? 'قيد الانتظار' : upcomingTrip.status === 'approved' ? 'مقبول' : upcomingTrip.status === 'assigned' ? 'تم تعيين السائق' : upcomingTrip.status === 'started' ? 'جارية' : upcomingTrip.status)
                              : (upcomingTrip.status === 'pending' ? 'En attente' : upcomingTrip.status === 'approved' ? 'Accepté' : upcomingTrip.status === 'assigned' ? 'Chauffeur assigné' : upcomingTrip.status === 'started' ? 'En cours' : upcomingTrip.status)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-slate-500">
                        <Calendar className="w-5 h-5 text-slate-400" />
                        <span className="font-medium">
                          {language === 'ar' ? 'لا توجد رحلة قادمة' : 'Aucun trajet à venir'}
                        </span>
                      </div>
                    )}
                  </Card>
                </motion.div>

                {/* Real bookings from Firestore */}
                <UserBookings />
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
