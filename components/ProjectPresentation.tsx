'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Target, Lightbulb, Users, Award, Code, Rocket } from 'lucide-react';

export function ProjectPresentation() {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Problem & Solution */}
      <Card className="p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'المشكلة والحل' : 'Problème et Solution'}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-red-50 rounded-xl border border-red-200">
            <h3 className="font-bold text-red-900 mb-2">
              {language === 'ar' ? 'المشكلة' : 'Problème'}
            </h3>
            <p className="text-sm text-red-800">
              {language === 'ar'
                ? 'الطلاب يواجهون صعوبة في التنقل بين الحرم الجامعي والسكن، مع نقص في وسائل النقل الموثوقة والمعلومات الحية عن الحافلات.'
                : 'Les étudiants font face à des difficultés de déplacement entre le campus et le logement, avec un manque de transport fiable et d\'informations en temps réel sur les bus.'}
            </p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <h3 className="font-bold text-emerald-900 mb-2">
              {language === 'ar' ? 'الحل' : 'Solution'}
            </h3>
            <p className="text-sm text-emerald-800">
              {language === 'ar'
                ? 'UNIMOVE-DZ: تطبيق ذكي لإدارة النقل الجامعي مع حجز، تتبع GPS، بطاقة QR، دعم، وإشعارات في الوقت الفعلي.'
                : 'UNIMOVE-DZ: Application intelligente de gestion du transport universitaire avec réservation, suivi GPS, carte QR, support et notifications en temps réel.'}
            </p>
          </div>
        </div>
      </Card>

      {/* Objectives */}
      <Card className="p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'أهداف المشروع' : 'Objectifs du Projet'}
          </h2>
        </div>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span className="text-gray-700">
              {language === 'ar'
                ? 'تسهيل التنقل للطلاب والأساتذة والموظفين'
                : 'Faciliter les déplacements des étudiants, enseignants et personnel'}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span className="text-gray-700">
              {language === 'ar'
                ? 'توفير معلومات دقيقة وفي الوقت الفعلي عن الحافلات'
                : 'Fournir des informations précises et en temps réel sur les bus'}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span className="text-gray-700">
              {language === 'ar'
                ? 'تقليل وقت الانتظار وتحسين تجربة المستخدم'
                : 'Réduire les temps d\'attente et améliorer l\'expérience utilisateur'}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span className="text-gray-700">
              {language === 'ar'
                ? 'رقمنة نظام النقل الجامعي'
                : 'Numériser le système de transport universitaire'}
            </span>
          </li>
        </ul>
      </Card>

      {/* Target Audience */}
      <Card className="p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'الجمهور المستهدف' : 'Public Cible'}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 rounded-xl text-center">
            <div className="text-3xl mb-2">👨‍🎓</div>
            <h3 className="font-bold text-purple-900">
              {language === 'ar' ? 'الطلاب' : 'Étudiants'}
            </h3>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl text-center">
            <div className="text-3xl mb-2">👨‍🏫</div>
            <h3 className="font-bold text-purple-900">
              {language === 'ar' ? 'الأساتذة' : 'Enseignants'}
            </h3>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl text-center">
            <div className="text-3xl mb-2">👨‍💼</div>
            <h3 className="font-bold text-purple-900">
              {language === 'ar' ? 'الموظفون' : 'Personnel'}
            </h3>
          </div>
        </div>
      </Card>

      {/* Advantages */}
      <Card className="p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'المزايا' : 'Avantages'}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="text-gray-700">
              {language === 'ar' ? 'حجز سهل وسريع' : 'Réservation facile et rapide'}
            </span>
          </div>
          <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="text-gray-700">
              {language === 'ar' ? 'تتبع GPS في الوقت الفعلي' : 'Suivi GPS en temps réel'}
            </span>
          </div>
          <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="text-gray-700">
              {language === 'ar' ? 'بطاقة QR آمنة' : 'Carte QR sécurisée'}
            </span>
          </div>
          <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="text-gray-700">
              {language === 'ar' ? 'دعم متعدد اللغات' : 'Support multilingue'}
            </span>
          </div>
        </div>
      </Card>

      {/* Technologies */}
      <Card className="p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Code className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'التقنيات المستخدمة' : 'Technologies Utilisées'}
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-medium">
            Next.js 14
          </div>
          <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-medium">
            React 18
          </div>
          <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-medium">
            TypeScript
          </div>
          <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-medium">
            Tailwind CSS
          </div>
          <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-medium">
            Firebase
          </div>
          <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-medium">
            shadcn/ui
          </div>
          <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-medium">
            Lucide Icons
          </div>
        </div>
      </Card>

      {/* Startup Info */}
      <Card className="p-6 border border-gray-200 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'معلومات المشروع' : 'Informations du Projet'}
          </h2>
        </div>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>{language === 'ar' ? 'الاسم:' : 'Nom:'}</strong> UNIMOVE-DZ
          </p>
          <p>
            <strong>{language === 'ar' ? 'النوع:' : 'Type:'}</strong> {language === 'ar' ? 'نقل جامعي ذكي' : 'Transport universitaire intelligent'}
          </p>
          <p>
            <strong>{language === 'ar' ? 'الموقع:' : 'Lieu:'}</strong> {language === 'ar' ? 'سيدي بلعباس، الجزائر' : 'Sidi Bel Abbès, Algérie'}
          </p>
          <p>
            <strong>{language === 'ar' ? 'السنة:' : 'Année:'}</strong> 2025/2026
          </p>
        </div>
      </Card>
    </div>
  );
}
