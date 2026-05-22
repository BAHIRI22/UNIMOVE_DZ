'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { auth } from '@/lib/firebase';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier,
  ConfirmationResult 
} from 'firebase/auth';
import { Phone, Shield, CheckCircle2, AlertCircle, Loader2, BadgeCheck } from 'lucide-react';

// TypeScript global declaration for window.recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

interface PhoneOtpAuthProps {
  onAuthSuccess?: (user: any) => void;
  onAuthError?: (error: string) => void;
  mode?: 'login' | 'register';
}

export function PhoneOtpAuth({ onAuthSuccess, onAuthError, mode = 'login' }: PhoneOtpAuthProps) {
  const { language } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);

  const DEMO_OTP_CODE = '123456';
  const ENABLE_REAL_FIREBASE_SMS = false;
  const DEMO_USERS: Record<string, { role: 'student' | 'teacher' | 'admin' | 'driver'; fullName: string; labelFr: string; labelAr: string }> = {
    '0600000000': { role: 'student', fullName: 'Demo Student', labelFr: 'Étudiant', labelAr: 'طالب' },
    '660000001': { role: 'student', fullName: 'Demo Étudiant', labelFr: 'Étudiant', labelAr: 'طالب' },
    '770000004': { role: 'teacher', fullName: 'Demo Enseignant', labelFr: 'Enseignant', labelAr: 'أستاذ' },
    '12345678': { role: 'admin', fullName: 'Demo Administrateur', labelFr: 'Administrateur', labelAr: 'مدير' },
    '+213770000004': { role: 'driver', fullName: 'Demo Chauffeur', labelFr: 'Chauffeur', labelAr: 'سائق' },
  };
  // Algerian phone number normalization
  const normalizeAlgerianPhone = (input: string): string | null => {
    const cleaned = input.replace(/\s+/g, '').replace(/-/g, '');

    // Already in international format
    if (/^\+213[5-7][0-9]{8}$/.test(cleaned)) {
      return cleaned;
    }

    // Local format starting with 0
    if (/^0[5-7][0-9]{8}$/.test(cleaned)) {
      return '+213' + cleaned.substring(1);
    }

    return null;
  };

  const normalizedCurrentPhone = normalizeAlgerianPhone(phoneNumber);
  const demoUser = normalizedCurrentPhone ? DEMO_USERS[normalizedCurrentPhone] : null;
  const isDemoMode = Boolean(demoUser);

  // Setup reCAPTCHA verifier
  const setupRecaptcha = (): RecaptchaVerifier | null => {
    if (typeof window === 'undefined') return null;

    try {
      // Reuse existing verifier if available
      if (window.recaptchaVerifier) {
        console.log('Reusing existing reCAPTCHA verifier');
        return window.recaptchaVerifier;
      }

      const container = document.getElementById('recaptcha-container');
      if (!container) {
        console.error('reCAPTCHA container not found');
        return null;
      }

      console.log('Creating new reCAPTCHA verifier');
      const verifier = new RecaptchaVerifier(auth, container, {
        size: 'invisible',
        callback: (response: string) => {
          console.log('reCAPTCHA solved:', response);
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
        },
      });

      window.recaptchaVerifier = verifier;
      console.log('reCAPTCHA verifier created successfully');
      return verifier;
    } catch (err) {
      console.error('Error setting up reCAPTCHA:', err);
      return null;
    }
  };

  // Countdown timer for resend
  useEffect(() => {
    if (resendCountdown > 0 && !canResend) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendCountdown === 0) {
      setCanResend(true);
    }
  }, [resendCountdown, canResend]);

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setError(language === 'ar' ? 'يرجى إدخال رقم الهاتف' : 'Veuillez entrer votre numéro de téléphone');
      return;
    }

    // Normalize phone number
    const normalizedPhone = normalizeAlgerianPhone(phoneNumber);
    if (!normalizedPhone) {
      setError(language === 'ar' ? 'رقم الهاتف غير صالح' : 'Numéro de téléphone invalide');
      return;
    }

    // Demo mode: accept any phone number
    setLoading(true);
    setError('');
    setSuccess(language === 'ar' ? 'تم إرسال كود التحقق التجريبي' : 'Code OTP de démonstration envoyé');
    setConfirmationResult({ confirm: async (code: string) => {
      if (code === DEMO_OTP_CODE) {
        return {
          user: {
            phoneNumber: normalizedPhone,
            uid: `demo-${normalizedPhone.replace(/\D/g, '')}`,
            demoUserData: {
              fullName: 'Demo User',
              role: 'student',
              institution: 'Université Djillali Liabes Sidi Bel Abbès',
              faculty: 'Faculté de Droit et Sciences Politiques',
              subscription: 'monthly',
              validUntil: '2026-12-31',
              homePoint: 'Sidi Bel Abbès',
              preferredRoute: 'Campus Universitaire',
              isApproved: true,
            },
          },
        };
      }
      throw new Error('demo/invalid-otp-code');
    } } as any);
    setCanResend(false);
    setResendCountdown(60);
    setLoading(false);
    return;

    // Real Firebase OTP
    const firebasePhone = normalizedPhone;
    const appVerifier = setupRecaptcha();
    if (!appVerifier) {
      setError(language === 'ar' ? 'فشل تهيئة reCAPTCHA' : 'Erreur d\'initialisation reCAPTCHA');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await signInWithPhoneNumber(auth, firebasePhone, appVerifier);
      setConfirmationResult(result);
      setSuccess(language === 'ar' ? 'تم إرسال كود التحقق بنجاح' : 'Code de vérification envoyé avec succès');
      setCanResend(false);
      setResendCountdown(60);
    } catch (error: any) {
      console.error('Firebase OTP error full:', error);
      console.error('Firebase OTP error code:', error?.code);
      console.error('Firebase OTP error message:', error?.message);

      let message = language === 'ar' ? 'فشل إرسال كود التحقق' : 'Échec de l\'envoi du code de vérification';

      if (error?.code === 'auth/invalid-phone-number') {
        message = language === 'ar' ? 'رقم الهاتف غير صالح' : 'Numéro de téléphone invalide';
      } else if (error?.code === 'auth/too-many-requests') {
        message = language === 'ar' ? 'تم إرسال محاولات كثيرة، حاول لاحقًا' : 'Trop de tentatives. Veuillez réessayer plus tard';
      } else if (error?.code === 'auth/quota-exceeded') {
        message = language === 'ar' ? 'تم تجاوز حصة رسائل SMS في Firebase' : 'Quota de messages SMS Firebase dépassé';
      } else if (error?.code === 'auth/captcha-check-failed') {
        message = language === 'ar' ? 'فشل التحقق من reCAPTCHA' : 'Échec de la vérification reCAPTCHA';
      } else if (error?.code === 'auth/operation-not-allowed') {
        message = language === 'ar' ? 'تسجيل الدخول بالهاتف غير مفعل في Firebase' : 'Connexion par téléphone non activée dans Firebase';
      } else if (error?.code === 'auth/invalid-app-credential') {
        message = language === 'ar' ? 'خطأ في إعدادات Firebase أو النطاق غير مسموح' : 'Erreur de configuration Firebase ou domaine non autorisé';
      }

      // Display error code temporarily for debugging
      setError(`${message} (${error?.code || 'unknown'})`);

      if (onAuthError) onAuthError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !confirmationResult) {
      setError(language === 'ar' ? 'يرجى إدخال كود التحقق' : 'Veuillez entrer le code de vérification');
      return;
    }

    const activeConfirmationResult = confirmationResult;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await activeConfirmationResult.confirm(otp);
      setSuccess(language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Connexion réussie');
      if (onAuthSuccess) onAuthSuccess(result.user);
    } catch (error: any) {
      if (error?.code === 'auth/invalid-verification-code' || error?.message === 'demo/invalid-otp-code') {
        setError(language === 'ar' ? 'كود التحقق غير صحيح' : 'Code OTP incorrect');
      } else if (error?.code === 'auth/code-expired') {
        setError(language === 'ar' ? 'كود التحقق منتهي الصلاحية' : 'Code de vérification expiré');
      } else {
        setError(language === 'ar' ? 'فشل التحقق من الكود' : 'Échec de la vérification du code');
      }

      if (onAuthError) onAuthError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setCanResend(false);
    setResendCountdown(60);
    await handleSendOtp();
  };

  const handleResetPhone = () => {
    setConfirmationResult(null);
    setOtp('');
    setError('');
    setSuccess('');
  };

  return (
    <Card className="p-8 border border-gray-200 shadow-xl rounded-3xl bg-white">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
            <BadgeCheck className="h-4 w-4" />
            {language === 'ar' ? 'وضع العرض' : 'MODE DÉMO'}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-black text-teal-700">
            <Shield className="h-4 w-4" />
            OTP TEST
          </div>
          {isDemoMode && demoUser && (
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-700">
              {language === 'ar' ? demoUser.labelAr : demoUser.labelFr}
            </div>
          )}
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {mode === 'login' 
              ? (language === 'ar' ? 'تسجيل الدخول' : 'Connexion')
              : (language === 'ar' ? 'تسجيل رقم الهاتف' : 'Enregistrement du téléphone')
            }
          </h3>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'أدخل رقم هاتفك للحصول على كود التحقق'
              : 'Entrez votre numéro de téléphone pour recevoir le code de vérification'
            }
          </p>
          <p className="text-xs text-emerald-700 mt-2 font-black">
            {language === 'ar' ? 'كود العرض: 123456' : 'Code demo: 123456'}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'ar'
              ? 'الأرقام غير التجريبية تتطلب تفعيل Firebase Billing للرسائل الحقيقية'
              : 'Le SMS réel nécessite Firebase Billing pour les numéros hors démo'}
          </p>
        </div>

        {/* Phone Number Input */}
        {!confirmationResult && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'رقم الهاتف' : 'Numéro de téléphone'}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="tel"
                  placeholder={language === 'ar' ? 'رقم الهاتف' : 'Numéro de téléphone'}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10 h-12 text-lg border-gray-300 focus:border-primary focus:ring-primary"
                  dir="ltr"
                />
              </div>
            </div>

            <Button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-secondary text-white font-medium text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {language === 'ar' ? 'جاري الإرسال...' : 'Envoi en cours...'}
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  {language === 'ar' ? 'إرسال كود التحقق' : 'Envoyer le code'}
                </>
              )}
            </Button>
          </div>
        )}

        {/* OTP Input */}
        {confirmationResult && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'كود التحقق' : 'Code de vérification'}
              </label>
              <Input
                type="text"
                placeholder={language === 'ar' ? 'XXXXXX' : 'XXXXXX'}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="h-12 text-lg text-center tracking-widest border-gray-300 focus:border-primary focus:ring-primary"
                dir="ltr"
              />
            </div>

            <Button
              onClick={handleVerifyOtp}
              disabled={loading || otp.length !== 6}
              className="w-full h-12 bg-primary hover:bg-secondary text-white font-medium text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {language === 'ar' ? 'جاري التحقق...' : 'Vérification en cours...'}
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  {language === 'ar' ? 'تأكيد الكود' : 'Confirmer le code'}
                </>
              )}
            </Button>

            {/* Resend OTP */}
            <div className="text-center">
              {canResend ? (
                <button
                  onClick={handleResendOtp}
                  className="text-primary hover:text-secondary font-medium text-sm"
                >
                  {language === 'ar' ? 'إعادة إرسال الكود' : 'Renvoyer le code'}
                </button>
              ) : (
                <p className="text-gray-500 text-sm">
                  {language === 'ar' 
                    ? `إعادة الإرسال خلال ${resendCountdown} ثانية`
                    : `Renvoyer dans ${resendCountdown} secondes`
                  }
                </p>
              )}
            </div>

            {/* Change Phone Number */}
            <button
              onClick={handleResetPhone}
              className="w-full text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              {language === 'ar' ? 'تغيير رقم الهاتف' : 'Changer le numéro de téléphone'}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800 text-sm">{success}</p>
          </div>
        )}

        {/* Recaptcha Container */}
        <div id="recaptcha-container" className="opacity-0 pointer-events-none" />
      </div>
    </Card>
  );
}
