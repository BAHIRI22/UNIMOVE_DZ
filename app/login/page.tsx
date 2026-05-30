'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PhoneOtpAuth } from '@/components/PhoneOtpAuth';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Bus, Shield, CheckCircle2, Zap, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LoginPage() {
  const { language, isRTL } = useLanguage();
  const { loginWithFirebase } = useAuth();
  const router = useRouter();

  const handleAuthSuccess = async (firebaseUser: any) => {
    const rawPhone = firebaseUser.phoneNumber || '';
    // Normalize phone
    const digits = rawPhone.replace(/\D/g, '');
    let normalized = rawPhone;
    if (digits.startsWith('0') && digits.length === 10) {
      normalized = '+213' + digits.slice(1);
    }
    // loginWithFirebase now searches multiple phone formats via findUserByPhone
    const existingUser = await loginWithFirebase(firebaseUser);

    if (existingUser) {
      const role = existingUser.role;
      const verified = existingUser.verified;
      const status = existingUser.status;
      const vStatus = (existingUser as any).verificationStatus;
      const aStatus = (existingUser as any).accountStatus;

      // User found in Firestore; checking role & status

      if (typeof window !== 'undefined') {
        localStorage.setItem('unimove_current_phone', rawPhone);
        localStorage.setItem('unimove_user_role', role || '');
        localStorage.setItem('unimove_current_user', JSON.stringify(existingUser));
      }

      const isAdminRole = role === 'admin';
      const isDriverRole = role === 'driver';
      const isVerified = verified === true || vStatus === 'verified' || aStatus === 'active' || isDriverRole;
      const isApproved = status === 'approved' || aStatus === 'active' || vStatus === 'verified' || isDriverRole;

      if (isAdminRole && isVerified && isApproved) {
        // Redirecting to admin panel
        router.replace('/admin-panel');
      } else if (isDriverRole) {
        // Redirecting to driver dashboard
        router.replace('/driver-dashboard');
      } else {
        // Redirecting to user dashboard
        if (status === 'pending' || vStatus === 'pending') {
          alert(language === 'ar' ? 'حسابك موجود بالفعل وقيد التحقق' : 'Votre compte existe déjà et est en cours de vérification');
        } else if (status === 'rejected' || vStatus === 'rejected') {
          alert(language === 'ar' ? 'تم رفض التحقق سابقاً، يرجى التواصل مع الإدارة أو إعادة رفع الوثائق' : 'Votre vérification a été refusée, veuillez contacter l\'administration ou soumettre à nouveau les documents');
        }
        router.replace('/dashboard');
      }
      return;
    }

    // Redirecting to registration
    router.replace(`/register?phone=${encodeURIComponent(rawPhone)}`);
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-50">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: 3 cards grid */}
          <div className="hidden lg:grid lg:grid-cols-[0.8fr_1fr_1fr] gap-6 items-start">
            
            {/* LEFT CARD - Why UNIMOVE-DZ (smaller) */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 border-0 shadow-2xl bg-white/70 backdrop-blur-xl rounded-3xl h-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === 'ar' ? 'لماذا UNIMOVE-DZ؟' : 'Pourquoi UNIMOVE-DZ ?'}
                </h2>
                
                <div className="space-y-5">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm">{feature.title}</h3>
                          <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-5 border-t border-gray-200/50">
                  <p className="text-xs text-gray-600 mb-3">
                    {language === 'ar' ? 'ليس لديك حساب؟' : 'Vous n\'avez pas de compte ?'}
                  </p>
                  <a
                    href="/register"
                    className="inline-block w-full text-center px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/25 text-sm"
                  >
                    {language === 'ar' ? 'إنشاء حساب جديد' : 'Créer un compte'}
                  </a>
                </div>
              </Card>
            </motion.div>

            {/* CENTER CARD - Promotional Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full"
            >
              <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-emerald-950/90 to-slate-900/90 backdrop-blur-xl rounded-3xl h-full flex flex-col">
                {/* Video Container */}
                <div className="relative flex-1 min-h-[400px] overflow-hidden group">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/videos/UNIMOVEDZ.mp4" type="video/mp4" />
                  </video>
                  
                  {/* Cinematic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/40 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="relative w-[105px] h-[105px] flex-shrink-0">
                          <Image src="/images/udl-logo.jpeg" alt="UDL" fill className="object-contain rounded-md" />
                        </div>
                        <div>
                          <h1 className="text-3xl font-black text-white tracking-tight">
                            UNIMOVE_DZ
                          </h1>
                          <p className="text-emerald-300 text-xs font-bold mt-1">
                            {language === 'ar' ? 'جامعة الجيلالي اليابس سيدي بلعباس' : 'Université Djillali Liabès'}
                          </p>
                        </div>
                      </div>
                      <p className="text-emerald-100 text-sm font-medium mb-4">
                        {language === 'ar' ? 'الجامعة أقرب أسهل و أأمن' : 'L\'université plus proche, plus facile et plus sûre'}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Premium Mini Features */}
                <div className="p-5 bg-gradient-to-r from-emerald-950/50 to-slate-900/50 backdrop-blur-sm">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Zap, label: language === 'ar' ? 'نقل ذكي' : 'Transport intelligent' },
                      { icon: Clock, label: language === 'ar' ? 'خدمة موثوقة' : 'Service fiable' },
                      { icon: Star, label: language === 'ar' ? 'تجربة مميزة' : 'Expérience premium' },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="flex flex-col items-center gap-2 p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"
                        >
                          <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4 text-emerald-400" />
                          </div>
                          <span className="text-xs text-emerald-100 text-center font-medium">
                            {item.label}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* RIGHT CARD - Login OTP (same size as video) */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full"
            >
              <Card className="p-6 border-0 shadow-2xl bg-white/70 backdrop-blur-xl rounded-3xl h-full flex flex-col">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {language === 'ar' ? 'تسجيل الدخول' : 'Connexion'}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' 
                      ? 'أدخل رقم هاتفك للدخول إلى حسابك' 
                      : 'Entrez votre numéro de téléphone pour accéder à votre compte'
                    }
                  </p>
                </div>

                <div className="flex-1">
                  <PhoneOtpAuth
                    mode="login"
                    onAuthSuccess={handleAuthSuccess}
                    onAuthError={handleAuthError}
                  />
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Tablet: Stacked */}
          <div className="hidden md:grid lg:hidden gap-6">
            {/* Login Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-8 border-0 shadow-2xl bg-white/70 backdrop-blur-xl rounded-3xl">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {language === 'ar' ? 'تسجيل الدخول' : 'Connexion'}
                  </h1>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? 'أدخل رقم هاتفك للدخول إلى حسابك' 
                      : 'Entrez votre numéro de téléphone pour accéder à votre compte'
                    }
                  </p>
                </div>
                <PhoneOtpAuth
                  mode="login"
                  onAuthSuccess={handleAuthSuccess}
                  onAuthError={handleAuthError}
                />
              </Card>
            </motion.div>

            {/* Video Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-emerald-950/90 to-slate-900/90 backdrop-blur-xl rounded-3xl">
                <div className="relative h-[300px] overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/videos/UNIMOVEDZ.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative w-[92px] h-[92px] flex-shrink-0">
                        <Image src="/images/udl-logo.jpeg" alt="UDL" fill className="object-contain rounded-md" />
                      </div>
                      <div>
                        <h1 className="text-3xl font-black text-white">UNIMOVE_DZ</h1>
                        <p className="text-emerald-300 text-xs font-bold mt-1">
                          {language === 'ar' ? 'جامعة الجيلالي اليابس سيدي بلعباس' : 'Université Djillali Liabès'}
                        </p>
                      </div>
                    </div>
                    <p className="text-emerald-100 text-sm font-medium">
                      {language === 'ar' ? 'الجامعة أقرب أسهل و أأمن' : 'L\'université plus proche, plus facile et plus sûre'}
                    </p>
                  </div>
                </div>
                <div className="p-5 bg-gradient-to-r from-emerald-950/50 to-slate-900/50 backdrop-blur-sm">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Zap, label: language === 'ar' ? 'نقل ذكي' : 'Transport intelligent' },
                      { icon: Clock, label: language === 'ar' ? 'خدمة موثوقة' : 'Service fiable' },
                      { icon: Star, label: language === 'ar' ? 'تجربة مميزة' : 'Expérience premium' },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-emerald-500/10">
                          <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4 text-emerald-400" />
                          </div>
                          <span className="text-xs text-emerald-100 text-center font-medium">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Why UNIMOVE-DZ Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 border-0 shadow-2xl bg-white/70 backdrop-blur-xl rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === 'ar' ? 'لماذا UNIMOVE-DZ؟' : 'Pourquoi UNIMOVE-DZ ?'}
                </h2>
                <div className="space-y-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200/50">
                  <p className="text-sm text-gray-600 mb-4">
                    {language === 'ar' ? 'ليس لديك حساب؟' : 'Vous n\'avez pas de compte ?'}
                  </p>
                  <a
                    href="/register"
                    className="inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/25"
                  >
                    {language === 'ar' ? 'إنشاء حساب جديد' : 'Créer un compte'}
                  </a>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Mobile: Vertical - Login, Video, Why */}
          <div className="md:hidden space-y-6">
            {/* Login Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 border-0 shadow-2xl bg-white/70 backdrop-blur-xl rounded-3xl">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {language === 'ar' ? 'تسجيل الدخول' : 'Connexion'}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' 
                      ? 'أدخل رقم هاتفك للدخول إلى حسابك' 
                      : 'Entrez votre numéro de téléphone pour accéder à votre compte'
                    }
                  </p>
                </div>
                <PhoneOtpAuth
                  mode="login"
                  onAuthSuccess={handleAuthSuccess}
                  onAuthError={handleAuthError}
                />
              </Card>
            </motion.div>

            {/* Video Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-emerald-950/90 to-slate-900/90 backdrop-blur-xl rounded-3xl">
                <div className="relative h-[250px] overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/videos/UNIMOVEDZ.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="relative w-[73px] h-[73px] flex-shrink-0">
                        <Image src="/images/udl-logo.jpeg" alt="UDL" fill className="object-contain rounded-md" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-black text-white">UNIMOVE_DZ</h1>
                        <p className="text-emerald-300 text-[10px] font-bold mt-0.5">
                          {language === 'ar' ? 'جامعة الجيلالي اليابس' : 'Université Djillali Liabès'}
                        </p>
                      </div>
                    </div>
                    <p className="text-emerald-100 text-xs font-medium">
                      {language === 'ar' ? 'الجامعة أقرب أسهل و أأمن' : 'L\'université plus proche, plus facile et plus sûre'}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-emerald-950/50 to-slate-900/50 backdrop-blur-sm">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: Zap, label: language === 'ar' ? 'نقل ذكي' : 'Transport intelligent' },
                      { icon: Clock, label: language === 'ar' ? 'خدمة موثوقة' : 'Service fiable' },
                      { icon: Star, label: language === 'ar' ? 'تجربة مميزة' : 'Expérience premium' },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-emerald-500/10">
                          <div className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                            <Icon className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                          <span className="text-[10px] text-emerald-100 text-center font-medium">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Why UNIMOVE-DZ Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 border-0 shadow-2xl bg-white/70 backdrop-blur-xl rounded-3xl">
                <h2 className="text-xl font-bold text-gray-900 mb-5">
                  {language === 'ar' ? 'لماذا UNIMOVE-DZ؟' : 'Pourquoi UNIMOVE-DZ ?'}
                </h2>
                <div className="space-y-4">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm">{feature.title}</h3>
                          <p className="text-xs text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-5 border-t border-gray-200/50">
                  <p className="text-xs text-gray-600 mb-3">
                    {language === 'ar' ? 'ليس لديك حساب؟' : 'Vous n\'avez pas de compte ?'}
                  </p>
                  <a
                    href="/register"
                    className="inline-block w-full text-center px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl transition-all text-sm"
                  >
                    {language === 'ar' ? 'إنشاء حساب جديد' : 'Créer un compte'}
                  </a>
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
