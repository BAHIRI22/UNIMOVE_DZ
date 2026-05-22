'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import subscriptions from '@/data/subscriptions.json';

interface SubscriptionData {
  subscription: 'daily' | 'weekly' | 'monthly';
  fullName: string;
  homePoint: string;
}

interface SubscriptionStepProps {
  onNext: (data: SubscriptionData) => void;
  onPrevious: () => void;
}

export function SubscriptionStep({ onNext, onPrevious }: SubscriptionStepProps) {
  const { t, language } = useLanguage();
  const [selectedSub, setSelectedSub] = useState<'daily' | 'weekly' | 'monthly' | null>(null);
  const [fullName, setFullName] = useState('');
  const [homePoint, setHomePoint] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    
    if (!selectedSub) newErrors.subscription = t('register.subscription');
    if (!fullName.trim()) newErrors.fullName = t('register.fullName');
    if (!homePoint.trim()) newErrors.homePoint = t('register.homePoint');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!selectedSub) return;

    onNext({
      subscription: selectedSub,
      fullName: fullName.trim(),
      homePoint: homePoint.trim(),
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center mb-8">
        <div className="p-6 rounded-full bg-emerald-100">
          <CreditCard className="w-12 h-12 text-emerald-600" />
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 text-center">
          {t('register.subscription')}
        </h2>
        <p className="text-lg text-gray-600 text-center font-medium">
          {t('register.subscription')}
        </p>
      </div>

      {/* Subscription Plans */}
      <div className="space-y-4">
        {subscriptions.map((sub) => {
          const subType = sub.id.split('-')[1] as 'daily' | 'weekly' | 'monthly';
          const subName = language === 'ar' ? sub.typeAr : sub.typeFr;
          
          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSub(subType)}
              className={`w-full p-6 md:p-8 rounded-2xl border-2 text-left transition-all duration-500 ${
                selectedSub === subType
                  ? 'border-emerald-600 bg-emerald-50 shadow-lg shadow-emerald-600/15 scale-[1.01]'
                  : 'border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50 hover:scale-[1.005]'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-black text-xl text-gray-900 mb-2">{subName}</div>
                  <div className="text-base text-gray-600 font-medium">
                    {sub.trips} {language === 'ar' ? 'رحلة' : 'trajets'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-2xl text-emerald-600">{sub.price} DA</div>
                  <div className="text-sm text-gray-600 font-medium">{sub.validity}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Personal Info */}
      <div className="space-y-6 pt-6 border-t border-gray-200">
        <div className="space-y-3">
          <Label htmlFor="fullName" className="text-lg font-bold text-gray-900">
            {t('register.fullName')}
          </Label>
          <Input
            id="fullName"
            placeholder="أحمد محمد / Ahmed Mohamed"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-14 text-lg rounded-xl border-2 focus:border-emerald-500"
          />
          {errors.fullName && <p className="text-red-600 text-base font-medium">{errors.fullName}</p>}
        </div>

        <div className="space-y-3">
          <Label htmlFor="homePoint" className="text-lg font-bold text-gray-900">
            {t('register.homePoint')}
          </Label>
          <Input
            id="homePoint"
            placeholder="محطة سيدي بلعباس"
            value={homePoint}
            onChange={(e) => setHomePoint(e.target.value)}
            className="h-14 text-lg rounded-xl border-2 focus:border-emerald-500"
          />
          {errors.homePoint && <p className="text-red-600 text-base font-medium">{errors.homePoint}</p>}
        </div>
      </div>

      <div className="flex gap-5 pt-4">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-16 text-xl font-bold rounded-2xl border-2"
          onClick={onPrevious}
        >
          {t('common.previous')}
        </Button>
        <Button
          size="lg"
          className="flex-1 h-16 text-xl font-black rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
          onClick={handleNext}
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
}
