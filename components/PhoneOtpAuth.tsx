'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, Shield, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface PhoneOtpAuthProps {
  onAuthSuccess?: (user: any) => void;
  onAuthError?: (error: string) => void;
  mode?: 'login' | 'register';
}

const DEMO_OTP_CODE = '123456';
const isDev = process.env.NODE_ENV === 'development';

export function PhoneOtpAuth({ onAuthSuccess, onAuthError, mode = 'login' }: PhoneOtpAuthProps) {
  const { language } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [normalizedPhone, setNormalizedPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);

  const normalizeAlgerianPhone = (input: string): string | null => {
    const cleaned = input.replace(/[\s-]/g, '');
    if (/^0[5-7][0-9]{8}$/.test(cleaned)) {
      return '+213' + cleaned.substring(1);
    }
    if (/^\+213[5-7][0-9]{8}$/.test(cleaned)) {
      return cleaned;
    }
    return null;
  };

  useEffect(() => {
    if (resendCountdown > 0 && !canResend) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (resendCountdown === 0) {
      setCanResend(true);
    }
  }, [resendCountdown, canResend]);

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setError(language === 'ar' ? 'يرجى إدخال رقم الهاتف' : 'Veuillez entrer votre num\u00e9ro de t\u00e9l\u00e9phone');
      return;
    }

    const phone = normalizeAlgerianPhone(phoneNumber);
    if (!phone) {
      setError(language === 'ar' ? 'رقم الهاتف غير صحيح' : 'Num\u00e9ro de t\u00e9l\u00e9phone invalide');
      return;
    }

    setNormalizedPhone(phone);
    setLoading(true);
    setError('');
    setSuccess('');

    console.log('DEV OTP BYPASS ACTIVE');

    if (typeof window !== 'undefined') {
      localStorage.setItem('unimove_dev_phone', phone);
      localStorage.setItem('unimove_current_phone', phone);
    }

    setOtpStep(true);
    setSuccess(language === 'ar'
      ? 'وضع التطوير: أدخل الرمز 123456'
      : 'Mode d\u00e9veloppement : entrez le code 123456');
    setCanResend(false);
    setResendCountdown(60);
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError(language === 'ar' ? 'يرجى إدخال رمز التحقق' : 'Veuillez entrer le code de v\u00e9rification');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (otp !== DEMO_OTP_CODE) {
        throw new Error('demo/invalid-otp-code');
      }

      setSuccess(language === 'ar' ? 'تم تأكيد الرمز بنجاح' : 'Code confirm\u00e9 avec succ\u00e8s');
      if (onAuthSuccess) {
        onAuthSuccess({
          uid: `demo-${normalizedPhone.replace(/\D/g, '')}`,
          phoneNumber: normalizedPhone,
        });
      }
    } catch (err: any) {
      if (err?.message === 'demo/invalid-otp-code') {
        setError(language === 'ar' ? 'رمز التحقق غير صحيح (استعمل 123456)' : 'Code OTP incorrect (utilisez 123456)');
      } else {
        setError(language === 'ar' ? 'تعذر تأكيد الرمز' : 'Impossible de confirmer le code');
      }
      if (onAuthError) onAuthError(err?.message || 'OTP verification error');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setCanResend(false);
    setResendCountdown(60);
    setOtpStep(false);
    setOtp('');
    await handleSendOtp();
  };

  const handleBackToPhone = () => {
    setOtpStep(false);
    setOtp('');
    setError('');
    setSuccess('');
  };

  return (
    <Card className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-700">
            <Shield className="h-4 w-4" />
            DEV OTP MODE
          </div>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Phone className="h-7 w-7 text-primary" />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-gray-900">
            {otpStep
              ? (language === 'ar' ? 'أدخل رمز التحقق' : 'Entrez le code de vérification')
              : mode === 'login'
                ? (language === 'ar' ? 'تسجيل الدخول' : 'Connexion')
                : (language === 'ar' ? 'تسجيل رقم الهاتف' : 'Enregistrement du téléphone')}
          </h3>
          <p className="text-sm leading-6 text-gray-600">
            {otpStep
              ? (language === 'ar' ? 'أدخل الرمز الذي وصلك عبر SMS' : 'Entrez le code reçu par SMS')
              : (language === 'ar' ? 'أدخل رقم هاتفك للدخول إلى حسابك' : 'Entrez votre numéro de téléphone pour accéder à votre compte')}
          </p>
        </div>

        {!otpStep && (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'رقم الهاتف' : 'Numéro de téléphone'}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="0550000000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-12 border-gray-300 pl-10 text-lg focus:border-primary focus:ring-primary"
                  dir="ltr"
                />
              </div>
            </div>

            <Button
              onClick={handleSendOtp}
              disabled={loading || !phoneNumber}
              className="h-12 w-full rounded-xl bg-primary font-medium text-white hover:bg-secondary"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {language === 'ar' ? 'جارٍ إرسال الرمز...' : 'Envoi du code...'}
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-5 w-5" />
                  {language === 'ar' ? 'إرسال رمز التحقق' : 'Envoyer le code'}
                </>
              )}
            </Button>
          </div>
        )}

        {otpStep && (
          <div className="space-y-4">
            {isDev && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-bold text-amber-800">
                {language === 'ar' ? 'وضع التطوير مفعل: استعمل الرمز 123456' : 'Mode d\u00e9veloppement actif : utilisez le code 123456'}
              </div>
            )}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'رمز التحقق' : 'Code de vérification'}
              </label>
              <Input
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="h-12 text-center text-lg tracking-widest border-gray-300 focus:border-primary focus:ring-primary"
                maxLength={6}
                dir="ltr"
              />
            </div>

            <Button
              onClick={handleVerifyOtp}
              disabled={loading || otp.length !== 6}
              className="h-12 w-full rounded-xl bg-primary font-medium text-white hover:bg-secondary"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  {language === 'ar' ? 'تأكيد الرمز' : 'Confirmer le code'}
                </>
              )}
            </Button>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBackToPhone} className="h-11 flex-1 rounded-xl">
                {language === 'ar' ? 'رجوع' : 'Retour'}
              </Button>
              <Button variant="outline" onClick={handleResendOtp} disabled={!canResend || loading} className="h-11 flex-1 rounded-xl">
                {canResend
                  ? (language === 'ar' ? 'إعادة الإرسال' : 'Renvoyer')
                  : `${resendCountdown}s`}
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{success}</p>
          </div>
        )}

      </div>
    </Card>
  );
}