'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Wallet, Smartphone, CreditCard, Building2, QrCode, Clock } from 'lucide-react';
import { PaymentMethodOption } from '@/types/payment';

interface PaymentMethodCardProps {
  method: PaymentMethodOption;
  onSelect: (method: PaymentMethodOption) => void;
  selected?: boolean;
}

export function PaymentMethodCard({ method, onSelect, selected }: PaymentMethodCardProps) {
  const { language } = useLanguage();

  const getIcon = () => {
    switch (method.type) {
      case 'cash':
        return Wallet;
      case 'baridimob':
        return Smartphone;
      case 'edahabia':
        return CreditCard;
      case 'ccp':
        return Building2;
      case 'credit_card':
        return CreditCard;
      case 'qr_code':
        return QrCode;
      default:
        return CreditCard;
    }
  };

  const Icon = getIcon();

  return (
    <Card
      onClick={() => !method.comingSoon && onSelect(method)}
      className={`p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${
        selected
          ? 'border-primary shadow-lg bg-primary/5'
          : method.comingSoon
          ? 'border-gray-200 opacity-50 cursor-not-allowed'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          method.available ? 'bg-emerald-100' : 'bg-gray-100'
        }`}>
          <Icon className={`w-6 h-6 ${method.available ? 'text-emerald-600' : 'text-gray-400'}`} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">
            {language === 'ar' ? method.nameAr : method.name}
          </h3>
          {method.comingSoon && (
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{language === 'ar' ? 'قريباً' : 'Bientôt'}</span>
            </div>
          )}
        </div>
        {selected && (
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        )}
      </div>
    </Card>
  );
}
