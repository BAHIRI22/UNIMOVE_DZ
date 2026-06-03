'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { HelpCircle, Phone, Mail, MessageSquare, Book, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
  const { language } = useLanguage();
  const router = useRouter();

  const helpSections = [
    {
      icon: Book,
      title: language === 'ar' ? 'دليل الاستخدام' : 'Guide d\'utilisation',
      titleAr: 'دليل الاستخدام',
      description: language === 'ar' ? 'تعلم كيفية استخدام UNIMOVE-DZ' : 'Apprendre à utiliser UNIMOVE-DZ',
      path: '/demo',
    },
    {
      icon: MessageSquare,
      title: language === 'ar' ? 'الدعم الفني' : 'Support technique',
      titleAr: 'الدعم الفني',
      description: language === 'ar' ? 'تواصل معنا للحصول على المساعدة' : 'Contactez-nous pour obtenir de l\'aide',
      path: '/support',
    },
    {
      icon: Phone,
      title: language === 'ar' ? 'اتصال طارئ' : 'Appel d\'urgence',
      titleAr: 'اتصال طارئ',
      description: language === 'ar' ? 'للمواقف الطارئة فقط' : 'Pour les situations d\'urgence uniquement',
      path: '/emergency',
    },
  ];

  const faqs = [
    {
      question: language === 'ar' ? 'كيف أسجل في UNIMOVE-DZ؟' : 'Comment s\'inscrire à UNIMOVE-DZ?',
      answer: language === 'ar'
        ? 'انتقل إلى صفحة التسجيل، أدخل رقم هاتفك، وأدخل رمز OTP المرسل.'
        : 'Allez sur la page d\'inscription, entrez votre numéro de téléphone et entrez le code OTP envoyé.',
    },
    {
      question: language === 'ar' ? 'كيف أحجز مقعد؟' : 'Comment réserver une place?',
      answer: language === 'ar'
        ? 'انتقل إلى الحجز، اختر المسار والتاريخ، وأكد الحجز.'
        : 'Allez sur Réservation, choisissez la ligne et la date, et confirmez la réservation.',
    },
    {
      question: language === 'ar' ? 'كيف أحصل على بطاقة QR؟' : 'Comment obtenir une carte QR?',
      answer: language === 'ar'
        ? 'بعد الحجز، انتقل إلى بطاقتي لعرض بطاقة QR الرقمية.'
        : 'Après réservation, allez sur Ma carte pour afficher la carte QR numérique.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="relative text-center">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'المساعدة' : 'Aide'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' ? 'UNIMOVE-DZ' : 'UNIMOVE-DZ'}
          </p>
        </div>

        <Card className="p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {language === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'Comment pouvons-nous vous aider?'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {helpSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.path}
                  onClick={() => router.push(section.path)}
                  className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all text-left"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {language === 'ar' ? section.titleAr : section.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {section.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-bold text-gray-900">
              {language === 'ar' ? 'الأسئلة الشائعة' : 'Questions fréquentes'}
            </h3>
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  {language === 'ar' ? 'اتصل بنا' : 'Contactez-nous'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'support@unimove-dz.dz' : 'support@unimove-dz.dz'}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-primary hover:underline">
                {language === 'ar' ? 'سياسة الخصوصية' : 'Politique de confidentialité'}
              </Link>
              <Link href="/terms" className="text-sm text-primary hover:underline">
                {language === 'ar' ? 'الشروط والأحكام' : 'Conditions d\'utilisation'}
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
