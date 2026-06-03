'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { MissionBookingWizard } from '@/components/MissionBookingWizard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle, QrCode, ShieldAlert, Crown, Sparkles, ShieldCheck, Wifi, CreditCard, ArrowRight, GraduationCap, Clock, Bus, Check } from 'lucide-react';
import { ReservationFormData, Reservation } from '@/types/reservation';
import { locations } from '@/mock/routes';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { createNotification } from '@/lib/notifications';

export default function ReservationPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [reservationNumber, setReservationNumber] = useState('');
  const [declinedSub, setDeclinedSub] = useState(false);

  const generateReservationNumber = (): string => {
    return 'RES-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
  };

  const handleReservationSubmit = async (data: {
    tripCategory: string;
    departurePoint: string;
    destination: string;
    date: string;
    time: string;
    vehicleType: 'car' | 'minibus' | 'bus';
    seats: number;
    paymentMethod: string;
    roundTrip: boolean;
    totalPrice: number;
    estimatedDistanceKm: number;
    estimatedTravelTime: number;
    vehicleRecommended: string;
    comfortLevel: string;
    groupBooking: boolean;
    transportNature: string;
    missionType?: string;
    departureDaira?: string;
    departureCommune?: string;
    meetingPoint?: string;
    destinationType?: string;
    destinationName?: string;
  }) => {
    // Block if user is not verified or approved
    const isVerified = user?.verified === true || user?.verificationStatus === 'approved' || user?.verificationStatus === 'verified';
    const isApproved = user?.status === 'approved' || user?.accountStatus === 'active';
    if (!user || !isVerified || !isApproved) {
      alert(language === 'ar' ? 'يجب التحقق من حسابك قبل الحجز' : 'Vous devez vérifier votre compte avant de réserver');
      return;
    }

    const reservationNumber = generateReservationNumber();

    // Persist to Firestore (collection: bookings)
    try {
      const docRef = await addDoc(collection(db, 'bookings'), {
        userId: user.id,
        fullName: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        phoneNumber: user.phoneNumber || user.phone || '',
        role: user.role || 'student',
        fromPoint: data.departurePoint,
        toDestination: data.destination,
        daira: user.daira || '',
        commune: user.commune || '',
        date: data.date,
        time: data.time,
        vehicleType: data.vehicleType,
        passengersCount: data.seats,
        price: data.totalPrice,
        status: 'pending',
        paymentStatus: isSubscriptionActive ? 'paid' : 'unpaid',
        paymentMethod: isSubscriptionActive ? 'free' : (data.paymentMethod || 'cash'),
        reservationNumber,
        createdAt: serverTimestamp(),
        // Phase 10 fields
        tripCategory: data.tripCategory,
        vehicleRecommended: data.vehicleRecommended,
        comfortLevel: data.comfortLevel,
        groupBooking: data.groupBooking,
        estimatedDistanceKm: data.estimatedDistanceKm,
        estimatedTravelTime: data.estimatedTravelTime,
        estimatedPrice: data.totalPrice,
        finalPrice: data.totalPrice,
        roundTrip: data.roundTrip,
        // Phase 17 — Transport Nature
        transportNature: data.transportNature,
        transportNatureLabelAr: data.transportNature === 'individual' ? 'نقل فردي'
          : data.transportNature === 'shared' ? 'نقل مشترك'
          : data.transportNature === 'group' ? 'نقل جماعي'
          : data.transportNature === 'daily_university' ? 'نقل جامعي يومي'
          : data.transportNature === 'private' ? 'نقل خاص'
          : data.transportNature === 'vip' ? 'نقل VIP'
          : data.transportNature === 'night' ? 'نقل ليلي'
          : data.transportNature === 'accessible' ? 'نقل مهيأ لذوي الاحتياجات الخاصة'
          : data.transportNature === 'teacher' ? 'نقل للأساتذة'
          : data.transportNature === 'scientific_event' ? 'نقل للمناسبات العلمية'
          : data.transportNature === 'airport_transfer' ? 'نقل للمطارات'
          : data.transportNature === 'port_transfer' ? 'نقل للموانئ'
          : 'نقل جامعي يومي',
        transportNatureLabelFr: data.transportNature === 'individual' ? 'Individual transport'
          : data.transportNature === 'shared' ? 'Shared transport'
          : data.transportNature === 'group' ? 'Group transport'
          : data.transportNature === 'daily_university' ? 'Daily university shuttle'
          : data.transportNature === 'private' ? 'Private transport'
          : data.transportNature === 'vip' ? 'VIP transport'
          : data.transportNature === 'night' ? 'Night transport'
          : data.transportNature === 'accessible' ? 'Accessible transport'
          : data.transportNature === 'teacher' ? 'Teacher transport'
          : data.transportNature === 'scientific_event' ? 'Scientific event transport'
          : data.transportNature === 'airport_transfer' ? 'Airport transfer'
          : data.transportNature === 'port_transfer' ? 'Port transfer'
          : 'Daily university shuttle',
        // Phase 11 — Smart Mobility Network
        tripType: data.missionType || data.tripCategory,
        missionType: data.missionType || '',
        departureDaira: data.departureDaira || '',
        departureCommune: data.departureCommune || '',
        meetingPoint: data.meetingPoint || '',
        destinationType: data.destinationType || '',
        destinationName: data.destinationName || '',
        driverId: '',
        bookingStatus: 'pending',
        updatedAt: serverTimestamp(),
      });
      console.log('[Reservation] Phase 10 Booking created in Firestore:', reservationNumber);

      // Create booking notification for the user
      await createNotification({
        userId: user.id,
        titleAr: 'تم استلام طلب الرحلة الذكية ⏳',
        titleFr: 'Demande de trajet intelligent reçue ⏳',
        messageAr: `طلب الحجز رقم #${reservationNumber} لرحلتك من ${data.departurePoint} إلى ${data.destination} قيد المراجعة الآن من طرف الإدارة.`,
        messageFr: `Votre demande de trajet #${reservationNumber} de ${data.departurePoint} à ${data.destination} est en cours de validation par l'administration.`,
        type: 'system',
      });

      // If user is NOT subscribed, create pending payment and redirect to secure payments portal
      if (!isSubscriptionActive) {
        const paymentRef = await addDoc(collection(db, 'payments'), {
          paymentId: `PAY-${Date.now()}`,
          userId: user.id,
          fullName: user.fullName || '',
          phoneNumber: user.phone || user.phoneNumber || '',
          relatedType: 'booking',
          relatedId: docRef.id,
          amount: data.totalPrice,
          currency: 'DZD',
          paymentMethod: data.paymentMethod || 'cash',
          paymentStatus: 'pending',
          createdAt: serverTimestamp(),
        });
        console.log('[Reservation] Created pending booking payment:', paymentRef.id);
        import('@/lib/sound').then(({ sound }) => sound.playSuccess());
        router.push(`/payments/${paymentRef.id}`);
        return;
      }

    } catch (e) {
      console.error('[Reservation] Failed to save booking:', e);
      import('@/lib/sound').then(({ sound }) => sound.playError());
      alert(language === 'ar' ? 'تعذر حفظ الحجز' : 'Impossible d\'enregistrer la réservation');
      return;
    }

    import('@/lib/sound').then(({ sound }) => sound.playSuccess());
    setReservationNumber(reservationNumber);
    setShowSuccess(true);
  };

  // Show verification block screen if user is not verified/approved
  const isVerified = user?.verified === true || user?.verificationStatus === 'approved' || user?.verificationStatus === 'verified';
  const isApproved = user?.status === 'approved' || user?.accountStatus === 'active';
  if (user && (!isVerified || !isApproved)) {
    return (
      <DashboardLayout role="user" videoOverlay>
        <div className="max-w-2xl mx-auto">
          <Card className="p-12 border border-amber-200 bg-amber-50 rounded-3xl shadow-2xl">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto">
                <ShieldAlert className="w-10 h-10 text-amber-600" />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                {language === 'ar' ? 'يجب التحقق من حسابك قبل الحجز' : 'Vous devez vérifier votre compte avant de réserver'}
              </h1>
              <p className="text-slate-600">
                {language === 'ar'
                  ? 'حسابك قيد المراجعة من طرف الإدارة'
                  : 'Votre compte est en cours d\'examen par l\'administration'}
              </p>
              <Button onClick={() => router.push('/dashboard')}>
                {language === 'ar' ? 'العودة إلى لوحة التحكم' : 'Retour au tableau de bord'}
              </Button>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (showSuccess) {
    return (
      <DashboardLayout role="user" videoOverlay>
        <div className="max-w-3xl mx-auto">
          <Card className="p-12 border border-slate-200 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl shadow-2xl">
            <div className="text-center space-y-8">
              <div className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle className="w-12 h-12 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                  {language === 'ar' ? 'تم الحجز بنجاح!' : 'Réservation réussie!'}
                </h1>
                <p className="text-xl text-slate-600 leading-8">
                  {language === 'ar'
                    ? 'تم تأكيد حجزك بنجاح'
                    : 'Votre réservation a été confirmée avec succès'}
                </p>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <QrCode className="w-8 h-8 text-emerald-600" />
                  <span className="font-bold text-gray-900 text-2xl">#{reservationNumber}</span>
                </div>
                <p className="text-lg text-slate-600 leading-8">
                  {language === 'ar'
                    ? 'احتفظ برقم الحجز الخاص بك'
                    : 'Conservez votre numéro de réservation'}
                </p>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-emerald-600 hover:text-emerald-700 font-bold text-xl transition-colors"
              >
                {language === 'ar' ? 'حجز رحلة أخرى' : 'Réserver un autre trajet'}
              </button>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const isSubscriptionActive = (user as any)?.subscriptionStatus === 'active';
  const isAr = language === 'ar';

  if (!isSubscriptionActive && !declinedSub) {
    return (
      <DashboardLayout role="user" videoOverlay>
        <div className="max-w-4xl mx-auto space-y-8 py-4">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl animate-bounce">
              <Crown className="w-12 h-12 text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {isAr ? 'وفر لغاية 70% مع باقات UNIMOVE 🎉' : 'Économisez jusqu\'à 70% avec UNIMOVE 🎉'}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {isAr
                ? 'نقترح عليك الاشتراك في باقاتنا الذكية للاستمتاع برحلات مجانية بالكامل، غير محدودة وبميزات حصرية!'
                : 'Nous vous suggérons de vous abonner à nos forfaits intelligents pour profiter de trajets 100% gratuits, illimités et exclusifs !'}
            </p>
          </div>

          {/* Plan Cards Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-emerald-950/40 to-slate-900/40 border border-white/10 rounded-[2rem] space-y-4 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex justify-between items-start">
                <span className="text-xs font-black bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">{isAr ? 'يومي' : 'Journalier'}</span>
                <span className="text-2xl font-black text-emerald-400">100 DA</span>
              </div>
              <p className="text-sm font-semibold text-slate-200">{isAr ? 'مثالي للتجربة والرحلات السريعة' : 'Idéal pour tester ou trajets rapides'}</p>
              <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-white/5">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> {isAr ? 'رحلات غير محدودة لمدة يوم' : 'Trajets illimités pendant 1j'}</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> {isAr ? 'اتصال WiFi مجاني وسريع' : 'Accès WiFi gratuit'}</li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-emerald-950/60 to-teal-950/60 border-2 border-emerald-500/50 rounded-[2rem] space-y-4 relative overflow-hidden shadow-xl shadow-emerald-950/20">
              <span className="absolute top-0 right-0 bg-emerald-500 text-black text-[9px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">{isAr ? 'الأكثر طلباً' : 'Populaire'}</span>
              <div className="flex justify-between items-start">
                <span className="text-xs font-black bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">{isAr ? 'شهري' : 'Mensuel'}</span>
                <span className="text-2xl font-black text-emerald-400">1500 DA</span>
              </div>
              <p className="text-sm font-semibold text-slate-200">{isAr ? 'الخيار الأفضل للطلاب والأساتذة' : 'Meilleur choix pour étudiants & profs'}</p>
              <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-white/5">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> {isAr ? 'رحلات غير محدودة لمدة 30 يوم' : 'Trajets illimités pendant 30j'}</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> {isAr ? 'حجز مقعد مجاني دائم' : 'Réservation gratuite'}</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> {isAr ? 'دعم فني مخصص للطلاب' : 'Support étudiant dédié'}</li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-emerald-950/40 to-slate-900/40 border border-white/10 rounded-[2rem] space-y-4 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex justify-between items-start">
                <span className="text-xs font-black bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">{isAr ? 'سنوي' : 'Annuel'}</span>
                <span className="text-2xl font-black text-emerald-400">10000 DA</span>
              </div>
              <p className="text-sm font-semibold text-slate-200">{isAr ? 'التوفير الأقصى لعام كامل' : 'Économie maximale pour un an'}</p>
              <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-white/5">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> {isAr ? 'رحلات غير محدودة لـ 365 يوم' : 'Trajets illimités pendant 365j'}</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> {isAr ? 'تأمين سفر متكامل مشمول' : 'Assurance voyage incluse'}</li>
              </ul>
            </Card>
          </div>

          {/* Action Buttons */}
          <Card className="p-8 border border-emerald-500/20 bg-black/60 backdrop-blur-md rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold text-white">{isAr ? 'هل تريد الاشتراك الفوري الآن؟' : 'Voulez-vous vous abonner maintenant ?'}</h3>
              <p className="text-sm text-slate-400 mt-1">{isAr ? 'تفعيل فوري وبدء استخدام مجاني للرحلات' : 'Activation immédiate pour voyager gratuitement'}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button
                onClick={() => setDeclinedSub(true)}
                variant="outline"
                className="h-14 px-6 border-white/10 text-white font-bold rounded-2xl hover:bg-white/5"
              >
                {isAr ? 'لا، المتابعة كرحلة فردية' : 'Non, continuer en trajet unique'}
              </Button>
              <Button
                onClick={() => router.push('/subscriptions')}
                className="h-14 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/15"
              >
                <CreditCard className="w-5 h-5" />
                {isAr ? 'نعم، أريد الاشتراك الآن 🎉' : 'Oui, je m\'abonne maintenant 🎉'}
              </Button>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="user" videoOverlay>
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {isAr ? 'حجز رحلة ذكية' : 'Réserver un trajet'}
            </h1>
            <p className="text-xl text-slate-600 leading-8">
              {isAr
                ? isSubscriptionActive
                  ? 'تمتع برحلات مجانية غير محدودة بموجب اشتراكك النشط ✨'
                  : 'اختر الرحلة المناسبة واحجز مقعدك'
                : 'Choisissez votre trajet et réservez votre siège'}
            </p>
          </div>
          <Button variant="outline" onClick={() => window.history.length > 1 ? router.back() : router.push('/dashboard')}>
            {isAr ? 'رجوع' : 'Retour'}
          </Button>
        </div>

        {/* WiFi Info */}
        <Card className="p-6 border border-emerald-200 bg-emerald-50 rounded-3xl shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">
                {isAr ? 'Wi-Fi متاح في جميع الحافلات' : 'Wi-Fi disponible dans tous les bus'}
              </p>
              <p className="text-base text-slate-600">
                {isAr ? 'كلمة المرور:' : 'Mot de passe:'} <span className="font-bold text-emerald-600">UNIMOVE_DZ</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Reservation Form */}
        <MissionBookingWizard onReservationSubmit={handleReservationSubmit} />

        {/* If user does not have subscription (i.e. they declined), show student incentives and reference plans */}
        {!isSubscriptionActive && (
          <div className="space-y-8 pt-6">
            {/* Student Incentives Card */}
            <Card className="p-8 border-2 border-emerald-500/35 bg-slate-950/95 shadow-2xl rounded-[2.5rem] space-y-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-10 h-10 text-emerald-400 shrink-0" />
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-white">{isAr ? 'لماذا يشترك الطلبة في باقات UNIMOVE؟ 🎓' : 'Pourquoi les étudiants s\'abonnent à UNIMOVE ? 🎓'}</h3>
                  <p className="text-emerald-300 text-sm md:text-base font-bold mt-0.5">{isAr ? 'مزايا حصرية ومحفزات مخصصة لمسارك الجامعي' : 'Incitations exclusives pour votre parcours universitaire'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-100 font-semibold leading-relaxed">
                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white text-base font-black">{isAr ? 'أمان جامعي كامل وموثق' : 'Sécurité universitaire totale'}</h4>
                    <p className="text-xs md:text-sm text-slate-200 font-bold mt-1 leading-relaxed">{isAr ? 'حافلات مؤمنة ومراقبة بالكاميرات مع تتبع حي لضمان سلامة وصولك للحرم الجامعي.' : 'Bus sécurisés avec suivi GPS en direct pour votre sérénité.'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <Wifi className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white text-base font-black">{isAr ? 'اتصال إنترنت WiFi فائق السرعة مجاناً' : 'Connexion WiFi haut débit'}</h4>
                    <p className="text-xs md:text-sm text-slate-200 font-bold mt-1 leading-relaxed">{isAr ? 'تابع دروسك، أبحاثك ومشاريعك أثناء الطريق مع إنترنت مجاني غير محدود في جميع حافلاتنا.' : 'Étudiez en chemin grâce à notre connexion internet gratuite.'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <Sparkles className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white text-base font-black">{isAr ? 'أولوية الصعود التام' : 'Embarquement prioritaire'}</h4>
                    <p className="text-xs md:text-sm text-slate-200 font-bold mt-1 leading-relaxed">{isAr ? 'لا مزيد من الطوابير والانتظار! امسح الرمز الخاص بك من هاتفك واصعد فوراً للمقعد المفضل.' : 'Pas d\'attente. Scannez votre QR code et montez directement.'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <Clock className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white text-base font-black">{isAr ? 'انضباط تام وجداول دقيقة' : 'Ponctualité garantie'}</h4>
                    <p className="text-xs md:text-sm text-slate-200 font-bold mt-1 leading-relaxed">{isAr ? 'مواعيد رحلات منسقة بدقة متناهية مع أوقات المحاضرات والامتحانات بجامعة الجيلالي اليابس.' : 'Horaires calqués sur vos cours et examens.'}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Plans reference card */}
            <Card className="p-8 border-2 border-white/10 bg-slate-950/95 shadow-2xl rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-right">
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-black uppercase tracking-wider block w-fit mb-1 mx-auto md:mx-0">
                  {isAr ? 'توفير فوري متاح' : 'Économie disponible'}
                </span>
                <h3 className="text-lg font-bold text-white">{isAr ? 'هل غيرت رأيك وتريد تفعيل الاشتراك؟' : 'Avez-vous changé d\'avis pour un abonnement ?'}</h3>
                <p className="text-xs text-slate-400">{isAr ? 'اشتراك شهري بـ 1500 دج فقط يمنحك رحلات مجانية تماماً بلا أي دفعات إضافية' : 'Un abonnement mensuel à 1500 DA vous offre des trajets illimités gratuits'}</p>
              </div>
              <Button
                onClick={() => router.push('/subscriptions')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 h-12 rounded-xl"
              >
                {isAr ? 'عرض خطط الاشتراك 💳' : 'Voir les forfaits 💳'}
              </Button>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
