'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import routes from '@/data/routes.json';
import { Edit2, Trash2, Plus, Navigation } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function AdminRoutes() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('admin.routes')}</h2>
        <Button className="bg-primary hover:bg-secondary text-white">
          <Plus className="w-4 h-4 mr-2" />
          {t('common.add')}
        </Button>
      </div>

      <div className="space-y-3">
        {routes.map((route) => {
          const occupancyPercent = (route.currentPassengers / route.busCapacity) * 100;
          return (
            <Card key={route.id} className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4 flex-1">
                  <div className="p-3 bg-primary/10 rounded-lg h-fit">
                    <Navigation className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {language === 'ar' ? route.nameAr : route.nameFr}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium text-gray-900">{route.distance}</span>
                        <p className="text-xs">{language === 'ar' ? 'المسافة' : 'Distance'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">{route.duration}</span>
                        <p className="text-xs">{language === 'ar' ? 'المدة' : 'Durée'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">{route.departureTime}</span>
                        <p className="text-xs">{language === 'ar' ? 'الانطلاق' : 'Départ'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-primary hover:bg-primary/10">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'ar' ? 'الحجز' : 'Réservations'}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {route.currentPassengers}/{route.busCapacity}
                  </span>
                </div>
                <Progress value={occupancyPercent} className="h-2" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
