'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import institutions from '@/data/institutions.json';
import { Edit2, Trash2, Plus, Building2 } from 'lucide-react';

export function AdminInstitutions() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('admin.institutions')}</h2>
        <Button className="bg-primary hover:bg-secondary text-white">
          <Plus className="w-4 h-4 mr-2" />
          {t('common.add')}
        </Button>
      </div>

      <div className="space-y-3">
        {institutions.map((inst) => (
          <Card key={inst.id} className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                <div className="p-3 bg-primary/10 rounded-lg h-fit">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {language === 'ar' ? inst.nameAr : inst.nameFr}
                    </h3>
                    {inst.featured && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {language === 'ar' ? inst.university : inst.universityEn}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{inst.location}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-primary hover:bg-primary/10"
                >
                  <Edit2 className="w-4 h-4" />
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
        ))}
      </div>
    </div>
  );
}
