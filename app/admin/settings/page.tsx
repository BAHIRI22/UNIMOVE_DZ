'use client';

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  const { language } = useLanguage();

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-white">
            {language === 'ar' ? 'إعدادات النظام' : 'Paramètres du Système'}
          </h1>
          <p className="text-gray-400">
            {language === 'ar'
              ? 'تكوين وضبط إعدادات التطبيق العامة'
              : 'Configuration et ajustement des paramètres généraux de l\'application'}
          </p>
        </div>

        <Card className="p-8 border border-emerald-500/20 bg-zinc-950/80 backdrop-blur-xl text-center flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <Settings className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {language === 'ar' ? 'الإعدادات العامة للوحة التحكم' : 'Paramètres de l\'administration'}
          </h2>
          <p className="text-gray-400 max-w-md">
            {language === 'ar'
              ? 'تعديل الإعدادات والتحكم بالخدمات قيد التطوير وسيتم توفير الخيارات قريباً.'
              : 'La modification des paramètres et le contrôle des services sont en cours de développement.'}
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
