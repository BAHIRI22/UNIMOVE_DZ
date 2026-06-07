'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ProjectPresentation } from '@/components/ProjectPresentation';
import { FeatureShowcase } from '@/components/FeatureShowcase';
import { AcademicInfoCard } from '@/components/AcademicInfoCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function PresentationPage() {
  const { language } = useLanguage();
  const router = useRouter();

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="relative text-center space-y-4">
          <div className={`absolute ${language === 'ar' ? 'top-0 right-0' : 'top-0 left-0'}`}>
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="h-10 rounded-xl font-bold gap-2 text-gray-900 bg-white/70 hover:bg-white/80 border border-gray-200"
            >
              <span className={`${language === 'ar' ? 'rotate-180' : ''}`}>←</span>
              {language === 'ar' ? 'رجوع' : 'Retour'}
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900">
              UNIMOVE-DZ
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            {language === 'ar'
              ? 'نظام النقل الجامعي الذكي'
              : 'Système de Transport Universitaire Intelligent'}
          </p>
          <p className="text-lg text-gray-500">
            {language === 'ar'
              ? 'عرض المشروع أمام اللجنة الجامعية'
              : 'Présentation du projet devant le jury universitaire'}
          </p>
        </div>

        {/* Start Demo Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => router.push('/demo')}
            className="h-14 px-8 bg-primary hover:bg-secondary text-white flex items-center gap-2 text-lg"
          >
            <Play className="w-6 h-6" />
            {language === 'ar' ? 'بدء العرض التوضيحي' : 'Démarrer la démonstration'}
          </Button>
        </div>

        {/* Academic Info */}
        <AcademicInfoCard />

        {/* Project Presentation */}
        <ProjectPresentation />

        {/* Feature Showcase */}
        <FeatureShowcase onNavigate={(path) => router.push(path)} />

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            onClick={() => router.push('/demo')}
            className="h-14 bg-primary hover:bg-secondary text-white flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            {language === 'ar' ? 'بدء العرض' : 'Démarrer la présentation'}
          </Button>
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="h-14 flex items-center justify-center gap-2"
          >
            {language === 'ar' ? 'العودة للرئيسية' : 'Retour à l\'accueil'}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Footer Info */}
        <Card className="p-6 border border-gray-200 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="text-center space-y-2">
            <h3 className="font-bold text-gray-900">
              {language === 'ar' ? 'معلومات العرض' : 'Informations de présentation'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'ar'
                ? 'استخدم أي رقم هاتف مع الكود 123456'
                : 'Utilisez n\'importe quel numéro avec le code 123456'}
            </p>
            <p className="text-sm text-gray-600">
              {language === 'ar'
                ? 'جميع les données sont sauvegardées dans localStorage'
                : 'Toutes les données sont sauvegardées dans localStorage'}
            </p>
          </div>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  );
}
