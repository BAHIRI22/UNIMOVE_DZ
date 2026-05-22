'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { validateOTP } from '@/lib/validation';
import { ShieldCheck } from 'lucide-react';

interface OTPStepProps {
  phone: string;
  onNext: (otp: string) => void;
  onPrevious: () => void;
}

export function OTPStep({ phone, onNext, onPrevious }: OTPStepProps) {
  const { t } = useLanguage();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateOTP(otp)) {
      setError(t('register.enterOTP'));
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);

    onNext(otp);
  };

  const handleResend = async () => {
    setResendTimer(60);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const timer = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center mb-6">
        <div className="p-4 rounded-full bg-primary/10">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {t('register.otp')}
        </h2>
        <p className="text-gray-600 text-center">
          {t('register.enterOTP')}
        </p>
        <p className="text-sm text-gray-500 text-center mt-2">
          {phone}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otp" className="text-base font-medium">
          {t('register.otp')}
        </Label>
        <Input
          id="otp"
          type="text"
          placeholder="000000"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="text-center text-2xl font-mono h-12 tracking-widest"
          maxLength={6}
          disabled={isLoading}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={onPrevious}
          disabled={isLoading}
        >
          {t('common.previous')}
        </Button>
        <Button
          type="submit"
          size="lg"
          className="flex-1 bg-primary hover:bg-secondary text-white"
          disabled={isLoading}
        >
          {isLoading ? t('common.loading') : t('common.next')}
        </Button>
      </div>

      <div className="text-center">
        {resendTimer > 0 ? (
          <p className="text-sm text-gray-600">
            {t('register.resend')} {resendTimer}s
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-sm text-primary hover:underline font-medium"
          >
            {t('register.resend')}
          </button>
        )}
      </div>
    </form>
  );
}
