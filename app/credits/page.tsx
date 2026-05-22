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
            {language === 'ar' ? 'Ø§Ù„Ø§Ø¹ØªÙ…Ø§Ø¯Ø§Øª' : 'CrÃ©dits'}
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
                {language === 'ar' ? 'Ø§Ù„Ø¬Ø§Ù…Ø¹Ø© Ø£Ù‚Ø±Ø¨ØŒ Ø£Ø³Ù‡Ù„ØŒ Ùˆ Ø£Ø£Ù…Ù†' : 'L\'universitÃ© plus proche, plus facile et plus sÃ»re'}
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
                {language === 'ar' ? 'Ø§Ù„Ø·Ø§Ù„Ø¨Ø©' : 'Ã‰tudiante'}
              </h3>
              <p className="text-2xl font-bold text-primary">
                {language === 'ar' ? 'Ù…Ø±Ø§Ø­ Ø§Ø¨ØªØ³Ø§Ù…' : 'Merah Ibtissam'}
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
                {language === 'ar' ? 'Ø§Ù„Ø¥Ø´Ø±Ø§Ù' : 'Supervision'}
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
                {language === 'ar' ? 'Ø§Ù„Ø¥Ù†Ø¬Ø§Ø² ÙˆØ§Ù„ØªØ·ÙˆÙŠØ±' : 'RÃ©alisation et DÃ©veloppement'}
              </h3>
              <p className="text-2xl font-bold text-emerald-700">
                DR: BEHIRI ABDELKADER / Ø¯ Ø¨Ø­ÙŠØ±ÙŠ Ø¹Ø¨Ø¯ Ø§Ù„Ù‚Ø§Ø¯Ø±
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
                  {language === 'ar' ? 'Ø§Ù„Ø³Ù†Ø©' : 'AnnÃ©e'}
                </p>
                <p className="font-bold text-gray-900">
                  {language === 'ar' ? 'Ø«Ø§Ù†ÙŠØ© Ù…Ø§Ø³ØªØ±' : '2Ã¨me Master'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'Ø§Ù„ØªØ®ØµØµ' : 'SpÃ©cialisation'}
                </p>
                <p className="font-bold text-gray-900">
                  {language === 'ar' ? 'Ù‚Ø§Ù†ÙˆÙ† Ø¹Ø§Ù…' : 'Droit GÃ©nÃ©ral'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'Ø§Ù„ÙƒÙ„ÙŠØ©' : 'FacultÃ©'}
                </p>
                <p className="font-bold text-gray-900">
                  {language === 'ar' ? 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø­Ù‚ÙˆÙ‚ ÙˆØ§Ù„Ø¹Ù„ÙˆÙ… Ø§Ù„Ø³ÙŠØ§Ø³ÙŠØ©' : 'FacultÃ© de Droit et Sciences Politiques'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'Ø§Ù„Ø¬Ø§Ù…Ø¹Ø©' : 'UniversitÃ©'}
                </p>
                <p className="font-bold text-gray-900">
                  {language === 'ar' ? 'Ø¬Ø§Ù…Ø¹Ø© Ø§Ù„Ø¬ÙŠÙ„Ø§Ù„ÙŠ Ø§Ù„ÙŠØ§Ø¨Ø³ Ø³ÙŠØ¯ÙŠ Ø¨Ù„Ø¹Ø¨Ø§Ø³ 19 Ù…Ø§Ø±Ø³ 1962' : 'UniversitÃ© Djillali Liabes de Sidi Bel AbbÃ¨s 19 Mars 1962'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'Ø§Ù„Ø³Ù†Ø© Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠØ©' : 'AnnÃ©e Universitaire'}
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
              {language === 'ar' ? 'ØµÙ†Ø¹ Ø¨ÙƒÙ„ Ø­Ø¨' : 'Fait avec amour'}
            </p>
          </div>
          <div className="flex gap-4 justify-center mt-4">
            <Link href="/privacy" className="text-sm text-primary hover:underline">
              {language === 'ar' ? 'Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø®ØµÙˆØµÙŠØ©' : 'Politique de confidentialitÃ©'}
            </Link>
            <Link href="/terms" className="text-sm text-primary hover:underline">
              {language === 'ar' ? 'Ø§Ù„Ø´Ø±ÙˆØ· ÙˆØ§Ù„Ø£Ø­ÙƒØ§Ù…' : 'Conditions d\'utilisation'}
            </Link>
            <Link href="/help" className="text-sm text-primary hover:underline">
              {language === 'ar' ? 'Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø©' : 'Aide'}
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
