'use client';

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { RouteLineCard } from '@/components/RouteLineCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { mockRoutes } from '@/mock/routes-data';
import { useRouter } from 'next/navigation';

export default function RoutesPage() {
  const { language } = useAuth();
  const router = useRouter();

  const handleViewDetails = (routeId: string) => {
    router.push(`/routes/${routeId}`);
  };

  return (
    <DashboardLayout role="user">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'الخطوط الجامعية' : 'Lignes universitaires'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar'
              ? 'استكشف جميع خطوط الحافلات الجامعية في سيدي بلعباس'
              : 'Découvrez toutes les lignes de bus universitaires à Sidi Bel Abbès'}
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {mockRoutes.map((route) => (
            <RouteLineCard
              key={route.id}
              route={route}
              onViewDetails={() => handleViewDetails(route.id)}
            />
          ))}
        </div>

        {/* Info */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">
            {language === 'ar' ? 'معلومات مهمة' : 'Informations importantes'}
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <span>
                {language === 'ar'
                  ? 'جميع الحافلات مجهزة بـ WiFi مجاني'
                  : 'Tous les bus sont équipés du WiFi gratuit'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <span>
                {language === 'ar'
                  ? 'كلمة مرور WiFi: UNIMOVE_DZ'
                  : 'Mot de passe WiFi: UNIMOVE_DZ'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <span>
                {language === 'ar'
                  ? 'الجدول قد يتغير حسب الظروف'
                  : 'Les horaires peuvent changer selon les conditions'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
