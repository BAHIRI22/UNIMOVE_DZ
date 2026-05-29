'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import QRCode from 'react-qr-code';
import { Download, Eye, EyeOff, Wifi, ShieldCheck, Smartphone, Radio, Lock, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function MembershipCard() {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [showQR, setShowQR] = useState(false);
  const router = useRouter();

  if (!user) return null;

  const isVerified = user.verified === true || (user as any).verificationStatus === 'approved' || (user as any).verificationStatus === 'verified';

  if (!isVerified) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('dashboard.myCard')}</h2>
        <div className="relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-[2rem] p-10 text-white shadow-2xl overflow-hidden border border-white/10">
          <div className="flex flex-col items-center justify-center text-center space-y-5 py-10">
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <Lock className="w-10 h-10 text-amber-300" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold">
              {language === 'ar' ? 'حسابك في انتظار التحقق' : 'Votre compte est en attente de vérification'}
            </h3>
            <p className="text-base md:text-lg opacity-90 max-w-sm">
              {language === 'ar'
                ? 'بطاقتك الرقمية ستظهر بعد موافقة الإدارة على وثيقة التحقق.'
                : 'Votre carte numérique apparaîtra après validation de votre document par l’administration.'}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-300/15 px-4 py-2 text-sm font-bold text-amber-100">
              {language === 'ar' ? 'في انتظار التحقق' : 'En attente de vérification'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isSubscriptionActive =
    user.subscriptionStatus === 'active' &&
    user.subscriptionEndDate &&
    new Date(user.subscriptionEndDate) > new Date();

  if (!isSubscriptionActive) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('dashboard.myCard')}</h2>
        <div className="relative bg-gradient-to-br from-slate-800 via-emerald-950 to-slate-900 rounded-[2rem] p-8 md:p-10 text-white shadow-2xl overflow-hidden border border-white/10">
          <div className="flex flex-col items-center justify-center text-center space-y-5 py-8">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <CreditCard className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-red-200">
              {language === 'ar' ? 'الاشتراك غير نشط' : 'Abonnement Inactif'}
            </h3>
            <p className="text-sm md:text-base opacity-90 max-w-xs leading-6 text-center">
              {language === 'ar'
                ? 'يرجى اختيار اشتراك لتفعيل البطاقة الرقمية والتمكن من حجز الرحلات.'
                : 'Veuillez choisir un abonnement pour activer votre carte numérique et réserver des trajets.'}
            </p>
            <Button
              onClick={() => router.push('/subscriptions')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              {language === 'ar' ? 'اختيار اشتراك' : 'Choisir un abonnement'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const downloadCard = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `unimove-card-${user.cardNumber}.png`;
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('dashboard.myCard')}</h2>

      {/* Card */}
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative bg-gradient-to-br from-slate-950 via-emerald-950 to-emerald-700 rounded-[2rem] p-8 md:p-10 text-white shadow-2xl hover:shadow-3xl hover:shadow-emerald-500/30 transition-all duration-500 overflow-hidden border border-white/10">
          {/* Animated Glow Effect */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />

          <div className="relative space-y-8">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-black opacity-90">UNIMOVE-DZ</div>
                <div className="text-sm opacity-70">{language === 'ar' ? 'بطاقة نقل رقمية' : 'Carte transport digitale'}</div>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-black text-emerald-100">
                  <Radio className="h-3 w-3" />
                  {language === 'ar' ? 'اشتراك نشط' : 'Abonnement actif'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-70">{language === 'ar' ? 'صالحة حتى' : 'Valide jusqu\'au'}</div>
                <div className="font-semibold text-sm">{user.validUntil}</div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-xl">
                    <Wifi className="mb-2 h-4 w-4 text-emerald-200" />
                    <p className="text-xs font-bold">Wi-Fi</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-xl">
                    <ShieldCheck className="mb-2 h-4 w-4 text-emerald-200" />
                    <p className="text-xs font-bold">{language === 'ar' ? 'آمن' : 'Secure'}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-xl">
                    <Smartphone className="mb-2 h-4 w-4 text-emerald-200" />
                    <p className="text-xs font-bold">NFC</p>
                  </div>
                </div>
                <div>
                  <div className="text-xs opacity-90">{language === 'ar' ? 'رقم البطاقة' : 'Numéro de carte'}</div>
                  <div className="font-mono font-bold text-xl md:text-2xl tracking-widest">
                    {user.cardNumber}
                  </div>
                </div>

                <div>
                  <div className="text-xs opacity-90">{language === 'ar' ? 'الاسم' : 'Nom'}</div>
                  <div className="font-semibold text-lg md:text-xl">{user.fullName}</div>
                </div>

                <div>
                  <div className="text-xs opacity-90">{language === 'ar' ? 'الجامعة' : 'Université'}</div>
                  <div className="text-sm md:text-base">{user.institution}</div>
                </div>

                <div>
                  <div className="text-xs opacity-90">{language === 'ar' ? 'نوع الاشتراك' : 'Type d\'abonnement'}</div>
                  <div className="text-sm md:text-base capitalize font-semibold">
                    {language === 'ar'
                      ? user.subscription === 'daily'
                        ? 'يومي'
                        : user.subscription === 'weekly'
                        ? 'أسبوعي'
                        : 'شهري'
                      : user.subscription === 'daily'
                      ? 'Quotidien'
                      : user.subscription === 'weekly'
                      ? 'Hebdomadaire'
                      : 'Mensuel'}
                  </div>
                </div>
              </div>

              {/* Right: QR Code */}
              <div className="flex flex-col items-center justify-center gap-4">
                {showQR ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-4 rounded-2xl shadow-xl ring-4 ring-emerald-300/30"
                  >
                    <QRCode value={user.qrCode || user.cardNumber} size={160} />
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowQR(true)}
                    className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm flex items-center justify-center h-40 w-40 cursor-pointer hover:bg-white/30 transition-all duration-300"
                  >
                    <div className="text-center">
                      <div className="text-2xl opacity-80">QR</div>
                      <div className="text-xs opacity-80 mt-2">
                        {language === 'ar' ? 'انقر لإظهار' : 'Cliquer pour afficher'}
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQR(!showQR)}
                  className="text-sm opacity-90 hover:opacity-100 flex items-center gap-2 transition-all duration-300"
                >
                  {showQR ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      {language === 'ar' ? 'إخفاء' : 'Masquer'}
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      {language === 'ar' ? 'إظهار' : 'Afficher'}
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Download Button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={downloadCard}
          variant="outline"
          className="w-full h-14 md:h-16 text-base md:text-lg font-bold rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-500"
        >
          <Download className="w-5 h-5 md:w-6 md:h-6 mr-2" />
          {language === 'ar' ? 'تحميل البطاقة' : 'Télécharger la carte'}
        </Button>
      </motion.div>
    </div>
  );
}
