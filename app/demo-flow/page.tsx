'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { DemoStepCard } from '@/components/DemoStepCard';
import { DemoProgress } from '@/components/DemoProgress';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CreditCard,
  Gauge,
  Headphones,
  LayoutDashboard,
  QrCode,
  ShieldCheck,
  Smartphone,
  UserCog,
  Users,
} from 'lucide-react';

export default function DemoFlowPage() {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      icon: Smartphone,
      title: language === 'ar' ? 'التسجيل السريع برقم الهاتف (OTP Test Mode)' : 'Inscription OTP Test Mode',
      description: language === 'ar'
        ? 'شرح طريقة تسجيل حساب جديد للطلبة والأساتذة برقم الهاتف وكود فحص تجريبي (123456) آمن بالكامل ومستقل.'
        : 'Présentation de l’inscription simplifiée par numéro de téléphone avec code OTP de test (123456) sécurisé.',
      href: '/register',
    },
    {
      icon: Users,
      title: language === 'ar' ? 'نوع البروفايل والتحقق من الهوية' : 'Profil & Vérification d’Identité',
      description: language === 'ar'
        ? 'اختيار بروفايل طالب أو أستاذ مع ميزة تحميل إثبات الهوية الرقمية أو الورقية للحصول على الامتيازات والتخفيضات الاستثنائية.'
        : 'Sélectionner le profil d’étudiant ou d’enseignant et soumettre un justificatif d’identité pour débloquer les tarifs réduits.',
      href: '/profile',
    },
    {
      icon: Gauge,
      title: language === 'ar' ? 'معالج حجز الرحلات ثنائية الاتجاه (Aller / Retour)' : 'Réservation de Trajet Bidirectionnel',
      description: language === 'ar'
        ? 'حجز الرحلات الذكية والميزات الحصرية مع خيار الحجز بالاتجاهين: ذهاب (من السكن إلى الكلية) أو عودة (من الكلية إلى السكن) لتلبية الاحتياجات اليومية.'
        : 'Réservation intelligente avec option de direction flexible : Aller (Domicile ◀ Université) ou Retour (Université ◀ Domicile) selon l’emploi du temps.',
      href: '/reservation',
    },
    {
      icon: CreditCard,
      title: language === 'ar' ? 'بوابة الدفع وتجربة طرق الدفع' : 'Passerelle de Paiement Sécurisée',
      description: language === 'ar'
        ? 'بوابة دفع إلكتروني آمنة تظهر للمستخدم بعد تأكيد الحجز مباشرة، وتدعم طرق دفع وطنية متعددة (بريدي موب، الذهبية، CIB، أو نقداً عند الركوب).'
        : 'Redirection automatique après réservation vers le portail de paiement sécurisé prenant en charge BaridiMob, Edahabia, CIB, TPE et Espèces.',
      href: '/payments',
    },
    {
      icon: QrCode,
      title: language === 'ar' ? 'بطاقة العضوية الرقمية الذكية (Digital QR Card)' : 'Génération de Carte Digitale QR/NFC',
      description: language === 'ar'
        ? 'توليد بطاقة نقل رقمية فريدة تظهر حالة الاشتراك (يومي، أسبوعي، شهري، سنوي)، وتحمل أكواد NFC وQR حقيقية للصعود السريع للحافلة.'
        : 'Création d’une carte d’abonné digitale haut de gamme avec NFC simulé et QR Code dynamique affichant le statut de l’abonnement.',
      href: '/my-card',
    },
    {
      icon: LayoutDashboard,
      title: language === 'ar' ? 'لوحة تحكم الطالب والرحلات المحجوزة' : 'Tableau de Bord Étudiant',
      description: language === 'ar'
        ? 'لوحة تحكم مركزية للطالب تمكنه من استعراض رحلاته القادمة، تحميل الوصولات الرسمية، وتتبع الحافلات مباشرة على الخريطة.'
        : 'Dashboard centralisé pour suivre l’état des réservations, imprimer les reçus officiels, et consulter le solde et les trajets effectués.',
      href: '/dashboard',
    },
    {
      icon: Bell,
      title: language === 'ar' ? 'الإشعارات وتتبع الرحلات المباشر' : 'Notifications & Suivi GPS en Direct',
      description: language === 'ar'
        ? 'نظام إشعارات ذكي وتنبيهات فورية ومباشرة للأمان، واقتراب الحافلات، والمسارات المقترحة لجامعة الجيلالي اليابس.'
        : 'Système d’alerte intelligent informant l’étudiant de l’approche du bus, des horaires modifiés et des trajets optimisés.',
      href: '/notifications',
    },
    {
      icon: Headphones,
      title: language === 'ar' ? 'دعم مستخدمي النقل الجامعي والشكاوى' : 'Support Client & Gestion des Réclamations',
      description: language === 'ar'
        ? 'واجهة لتقديم المساعدة، الإبلاغ عن المفقودات، وإرسال الشكاوى والملاحظات الفورية لضمان تجربة نقل جامعي راقية.'
        : 'Interface d’assistance pour signaler un objet perdu, envoyer une réclamation ou demander de l’aide directement à l’administration.',
      href: '/support',
    },
    {
      icon: UserCog,
      title: language === 'ar' ? 'لوحة القيادة الإدارية الشاملة' : 'Centre de Contrôle Administratif (Admin)',
      description: language === 'ar'
        ? 'لوحة إدارة متكاملة لمراقبة الأسطول، السائقين، والتحقق من حسابات الطلبة، ومعالجة الاشتراكات والحجوزات لجامعة سيدي بلعباس.'
        : 'Espace d’administration complet pour superviser les lignes de bus, valider les profils étudiants, et analyser les statistiques financières.',
      href: '/admin',
    },
    {
      icon: BriefcaseBusiness,
      title: language === 'ar' ? 'نموذج الأعمال والمشروع الناشئ (SaaS)' : 'Modèle Économique (Business Model)',
      description: language === 'ar'
        ? 'عرض نموذج الأعمال والقيمة المضافة المقترحة وشرائح العملاء، ومصادر الدخل السبعة الفعالة لتشغيل مشروع UNIMOVE-DZ.'
        : 'Présentation de la proposition de valeur, des segments de marché cibles et des 7 sources de revenus durables du projet.',
      href: '/business-model',
    },
    {
      icon: ChartNoAxesCombined,
      title: language === 'ar' ? 'الخطة والتحليلات المالية الخمسية' : 'Plan Financier & Projections sur 5 Ans',
      description: language === 'ar'
        ? 'عرض المؤشرات المالية الحيوية، التكاليف التشغيلية، توقعات الإيرادات والأرباح المتنامية على مدار خمس سنوات قادمة لإثبات الجدوى الاقتصادية.'
        : 'Analyse des KPI financiers clés, coûts, revenus de ventes et projections d’activité sur 5 ans démontrant la haute rentabilité.',
      href: '/financial-plan',
    },
  ];

  const activeStep = demoSteps[currentStep];
  const ActiveStepIcon = activeStep.icon;

  const goNext = () => setCurrentStep((step) => Math.min(step + 1, demoSteps.length - 1));
  const goBack = () => setCurrentStep((step) => Math.max(step - 1, 0));

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Link href="/demo" className="inline-flex items-center gap-2 text-sm font-black text-emerald-700 hover:text-emerald-800">
                <ArrowLeft className="h-4 w-4" />
                {language === 'ar' ? 'العودة إلى صفحة العرض' : 'Retour à la présentation'}
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-slate-800">
                {language === 'ar' ? 'رجوع للوحة التحكم' : 'Retour au Dashboard'}
              </Link>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {language === 'ar' ? 'Parcours démonstration UNIMOVE-DZ' : 'Parcours démonstration UNIMOVE-DZ'}
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-600">
              {language === 'ar'
                ? 'مسار عرض جاهز أمام لجنة أو مستثمرين: من OTP التجريبي إلى النموذج المالي.'
                : 'Un parcours prêt pour jury ou investisseurs : du OTP test au plan financier.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard" className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5">
              {language === 'ar' ? 'Dashboard' : 'Aller au dashboard'}
            </Link>
            <Link href="/my-card" className="inline-flex h-12 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5">
              {language === 'ar' ? 'QR Card' : 'Voir QR Card'}
            </Link>
          </div>
        </div>

        <DemoProgress currentStep={currentStep} totalSteps={demoSteps.length} label={language === 'ar' ? `الخطوة ${currentStep + 1} من ${demoSteps.length}` : `Étape ${currentStep + 1} sur ${demoSteps.length}`} />

        <Card className="overflow-hidden rounded-[2rem] border-emerald-200 bg-slate-950 p-8 text-white shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div className="flex h-44 items-center justify-center rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl md:h-64">
              <ActiveStepIcon className="h-20 w-20 md:h-28 md:w-28" />
            </div>
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-300/15 px-4 py-2 text-sm font-black text-emerald-100">
                <ShieldCheck className="h-4 w-4" />
                {language === 'ar' ? 'وضع العرض' : 'Présentation Mode'}
              </div>
              <h2 className="text-3xl font-black md:text-5xl">{activeStep.title}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">{activeStep.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={activeStep.href} className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 text-base font-black text-white shadow-xl shadow-emerald-500/25 transition hover:-translate-y-1">
                  {language === 'ar' ? 'عرض هذه الصفحة' : 'Voir cette page'}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Button onClick={goBack} disabled={currentStep === 0} variant="outline" className="h-14 rounded-2xl border-white/15 bg-white/10 px-6 text-base font-black text-white hover:bg-white/15">
                  {language === 'ar' ? 'رجوع' : 'Retour'}
                </Button>
                <Button onClick={goNext} disabled={currentStep === demoSteps.length - 1} className="h-14 rounded-2xl bg-white px-6 text-base font-black text-slate-950 hover:bg-emerald-50">
                  {language === 'ar' ? 'الخطوة التالية' : 'Étape suivante'}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {demoSteps.map((step, index) => (
            <button key={step.title} type="button" onClick={() => setCurrentStep(index)} className="text-left">
              <DemoStepCard
                step={index + 1}
                title={step.title}
                description={step.description}
                href={step.href}
                icon={step.icon}
                active={index === currentStep}
                completed={index < currentStep}
                actionLabel={language === 'ar' ? 'فتح' : 'Ouvrir'}
              />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
