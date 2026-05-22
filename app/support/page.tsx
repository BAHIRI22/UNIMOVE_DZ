'use client';

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { SupportCard } from '@/components/SupportCard';
import { EmergencyButton } from '@/components/EmergencyButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare, Search, AlertTriangle, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SupportPage() {
  const { language } = useLanguage();
  const router = useRouter();

  return (
    <DashboardLayout role="user">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {language === 'ar' ? 'الدعم والمساعدة' : 'Support et aide'}
          </h1>
          <p className="text-xl text-slate-600 leading-8">
            {language === 'ar'
              ? 'نحن هنا لمساعدتك في أي وقت'
              : 'Nous sommes là pour vous aider à tout moment'}
          </p>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-2 gap-8">
          <SupportCard
            icon={<MessageSquare className="w-8 h-8" />}
            title="File a Complaint"
            titleAr="تقديم شكوى"
            description="Report issues with your trip, driver, or vehicle"
            descriptionAr="الإبلاغ عن مشاكل في رحلتك أو السائق أو المركبة"
            onClick={() => router.push('/complaints')}
            color="emerald"
          />
          <SupportCard
            icon={<Search className="w-8 h-8" />}
            title="Report Lost Item"
            titleAr="الإبلاغ عن مفقود"
            description="Report items lost on UNIMOVE-DZ buses"
            descriptionAr="الإبلاغ عن مفقودات في حافلات UNIMOVE-DZ"
            onClick={() => router.push('/lost-items')}
            color="blue"
          />
          <SupportCard
            icon={<AlertTriangle className="w-8 h-8" />}
            title="Emergency Help"
            titleAr="مساعدة عاجلة"
            description="Get immediate assistance for urgent situations"
            descriptionAr="احصل على مساعدة فورية للحالات الطارئة"
            onClick={() => router.push('/emergency')}
            color="red"
          />
          <SupportCard
            icon={<Phone className="w-8 h-8" />}
            title="Contact Support"
            titleAr="اتصل بالدعم"
            description="Call our support team directly"
            descriptionAr="اتصل بفريق الدعم مباشرة"
            onClick={() => window.open('tel:+213550000000')}
            color="orange"
          />
        </div>

        {/* Emergency Button */}
        <div className="flex justify-center">
          <EmergencyButton onClick={() => router.push('/emergency')} fixed={false} />
        </div>

        {/* Info */}
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-3xl p-8 shadow-lg">
          <h3 className="font-bold text-gray-900 text-xl mb-4">
            {language === 'ar' ? 'معلومات مهمة' : 'Informations importantes'}
          </h3>
          <ul className="space-y-4 text-base text-slate-700 leading-8">
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 text-xl">•</span>
              <span>
                {language === 'ar'
                  ? 'جميع الشكاوى يتم التعامل معها بسرية تامة'
                  : 'Toutes les réclamations sont traitées dans la plus stricte confidentialité'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 text-xl">•</span>
              <span>
                {language === 'ar'
                  ? 'رقم الطوارئ: 0550 00 00 00'
                  : 'Numéro d\'urgence: 0550 00 00 00'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 text-xl">•</span>
              <span>
                {language === 'ar'
                  ? 'الدعم متاح 24/7'
                  : 'Le support est disponible 24/7'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
