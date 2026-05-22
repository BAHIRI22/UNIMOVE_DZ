'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Bus,
  Car,
  Wifi,
  CheckCircle,
  XCircle,
  AlertCircle,
  QrCode,
  Star
} from 'lucide-react';
import { Reservation, ReservationStatus } from '@/types/reservation';

interface TripCardProps {
  reservation: Reservation;
  showQR?: boolean;
}

export function TripCard({ reservation, showQR = false }: TripCardProps) {
  const { language } = useLanguage();

  const getStatusColor = (status: ReservationStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: ReservationStatus) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: ReservationStatus) => {
    const labels = {
      ar: {
        confirmed: 'مؤكد',
        completed: 'مكتمل',
        cancelled: 'ملغي',
        pending: 'قيد الانتظار',
      },
      fr: {
        confirmed: 'Confirmé',
        completed: 'Terminé',
        cancelled: 'Annulé',
        pending: 'En attente',
      },
    };
    return labels[language][status];
  };

  const getPaymentStatusLabel = (status: string) => {
    const labels = {
      ar: {
        paid: 'مدفوع',
        pending: 'قيد الانتظار',
        failed: 'فشل',
      },
      fr: {
        paid: 'Payé',
        pending: 'En attente',
        failed: 'Échec',
      },
    };
    return labels[language][status as keyof typeof labels.ar] || status;
  };

  const getVehicleIcon = (type: string) => {
    return type === 'car' ? Car : Bus;
  };

  const VehicleIcon = getVehicleIcon(reservation.vehicle.type);

  return (
    <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-gray-900">#{reservation.reservationNumber}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(reservation.status)}`}>
                <div className="flex items-center gap-1">
                  {getStatusIcon(reservation.status)}
                  <span>{getStatusLabel(reservation.status)}</span>
                </div>
              </span>
            </div>
            <h3 className="font-bold text-lg text-gray-900">
              {language === 'ar' ? reservation.route.nameAr : reservation.route.name}
            </h3>
          </div>
          {showQR && (
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
          )}
        </div>

        {/* Route */}
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{language === 'ar' ? reservation.departurePoint.nameAr : reservation.departurePoint.name}</span>
          </div>
          <span className="text-gray-400">→</span>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{language === 'ar' ? reservation.destination.nameAr : reservation.destination.name}</span>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{reservation.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{reservation.time}</span>
          </div>
        </div>

        {/* Vehicle and Driver */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <VehicleIcon className="w-4 h-4" />
            <span>{language === 'ar' ? reservation.vehicle.type : reservation.vehicle.type}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span>{reservation.seats} {language === 'ar' ? 'مقعد' : 'siège(s)'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{reservation.vehicle.driver.name}</span>
          </div>
        </div>

        {/* WiFi */}
        {reservation.vehicle.features.wifi && (
          <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded-lg">
            <Wifi className="w-4 h-4" />
            <span>
              {language === 'ar' ? 'Wi-Fi:' : 'Wi-Fi:'} {reservation.vehicle.features.wifiPassword}
            </span>
          </div>
        )}

        {/* Price and Payment */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-2xl font-bold text-primary">{reservation.totalPrice} DA</p>
            <p className="text-xs text-gray-500">
              {language === 'ar' ? 'حالة الدفع:' : 'Statut paiement:'} {getPaymentStatusLabel(reservation.paymentStatus)}
            </p>
          </div>
          {reservation.status === 'confirmed' && (
            <Button variant="outline" size="sm">
              {language === 'ar' ? 'عرض QR' : 'Voir QR'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
