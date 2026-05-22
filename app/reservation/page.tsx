'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { SmartReservationForm } from '@/components/SmartReservationForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle, QrCode } from 'lucide-react';
import { ReservationFormData, Reservation } from '@/types/reservation';
import { locations } from '@/mock/routes';

export default function ReservationPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const [reservationNumber, setReservationNumber] = useState('');

  const generateReservationNumber = (): string => {
    return 'RES-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
  };

  const handleReservationSubmit = async (data: ReservationFormData & { totalPrice: number; selectedRoute: any; selectedVehicle: any }) => {
    // Create reservation object
    const reservation: Reservation = {
      id: Date.now().toString(),
      reservationNumber: generateReservationNumber(),
      userId: user?.id || 'user-1',
      route: data.selectedRoute,
      vehicle: data.selectedVehicle,
      departurePoint: locations.find(l => l.id === data.departurePoint)!,
      destination: locations.find(l => l.id === data.destination)!,
      date: data.date,
      time: data.time,
      seats: data.seats,
      totalPrice: data.totalPrice,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentMethod === 'subscription' ? 'paid' : 'pending',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${generateReservationNumber()}`,
    };

    // Save to localStorage
    const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    existingReservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(existingReservations));

    // Show success
    setReservationNumber(reservation.reservationNumber);
    setShowSuccess(true);
  };

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
