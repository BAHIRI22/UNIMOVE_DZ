'use client';

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { StopCard } from '@/components/StopCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { mockStops } from '@/mock/routes-data';
import { Card } from '@/components/ui/card';
import { MapPin, Accessibility, Ruler, Clock, Footprints } from 'lucide-react';

export default function StopsPage() {
  const { language } = useLanguage();

  const majorStops = mockStops.filter(stop => stop.isMajor);
  const allStops = mockStops;

  return (
    <DashboardLayout role="user">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'المحطات' : 'Arrêts'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar'
              ? 'جميع محطات الحافلات الجامعية في سيدي بلعباس'
              : 'Tous les arrêts de bus universitaires à Sidi Bel Abbès'}
          </p>
        </div>

        {/* Major Stops */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'المحطات الرئيسية' : 'Arrêts principaux'}
          </h2>
          <div className="space-y-4">
            {majorStops.map((stop, index) => (
              <StopCard
                key={stop.id}
                stop={stop}
                index={index}
                isCurrent={index === 0}
                isNext={index === 1}
              />
            ))}
          </div>
        </div>

        {/* All Stops */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'جميع المحطات' : 'Tous les arrêts'}
          </h2>
          <Card className="p-6 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-4">
              {allStops.map((stop) => (
                <div
                  key={stop.id}
                  className={`p-4 rounded-lg border ${
                    stop.isMajor ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      stop.isMajor ? 'bg-emerald-500' : 'bg-gray-400'
                    }`}>
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold ${stop.isMajor ? 'text-emerald-900' : 'text-gray-900'}`}>
                        {language === 'ar' ? stop.nameAr : stop.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' ? stop.locationAr : stop.location}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {stop.isMajor && (
                          <div className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium inline-block">
                            {language === 'ar' ? 'رئيسي' : 'Principal'}
                          </div>
                        )}
                        {stop.accessibilityInfo && (
                          <>
                            {stop.accessibilityInfo.hasRamp && (
                              <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium inline-flex items-center gap-1">
                                <Accessibility className="w-3 h-3" />
                                {language === 'ar' ? 'منحدر' : 'Rampe'}
                              </div>
                            )}
                            {stop.accessibilityInfo.hasAccessiblePath && (
                              <div className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium inline-flex items-center gap-1">
                                <Footprints className="w-3 h-3" />
                                {language === 'ar' ? 'مسار سهل' : 'Chemin accessible'}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      {stop.accessibilityInfo && (
                        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                          {stop.accessibilityInfo.distanceKm !== undefined && (
                            <span className="inline-flex items-center gap-1">
                              <Ruler className="w-3 h-3" />
                              {stop.accessibilityInfo.distanceKm} km
                            </span>
                          )}
                          {stop.accessibilityInfo.walkingTimeMinutes !== undefined && (
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {stop.accessibilityInfo.walkingTimeMinutes} {language === 'ar' ? 'د' : 'min'}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Info */}
        <Card className="p-6 border border-gray-200 bg-blue-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                {language === 'ar' ? 'معلومات المحطات' : 'Informations sur les arrêts'}
              </h3>
              <p className="text-sm text-gray-700">
                {language === 'ar'
                  ? 'المحطات الرئيسية هي نقاط التوقف الرئيسية حيث تتوقف جميع الحافلات. المحطات الثانوية قد تتوقف بها حسب المسار.'
                  : 'Les arrêts principaux sont les points d\'arrêt principaux où tous les bus s\'arrêtent. Les arrêts secondaires peuvent être desservis selon la ligne.'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
