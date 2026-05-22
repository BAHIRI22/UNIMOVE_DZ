'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Wallet } from 'lucide-react';

interface PaymentStepProps {
  amount: number;
  onNext: () => void;
  onPrevious: () => void;
}

export function PaymentStep({ amount, onNext, onPrevious }: PaymentStepProps) {
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center mb-8">
        <div className="p-6 rounded-full bg-emerald-100">
          <Wallet className="w-12 h-12 text-emerald-600" />
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 text-center">
          {t('register.payment')}
        </h2>
        <p className="text-lg text-gray-600 text-center font-medium">
          {t('register.payment')}
        </p>
      </div>

      {/* Payment Summary */}
      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 md:p-10 rounded-3xl border-2 border-emerald-200 shadow-lg">
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <span className="text-lg text-gray-700 font-medium">{t('register.subscription')}</span>
            <span className="font-black text-2xl text-gray-900">{amount} DA</span>
          </div>
          <div className="border-t-2 border-emerald-200 pt-5 mt-5 flex justify-between items-center">
            <span className="font-black text-xl text-gray-900">{t('common.submit')}</span>
            <span className="text-4xl font-black text-emerald-600">{amount} DA</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <label className="flex items-center p-6 border-2 border-emerald-600 rounded-2xl cursor-pointer bg-emerald-50 shadow-md shadow-emerald-600/15 transition-all duration-500 hover:scale-[1.005]">
          <input type="radio" name="payment" defaultChecked className="mr-4 w-5 h-5 accent-emerald-600" />
          <div className="flex-1">
            <div className="font-black text-xl text-gray-900 mb-1">{t('register.payment')}</div>
            <div className="text-base text-gray-600 font-medium">
              {t('language') === 'ar' ? 'الدفع الفوري عند الكشك' : 'Paiement immédiat au guichet'}
            </div>
          </div>
        </label>

        <label className="flex items-center p-6 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-500 hover:scale-[1.005]">
          <input type="radio" name="payment" className="mr-4 w-5 h-5 accent-emerald-600" />
          <div className="flex-1">
            <div className="font-black text-xl text-gray-900 mb-1">{t('register.payment')}</div>
            <div className="text-base text-gray-600 font-medium">
              {t('language') === 'ar' ? 'بطاقة ائتمان/خصم' : 'Carte de crédit/débit'}
            </div>
          </div>
        </label>
      </div>

      <div className="flex gap-5 pt-4">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-16 text-xl font-bold rounded-2xl border-2"
          onClick={onPrevious}
          disabled={isProcessing}
        >
          {t('common.previous')}
        </Button>
        <Button
          size="lg"
          className="flex-1 h-16 text-xl font-black rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? t('common.loading') : t('register.payment')}
        </Button>
      </div>
    </div>
  );
}
