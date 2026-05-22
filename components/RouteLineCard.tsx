'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Wifi, Users, ArrowRight } from 'lucide-react';
import { Route } from '@/types/routes';
import { getRouteStatusColor, getRouteStatusLabel } from '@/mock/routes-data';

interface RouteLineCardProps {
  route: Route;
  onViewDetails?: () => void;
}

export function RouteLineCard({ route, onViewDetails }: RouteLineCardProps) {
  const { language } = useLanguage();

  return (
    <Card className="p-6 border border-gray-200 hover:shadow-lg transition-all">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg mb-2">
              {language === 'ar' ? route.nameAr : route.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRouteStatusColor(route.status)}`}>
                {getRouteStatusLabel(route.status, language)}
              </span>
              {route.wifiAvailable && (
                <div className="flex items-center gap-1 text-sm text-emerald-600">
                  <Wifi className="w-4 h-4" />
                  <span>WiFi</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Route Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'الانطلاق' : 'Départ'}
              </div>
              <div className="font-medium text-gray-900">
                {language === 'ar' ? route.departureAr : route.departure}
              </div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'الوصول' : 'Arrivée'}
              </div>
              <div className="font-medium text-gray-900">
                {language === 'ar' ? route.destinationAr : route.destination}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{route.estimatedTime}</div>
            <div className="text-xs text-gray-600">
              {language === 'ar' ? 'دقيقة' : 'min'}
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <MapPin className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{route.distance}</div>
            <div className="text-xs text-gray-600">
              {language === 'ar' ? 'كم' : 'km'}
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Users className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{route.stops.length}</div>
            <div className="text-xs text-gray-600">
              {language === 'ar' ? 'محطة' : 'arrêts'}
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'الجدول' : 'Horaires'}
          </div>
          <div className="flex flex-wrap gap-2">
            {route.schedule.slice(0, 4).map((schedule, index) => (
              <div key={index} className="px-3 py-1 bg-primary/10 rounded-lg text-sm font-medium text-primary">
                {schedule.departureTime}
              </div>
            ))}
          </div>
        </div>

        {/* Action */}
        {onViewDetails && (
          <Button
            onClick={onViewDetails}
            variant="outline"
            className="w-full"
          >
            {language === 'ar' ? 'عرض التفاصيل' : 'Voir les détails'}
          </Button>
        )}
      </div>
    </Card>
  );
}
