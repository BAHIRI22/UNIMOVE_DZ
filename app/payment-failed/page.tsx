'use client';

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentFailedPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Clear selected subscription from localStorage
    localStorage.removeItem('selectedSubscription');
  }, []);

  const handleRetry = () => {
    router.push('/payments');
  };

  const handleGoToSubscriptions = () => {
    router.push('/subscriptions');
  };

  return (
    <DashboardLayout role="user">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 border border-gray-200 bg-gradient-to-br from-red-50 to-red-100">
          <div className="text-center space-y-6">
            {/* Failed Icon */}
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>

            {/* Failed Message */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'ar' ? 'فشل الدفع' : 'Paiement échoué'}
              </h1>
              <p className="text-gray-600">
                {language === 'ar'
                  ? 'عذراً، لم نتمكن من معالجة الدفع الخاص بك'
                  : 'Désolé, nous n\'avons pas pu traiter votre paiement'}
              </p>
            </div>

            {/* Error Info */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-left">
              <h3 className="font-bold text-gray-900 mb-3">
                {language === 'ar' ? 'ماذا حدث؟' : 'Ce qui s\'est passé ?'}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {language === 'ar'
                  ? 'قد يكون هناك مشكلة مؤقتة مع معالج الدفع أو اتصال الإنترنت. يرجى المحاولة مرة أخرى.'
                  : 'Il peut y avoir un problème temporaire avec le processeur de paiement ou votre connexion Internet. Veuillez réessayer.'}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>
                    {language === 'ar'
                      ? 'فشل الاتصال بالخادم'
                      : 'Échec de la connexion au serveur'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>
                    {language === 'ar'
                      ? 'انتهت مهلة المعاملة'
                      : 'Délai d\'attente de la transaction dépassé'}
                  </span>
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left">
              <p className="text-sm text-gray-700">
                {language === 'ar'
                  ? 'إذا استمرت المشكلة، يرجى الاتصال بالدعم الفني على support@unimove-dz.dz'
                  : 'Si le problème persiste, veuillez contacter le support technique à support@unimove-dz.dz'}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleRetry}
                className="w-full h-12 bg-primary hover:bg-secondary text-white flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                {language === 'ar' ? 'إعادة المحاولة' : 'Réessayer'}
              </Button>
              <Button
                onClick={handleGoToSubscriptions}
                variant="outline"
                className="w-full h-12 flex items-center justify-center gap-2"
              >
                {language === 'ar' ? 'اختر اشتراك آخر' : 'Choisir un autre abonnement'}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
