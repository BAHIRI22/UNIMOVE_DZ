'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Receipt, Calendar, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';
import { Subscription, PaymentMethodOption } from '@/types/payment';

interface PaymentSummaryProps {
  subscription: Subscription;
  paymentMethod: PaymentMethodOption;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function PaymentSummary({ subscription, paymentMethod, onConfirm, onCancel, loading }: PaymentSummaryProps) {
  const { language } = useLanguage();

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + subscription.duration);

  return (
    <Card className="p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
          <Receipt className="w-5 h-5 text-emerald-600" />
        </div>
        <h3 className="font-bold text-gray-900 text-lg">
          {language === 'ar' ? 'ملخص الدفع' : 'Résumé du paiement'}
        </h3>
      </div>

      {/* Subscription Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-gray-600">
            {language === 'ar' ? 'الاشتراك' : 'Abonnement'}
          </span>
          <span className="font-medium text-gray-900">
            {language === 'ar' ? subscription.nameAr : subscription.name}
          </span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-gray-600">
            {language === 'ar' ? 'المدة' : 'Durée'}
          </span>
          <span className="font-medium text-gray-900">
            {subscription.duration} {subscription.duration === 1 ? (language === 'ar' ? 'يوم' : 'jour') : (language === 'ar' ? 'أيام' : 'jours')}
          </span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>
              {language === 'ar' ? 'تاريخ البدء' : 'Date de début'}
            </span>
          </div>
          <span className="font-medium text-gray-900">{startDate.toLocaleDateString()}</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>
              {language === 'ar' ? 'تاريخ الانتهاء' : 'Date de fin'}
            </span>
          </div>
          <span className="font-medium text-gray-900">{endDate.toLocaleDateString()}</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <CreditCard className="w-4 h-4" />
            <span>
              {language === 'ar' ? 'طريقة الدفع' : 'Méthode de paiement'}
            </span>
          </div>
          <span className="font-medium text-gray-900">
            {language === 'ar' ? paymentMethod.nameAr : paymentMethod.name}
          </span>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between py-4 bg-emerald-50 rounded-xl px-4 mt-4">
          <span className="font-bold text-gray-900 text-lg">
            {language === 'ar' ? 'المجموع' : 'Total'}
          </span>
          <span className="font-bold text-primary text-2xl">{subscription.price} DA</span>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">
          {language === 'ar' ? 'المزايا المضمنة' : 'Avantages inclus'}
        </h4>
        <div className="space-y-2">
          {(language === 'ar' ? subscription.benefitsAr : subscription.benefits).map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          onClick={onCancel}
          variant="outline"
          className="flex-1 h-12"
          disabled={loading}
        >
          {language === 'ar' ? 'إلغاء' : 'Annuler'}
        </Button>
        <Button
          onClick={onConfirm}
          className="flex-1 h-12 bg-primary hover:bg-secondary text-white flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {language === 'ar' ? 'جاري المعالجة...' : 'Traitement...'}
            </>
          ) : (
            <>
              {language === 'ar' ? 'تأكيد الدفع' : 'Confirmer le paiement'}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
