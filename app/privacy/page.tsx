'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Shield, Eye, Lock, Cookie } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  const { language } = useLanguage();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative text-center mb-8">
          <div
            className={`absolute ${language === 'ar' ? 'top-0 right-0' : 'top-0 left-0'}`}
          >
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="h-10 rounded-xl font-bold gap-2 text-gray-900 bg-white/70 hover:bg-white/80 border border-gray-200"
            >
              <span className={`${language === 'ar' ? 'rotate-180' : ''}`}>←</span>
              {language === 'ar' ? 'رجوع' : 'Retour'}
            </Button>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'سياسة الخصوصية' : 'Politique de Confidentialité'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' ? 'UNIMOVE-DZ' : 'UNIMOVE-DZ'}
          </p>
        </div>

        <Card className="p-8 border border-gray-200">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === 'ar' ? 'التزامنا بخصوصيتك' : 'Notre engagement envers votre confidentialité'}
                </h2>
                <p className="text-gray-600">
                  {language === 'ar'
                    ? 'نحن نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية.'
                    : 'Nous respectons votre vie privée et nous nous engageons à protéger vos informations personnelles.'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {language === 'ar' ? 'البيانات التي نجمعها' : 'Données que nous collectons'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ar'
                      ? 'رقم الهاتف، الاسم، البريد الإلكتروني (اختياري)، المعلومات الأكاديمية، بيانات الحجز، بيانات الدفع.'
                      : 'Numéro de téléphone, nom, email (optionnel), informations académiques, données de réservation, données de paiement.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {language === 'ar' ? 'كيف نحمي بياناتك' : 'Comment nous protégeons vos données'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ar'
                      ? 'نستخدم تشفير SSL، التحقق بخطوتين، وحماية البيانات في localStorage.'
                      : 'Nous utilisons le cryptage SSL, l\'authentification à deux facteurs, et la protection des données dans localStorage.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {language === 'ar' ? 'ملفات تعريف الارتباط' : 'Cookies'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ar'
                      ? 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك. يمكنك تعطيلها في إعدادات المتصفح.'
                      : 'Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez les désactiver dans les paramètres de votre navigateur.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                {language === 'ar'
                  ? 'باستخدامك UNIMOVE-DZ، أنت توافق على سياسة الخصوصية هذه.'
                  : 'En utilisant UNIMOVE-DZ, vous acceptez cette politique de confidentialité.'}
              </p>
              <div className="flex gap-4">
                <Link href="/terms" className="text-sm text-primary hover:underline">
                  {language === 'ar' ? 'الشروط والأحكام' : 'Conditions d\'utilisation'}
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
