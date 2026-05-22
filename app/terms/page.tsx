'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { FileText, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'الشروط والأحكام' : 'Conditions d\'Utilisation'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' ? 'UNIMOVE-DZ' : 'UNIMOVE-DZ'}
          </p>
        </div>

        <Card className="p-8 border border-gray-200">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === 'ar' ? 'شروط الاستخدام' : 'Conditions d\'utilisation'}
                </h2>
                <p className="text-gray-600">
                  {language === 'ar'
                    ? 'يرجى قراءة هذه الشروط بعناية قبل استخدام UNIMOVE-DZ.'
                    : 'Veuillez lire ces conditions attentivement avant d\'utiliser UNIMOVE-DZ.'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {language === 'ar' ? 'القبول بالشروط' : 'Acceptation des conditions'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ar'
                      ? 'باستخدامك UNIMOVE-DZ، أنت توافق على الالتزام بهذه الشروط.'
                      : 'En utilisant UNIMOVE-DZ, vous acceptez de vous conformer à ces conditions.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {language === 'ar' ? 'الاستخدام المسؤول' : 'Utilisation responsable'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ar'
                      ? 'يجب استخدام الخدمة بشكل مسؤول وعدم الإضرار بالآخرين.'
                      : 'Le service doit être utilisé de manière responsable et sans nuire aux autres.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {language === 'ar' ? 'القيود' : 'Restrictions'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ar'
                      ? 'يحظر استخدام الخدمة لأغراض غير قانونية أو ضارة.'
                      : 'Il est interdit d\'utiliser le service à des fins illégales ou nuisibles.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                {language === 'ar'
                  ? 'آخر تحديث: مايو 2026'
                  : 'Dernière mise à jour: Mai 2026'}
              </p>
              <div className="flex gap-4">
                <Link href="/privacy" className="text-sm text-primary hover:underline">
                  {language === 'ar' ? 'سياسة الخصوصية' : 'Politique de confidentialité'}
                </Link>
                <Link href="/help" className="text-sm text-primary hover:underline">
                  {language === 'ar' ? 'المساعدة' : 'Aide'}
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
