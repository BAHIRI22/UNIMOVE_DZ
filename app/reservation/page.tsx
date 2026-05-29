'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { SmartReservationForm } from '@/components/SmartReservationForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle, QrCode, ShieldAlert } from 'lucide-react';
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
      await addDoc(collection(db, 'bookings'), {
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
        paymentStatus: 'unpaid',
        paymentMethod: data.paymentMethod || 'cash',
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

    } catch (e) {
      console.error('[Reservation] Failed to save booking:', e);
      alert(language === 'ar' ? 'تعذر حفظ الحجز' : 'Impossible d\'enregistrer la réservation');
      return;
    }

    setReservationNumber(reservationNumber);
    setShowSuccess(true);
  };

  // Show verification block screen if user is not verified/approved
  const isVerified = user?.verified === true || user?.verificationStatus === 'approved' || user?.verificationStatus === 'verified';
  const isApproved = user?.status === 'approved' || user?.accountStatus === 'active';
  if (user && (!isVerified || !isApproved)) {
    return (
      <DashboardLayout role="user">
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
      <DashboardLayout role="user">
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

  return (
    <DashboardLayout role="user">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {language === 'ar' ? 'حجز رحلة' : 'Réserver un trajet'}
          </h1>
          <p className="text-xl text-slate-600 leading-8">
            {language === 'ar'
              ? 'اختر الرحلة المناسبة واحجز مقعدك'
              : 'Choisissez votre trajet et réservez votre siège'}
          </p>
          </div>
          <Button variant="outline" onClick={() => window.history.length > 1 ? router.back() : router.push('/dashboard')}>
            {language === 'ar' ? 'رجوع' : 'Retour'}
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
                {language === 'ar' ? 'Wi-Fi متاح في جميع الحافلات' : 'Wi-Fi disponible dans tous les bus'}
              </p>
              <p className="text-base text-slate-600">
                {language === 'ar' ? 'كلمة المرور:' : 'Mot de passe:'} <span className="font-bold text-emerald-600">UNIMOVE_DZ</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Reservation Form */}
        <SmartReservationForm onReservationSubmit={handleReservationSubmit} />
      </div>
    </DashboardLayout>
  );
}
