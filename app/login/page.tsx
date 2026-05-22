'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PhoneOtpAuth } from '@/components/PhoneOtpAuth';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Bus, Shield, CheckCircle2 } from 'lucide-react';

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Auth Form */}
            <div>
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
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
            </div>

            {/* Right Side - Features */}
            <div className="hidden md:block">
              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === 'ar' ? 'لماذا UNIMOVE-DZ؟' : 'Pourquoi UNIMOVE-DZ ?'}
                </h2>
                
                <div className="space-y-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    {language === 'ar' ? 'ليس لديك حساب؟' : 'Vous n\'avez pas de compte ?'}
                  </p>
                  <a
                    href="/register"
                    className="inline-block w-full text-center px-6 py-3 bg-primary hover:bg-secondary text-white font-medium rounded-xl transition-colors"
                  >
                    {language === 'ar' ? 'إنشاء حساب جديد' : 'Créer un compte'}
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
