'use client';

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { RouteLineCard } from '@/components/RouteLineCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockRoutes } from '@/mock/routes-data';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import additionalDestinations from '@/data/additional-destinations.json';

export default function RoutesPage() {
  const { language } = useLanguage();
  const router = useRouter();

  const handleViewDetails = (routeId: string) => {
    router.push(`/routes/${routeId}`);
  };

  return (
    <DashboardLayout role="user">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'الخطوط والوجهات' : 'Lignes et destinations'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'استكشف جميع خطوط الحافلات الجامعية والوجهات الإضافية'
                : 'Découvrez les lignes universitaires et destinations supplémentaires'}
            </p>
          </div>
          <Button variant="outline" onClick={() => window.history.length > 1 ? router.back() : router.push('/dashboard')}>
            {language === 'ar' ? 'رجوع' : 'Retour'}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {mockRoutes.map((route) => (
            <RouteLineCard
              key={route.id}
              route={route}
              onViewDetails={() => handleViewDetails(route.id)}
            />
          ))}
        </div>

        <Card className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl">
          <h2 className="mb-4 text-2xl font-black text-slate-900">
            {language === 'ar' ? 'الموانئ' : 'Ports'}
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            {additionalDestinations.ports.map((port) => (
              <div key={port.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold text-slate-800">
                {language === 'ar' ? port.nameAr : port.name}
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-3xl border border-teal-100 bg-teal-50 p-6 shadow-xl">
          <h2 className="mb-4 text-2xl font-black text-slate-900">
            {language === 'ar' ? 'خدمات إضافية قيد التحضير' : 'Services supplémentaires préparés'}
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {additionalDestinations.futureServices.map((service) => (
              <div key={service.id} className="rounded-2xl bg-white p-4 font-bold text-slate-800 shadow-sm">
                {language === 'ar' ? service.nameAr : service.name}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}