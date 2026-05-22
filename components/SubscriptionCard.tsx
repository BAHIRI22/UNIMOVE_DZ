'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Crown } from 'lucide-react';
import { Subscription } from '@/types/payment';

interface SubscriptionCardProps {
  subscription: Subscription;
  onSelect: (subscription: Subscription) => void;
  selected?: boolean;
}

export function SubscriptionCard({ subscription, onSelect, selected }: SubscriptionCardProps) {
  const { language } = useLanguage();

  return (
    <Card
      className={`p-6 border-2 cursor-pointer transition-all hover:shadow-xl ${
        selected
          ? 'border-primary shadow-xl bg-primary/5'
          : subscription.isPopular
          ? 'border-primary/50 shadow-lg'
          : 'border-gray-200'
      }`}
      onClick={() => onSelect(subscription)}
    >
      {/* Popular Badge */}
      {subscription.isPopular && (
        <div className="flex items-center justify-center mb-4">
          <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            {language === 'ar' ? 'الأكثر شعبية' : 'Populaire'}
          </div>
        </div>
      )}

      {/* Recommended Badge */}
      {subscription.isRecommended && (
        <div className="flex items-center justify-center mb-4">
          <div className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Crown className="w-4 h-4 fill-current" />
            {language === 'ar' ? 'موصى به' : 'Recommandé'}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {language === 'ar' ? subscription.nameAr : subscription.name}
        </h3>
        <p className="text-3xl font-bold text-primary mb-1">{subscription.price} DA</p>
        <p className="text-sm text-gray-600">
          {language === 'ar' ? 'صالح لمدة' : 'Valable pour'} {subscription.duration} {subscription.duration === 1 ? (language === 'ar' ? 'يوم' : 'jour') : (language === 'ar' ? 'أيام' : 'jours')}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 text-center mb-6">
        {language === 'ar' ? subscription.descriptionAr : subscription.description}
      </p>

      {/* Benefits */}
      <div className="space-y-3 mb-6">
        {(language === 'ar' ? subscription.benefitsAr : subscription.benefits).map((benefit, index) => (
          <div key={index} className="flex items-center gap-3 text-sm">
            <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-emerald-600" />
            </div>
            <span className="text-gray-700">{benefit}</span>
          </div>
        ))}
      </div>

      {/* Select Button */}
      <Button
        className={`w-full h-12 ${
          selected
            ? 'bg-primary hover:bg-secondary text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
        }`}
      >
        {selected
          ? (language === 'ar' ? 'محدد' : 'Sélectionné')
          : (language === 'ar' ? 'اختر هذا الاشتراك' : 'Choisir cet abonnement')
        }
      </Button>
    </Card>
  );
}
