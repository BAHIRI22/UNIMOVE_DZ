'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { QRCodeDisplay } from '@/components/QRCodeDisplay';
import { UserCard } from '@/types/user-card';
import { Shield, CheckCircle, Calendar, CreditCard, User, MapPin, Phone, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface DigitalCardProps {
  userCard: UserCard;
  onDownload?: () => void;
  onPrint?: () => void;
}

const safeText = (value: any): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (value?.toDate) return value.toDate().toLocaleDateString('ar-DZ');
  if (value?.seconds) return new Date(value.seconds * 1000).toLocaleDateString('ar-DZ');
  return '';
};

export function DigitalCard({ userCard, onDownload, onPrint }: DigitalCardProps) {
  const { language } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  const getUserTypeLabel = (type: string) => {
    return language === 'ar' ? safeText(userCard.userTypeAr) : safeText(type);
  };

  const getSubscriptionLabel = (type: string) => {
    return language === 'ar' ? safeText(userCard.subscriptionTypeAr) : safeText(type);
  };

  const displayedName = safeText(language === 'ar' ? userCard.fullNameAr : userCard.fullName);
  const displayedUniversity = safeText(language === 'ar' ? userCard.universityAr : userCard.university);
  const displayedFaculty = safeText(language === 'ar' ? userCard.facultyAr : userCard.faculty);
  const displayedPhone = safeText(userCard.phone);
  const displayedCardNumber = safeText(userCard.cardNumber);
  const displayedValidFrom = safeText(userCard.validFrom);
  const displayedValidUntil = safeText(userCard.validUntil);
  const displayedQrData = safeText(userCard.qrData);

  return (
    <div ref={cardRef} className="w-full max-w-2xl mx-auto">
      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300">
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <Image src="/images/udl-logo.jpeg" alt="" fill className="object-contain" />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        {/* UDL Corner Logo */}
        <div className="absolute top-3 right-3 md:top-5 md:right-5 z-20 flex flex-col items-center gap-1">
          <div className="relative w-12 h-12 md:w-14 md:h-14">
            <Image src="/images/udl-logo.jpeg" alt="UDL" fill className="object-contain rounded-md" />
          </div>
          <span className="text-white/50 text-[9px] font-bold hidden md:block">Université Djillali Liabès</span>
        </div>

        {/* Card Content */}
        <div className="relative z-10 space-y-6 md:space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center">
                <User className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-white font-black text-lg md:text-xl lg:text-2xl">UNIMOVE-DZ</h3>
                <p className="text-white/70 text-xs md:text-sm lg:text-base font-medium">
                  {language === 'ar' ? 'الجامعة أقرب، أسهل، و أأمن' : 'L\'université plus proche, plus facile et plus sûre'}
                </p>
              </div>
            </div>
            {userCard.isVerified && (
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="space-y-4 md:space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                <User className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-white font-black text-xl md:text-2xl lg:text-3xl">{displayedName}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-white/80 text-sm md:text-base font-medium">{getUserTypeLabel(userCard.userType)}</span>
                  {userCard.isVerified && (
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-300" />
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2 md:gap-3 text-white/90">
                <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium">{displayedUniversity}</span>
              </div>
              {displayedFaculty && (
                <div className="flex items-center gap-2 md:gap-3 text-white/90">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">{displayedFaculty}</span>
                </div>
              )}
              <div className="flex items-center gap-2 md:gap-3 text-white/90">
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium">{displayedPhone}</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-white/90">
                <User className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-mono font-medium">#{displayedCardNumber}</span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <motion.div
            className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl flex justify-center relative"
            animate={{
              boxShadow: [
                '0 0 0px rgba(16, 185, 129, 0)',
                '0 0 20px rgba(16, 185, 129, 0.3)',
                '0 0 0px rgba(16, 185, 129, 0)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <QRCodeDisplay value={displayedQrData} size={160} />
          </motion.div>

          {/* Card Details */}
          <div className="space-y-3 md:space-y-4 text-sm md:text-base">
            <div className="flex items-center justify-between text-white/90">
              <div className="flex items-center gap-2 md:gap-3">
                <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium">{language === 'ar' ? 'نوع الاشتراك:' : 'Type d\'abonnement:'}</span>
              </div>
              <span className="font-black text-base md:text-lg">{getSubscriptionLabel(userCard.subscriptionType)}</span>
            </div>
            <div className="flex items-center justify-between text-white/90">
              <div className="flex items-center gap-2 md:gap-3">
                <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium">{language === 'ar' ? 'صالح من:' : 'Valide du:'}</span>
              </div>
              <span className="font-black text-base md:text-lg">{displayedValidFrom}</span>
            </div>
            <div className="flex items-center justify-between text-white/90">
              <div className="flex items-center gap-2 md:gap-3">
                <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium">{language === 'ar' ? 'صالح حتى:' : 'Valide jusqu\'au:'}</span>
              </div>
              <span className="font-black text-base md:text-lg">{displayedValidUntil}</span>
            </div>
          </div>

          {/* Subscription Badge */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 text-center">
            <p className="text-white/70 text-xs md:text-sm mb-2 font-medium">
              {language === 'ar' ? 'حالة الاشتراك' : 'Statut d\'abonnement'}
            </p>
            <p className="text-white font-black text-xl md:text-2xl">
              {language === 'ar' ? 'نشط' : 'Actif'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8">
        <Button
          onClick={onDownload}
          variant="outline"
          className="flex-1 flex items-center justify-center gap-3 h-14 md:h-16 text-base md:text-xl font-bold rounded-2xl border-2 hover:border-emerald-500 transition-all duration-300 hover:scale-105"
        >
          <Download className="w-5 h-5 md:w-6 md:h-6" />
          {language === 'ar' ? 'تحميل' : 'Télécharger'}
        </Button>
        <Button
          onClick={onPrint}
          variant="outline"
          className="flex-1 flex items-center justify-center gap-3 h-14 md:h-16 text-base md:text-xl font-bold rounded-2xl border-2 hover:border-emerald-500 transition-all duration-300 hover:scale-105"
        >
          <Printer className="w-5 h-5 md:w-6 md:h-6" />
          {language === 'ar' ? 'طباعة' : 'Imprimer'}
        </Button>
      </div>
    </div>
  );
}
