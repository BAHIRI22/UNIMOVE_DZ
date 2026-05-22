'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PhoneOtpAuth } from '@/components/PhoneOtpAuth';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Bus, Shield, CheckCircle2, Sparkles, MapPinned, RadioTower } from 'lucide-react';

export default function LoginPage() {
  const { language, isRTL } = useLanguage();
  const { loginWithFirebase } = useAuth();
  const router = useRouter();

  const handleAuthSuccess = async (firebaseUser: any) => {
    // Login with Firebase user
    await loginWithFirebase(firebaseUser, firebaseUser.demoUserData);
    // Redirect to dashboard
    router.push('/dashboard');
  };

  const handleAuthError = (_error: string) => {
  };

  const features = [
    {
      icon: Bus,
      title: language === 'ar' ? 'حجز سهل' : 'Réservation facile',
      description: language === 'ar' 
        ? 'احجز رحلتك بسهولة برقم هاتفك فقط' 
        : 'Réservez votre trajet facilement avec votre numéro de téléphone',
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'آمن وموثوق' : 'Sécurisé et fiable',
      description: language === 'ar' 
        ? 'نظام مصادق آمن بـ OTP' 
        : 'Système d\'authentification sécurisé par OTP',
    },
    {
      icon: CheckCircle2,
      title: language === 'ar' ? 'سريع' : 'Rapide',
      description: language === 'ar' 
        ? 'دخول سريع بدون كلمات مرور معقدة' 
        : 'Connexion rapide sans mots de passe complexes',
    },
  ];

  const videoFeatures = [
    { icon: Bus, label: language === 'ar' ? 'نقل ذكي' : 'Transport intelligent' },
    { icon: MapPinned, label: language === 'ar' ? 'مدينة متصلة' : 'Ville connectée' },
    { icon: RadioTower, label: language === 'ar' ? 'خدمة موثوقة' : 'Service fiable' },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_34%),linear-gradient(135deg,#f8fafc_0%,#ecfdf5_48%,#f8fafc_100%)]">
      <Header />

      <main className="relative flex-1 py-10 md:py-14 lg:py-16">
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-[0.8fr_1fr_1fr] lg:gap-7 xl:gap-8" dir="ltr">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="order-3 md:order-2 lg:order-1"
            >
              <Card dir={isRTL ? 'rtl' : 'ltr'} className="h-full rounded-[2rem] border border-white/60 bg-white/65 p-6 shadow-2xl shadow-emerald-950/10 backdrop-blur-2xl md:p-7 lg:min-h-[620px]">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-2 text-sm font-bold text-emerald-700">
                  <Sparkles className="h-4 w-4" />
                  UNIMOVE-DZ
                </div>
                <h2 className="mb-6 text-2xl font-black text-gray-950">
                  {language === 'ar' ? 'لماذا UNIMOVE-DZ؟' : 'Pourquoi UNIMOVE-DZ ?'}
                </h2>

                <div className="space-y-5">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: isRTL ? 18 : -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.08 }}
                        className="group flex gap-4 rounded-3xl border border-white/70 bg-white/55 p-4 shadow-lg shadow-emerald-950/5 transition hover:-translate-y-1 hover:bg-white/80 hover:shadow-xl"
                      >
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-black text-gray-950">{feature.title}</h3>
                          <p className="text-sm leading-6 text-gray-600">{feature.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-7 border-t border-emerald-100 pt-6">
                  <p className="mb-4 text-sm font-medium text-gray-600">
                    {language === 'ar' ? 'ليس لديك حساب؟' : 'Vous n\'avez pas de compte ?'}
                  </p>
                  <a
                    href="/register"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-3.5 text-center font-black text-white shadow-xl shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-emerald-600/30"
                  >
                    {language === 'ar' ? 'إنشاء حساب جديد' : 'Créer un compte'}
                  </a>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="order-2 md:order-1 lg:order-2"
            >
              <Card dir={isRTL ? 'rtl' : 'ltr'} className="relative h-full overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-slate-950 p-0 shadow-2xl shadow-emerald-950/20 lg:min-h-[620px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.34),transparent_42%)]" />
                <div className="relative z-10 flex h-full flex-col p-5 md:p-6">
                  <div className="mb-5">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-white/10 px-4 py-2 text-xs font-black text-emerald-100 backdrop-blur-xl">
                      <Sparkles className="h-4 w-4 text-emerald-300" />
                      UNIMOVE-DZ
                    </div>
                    <h2 className="text-2xl font-black text-white md:text-3xl">
                      {language === 'ar' ? 'الجامعة أقرب أسهل و أأمن' : 'L’université plus proche, plus simple et plus sûre'}
                    </h2>
                  </div>

                  <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-[1.75rem] border border-white/10 bg-emerald-950 shadow-2xl shadow-emerald-900/30">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster="/images/UNIMOVE_DZ.jpg"
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    >
                      <source src="/videos/UNIMOVEDZ.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-emerald-950/10 to-transparent" />
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {videoFeatures.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur-xl shadow-lg shadow-emerald-500/5">
                          <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/15 shadow-lg shadow-emerald-400/10">
                            <Icon className="h-4 w-4 text-emerald-200" />
                          </div>
                          <p className="text-xs font-black text-white">{item.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="order-1 md:order-3 lg:order-3"
            >
              <Card dir={isRTL ? 'rtl' : 'ltr'} className="h-full rounded-[2rem] border border-white/70 bg-white/78 p-6 shadow-2xl shadow-emerald-950/10 backdrop-blur-2xl md:p-7 lg:min-h-[620px]">
                <div className="mb-8">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">
                    <Shield className="h-4 w-4" />
                    OTP Secure
                  </div>
                  <h1 className="mb-2 text-3xl font-black text-gray-950 md:text-4xl">
                  {language === 'ar' ? 'تسجيل الدخول' : 'Connexion'}
                </h1>
                  <p className="text-sm leading-6 text-gray-600 md:text-base">
                  {language === 'ar' 
                    ? 'أدخل رقم هاتفك للدخول إلى حسابك' 
                    : 'Entrez votre numéro de téléphone pour accéder à votre compte'
                  }
                </p>
              </div>

                <div className="rounded-[1.5rem] border border-emerald-100/80 bg-white/70 p-4 shadow-inner shadow-emerald-950/5">
                  <PhoneOtpAuth
                    mode="login"
                    onAuthSuccess={handleAuthSuccess}
                    onAuthError={handleAuthError}
                  />
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
