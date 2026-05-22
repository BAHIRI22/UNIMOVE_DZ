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
    { icon: Smartphone, title: language === 'ar' ? 'Inscription avec OTP Test Mode' : 'Inscription avec OTP Test Mode', description: language === 'ar' ? 'عرض التسجيل برقم الهاتف وكود اختبار دون تعديل Firebase OTP.' : 'Présenter l’inscription par téléphone avec code test sans modifier Firebase OTP.', href: '/register' },
    { icon: Users, title: language === 'ar' ? 'Choix profil utilisateur' : 'Choix profil utilisateur', description: language === 'ar' ? 'اختيار طالب، أستاذ، إداري أو مستخدم جامعي.' : 'Choisir étudiant, enseignant, administratif ou utilisateur universitaire.', href: '/profile' },
    { icon: Gauge, title: language === 'ar' ? 'Réservation trajet' : 'Réservation trajet', description: language === 'ar' ? 'تجربة حجز ذكية مع مسار، وقت، مركبة، ومقاعد متاحة.' : 'Expérience réservation intelligente avec trajet, horaire, véhicule et places restantes.', href: '/reservation' },
    { icon: CreditCard, title: language === 'ar' ? 'Paiement simulé' : 'Paiement simulé', description: language === 'ar' ? 'عرض الدفع بالاشتراك أو نقداً مع قابلية تطوير الدفع الإلكتروني.' : 'Présenter le paiement abonnement ou cash avec évolution paiement électronique.', href: '/payments' },
    { icon: QrCode, title: language === 'ar' ? 'Génération QR Card' : 'Génération QR Card', description: language === 'ar' ? 'بطاقة نقل رقمية حديثة مع QR و NFC mock وحالة الاشتراك.' : 'Carte transport digitale moderne avec QR, NFC mock et statut abonnement.', href: '/my-card' },
    { icon: LayoutDashboard, title: language === 'ar' ? 'Dashboard utilisateur' : 'Dashboard utilisateur', description: language === 'ar' ? 'لوحة مستخدم تعرض الإحصائيات، الرحلات، النشاط، والمؤشرات.' : 'Dashboard avec statistiques, trajets, activité et indicateurs utilisateur.', href: '/dashboard' },
    { icon: Bell, title: language === 'ar' ? 'Notifications intelligentes' : 'Notifications intelligentes', description: language === 'ar' ? 'تنبيهات حجز، دفع، مركبة قريبة، تأخر، وأماكن محدودة.' : 'Alertes réservation, paiement, véhicule proche, retard et places limitées.', href: '/notifications' },
    { icon: Headphones, title: language === 'ar' ? 'Support' : 'Support', description: language === 'ar' ? 'إظهار الدعم، الشكاوى، والمساعدة للمستخدمين.' : 'Montrer support, réclamations et assistance utilisateurs.', href: '/support' },
    { icon: UserCog, title: language === 'ar' ? 'Admin panel' : 'Admin panel', description: language === 'ar' ? 'لوحة إدارة للحافلات، المستخدمين، الحجوزات والمسارات.' : 'Gestion des bus, utilisateurs, réservations et itinéraires.', href: '/admin' },
    { icon: BriefcaseBusiness, title: language === 'ar' ? 'Business model' : 'Business model', description: language === 'ar' ? 'عرض نموذج الأعمال والقيمة والسوق ومصادر الدخل.' : 'Présenter modèle économique, valeur, marché et revenus.', href: '/business-model' },
    { icon: ChartNoAxesCombined, title: language === 'ar' ? 'Financial plan' : 'Financial plan', description: language === 'ar' ? 'عرض المؤشرات المالية، التكاليف، الإيرادات، والنمو.' : 'Présenter KPI financiers, coûts, revenus et croissance.', href: '/financial-plan' },
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
            <Link href="/demo" className="mb-4 inline-flex items-center gap-2 text-sm font-black text-emerald-700 hover:text-emerald-800">
              <ArrowLeft className="h-4 w-4" />
              {language === 'ar' ? 'العودة إلى صفحة العرض' : 'Retour à la présentation'}
            </Link>
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
