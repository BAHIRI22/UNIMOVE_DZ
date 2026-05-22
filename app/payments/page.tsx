'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { PaymentMethodCard } from '@/components/PaymentMethodCard';
import { PaymentSummary } from '@/components/PaymentSummary';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { subscriptions, paymentMethods } from '@/mock/subscriptions';
import { Subscription, PaymentMethodOption } from '@/types/payment';
import { useRouter } from 'next/navigation';

export default function PaymentsPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodOption | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load selected subscription from localStorage
    const storedSubscription = localStorage.getItem('selectedSubscription');
    if (storedSubscription) {
      setSelectedSubscription(JSON.parse(storedSubscription));
    } else {
      // Redirect to subscriptions page if no subscription selected
      router.push('/subscriptions');
    }
  }, [router]);

  const handleSelectPaymentMethod = (method: PaymentMethodOption) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmPayment = async () => {
    if (!selectedSubscription || !selectedPaymentMethod) return;

    setLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Randomly succeed or fail (80% success rate)
    const success = Math.random() > 0.2;

    if (success) {
      // Save subscription to localStorage
      const userSubscription = {
        id: Date.now().toString(),
        userId: user?.id || 'user-1',
        subscriptionId: selectedSubscription.id,
        subscriptionType: selectedSubscription.type,
        subscriptionName: selectedSubscription.name,
        subscriptionNameAr: selectedSubscription.nameAr,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + selectedSubscription.duration * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
        paymentId: Date.now().toString(),
        amount: selectedSubscription.price,
        autoRenew: false,
      };
      
      const existingSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '[]');
      existingSubscriptions.push(userSubscription);
      localStorage.setItem('userSubscriptions', JSON.stringify(existingSubscriptions));

      router.push('/payment-success');
    } else {
      router.push('/payment-failed');
    }
  };

  const handleCancel = () => {
    router.push('/subscriptions');
  };

  if (!selectedSubscription) {
    return (
      <DashboardLayout role="user">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 border border-gray-200 text-center">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}
            </h2>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="user">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'ar' ? 'رجوع' : 'Retour'}
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'الدفع' : 'Paiement'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'اختر طريقة الدفع'
                : 'Choisissez votre méthode de paiement'}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">
              {language === 'ar' ? 'طرق الدفع المتاحة' : 'Méthodes de paiement disponibles'}
            </h2>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <PaymentMethodCard
                  key={method.id}
                  method={method}
                  onSelect={handleSelectPaymentMethod}
                  selected={selectedPaymentMethod?.id === method.id}
                />
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:sticky lg:top-8">
            {selectedPaymentMethod && (
              <PaymentSummary
                subscription={selectedSubscription}
                paymentMethod={selectedPaymentMethod}
                onConfirm={handleConfirmPayment}
                onCancel={handleCancel}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
