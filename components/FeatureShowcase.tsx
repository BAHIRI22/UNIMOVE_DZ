'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Calendar, QrCode, LayoutDashboard, MessageSquare, MapPin, Users, CreditCard, Bell, Route, Shield, User, Settings } from 'lucide-react';

interface FeatureShowcaseProps {
  onNavigate: (path: string) => void;
}

export function FeatureShowcase({ onNavigate }: FeatureShowcaseProps) {
  const { language } = useLanguage();

  const features = [
    {
      icon: Calendar,
      title: language === 'ar' ? 'الحجز' : 'Réservation',
      titleAr: 'الحجز',
      description: language === 'ar' ? 'حجز المقاعد بسهولة' : 'Réserver des places facilement',
      path: '/bookings',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: QrCode,
      title: language === 'ar' ? 'بطاقة QR' : 'Carte QR',
      titleAr: 'بطاقة QR',
      description: language === 'ar' ? 'بطاقة رقمية آمنة' : 'Carte numérique sécurisée',
      path: '/my-card',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: LayoutDashboard,
      title: language === 'ar' ? 'لوحة التحكم' : 'Tableau de bord',
      titleAr: 'لوحة التحكم',
      description: language === 'ar' ? 'نظرة عامة شاملة' : 'Vue d\'ensemble complète',
      path: '/dashboard',
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      icon: MessageSquare,
      title: language === 'ar' ? 'الدعم' : 'Support',
      titleAr: 'الدعم',
      description: language === 'ar' ? 'مساعدة على مدار الساعة' : 'Assistance 24/7',
      path: '/support',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: MapPin,
      title: language === 'ar' ? 'التتبع' : 'Suivi',
      titleAr: 'التتبع',
      description: language === 'ar' ? 'تتبع GPS في الوقت الفعلي' : 'Suivi GPS en temps réel',
      path: '/live-tracking',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: Route,
      title: language === 'ar' ? 'الخطوط' : 'Lignes',
      titleAr: 'الخطوط',
      description: language === 'ar' ? 'جميع خطوط الحافلات' : 'Toutes les lignes de bus',
      path: '/routes',
      color: 'bg-cyan-100 text-cyan-600',
    },
    {
      icon: CreditCard,
      title: language === 'ar' ? 'الاشتراكات' : 'Abonnements',
      titleAr: 'الاشتراكات',
      description: language === 'ar' ? 'خطط مرنة' : 'Plans flexibles',
      path: '/subscriptions',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: Bell,
      title: language === 'ar' ? 'الإشعارات' : 'Notifications',
      titleAr: 'الإشعارات',
      description: language === 'ar' ? 'تنبيهات فورية' : 'Alertes instantanées',
      path: '/notifications',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: User,
      title: language === 'ar' ? 'الملف الشخصي' : 'Profil',
      titleAr: 'الملف الشخصي',
      description: language === 'ar' ? 'إدارة الحساب' : 'Gestion du compte',
      path: '/profile',
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      icon: Settings,
      title: language === 'ar' ? 'الإعدادات' : 'Paramètres',
      titleAr: 'الإعدادات',
      description: language === 'ar' ? 'تخصيص التطبيق' : 'Personnaliser l\'application',
      path: '/settings',
      color: 'bg-gray-100 text-gray-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {language === 'ar' ? 'الميزات الرئيسية' : 'Fonctionnalités Principales'}
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <button
              key={feature.path}
              onClick={() => onNavigate(feature.path)}
              className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all text-left group"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                {language === 'ar' ? feature.titleAr : feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
