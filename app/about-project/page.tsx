'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock,
  Database,
  GraduationCap,
  Lightbulb,
  LockKeyhole,
  MapPinned,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wifi,
} from 'lucide-react';

export default function AboutProjectPage() {
  const { language } = useLanguage();
  const router = useRouter();

  const sections = [
    {
      icon: AlertTriangle,
      title: language === 'ar' ? 'المشكلة' : 'Problème',
      text: language === 'ar'
        ? 'يعاني الطلبة من تأخر النقل، غياب الحجز المسبق، نقص المعلومات، الازدحام، وعدم وضوح مواعيد الرحلات.'
        : 'Les étudiants subissent retards, absence de réservation, manque d’information, surcharge et horaires peu visibles.',
      tone: 'from-red-500 to-orange-500',
    },
    {
      icon: CheckCircle2,
      title: language === 'ar' ? 'الحل' : 'Solution',
      text: language === 'ar'
        ? 'UNIMOVE-DZ propose une plateforme digitale pour réservation, QR, GPS, notifications, abonnements et paiement flexible.'
        : 'UNIMOVE-DZ propose une plateforme digitale pour réservation, QR, GPS, notifications, abonnements et paiement flexible.',
      tone: 'from-emerald-500 to-teal-500',
    },
    {
      icon: ShieldCheck,
      title: language === 'ar' ? 'الأمان' : 'Sécurité',
      text: language === 'ar'
        ? 'Cartes digitales, suivi des trajets, informations claires et chauffeurs organisés renforcent la confiance et la sécurité.'
        : 'Cartes digitales, suivi des trajets, informations claires et chauffeurs organisés renforcent la confiance et la sécurité.',
      tone: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Building2,
      title: language === 'ar' ? 'التنظيم' : 'Organisation',
      text: language === 'ar'
        ? 'تحويل النقل من خدمة تقليدية إلى نظام قابل للقياس والتحسين عبر البيانات ومؤشرات الأداء.'
        : 'Transformer le transport traditionnel en système mesurable et optimisable via la donnée et les indicateurs.',
      tone: 'from-purple-500 to-indigo-500',
    },
  ];

  const stats = [
    { icon: Users, value: '10K+', label: language === 'ar' ? 'مستخدم مستهدف' : 'Utilisateurs ciblés' },
    { icon: Clock, value: '35%', label: language === 'ar' ? 'تقليل التأخير' : 'Réduction retards' },
    { icon: BarChart3, value: '9', label: language === 'ar' ? 'محاور نموذج الأعمال' : 'Blocs business model' },
    { icon: Rocket, value: '5', label: language === 'ar' ? 'مراحل نمو' : 'Phases croissance' },
  ];

  const innovation = [
    { icon: MapPinned, title: language === 'ar' ? 'تتبع مباشر للرحلات' : 'Suivi trajets en direct' },
    { icon: Wifi, title: language === 'ar' ? 'Wi-Fi داخل المركبات' : 'Wi-Fi embarqué' },
    { icon: LockKeyhole, title: language === 'ar' ? 'بطاقة QR آمنة' : 'Carte QR sécurisée' },
    { icon: Database, title: language === 'ar' ? 'تحليلات تشغيلية' : 'Analytique opérationnelle' },
    { icon: Target, title: language === 'ar' ? 'تسعير قابل للتوسع' : 'Tarification scalable' },
    { icon: GraduationCap, title: language === 'ar' ? 'مصمم للجامعة' : 'Conçu pour l’université' },
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50/40">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
        <div className="relative w-80 h-80 md:w-[28rem] md:h-[28rem]">
          <Image src="/images/udl-logo.jpeg" alt="" fill className="object-contain" />
        </div>
      </div>
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div
          className={`absolute z-10 ${language === 'ar' ? 'top-6 right-6 md:top-8 md:right-8' : 'top-6 left-6 md:top-8 md:left-8'}`}
        >
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="h-11 rounded-xl font-bold gap-2 text-slate-900 bg-white/70 hover:bg-white/80 border border-white/60"
          >
            {/* Using Unicode arrow to avoid new icon imports */}
            <span className={`${language === 'ar' ? 'rotate-180' : ''}`}>←</span>
            {language === 'ar' ? 'رجوع' : 'Retour'}
          </Button>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm font-black text-emerald-700 shadow-lg backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              {language === 'ar' ? 'عن المشروع' : 'À propos du projet'}
            </div>
            <h1 className="mx-auto max-w-5xl text-5xl font-black tracking-tight text-slate-950 md:text-7xl">
              {language === 'ar' ? 'UNIMOVE-DZ مشروع جامعي بمنطق شركة ناشئة.' : 'UNIMOVE-DZ, un projet universitaire pensé comme une startup.'}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-2xl">
              {language === 'ar'
                ? 'منصة ذكية لتحسين النقل الجامعي عبر التكنولوجيا، التنظيم، الأمان، ونموذج اقتصادي واضح.'
                : 'Une plateforme intelligente pour améliorer le transport universitaire grâce à la technologie, l’organisation, la sécurité et un modèle économique clair.'}
            </p>

            {/* UDL University Section */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 inline-flex flex-col sm:flex-row items-center gap-5 sm:gap-8 rounded-3xl border-2 border-emerald-300 bg-white/80 px-8 py-6 shadow-2xl backdrop-blur-xl"
            >
              <div className="relative w-32 h-32 lg:w-40 lg:h-40 flex-shrink-0">
                <Image src="/images/udl-logo.jpeg" alt="UDL Logo" fill className="object-contain rounded-2xl" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xl md:text-2xl font-black text-slate-900">
                  {language === 'ar' ? 'جامعة الجيلالي اليابس سيدي بلعباس' : 'Université Djillali Liabès'}
                </p>
                <p className="text-base md:text-lg font-bold text-slate-600">
                  {language === 'ar' ? 'Sidi Bel Abbès' : 'Sidi Bel Abbès'}
                </p>
                <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <p className="text-sm font-black text-emerald-800">
                    {language === 'ar' ? 'شريك أكاديمي رسمي' : 'Partenaire Académique Officiel'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <Card className="h-full rounded-3xl border-2 border-white/70 bg-white/80 p-7 shadow-xl backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <div className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${item.tone} p-4 text-white shadow-lg`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h2 className="mb-3 text-2xl font-black text-slate-950">{item.title}</h2>
                <p className="leading-8 text-slate-600">{item.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="overflow-hidden rounded-3xl border-0 bg-slate-950 p-8 text-white shadow-2xl md:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Lightbulb className="mb-5 h-10 w-10 text-emerald-300" />
              <h2 className="text-4xl font-black md:text-5xl mb-5">
                {language === 'ar' ? 'الابتكار' : 'Innovation'}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                {language === 'ar'
                  ? 'يجمع المشروع بين تجربة مستخدم بسيطة ونظام تشغيل قابل للقياس، ما يجعله قابلاً للتطبيق داخل الجامعة والتوسع إلى مؤسسات أخرى.'
                  : 'Le projet combine une expérience utilisateur simple et un système d’exploitation mesurable, applicable à l’université et extensible à d’autres institutions.'}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {innovation.map((feature, index) => (
                <motion.div key={feature.title} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                  <feature.icon className="mb-4 h-7 w-7 text-emerald-300" />
                  <h3 className="font-black text-white">{feature.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <Card className="rounded-3xl border-2 border-emerald-100 bg-white/80 p-6 text-center shadow-xl backdrop-blur-xl">
                <stat.icon className="mx-auto mb-4 h-8 w-8 text-emerald-600" />
                <div className="text-4xl font-black text-slate-950">{stat.value}</div>
                <p className="mt-2 text-sm font-bold text-slate-600">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="rounded-3xl bg-gradient-to-br from-emerald-600 to-cyan-600 p-8 text-white shadow-2xl md:p-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black md:text-4xl">
                {language === 'ar' ? 'المعلومة الأكاديمية' : 'Informations académiques'}
              </h2>
              <div className="mt-6 space-y-3 text-lg font-semibold text-emerald-50">
                <p>{language === 'ar' ? 'الطالبة: مراح ابتسام' : 'Étudiante : مراح ابتسام'}</p>
                <p>{language === 'ar' ? 'ماستر 2 قانون عام - 2025/2026' : 'Master 2 Droit Général - 2025/2026'}</p>
                <p>{language === 'ar' ? 'جامعة الجيلالي اليابس سيدي بلعباس' : 'Université Djilali Liabès Sidi Bel Abbès'}</p>
                <p>{language === 'ar' ? 'الإشراف: د:رمدوم نورة' : 'Supervision : DR RAMDOUM NORA'}</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black md:text-4xl">
                {language === 'ar' ? 'التطوير' : 'Développement'}
              </h2>
              <div className="mt-6 space-y-3 text-lg font-semibold text-emerald-50">
                <p>{language === 'ar' ? 'مشروع UNIMOVE-DZ' : 'Projet UNIMOVE-DZ'}</p>
                <p className="text-2xl font-black">{language === 'ar' ? 'منصة النقل الجامعي الذكي' : 'Plateforme de transport universitaire intelligent'}</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
