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
  CheckCircle,
  XCircle,
  AlertCircle,
  QrCode,
} from 'lucide-react';

export type BookingStatus =
  | 'pending'
  | 'approved'
  | 'assigned'
  | 'started'
  | 'completed'
  | 'cancelled'
  | 'rejected';

export interface Booking {
  id: string;
  reservationNumber: string;
  userId: string;
  fromPoint: string;
  toDestination: string;
  date: string;
  time: string;
  vehicleType: string;
  passengersCount: number;
  price: number;
  status: BookingStatus;
  paymentStatus: string;
  createdAt?: any;
}

interface BookingCardProps {
  booking: Booking;
  showQR?: boolean;
}

export function BookingCard({ booking, showQR = false }: BookingCardProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'approved':
      case 'assigned':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'started':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pending':
      default:
        return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'approved':
      case 'assigned':
      case 'started':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: BookingStatus) => {
    const labels: Record<string, Record<BookingStatus, string>> = {
      ar: {
        pending: 'قيد الانتظار',
        approved: 'تمت الموافقة',
        assigned: 'تم التعيين',
        started: 'في التنقل',
        completed: 'مكتمل',
        cancelled: 'ملغى',
        rejected: 'مرفوض',
      },
      fr: {
        pending: 'En attente',
        approved: 'Approuvé',
        assigned: 'Assigné',
        started: 'En cours',
        completed: 'Terminé',
        cancelled: 'Annulé',
        rejected: 'Rejeté',
      },
    };
    return labels[isAr ? 'ar' : 'fr'][status] || status;
  };

  const getPaymentStatusLabel = (status: string) => {
    const labels: Record<string, Record<string, string>> = {
      ar: {
        paid: 'مدفوع',
        unpaid: 'غير مدفوع',
        pending: 'قيد الانتظار',
        failed: 'فشل',
      },
      fr: {
        paid: 'Payé',
        unpaid: 'Non payé',
        pending: 'En attente',
        failed: 'Échec',
      },
    };
    return labels[isAr ? 'ar' : 'fr'][status] || status;
  };

  const VehicleIcon = booking.vehicleType === 'car' ? Car : Bus;

  const isActive =
    showQR &&
    (booking.status === 'approved' ||
      booking.status === 'assigned' ||
      booking.status === 'started');

  return (
    <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="font-bold text-gray-900">
                #{booking.reservationNumber}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  booking.status
                )}`}
              >
                <div className="flex items-center gap-1">
                  {getStatusIcon(booking.status)}
                  <span>{getStatusLabel(booking.status)}</span>
                </div>
              </span>
            </div>
            <h3 className="font-bold text-lg text-gray-900">
              {booking.fromPoint} → {booking.toDestination}
            </h3>
          </div>
          {isActive && (
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
          )}
        </div>

        {/* Route */}
        <div className="flex items-center gap-3 text-sm flex-wrap">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{booking.fromPoint}</span>
          </div>
          <span className="text-gray-400">→</span>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{booking.toDestination}</span>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-center gap-4 text-sm flex-wrap">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{booking.time}</span>
          </div>
        </div>

        {/* Vehicle and Passengers */}
        <div className="flex items-center gap-4 text-sm flex-wrap">
          <div className="flex items-center gap-2 text-gray-600">
            <VehicleIcon className="w-4 h-4" />
            <span>
              {isAr
                ? booking.vehicleType === 'car'
                  ? 'سيارة'
                  : booking.vehicleType === 'minibus'
                  ? 'ميني باص'
                  : 'حافلة'
                : booking.vehicleType}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span>
              {booking.passengersCount}{' '}
              {isAr ? 'مسافر' : 'passager(s)'}
            </span>
          </div>
        </div>

        {/* Price and Payment */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-2xl font-bold text-primary">
              {booking.price} DA
            </p>
            <p className="text-xs text-gray-500">
              {isAr ? 'حالة الدفع:' : 'Statut paiement:'}{' '}
              {getPaymentStatusLabel(booking.paymentStatus)}
            </p>
          </div>
          {isActive && (
            <Button variant="outline" size="sm">
              {isAr ? 'عرض QR' : 'Voir QR'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
