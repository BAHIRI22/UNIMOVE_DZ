'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { GraduationCap, User, Award, Calendar, MapPin, Shield } from 'lucide-react';

export function AcademicInfoCard() {
  const { language } = useLanguage();

  return (
    <Card className="p-6 border-2 border-primary bg-gradient-to-br from-primary/10 to-primary/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {language === 'ar' ? 'Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠØ©' : 'Informations AcadÃ©miques'}
        </h2>
      </div>

      <div className="space-y-4">
        {/* Student Info */}
        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-900 mb-1">
              {language === 'ar' ? 'Ø§Ù„Ø·Ø§Ù„Ø¨Ø©' : 'Ã‰tudiante'}
            </div>
            <div className="text-lg font-semibold text-primary">
              {language === 'ar' ? 'Ù…Ø±Ø§Ø­ Ø§Ø¨ØªØ³Ø§Ù…' : 'Merah Ibtissam'}
            </div>
          </div>
        </div>

        {/* Year */}
        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-900 mb-1">
              {language === 'ar' ? 'Ø§Ù„Ø³Ù†Ø©' : 'AnnÃ©e'}
            </div>
            <div className="text-gray-700">
              {language === 'ar' ? 'Ø«Ø§Ù†ÙŠØ© Ù…Ø§Ø³ØªØ±' : '2Ã¨me Master'}
            </div>
          </div>
        </div>

        {/* Specialization */}
        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-900 mb-1">
              {language === 'ar' ? 'Ø§Ù„ØªØ®ØµØµ' : 'SpÃ©cialisation'}
            </div>
            <div className="text-gray-700">
              {language === 'ar' ? 'Ù‚Ø§Ù†ÙˆÙ† Ø¹Ø§Ù…' : 'Droit GÃ©nÃ©ral'}
            </div>
          </div>
        </div>

        {/* Academic Year */}
        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-900 mb-1">
              {language === 'ar' ? 'Ø§Ù„Ø³Ù†Ø© Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠØ©' : 'AnnÃ©e Universitaire'}
            </div>
            <div className="text-gray-700">
              2025/2026
            </div>
          </div>
        </div>

        {/* Faculty */}
        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
          <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-pink-600" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-900 mb-1">
              {language === 'ar' ? 'Ø§Ù„ÙƒÙ„ÙŠØ©' : 'FacultÃ©'}
            </div>
            <div className="text-gray-700">
              {language === 'ar' ? 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø­Ù‚ÙˆÙ‚ ÙˆØ§Ù„Ø¹Ù„ÙˆÙ… Ø§Ù„Ø³ÙŠØ§Ø³ÙŠØ©' : 'FacultÃ© de Droit et Sciences Politiques'}
            </div>
          </div>
        </div>

        {/* University */}
        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-900 mb-1">
              {language === 'ar' ? 'Ø§Ù„Ø¬Ø§Ù…Ø¹Ø©' : 'UniversitÃ©'}
            </div>
            <div className="text-gray-700">
              {language === 'ar' ? 'Ø¬Ø§Ù…Ø¹Ø© Ø§Ù„Ø¬ÙŠÙ„Ø§Ù„ÙŠ Ø§Ù„ÙŠØ§Ø¨Ø³ Ø³ÙŠØ¯ÙŠ Ø¨Ù„Ø¹Ø¨Ø§Ø³ 19 Ù…Ø§Ø±Ø³ 1962' : 'UniversitÃ© Djillali Liabes de Sidi Bel AbbÃ¨s 19 Mars 1962'}
            </div>
          </div>
        </div>

        {/* Supervision */}
        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-900 mb-1">
              {language === 'ar' ? 'Ø§Ù„Ø¥Ø´Ø±Ø§Ù' : 'Supervision'}
            </div>
            <div className="text-gray-700">
              {language === 'ar' ? 'Ø§Ù„Ø¯ÙƒØªÙˆØ±Ø© Ø±Ù…Ø¯ÙˆÙ… Ù†ÙˆØ±Ø©' : 'DR RAMDOUM NORA'}
            </div>
          </div>
        </div>

        {/* Development */}
        <div className="flex items-start gap-4 p-4 bg-primary/10 rounded-xl border border-primary/30">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-900 mb-1">
              {language === 'ar' ? 'Ø§Ù„Ø¥Ù†Ø¬Ø§Ø² ÙˆØ§Ù„ØªØ·ÙˆÙŠØ±' : 'RÃ©alisation et DÃ©veloppement'}
            </div>
            <div className="text-gray-700">
              DR: BEHIRI ABDELKADER / Ø¯ Ø¨Ø­ÙŠØ±ÙŠ Ø¹Ø¨Ø¯ Ø§Ù„Ù‚Ø§Ø¯Ø±
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
