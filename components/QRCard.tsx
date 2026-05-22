'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { User, MapPin, Calendar, CreditCard, Shield } from 'lucide-react';
import Image from 'next/image';

interface QRCardProps {
  className?: string;
}

export function QRCard({ className }: QRCardProps) {
  const { language } = useLanguage();
  const { user } = useAuth();

  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        {/* Card Content */}
        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">UNIMOVE-DZ</h3>
                <p className="text-white/70 text-sm">
                  {language === 'ar' ? 'بطاقة رقمية' : 'Carte numérique'}
                </p>
              </div>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">{user?.fullName}</h2>
                <p className="text-white/70 text-sm">{user?.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4" />
                <span>{user?.institution}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4" />
                <span>{user?.faculty}</span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${user?.phone}`}
                alt="QR Code"
                width={200}
                height={200}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Card Details */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between text-white/90">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>{language === 'ar' ? 'رقم البطاقة:' : 'N° carte:'}</span>
              </div>
              <span className="font-mono font-bold">{user?.cardNumber}</span>
            </div>
            <div className="flex items-center justify-between text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{language === 'ar' ? 'صالح حتى:' : 'Valide jusqu\'au:'}</span>
              </div>
              <span className="font-bold">{user?.validUntil}</span>
            </div>
          </div>

          {/* Subscription Badge */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-white/70 text-xs mb-1">
              {language === 'ar' ? 'نوع الاشتراك' : 'Type d\'abonnement'}
            </p>
            <p className="text-white font-bold text-lg">
              {language === 'ar' ? 'شهري' : 'Mensuel'}
            </p>
          </div>
        </div>
      </div>

      {/* Attribution */}
      <div className="mt-6 text-center text-xs text-gray-500 space-y-1">
        <p className="font-medium text-gray-700">
          {language === 'ar' ? 'التطوير:' : 'Développement:'}
        </p>
        <p>{language === 'ar' ? 'مشروع UNIMOVE-DZ' : 'Projet UNIMOVE-DZ'}</p>
        <p className="font-medium text-gray-700 mt-2">
          {language === 'ar' ? 'الإشراف الأكاديمي:' : 'Supervision académique:'}
        </p>
        <p>د:رمدوم نورة</p>
      </div>
    </div>
  );
}
