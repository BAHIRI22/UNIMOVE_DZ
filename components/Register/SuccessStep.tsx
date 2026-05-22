'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import QRCode from 'react-qr-code';

interface SuccessStepProps {
  cardNumber: string;
  qrCode: string;
  validUntil: string;
}

export function SuccessStep({ cardNumber, qrCode, validUntil }: SuccessStepProps) {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex justify-center mb-8">
        <div className="p-6 rounded-full bg-emerald-100">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 text-center">
          {t('register.success')}
        </h2>
        <p className="text-lg text-gray-600 text-center font-medium">
          {language === 'ar'
            ? 'تم تسجيل حسابك بنجاح! إليك بطاقتك الرقمية'
            : 'Votre compte a été créé avec succès! Voici votre carte numérique'}
        </p>
      </div>

      {/* Digital Membership Card */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-8 md:p-10 text-white shadow-lg">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <div className="text-lg font-bold opacity-90">Unimove DZ</div>
              <div className="text-base opacity-70 font-medium">Member Card</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-70 font-medium">Valid Until</div>
              <div className="font-black text-lg">{validUntil}</div>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <QRCode value={qrCode || cardNumber} size={160} />
            </div>
          </div>

          {/* Card Details */}
          <div className="space-y-4">
            <div>
              <div className="text-sm opacity-80 font-medium">Card Number</div>
              <div className="font-mono font-black text-2xl tracking-widest">
                {cardNumber}
              </div>
            </div>

            {user && (
              <>
                <div>
                  <div className="text-sm opacity-80 font-medium">Name</div>
                  <div className="font-black text-xl">{user.fullName}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80 font-medium">Institution</div>
                  <div className="text-base font-medium">{user.institution}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 md:p-8 shadow-md">
        <h3 className="font-black text-xl text-gray-900 mb-5">
          {language === 'ar' ? 'الخطوات التالية' : 'Étapes suivantes'}
        </h3>
        <ul className="space-y-4 text-base text-gray-700 font-medium">
          <li className="flex gap-3">
            <span className="font-black text-emerald-600 text-lg">1.</span>
            <span>
              {language === 'ar'
                ? 'احتفظ بقم البطاقة في مكان آمن'
                : 'Conservez votre numéro de carte en sécurité'}
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-black text-emerald-600 text-lg">2.</span>
            <span>
              {language === 'ar'
                ? 'استخدم رمز QR للدخول الى حسابك'
                : 'Utilisez le code QR pour accéder à votre compte'}
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-black text-emerald-600 text-lg">3.</span>
            <span>
              {language === 'ar'
                ? 'حجز أولى رحلتك من لوحة التحكم'
                : 'Réservez votre premier trajet à partir du tableau de bord'}
            </span>
          </li>
        </ul>
      </div>

      <Button
        size="lg"
        asChild
        className="w-full h-16 text-xl font-black rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
      >
        <Link href="/dashboard">
          {language === 'ar' ? 'اذهب إلى لوحة التحكم' : 'Aller au tableau de bord'}
        </Link>
      </Button>
    </div>
  );
}
