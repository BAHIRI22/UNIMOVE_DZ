'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProtectedPageLink } from '@/components/ProtectedPageLink';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Calendar,
  Car,
  CheckCircle2,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wifi,
  Zap,
} from 'lucide-react';

export default function StartupPage() {
  const { language } = useLanguage();
  const router = useRouter();

  const pillars = [
    {
      icon: Target,
      title: language === 'ar' ? 'الرؤية' : 'Vision',
      text: language === 'ar'
        ? 'بناء أول منظومة نقل جامعي ذكية في الجزائر تربط الطالب، الجامعة، السائق، والخدمة الرقمية في تجربة واحدة آمنة ومنظمة.'
        : 'Construire le premier écosystème algérien de mobilité universitaire intelligente reliant étudiant, université, chauffeur et service digital dans une expérience sûre et organisée.',
    },
    {
      icon: Rocket,
      title: language === 'ar' ? 'المهمة' : 'Mission',
      text: language === 'ar'
        ? 'تقليل التأخر، تحسين الأمان، ضمان الحجز، وتقديم خدمة نقل جامعي احترافية قابلة للتوسع اقتصاديا.'
        : 'Réduire les retards, renforcer la sécurité, garantir la réservation et offrir un service de transport universitaire professionnel économiquement scalable.',
    },
    {
      icon: Lightbulb,
      title: language === 'ar' ? 'الابتكار' : 'Innovation',
      text: language === 'ar'
        ? 'منصة تجمع الحجز، QR، GPS، الإشعارات، الاشتراكات، Wi-Fi، والدفع المرن في حل واحد.'
        : 'Une plateforme intégrant réservation, QR, GPS, notifications, abonnements, Wi-Fi et paiement flexible dans une solution unique.',
    },
  ];

  const impact = [
    { icon: Users, value: language === 'ar' ? 'قابل للتأكيد' : 'À confirmer', label: language === 'ar' ? 'طالب مستهدف' : 'Étudiants ciblés' },
    { icon: Car, value: language === 'ar' ? 'قابل للتأكيد' : 'À confirmer', label: language === 'ar' ? 'رحلة يومية' : 'Trajets quotidiens' },
    { icon: TrendingUp, value: '35%', label: language === 'ar' ? 'تقليل التأخير' : 'Réduction retards' },
    { icon: ShieldCheck, value: '24/7', label: language === 'ar' ? 'أمان ودعم' : 'Sécurité & support' },
  ];

  const roadmap = [
    {
      phase: '01',
      title: language === 'ar' ? 'التحقق الجامعي' : 'Validation universitaire',
      text: language === 'ar' ? 'اختبار الخدمة داخل جامعة الجيلالي اليابس وجمع بيانات الاستخدام.' : 'Tester le service au sein de l’Université Djilali Liabès et collecter les données d’usage.',
    },
    {
      phase: '02',
      title: language === 'ar' ? 'إطلاق تجاري' : 'Lancement commercial',
      text: language === 'ar' ? 'تفعيل الاشتراكات، التسعير، والدفع مع تشغيل أسطول أولي من المركبات.' : 'Activer abonnements, tarification et paiement avec une première flotte opérationnelle.',
    },
    {
      phase: '03',
      title: language === 'ar' ? 'التوسع الوطني' : 'Expansion nationale',
      text: language === 'ar' ? 'تكرار النموذج في جامعات أخرى وربط خدمات المطار والسياحة والأحداث.' : 'Répliquer le modèle dans d’autres universités et connecter aéroport, tourisme et événements.',
    },
    {
      phase: '04',
      title: language === 'ar' ? 'ذكاء اصطناعي وتشغيل ذكي' : 'IA & optimisation intelligente',
      text: language === 'ar' ? 'تحسين المسارات، التنبؤ بالطلب، وتحليل الأداء المالي والتشغيلي.' : 'Optimiser itinéraires, prévoir la demande et analyser performance financière et opérationnelle.',
    },
  ];

  const marketOpportunity = [
    { label: language === 'ar' ? 'TAM (السوق الكلي)' : 'TAM (Marché total)', value: language === 'ar' ? '—' : '—', unit: language === 'ar' ? 'السوق المستهدف تقديري ويحتاج إلى تأكيد وفق الإحصائيات الرسمية.' : 'Le marché cible est estimatif et doit être confirmé selon les statistiques officielles.' },
    { label: language === 'ar' ? 'SAM (السوق المخصص)' : 'SAM (Marché adressable)', value: language === 'ar' ? '—' : '—', unit: language === 'ar' ? 'السوق المستهدف تقديري ويحتاج إلى تأكيد وفق الإحصائيات الرسمية.' : 'Le marché cible est estimatif et doit être confirmé selon les statistiques officielles.' },
    { label: language === 'ar' ? 'SOM (السوق القابل للاستحواذ)' : 'SOM (Marché capturable Y3)', value: language === 'ar' ? '—' : '—', unit: language === 'ar' ? 'السوق المستهدف تقديري ويحتاج إلى تأكيد وفق الإحصائيات الرسمية.' : 'Le marché cible est estimatif et doit être confirmé selon les statistiques officielles.' },
  ];

  const outlook = [
    { year: 'Y1', revenue: '10.9M DA', users: '2.5K', partnerships: '2', team: '9' },
    { year: 'Y2', revenue: '19.5M DA', users: '3.4K', partnerships: '3', team: '12' },
    { year: 'Y3', revenue: '36.2M DA', users: '4.5K', partnerships: '5', team: '18' },
    { year: 'Y4', revenue: '68.9M DA', users: '6.5K', partnerships: '7', team: '21' },
    { year: 'Y5', revenue: '132.6M DA', users: '12K', partnerships: '9', team: '29' },
  ];

  const smartFeatures = [
    { icon: MapPin, title: language === 'ar' ? 'تتبع GPS مباشر' : 'Suivi GPS en direct' },
    { icon: Wifi, title: language === 'ar' ? 'Wi-Fi داخل المركبات' : 'Wi-Fi embarqué' },
    { icon: Calendar, title: language === 'ar' ? 'اشتراكات مرنة' : 'Abonnements flexibles' },
    { icon: Brain, title: language === 'ar' ? 'تحليلات ذكية' : 'Analytique intelligente' },
    { icon: Globe2, title: language === 'ar' ? 'منصة ثنائية اللغة' : 'Plateforme bilingue' },
    { icon: Zap, title: language === 'ar' ? 'حجز سريع' : 'Réservation rapide' },
  ];

  return (
    <ProtectedRoute>
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white">
      <section className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.18),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-emerald-100 backdrop-blur-xl">
                <Sparkles className="h-4 w-4" />
                {language === 'ar' ? 'قصة شركة ناشئة جامعية' : 'Startup universitaire premium'}
              </div>
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="h-11 px-5 rounded-2xl font-bold gap-2 text-white bg-slate-900 hover:bg-slate-800 border border-white/10 shrink-0 w-fit"
              >
                <span className={`${language === 'ar' ? 'rotate-180' : ''}`}>←</span>
                {language === 'ar' ? 'رجوع' : 'Retour'}
              </Button>
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              {language === 'ar' ? 'UNIMOVE-DZ ليست مجرد نقل، إنها بنية تحتية جامعية ذكية.' : 'UNIMOVE-DZ n’est pas un simple transport, c’est une infrastructure universitaire intelligente.'}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50/80 md:text-2xl">
              {language === 'ar'
                ? 'مشروع ناشئ يحول الفوضى اليومية في النقل الجامعي إلى تجربة رقمية موثوقة، اقتصادية، آمنة وقابلة للتوسع.'
                : 'Une startup qui transforme la complexité quotidienne du transport universitaire en expérience digitale fiable, économique, sécurisée et scalable.'}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ProtectedPageLink href="/business-model" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-4 font-black text-slate-950 shadow-2xl shadow-emerald-500/30 transition hover:-translate-y-1 hover:bg-emerald-300">
                {language === 'ar' ? 'استكشف نموذج الأعمال' : 'Explorer le business model'}
                <ArrowRight className="h-5 w-5" />
              </ProtectedPageLink>
              <ProtectedPageLink href="/financial-plan" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 font-black text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15">
                {language === 'ar' ? 'الخطة المالية' : 'Plan financier'}
              </ProtectedPageLink>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <Card className="h-full rounded-3xl border-white/10 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-xl transition hover:-translate-y-2 hover:bg-white/[0.14]">
                <div className="mb-6 inline-flex rounded-2xl bg-emerald-400/15 p-4 text-emerald-300">
                  <item.icon className="h-8 w-8" />
                </div>
                <h2 className="mb-4 text-2xl font-black">{item.title}</h2>
                <p className="leading-8 text-slate-200">{item.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-4">
          {impact.map((item, index) => (
            <motion.div key={item.label} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <Card className="rounded-3xl border-white/10 bg-white/[0.08] p-6 text-center text-white shadow-xl backdrop-blur-xl">
                <item.icon className="mx-auto mb-4 h-8 w-8 text-emerald-300" />
                <div className="text-4xl font-black text-white">{item.value}</div>
                <p className="mt-2 text-sm font-semibold text-slate-300">{item.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'التنقل الذكي كخدمة جامعية' : 'La mobilité intelligente comme service universitaire'}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            {language === 'ar'
              ? 'UNIMOVE-DZ يجمع التكنولوجيا، التنظيم، الأمان، والاستدامة المالية داخل تجربة واحدة مصممة للجامعة الجزائرية.'
              : 'UNIMOVE-DZ réunit technologie, organisation, sécurité et durabilité financière dans une expérience pensée pour l’université algérienne.'}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {smartFeatures.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl transition hover:border-emerald-300/40 hover:bg-emerald-400/10">
              <feature.icon className="mb-4 h-7 w-7 text-emerald-300" />
              <h3 className="text-lg font-black text-white">{feature.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'خارطة الطريق' : 'Roadmap stratégique'}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            {language === 'ar' ? 'من مشروع جامعي إلى شركة ناشئة قابلة للنمو.' : 'Du projet universitaire à une startup scalable.'}
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-4">
          {roadmap.map((step, index) => (
            <motion.div key={step.phase} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <Card className="relative h-full overflow-hidden rounded-3xl border-white/10 bg-white/[0.08] p-7 text-white shadow-2xl backdrop-blur-xl">
                <div className="absolute right-5 top-5 text-6xl font-black text-white/5">{step.phase}</div>
                <CheckCircle2 className="mb-6 h-8 w-8 text-emerald-300" />
                <h3 className="mb-3 text-xl font-black">{step.title}</h3>
                <p className="leading-7 text-slate-300">{step.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'فرصة السوق' : 'Opportunité de marché'}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            {language === 'ar'
              ? 'سوق نقل الجامعات في الجزائر يضم ملايين الطلاب دون حل رقمي موحد.'
              : 'Le marché du transport universitaire en Algérie compte des millions d’étudiants sans solution digitale unifiée.'}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {marketOpportunity.map((item, index) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <Card className="rounded-3xl border-white/10 bg-white/[0.08] p-6 text-white shadow-xl backdrop-blur-xl text-center">
                <div className="text-4xl font-black text-emerald-300">{item.value}</div>
                <h3 className="mt-2 text-xl font-black">{item.label}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-300">{item.unit}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5-Year Outlook */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'التوقعات المالية لـ 5 سنوات' : 'Projections financières sur 5 ans'}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            {language === 'ar'
              ? 'نمو مضاعف مدفوع بالشراكات الجامعية، الاشتراكات، والخدمات الإضافية.'
              : 'Croissance exponentielle portée par les partenariats universitaires, abonnements et services additionnels.'}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {outlook.map((item, index) => (
            <motion.div key={item.year} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <Card className="rounded-3xl border-white/10 bg-white/[0.08] p-5 text-white shadow-xl backdrop-blur-xl text-center">
                <div className="text-sm font-bold text-emerald-300 mb-2">{item.year}</div>
                <div className="text-2xl font-black">{item.revenue}</div>
                <div className="mt-3 space-y-1 text-xs font-semibold text-slate-300">
                  <p>{item.users} {language === 'ar' ? 'مستخدم' : 'utilisateurs'}</p>
                  <p>{item.partnerships} {language === 'ar' ? 'شراكة' : 'partenariats'}</p>
                  <p>{item.team} {language === 'ar' ? 'عضو فريق' : 'membres'}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="rounded-3xl border-white/10 bg-gradient-to-br from-emerald-400 to-cyan-300 p-8 text-slate-950 shadow-2xl md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <HeartHandshake className="mb-5 h-10 w-10" />
              <h2 className="text-3xl font-black md:text-5xl">
                {language === 'ar' ? 'مشروع أكاديمي بروح شركة ناشئة' : 'Un projet académique avec l’ambition d’une startup'}
              </h2>
            </div>
            <div className="space-y-3 text-lg font-bold leading-8">
              <p>{language === 'ar' ? 'الطالبة: مراح ابتسام' : 'Étudiante : مراح ابتسام'}</p>
              <p>{language === 'ar' ? 'ماستر 2 قانون عام - 2025/2026' : 'Master 2 Droit Général - 2025/2026'}</p>
              <p>{language === 'ar' ? 'جامعة الجيلالي اليابس سيدي بلعباس' : 'Université Djilali Liabès Sidi Bel Abbès'}</p>
              <p>{language === 'ar' ? 'الإشراف: د:رمدوم نورة' : 'Supervision : DR RAMDOUM NORA'}</p>
              <p>{language === 'ar' ? 'مشروع UNIMOVE-DZ' : 'Projet UNIMOVE-DZ'}</p>
            </div>
          </div>
        </Card>
      </section>
    </main>
    </ProtectedRoute>
  );
}
