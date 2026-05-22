'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Building2 } from 'lucide-react';
import institutions from '@/data/institutions.json';

interface InstitutionStepProps {
  onNext: (institution: string) => void;
  onPrevious: () => void;
}

export function InstitutionStep({ onNext, onPrevious }: InstitutionStepProps) {
  const { t, language } = useLanguage();
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedInstitution) {
      onNext(selectedInstitution);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center mb-8">
        <div className="p-6 rounded-full bg-emerald-100">
          <Building2 className="w-12 h-12 text-emerald-600" />
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 text-center">
          {t('register.institution')}
        </h2>
        <p className="text-lg text-gray-600 text-center font-medium">
          {t('register.institution')}
        </p>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {institutions.map((inst) => {
          const isLawFaculty = inst.id === 'inst-001';
          const instName = language === 'ar' ? inst.nameAr : inst.nameFr;
          
          return (
            <button
              key={inst.id}
              onClick={() => setSelectedInstitution(inst.nameAr)}
              className={`w-full p-5 md:p-6 rounded-2xl border-2 text-left transition-all duration-500 ${
                selectedInstitution === inst.nameAr
                  ? 'border-emerald-600 bg-emerald-50 shadow-lg shadow-emerald-600/15 scale-[1.01]'
                  : isLawFaculty
                  ? 'border-emerald-400 hover:border-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 hover:scale-[1.005]'
                  : 'border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50 hover:scale-[1.005]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-black text-xl text-gray-900 mb-1">{instName}</div>
                  <div className="text-base text-gray-600 font-medium">
                    {language === 'ar' ? inst.university : inst.universityEn}
                  </div>
                </div>
                {isLawFaculty && (
                  <span className="px-3 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl">
                    {language === 'ar' ? 'مميزة' : 'Vedette'}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-5 pt-4">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-16 text-xl font-bold rounded-2xl border-2"
          onClick={onPrevious}
        >
          {t('common.previous')}
        </Button>
        <Button
          size="lg"
          className="flex-1 h-16 text-xl font-black rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
          onClick={handleNext}
          disabled={!selectedInstitution}
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
}
