'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';
import { Stop } from '@/types/routes';

interface StopCardProps {
  stop: Stop;
  index?: number;
  isCurrent?: boolean;
  isNext?: boolean;
}

export function StopCard({ stop, index, isCurrent, isNext }: StopCardProps) {
  const { language } = useLanguage();

  return (
    <div className="flex items-start gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
          isCurrent ? 'bg-primary border-primary' :
          isNext ? 'bg-white border-primary' :
          'bg-white border-gray-300'
        }`}>
          {isCurrent ? (
            <Navigation className="w-5 h-5 text-white" />
          ) : (
            <MapPin className={`w-5 h-5 ${isNext ? 'text-primary' : 'text-gray-400'}`} />
          )}
        </div>
        {index !== undefined && index < 4 && (
          <div className={`w-0.5 h-12 ${isCurrent || isNext ? 'bg-primary' : 'bg-gray-300'}`} />
        )}
      </div>

      {/* Stop Info */}
      <Card className={`flex-1 p-4 border ${
        isCurrent ? 'border-primary bg-primary/5' :
        isNext ? 'border-primary/50' :
        'border-gray-200'
      }`}>
        <div className="flex items-start justify-between">
          <div>
            <h4 className={`font-bold ${isCurrent ? 'text-primary' : 'text-gray-900'}`}>
              {language === 'ar' ? stop.nameAr : stop.name}
            </h4>
            <p className="text-sm text-gray-600">
              {language === 'ar' ? stop.locationAr : stop.location}
            </p>
          </div>
          {stop.isMajor && (
            <div className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
              {language === 'ar' ? 'رئيسي' : 'Principal'}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
