'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Award, GraduationCap, User, Code, Heart } from 'lucide-react';
import Link from 'next/link';

export default function CreditsPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'الاعتمادات' : 'Crédits'}
          </h1>
          <p className="text-gray-600">
            UNIMOVE-DZ
          </p>
        </div>

        {/* Project Info */}
        <Card className="p-8 border-2 border-primary bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">UNIMOVE-DZ</h2>
              <p className="text-lg text-primary font-medium">
                {language === 'ar' ? 'الجامعة أقرب، أسهل، و أأمن' : 'L\'université plus proche, plus facile et plus sûre'}
              </p>
            </div>
          </div>
        </Card>

        {/* Student Info */}
        <Card className="p-8 border border-gray-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'ar' ? 'الطالبة' : 'Étudiante'}
              </h3>
              <p className="text-2xl font-bold text-primary">
                {language === 'ar' ? 'مراح ابتسام' : 'Merah Ibtissam'}
              </p>
            </div>
          </div>
        </Card>

        {/* Supervision */}
        <Card className="p-8 border border-gray-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'ar' ? 'الإشراف' : 'Supervision'}
              </h3>
              <p className="text-2xl font-bold text-primary">
                {language === 'ar' ? 'د:رمدوم نورة' : 'DR RAMDOUM NORA'}
              </p>
            </div>
          </div>
        </Card>

        {/* Development */}
        <Card className="p-8 border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'ar' ? 'مشروع UNIMOVE-DZ' : 'Projet UNIMOVE-DZ'}
              </h3>
              <p className="text-2xl font-bold text-emerald-700">
                {language === 'ar' ? 'مشروع UNIMOVE-DZ' : 'Projet UNIMOVE-DZ'}
              </p>
            </div>
          </div>
        </Card>

        {/* Academic Info */}
        <Card className="p-8 border border-gray-200">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'السنة' : 'Année'}
                </p>
                <p className="font-bold text-gray-900">
                  {language === 'ar' ? 'ثانية ماستر' : '2ème Master'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'التخصص' : 'Spécialisation'}
                </p>
                <p className="font-bold text-gray-900">
                  {language === 'ar' ? 'قانون عام' : 'Droit Général'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'الكلية' : 'Faculté'}
                </p>
                <p className="font-bold text-gray-900">
                  {language === 'ar' ? 'كلية الحقوق والعلوم السياسية' : 'Faculté de Droit et Sciences Politiques'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'الجامعة' : 'Université'}
                </p>
                <p className="font-bold text-gray-900">
                  {language === 'ar' ? 'جامعة الجيلالي اليابس سيدي بلعباس 19 مارس 1962' : 'Université Djillali Liabes de Sidi Bel Abbès 19 Mars 1962'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'السنة الجامعية' : 'Année Universitaire'}
                </p>
                <p className="font-bold text-gray-900">
                  2025/2026
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <Card className="p-6 border border-gray-200 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Heart className="w-5 h-5 text-red-500" />
            <p className="text-sm">
              {language === 'ar' ? 'صنع بكل حب' : 'Fait avec amour'}
            </p>
          </div>
          <div className="flex gap-4 justify-center mt-4">
            <Link href="/privacy" className="text-sm text-primary hover:underline">
              {language === 'ar' ? 'سياسة الخصوصية' : 'Politique de confidentialité'}
            </Link>
            <Link href="/terms" className="text-sm text-primary hover:underline">
              {language === 'ar' ? 'الشروط والأحكام' : 'Conditions d\'utilisation'}
            </Link>
            <Link href="/help" className="text-sm text-primary hover:underline">
              {language === 'ar' ? 'المساعدة' : 'Aide'}
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
