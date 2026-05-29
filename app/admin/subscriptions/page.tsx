'use client';

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { CreditCard, ShieldAlert } from 'lucide-react';

export default function AdminSubscriptionsPage() {
  const { language } = useLanguage();

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-white">
            {language === 'ar' ? 'إدارة الاشتراكات' : 'Gestion des Abonnements'}
          </h1>
          <p className="text-gray-400">
            {language === 'ar'
              ? 'متابعة وتأكيد اشتراكات الطلاب والأساتذة'
              : 'Suivi et confirmation des abonnements des étudiants et enseignants'}
          </p>
        </div>

        <Card className="p-8 border border-emerald-500/20 bg-zinc-950/80 backdrop-blur-xl text-center flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {language === 'ar' ? 'الاشتراكات والمدفوعات' : 'Abonnements et Paiements'}
          </h2>
          <p className="text-gray-400 max-w-md">
            {language === 'ar'
              ? 'تتم معالجة المدفوعات والاشتراكات بشكل آلي عبر النظام. سيتم توفير واجهة التحكم الكاملة هنا قريباً.'
              : 'Les paiements et abonnements sont traités automatiquement. L\'interface de contrôle complète sera disponible ici bientôt.'}
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
