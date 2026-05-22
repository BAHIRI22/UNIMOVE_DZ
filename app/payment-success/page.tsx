'use client';

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, Receipt, Calendar, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccessPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Clear selected subscription from localStorage
    localStorage.removeItem('selectedSubscription');
  }, []);

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  const handleGoToMyCard = () => {
    router.push('/my-card');
  };

  return (
    <DashboardLayout role="user">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 border border-gray-200 bg-gradient-to-br from-emerald-50 to-emerald-100">
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>

            {/* Success Message */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'ar' ? 'تم الدفع بنجاح!' : 'Paiement réussi!'}
              </h1>
              <p className="text-gray-600">
                {language === 'ar'
                  ? 'تم تأكيد اشتراكك بنجاح'
                  : 'Votre abonnement a été confirmé avec succès'}
              </p>
            </div>

            {/* Subscription Details */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900">
                  {language === 'ar' ? 'تفاصيل الاشتراك' : 'Détails de l\'abonnement'}
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">
                    {language === 'ar' ? 'الحالة' : 'Statut'}
                  </span>
                  <span className="font-medium text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {language === 'ar' ? 'نشط' : 'Actif'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {language === 'ar' ? 'تاريخ البدء' : 'Date de début'}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">
                    {language === 'ar' ? 'بطاقتك الرقمية' : 'Votre carte numérique'}
                  </span>
                  <span className="font-medium text-emerald-600">
                    {language === 'ar' ? 'محدثة' : 'Mise à jour'}
                  </span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left">
              <p className="text-sm text-gray-700">
                {language === 'ar'
                  ? 'تم تحديث بطاقتك الرقمية UNIMOVE-DZ تلقائياً. يمكنك الآن استخدامها لجميع الحافلات الجامعية.'
                  : 'Votre carte numérique UNIMOVE-DZ a été mise à jour automatiquement. Vous pouvez maintenant l\'utiliser pour tous les bus universitaires.'}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleGoToMyCard}
                className="w-full h-12 bg-primary hover:bg-secondary text-white flex items-center justify-center gap-2"
              >
                {language === 'ar' ? 'عرض بطاقتي' : 'Voir ma carte'}
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleGoToDashboard}
                variant="outline"
                className="w-full h-12 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                {language === 'ar' ? 'العودة للوحة التحكم' : 'Retour au tableau de bord'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
