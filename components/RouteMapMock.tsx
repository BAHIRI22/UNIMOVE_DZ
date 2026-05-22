'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { MapPin, Bus, Wifi } from 'lucide-react';
import { Route, Stop } from '@/types/routes';

interface RouteMapMockProps {
  route: Route;
  currentBusLocation?: { lat: number; lng: number };
}

export function RouteMapMock({ route, currentBusLocation }: RouteMapMockProps) {
  const { language } = useLanguage();

  return (
    <Card className="p-6 border border-gray-200 bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900">
            {language === 'ar' ? 'خريطة المسار' : 'Carte du trajet'}
          </h3>
          {route.wifiAvailable && (
            <div className="flex items-center gap-1 text-sm text-emerald-600">
              <Wifi className="w-4 h-4" />
              <span>WiFi</span>
            </div>
          )}
        </div>

        {/* Mock Map Visualization */}
        <div className="relative h-64 bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-6 grid-rows-6 h-full">
              {[...Array(36)].map((_, i) => (
                <div key={i} className="border border-gray-300" />
              ))}
            </div>
          </div>

          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full">
            <line
              x1="20%"
              y1="80%"
              x2="80%"
              y2="20%"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="8 4"
            />
          </svg>

          {/* Stops */}
          {route.stops.map((stop, index) => {
            const x = 20 + (index * 30);
            const y = 80 - (index * 30);
            return (
              <div
                key={stop.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  index === 0 ? 'bg-emerald-500 border-emerald-600' :
                  index === route.stops.length - 1 ? 'bg-blue-500 border-blue-600' :
                  'bg-white border-gray-400'
                }`}>
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="mt-2 text-xs font-medium text-gray-700 whitespace-nowrap">
                  {language === 'ar' ? stop.nameAr : stop.name}
                </div>
              </div>
            );
          })}

          {/* Bus Location */}
          {currentBusLocation && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: '45%', top: '55%' }}
            >
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                <Bus className="w-5 h-5 text-white" />
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-2 left-2 bg-white/90 rounded-lg p-2 text-xs space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
              <span className="text-gray-700">
                {language === 'ar' ? 'الانطلاق' : 'Départ'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-gray-700">
                {language === 'ar' ? 'الوصول' : 'Arrivée'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-gray-700">
                {language === 'ar' ? 'الحافلة' : 'Bus'}
              </span>
            </div>
          </div>
        </div>

        {/* Route Info */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{route.distance}</div>
            <div className="text-xs text-gray-600">
              {language === 'ar' ? 'كم' : 'km'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{route.estimatedTime}</div>
            <div className="text-xs text-gray-600">
              {language === 'ar' ? 'دقيقة' : 'min'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{route.stops.length}</div>
            <div className="text-xs text-gray-600">
              {language === 'ar' ? 'محطة' : 'arrêts'}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
