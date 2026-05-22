'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { subscriptions } from '@/mock/subscriptions';
import { Subscription } from '@/types/payment';
import { useRouter } from 'next/navigation';

export default function SubscriptionsPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  const handleSelectSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    // Save to localStorage
    localStorage.setItem('selectedSubscription', JSON.stringify(subscription));
    // Redirect to payment page
    router.push('/payments');
  };

  return (
    <DashboardLayout role="user">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {language === 'ar' ? 'الاشتراكات' : 'Abonnements'}
          </h1>
          <p className="text-xl text-slate-600 leading-8">
            {language === 'ar'
              ? 'اختر الاشتراك المناسب لك'
              : 'Choisissez l\'abonnement qui vous convient'}
          </p>
        </div>

        {/* Subscription Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onSelect={handleSelectSubscription}
              selected={selectedSubscription?.id === subscription.id}
            />
          ))}
        </div>

        {/* Info */}
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-3xl p-8 shadow-lg">
          <h3 className="font-bold text-gray-900 text-xl mb-4">
            {language === 'ar' ? 'معلومات مهمة' : 'Informations importantes'}
          </h3>
          <ul className="space-y-4 text-base text-slate-700 leading-8">
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 text-xl">•</span>
              <span>
                {language === 'ar'
                  ? 'جميع الاشتراكات تشمل وصول WiFi مجاني'
                  : 'Tous les abonnements incluent un accès WiFi gratuit'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 text-xl">•</span>
              <span>
                {language === 'ar'
                  ? 'يمكنك إلغاء الاشتراك في أي وقت'
                  : 'Vous pouvez annuler votre abonnement à tout moment'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 text-xl">•</span>
              <span>
                {language === 'ar'
                  ? 'الاشتراكات الطلابية والأساتذة تتطلب إثبات الهوية'
                  : 'Les abonnements étudiants et enseignants nécessitent une preuve d\'identité'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
