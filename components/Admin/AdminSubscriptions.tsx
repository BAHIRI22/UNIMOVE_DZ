'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import subscriptions from '@/data/subscriptions.json';
import { Edit2, Trash2 } from 'lucide-react';

export function AdminSubscriptions() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('admin.subscriptions')}</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {subscriptions.map((sub) => {
          const subType = sub.id.split('-')[1];
          const subName = language === 'ar' ? sub.typeAr : sub.typeFr;
          
          return (
            <Card key={sub.id} className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{subName}</h3>
                  <div className="text-3xl font-bold text-primary">
                    {sub.price}
                    <span className="text-sm text-gray-600 ml-1">DA</span>
                  </div>
                </div>

                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-gray-900">{sub.validity}</span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-gray-900">{sub.trips}</span> {language === 'ar' ? 'رحلة' : 'trajets'}
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-700">
                    {sub.description}
                  </p>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-primary hover:bg-primary/10"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    {t('common.edit')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
