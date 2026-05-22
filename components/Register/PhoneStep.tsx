'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { validatePhone } from '@/lib/validation';
import { Phone } from 'lucide-react';

interface PhoneStepProps {
  onNext: (phone: string) => void;
}

export function PhoneStep({ onNext }: PhoneStepProps) {
  const { t } = useLanguage();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePhone(phone)) {
      setError(t('register.enterPhone'));
      return;
    }

    setIsLoading(true);
    // Simulate sending OTP
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);

    onNext(phone);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center mb-6">
        <div className="p-4 rounded-full bg-primary/10">
          <Phone className="w-8 h-8 text-primary" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {t('register.phone')}
        </h2>
        <p className="text-gray-600 text-center">
          {t('register.enterPhone')}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-base font-medium">
          {t('register.phone')}
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+213 5XX XXX XXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="text-lg h-12"
          disabled={isLoading}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary hover:bg-secondary text-white"
        disabled={isLoading}
      >
        {isLoading ? t('common.loading') : t('common.next')}
      </Button>
    </form>
  );
}
