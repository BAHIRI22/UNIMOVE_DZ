'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  ArrowUpRight,
  BarChart3,
  Brain,
  Building2,
  CalendarClock,
  Car,
  CheckCircle2,
  Cloud,
  Code2,
  CreditCard,
  Database,
  DollarSign,
  Flame,
  GraduationCap,
  LineChart,
  MapPin,
  Network,
  QrCode,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Wifi,
  Zap,
} from 'lucide-react';

export default function InvestorsPage() {
  const { language } = useLanguage();
  const router = useRouter();

  const startupKpis = [
    { icon: Users, value: language === 'ar' ? 'قابل للتأكيد' : 'À confirmer', label: language === 'ar' ? 'مستخدم مستهدف' : 'Utilisateurs ciblés', trend: language === 'ar' ? 'قابل للتأكيد' : 'À confirmer' },
    { icon: DollarSign, value: '10.88M DA', label: language === 'ar' ? 'إيرادات سنوية مقدرة (Y1)' : 'Revenus annuels estimés (Y1)', trend: 'Prévisionnel' },
    { icon: Car, value: language === 'ar' ? 'قابل للتأكيد' : 'À confirmer', label: language === 'ar' ? 'رحلة يومية محتملة' : 'Trajets quotidiens potentiels', trend: language === 'ar' ? 'قابل للتأكيد' : 'À confirmer' },
    { icon: Trophy, value: '5', label: language === 'ar' ? 'مصادر دخل' : 'Sources revenus', trend: 'Prévisionnel' },
  ];

  const marketProblems = [
    { icon: CalendarClock, stat: '40%', title: language === 'ar' ? 'تأخر متكرر' : 'Retards fréquents', text: language === 'ar' ? 'يعاني الطلبة يومياً بسبب نقل غير منظم.' : 'Les étudiants perdent du temps chaque jour à cause d’un transport peu organisé.' },
    { icon: Flame, stat: '65%', title: language === 'ar' ? 'توتر في التنقل' : 'Stress mobilité', text: language === 'ar' ? 'غياب المعلومة والحجز يخلق ضغطاً يومياً.' : 'L’absence d’information et de réservation crée une pression quotidienne.' },
    { icon: Network, stat: '0', title: language === 'ar' ? 'حل رقمي موحد' : 'Solution digitale unifiée', text: language === 'ar' ? 'السوق يحتاج إلى منصة واحدة تربط الحجز والتتبع والدفع.' : 'Le marché a besoin d’une plateforme unique reliant réservation, suivi et paiement.' },
  ];

  const solutionFeatures = [
    { icon: Smartphone, title: language === 'ar' ? 'حجز ذكي' : 'Réservation intelligente' },
    { icon: MapPin, title: language === 'ar' ? 'تتبع GPS' : 'GPS tracking' },
    { icon: QrCode, title: language === 'ar' ? 'بطاقة QR' : 'QR Card' },
    { icon: Wifi, title: language === 'ar' ? 'Wi-Fi' : 'Wi-Fi' },
    { icon: CreditCard, title: language === 'ar' ? 'دفع مرن' : 'Paiement flexible' },
    { icon: Zap, title: language === 'ar' ? 'إشعارات فورية' : 'Notifications instantanées' },
  ];

  const segments = [
    { icon: Users, name: language === 'ar' ? 'الطلبة' : 'Étudiants', size: '85%', potential: language === 'ar' ? 'طلب يومي عالٍ' : 'Demande quotidienne élevée' },
    { icon: GraduationCap, name: language === 'ar' ? 'الأساتذة' : 'Enseignants', size: '7%', potential: language === 'ar' ? 'اشتراكات مميزة' : 'Abonnements premium' },
    { icon: Building2, name: language === 'ar' ? 'الإداريون' : 'Administratifs', size: '5%', potential: language === 'ar' ? 'استقرار شهري' : 'Stabilité mensuelle' },
    { icon: Trophy, name: language === 'ar' ? 'الأندية الجامعية' : 'Clubs universitaires', size: '3%', potential: language === 'ar' ? 'أحداث ورحلات' : 'Événements et voyages' },
  ];

  const revenue = [
    { label: language === 'ar' ? 'شراكات الجامعات' : 'Partenariats universités', value: 83, amount: '9.00M DA' },
    { label: language === 'ar' ? 'الاشتراكات الشهرية' : 'Abonnements mensuels', value: 11, amount: '1.25M DA' },
    { label: language === 'ar' ? 'رحلات إضافية' : 'Voyages additionnels', value: 3, amount: '320K DA' },
    { label: language === 'ar' ? 'إعلانات in-app (CPM)' : 'Publicité in-app (CPM)', value: 2, amount: '250K DA' },
    { label: language === 'ar' ? 'حجوزات يومية مباشرة' : 'Réservations journalières', value: 1, amount: '63K DA' },
  ];

  const projections = [
    { year: 'Y1', value: 10.883 },
    { year: 'Y2', value: 19.465 },
    { year: 'Y3', value: 36.245 },
    { year: 'Y4', value: 68.870 },
    { year: 'Y5', value: 132.565 },
  ];

  const roadmap = [
    { phase: '01', title: 'MVP', text: language === 'ar' ? 'نسخة أولية للحجز والبطاقة الرقمية.' : 'Version initiale réservation et carte digitale.' },
    { phase: '02', title: language === 'ar' ? 'إطلاق الجامعة' : 'Lancement université', text: language === 'ar' ? 'تشغيل داخل جامعة الجيلالي اليابس.' : 'Déploiement à l’Université Djilali Liabès.' },
    { phase: '03', title: language === 'ar' ? 'توسع الولاية' : 'Expansion wilaya', text: language === 'ar' ? 'ربط مؤسسات ومناطق جامعية إضافية.' : 'Connexion de zones et institutions supplémentaires.' },
    { phase: '04', title: language === 'ar' ? 'توسع وطني' : 'Expansion nationale', text: language === 'ar' ? 'نموذج قابل للتكرار في جامعات الجزائر.' : 'Modèle réplicable dans les universités algériennes.' },
    { phase: '05', title: language === 'ar' ? 'تطبيقات أصلية' : 'Mobile app native', text: language === 'ar' ? 'Android/iOS بتجربة أسرع وأكثر تكاملاً.' : 'Android/iOS avec expérience plus rapide et intégrée.' },
    { phase: '06', title: language === 'ar' ? 'ذكاء اصطناعي' : 'AI optimization', text: language === 'ar' ? 'تحسين المسارات والتنبؤ بالطلب.' : 'Optimisation des itinéraires et prévision de demande.' },
    { phase: '07', title: language === 'ar' ? 'Smart Campus' : 'Smart campus ecosystem', text: language === 'ar' ? 'منظومة تنقل وخدمات جامعية متكاملة.' : 'Écosystème mobilité et services campus intégrés.' },
  ];

  const teamEvolution = [
    { year: 'Y1', count: 9, roles: language === 'ar' ? '1 مدير، 1 نائب مدير، 2 تقني، 2 إداري، 3 سائق' : '1 DG, 1 DGA, 2 tech, 2 admin, 3 chauffeurs' },
    { year: 'Y2', count: 12, roles: language === 'ar' ? '1 مدير، 1 نائب مدير، 3 تقني، 2 إداري، 5 سائق' : '1 DG, 1 DGA, 3 tech, 2 admin, 5 chauffeurs' },
    { year: 'Y3', count: 18, roles: language === 'ar' ? '1 مدير، 1 نائب مدير، 5 تقني، 4 إداري، 7 سائق' : '1 DG, 1 DGA, 5 tech, 4 admin, 7 chauffeurs' },
    { year: 'Y4', count: 21, roles: language === 'ar' ? '1 مدير، 1 نائب مدير، 5 تقني، 4 إداري، 10 سائق' : '1 DG, 1 DGA, 5 tech, 4 admin, 10 chauffeurs' },
    { year: 'Y5', count: 29, roles: language === 'ar' ? '1 مدير، 2 نائب مدير، 6 تقني، 6 إداري، 14 سائق' : '1 DG, 2 DGA, 6 tech, 6 admin, 14 chauffeurs' },
  ];

  const partnershipEvolution = [
    { year: 'Y1', count: 2, type: language === 'ar' ? 'عقدي جامعة/معهد' : 'Contrats université/institut' },
    { year: 'Y2', count: 3, type: language === 'ar' ? '3 عقود سنوية' : '3 contrats annuels' },
    { year: 'Y3', count: 5, type: language === 'ar' ? '5 عقود سنوية' : '5 contrats annuels' },
    { year: 'Y4', count: 7, type: language === 'ar' ? '7 عقود سنوية' : '7 contrats annuels' },
    { year: 'Y5', count: 9, type: language === 'ar' ? '9 عقود سنوية' : '9 contrats annuels' },
  ];

  const marketOpportunity = [
    { label: language === 'ar' ? 'TAM' : 'TAM', value: language === 'ar' ? '—' : '—', desc: language === 'ar' ? 'السوق المستهدف تقديري ويحتاج إلى تأكيد وفق الإحصائيات الرسمية.' : 'Le marché cible est estimatif et doit être confirmé selon les statistiques officielles.' },
    { label: language === 'ar' ? 'SAM' : 'SAM', value: language === 'ar' ? '—' : '—', desc: language === 'ar' ? 'السوق المستهدف تقديري ويحتاج إلى تأكيد وفق الإحصائيات الرسمية.' : 'Le marché cible est estimatif et doit être confirmé selon les statistiques officielles.' },
    { label: language === 'ar' ? 'SOM (Y3)' : 'SOM (Y3)', value: language === 'ar' ? '—' : '—', desc: language === 'ar' ? 'السوق المستهدف تقديري ويحتاج إلى تأكيد وفق الإحصائيات الرسمية.' : 'Le marché cible est estimatif et doit être confirmé selon les statistiques officielles.' },
  ];

  const techStack = [
    { icon: Code2, title: 'Next.js', text: language === 'ar' ? 'واجهة ويب حديثة وسريعة' : 'Interface web moderne et rapide' },
    { icon: ShieldCheck, title: 'Firebase', text: language === 'ar' ? 'مصادقة OTP وبنية آمنة' : 'Authentification OTP et backend sécurisé' },
    { icon: Sparkles, title: 'TailwindCSS', text: language === 'ar' ? 'تصميم متجاوب ومرن' : 'Design responsive et flexible' },
    { icon: LineChart, title: 'Framer Motion', text: language === 'ar' ? 'حركات سلسة وعصرية' : 'Animations fluides et modernes' },
    { icon: QrCode, title: 'QR System', text: language === 'ar' ? 'بطاقات رقمية للحجز' : 'Cartes digitales de réservation' },
    { icon: MapPin, title: 'GPS Integration', text: language === 'ar' ? 'تتبع الرحلات والمسارات' : 'Suivi trajets et itinéraires' },
    { icon: Cloud, title: 'Cloud Infrastructure', text: language === 'ar' ? 'قابلية توسع عالية' : 'Scalabilité élevée' },
    { icon: Database, title: 'Analytics Layer', text: language === 'ar' ? 'مؤشرات تشغيلية ومالية' : 'Indicateurs opérationnels et financiers' },
  ];

  const maxProjection = Math.max(...projections.map((item) => item.value));

  return (
    <ProtectedRoute>
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.26),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.20),transparent_42%)]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-emerald-100 backdrop-blur-xl">
                <Rocket className="h-4 w-4" />
                {language === 'ar' ? 'عرض الاستثمار' : 'Investor Pitch Experience'}
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
              {language === 'ar'
                ? 'UNIMOVE-DZ منصة نقل جامعي ذكية جاهزة للعرض أمام الحاضنات والمستثمرين.'
                : 'UNIMOVE-DZ, une plateforme de mobilité universitaire intelligente prête pour incubateurs et investisseurs.'}
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300 md:text-2xl">
              {language === 'ar'
                ? 'نموذج SaaS جامعي يجمع الحجز، GPS، QR، الاشتراكات، الدفع، البيانات، والتوسع الاقتصادي في منتج واحد قابل للعرض والتطبيق.'
                : 'Un modèle SaaS universitaire réunissant réservation, GPS, QR, abonnements, paiement, data et scalabilité économique dans un produit démontrable.'}
            </p>
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {startupKpis.map((kpi, index) => (
              <motion.div key={kpi.label} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.08 }} whileHover={{ y: -6 }}>
                <Card className="rounded-3xl border-white/10 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-300">
                      <kpi.icon className="h-7 w-7" />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-black text-emerald-200">
                      <ArrowUpRight className="h-3 w-3" />
                      {kpi.trend}
                    </span>
                  </div>
                  <div className="text-3xl font-black">{kpi.value}</div>
                  <p className="mt-2 text-sm font-semibold text-slate-300">{kpi.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'مشكلة السوق' : 'Problème du marché'}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            {language === 'ar'
              ? 'النقل الجامعي يعاني من غياب التنظيم الرقمي، تأخر الطلبة، ضغط يومي، وعدم وجود منصة موحدة للحجز والتتبع.'
              : 'Le transport universitaire souffre d’un manque d’organisation digitale, de retards étudiants, de stress quotidien et d’absence de plateforme unifiée.'}
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {marketProblems.map((problem, index) => (
            <motion.div key={problem.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <Card className="h-full rounded-3xl border-white/10 bg-white/[0.08] p-7 text-white shadow-xl backdrop-blur-xl transition hover:-translate-y-2 hover:bg-white/[0.12]">
                <problem.icon className="mb-5 h-9 w-9 text-orange-300" />
                <div className="mb-3 text-5xl font-black text-white">{problem.stat}</div>
                <h3 className="mb-3 text-2xl font-black">{problem.title}</h3>
                <p className="leading-8 text-slate-300">{problem.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="overflow-hidden rounded-3xl border-white/10 bg-gradient-to-br from-emerald-500 to-cyan-500 p-8 text-slate-950 shadow-2xl md:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Target className="mb-5 h-11 w-11" />
              <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'Solution UNIMOVE-DZ' : 'Solution UNIMOVE-DZ'}</h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-slate-900/80">
                {language === 'ar'
                  ? 'حل منظم يحول النقل الجامعي إلى خدمة ذكية قابلة للقياس، الدفع، الحجز، والتحسين المستمر.'
                  : 'Une solution organisée qui transforme le transport universitaire en service intelligent, mesurable, payable, réservable et optimisable.'}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {solutionFeatures.map((feature, index) => (
                <motion.div key={feature.title} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded-2xl bg-white/35 p-5 shadow-lg backdrop-blur-xl">
                  <feature.icon className="mb-4 h-7 w-7" />
                  <h3 className="font-black">{feature.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'السوق المستهدف' : 'Marché cible'}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            {language === 'ar' ? 'شرائح استخدام واضحة داخل الجامعة مع قابلية توسع إلى عدة جامعات.' : 'Segments d’usage clairs au sein de l’université avec potentiel multi-campus.'}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {segments.map((segment, index) => (
            <motion.div key={segment.name} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <Card className="rounded-3xl border-white/10 bg-white/[0.08] p-6 text-white shadow-xl backdrop-blur-xl">
                <segment.icon className="mb-5 h-8 w-8 text-emerald-300" />
                <div className="mb-2 text-4xl font-black">{segment.size}</div>
                <h3 className="text-xl font-black">{segment.name}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-300">{segment.potential}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border-white/10 bg-white/[0.08] p-7 text-white shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-300">
                <BarChart3 className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-black">{language === 'ar' ? 'فرصة العمل' : 'Opportunité business'}</h2>
                <p className="text-sm text-slate-300">{language === 'ar' ? 'مصادر إيرادات قابلة للتوسع' : 'Sources de revenus scalables'}</p>
              </div>
            </div>
            <div className="space-y-4">
              {revenue.map((item, index) => (
                <motion.div key={item.label} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
                  <div className="mb-2 flex items-center justify-between text-sm font-black">
                    <span>{item.label}</span>
                    <span className="text-emerald-300">{item.amount}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.value}%` }} viewport={{ once: true }} transition={{ delay: 0.2 + index * 0.04 }} className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className="rounded-3xl border-white/10 bg-white/[0.08] p-7 text-white shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-blue-400/15 p-3 text-blue-300">
                <LineChart className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-black">{language === 'ar' ? 'توقعات الإيرادات' : 'Projections de revenus'}</h2>
                <p className="text-sm text-slate-300">{language === 'ar' ? 'Croissance estimée sur 5 ans' : 'Croissance estimée sur 5 ans'}</p>
              </div>
            </div>
            <div className="flex h-72 items-end gap-4">
              {projections.map((item, index) => (
                <div key={item.year} className="flex flex-1 flex-col items-center gap-3">
                  <motion.div initial={{ height: 0 }} whileInView={{ height: `${(item.value / maxProjection) * 100}%` }} viewport={{ once: true }} transition={{ delay: 0.2 + index * 0.08 }} className="w-full rounded-t-2xl bg-gradient-to-t from-blue-500 to-emerald-300 shadow-lg shadow-emerald-500/20" />
                  <div className="text-center">
                    <p className="text-sm font-black">{item.year}</p>
                    <p className="text-xs text-slate-300">{item.value}M</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'خارطة طريق الشركة الناشئة' : 'Roadmap startup'}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            {language === 'ar' ? 'من MVP إلى منظومة Smart Campus.' : 'Du MVP à un écosystème Smart Campus.'}
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {roadmap.map((step, index) => (
            <motion.div key={`${step.phase}-${step.title}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
              <Card className="relative h-full overflow-hidden rounded-3xl border-white/10 bg-white/[0.08] p-6 text-white shadow-xl backdrop-blur-xl">
                <div className="absolute right-4 top-4 text-5xl font-black text-white/5">{step.phase}</div>
                <CheckCircle2 className="mb-5 h-7 w-7 text-emerald-300" />
                <h3 className="mb-2 text-xl font-black">{step.title}</h3>
                <p className="text-sm leading-7 text-slate-300">{step.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'التقنيات والبنية التقنية' : 'Technologies & architecture'}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            {language === 'ar' ? 'Stack moderne pour une plateforme SaaS démontrable et évolutive.' : 'Stack moderne pour une plateforme SaaS démontrable et évolutive.'}
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((tech, index) => (
            <motion.div key={tech.title} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
              <Card className="h-full rounded-3xl border-white/10 bg-white/[0.08] p-6 text-white shadow-xl backdrop-blur-xl transition hover:-translate-y-2 hover:bg-white/[0.12]">
                <tech.icon className="mb-5 h-8 w-8 text-cyan-300" />
                <h3 className="text-lg font-black">{tech.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{tech.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'حجم السوق والفرصة' : 'Taille du marché & opportunité'}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            {language === 'ar' ? 'سوق نقل الجامعات في الجزائر ضخم وغير مستغ رقمياً.' : 'Le marché du transport universitaire en Algérie est immense et sous-digitialisé.'}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {marketOpportunity.map((item, index) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <Card className="rounded-3xl border-white/10 bg-white/[0.08] p-6 text-white shadow-xl backdrop-blur-xl text-center">
                <div className="text-4xl font-black text-emerald-300">{item.value}</div>
                <h3 className="mt-2 text-xl font-black">{item.label}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-300">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team & Partnership Evolution */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border-white/10 bg-white/[0.08] p-7 text-white shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-purple-400/15 p-3 text-purple-300">
                <Users className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-black">{language === 'ar' ? 'تطور الفريق' : 'Évolution de l\'équipe'}</h2>
                <p className="text-sm text-slate-300">{language === 'ar' ? 'نمو هيكل التوظيف على 5 سنوات' : 'Croissance de l\'effectif sur 5 ans'}</p>
              </div>
            </div>
            <div className="space-y-4">
              {teamEvolution.map((item, index) => (
                <motion.div key={item.year} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
                  <div className="mb-2 flex items-center justify-between text-sm font-black">
                    <span>{item.year}</span>
                    <span className="text-purple-300">{item.count} {language === 'ar' ? 'عضو' : 'membres'}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${(item.count / 29) * 100}%` }} viewport={{ once: true }} transition={{ delay: 0.2 + index * 0.04 }} className="h-full rounded-full bg-gradient-to-r from-purple-300 to-pink-300" />
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{item.roles}</p>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className="rounded-3xl border-white/10 bg-white/[0.08] p-7 text-white shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-300">
                <Building2 className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-black">{language === 'ar' ? 'تطور الشراكات' : 'Évolution des partenariats'}</h2>
                <p className="text-sm text-slate-300">{language === 'ar' ? 'عدد عقود الجامعات والشركات' : 'Nombre de contrats universités et entreprises'}</p>
              </div>
            </div>
            <div className="space-y-4">
              {partnershipEvolution.map((item, index) => (
                <motion.div key={item.year} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
                  <div className="mb-2 flex items-center justify-between text-sm font-black">
                    <span>{item.year}</span>
                    <span className="text-emerald-300">{item.count} {language === 'ar' ? 'عقد' : 'contrats'}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${(item.count / 9) * 100}%` }} viewport={{ once: true }} transition={{ delay: 0.2 + index * 0.04 }} className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" />
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{item.type}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="rounded-3xl border-white/10 bg-gradient-to-br from-white to-emerald-50 p-8 text-slate-950 shadow-2xl md:p-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'الفريق والمصداقية الأكاديمية' : 'Équipe & crédibilité académique'}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                {language === 'ar' ? 'مشروع أكاديمي قابل للعرض كمنتج Startup.' : 'Un projet académique présentable comme produit startup.'}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                <Rocket className="mb-4 h-8 w-8 text-emerald-600" />
                <h3 className="text-xl font-black">{language === 'ar' ? 'مشروع UNIMOVE-DZ' : 'Projet UNIMOVE-DZ'}</h3>
                <p className="mt-2 text-2xl font-black text-emerald-700">{language === 'ar' ? 'منصة النقل الجامعي الذكي' : 'Plateforme de transport universitaire intelligent'}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                <GraduationCap className="mb-4 h-8 w-8 text-emerald-600" />
                <h3 className="text-xl font-black">{language === 'ar' ? 'الطالبة: مراح ابتسام' : 'Étudiante : مراح ابتسام'}</h3>
                <div className="mt-3 space-y-2 text-sm font-bold text-slate-600">
                  <p>{language === 'ar' ? 'ماستر 2 قانون عام' : 'Master 2 Droit Général'}</p>
                  <p>2025/2026</p>
                  <p>{language === 'ar' ? 'كلية الحقوق والعلوم السياسية' : 'Faculté de Droit et Sciences Politiques'}</p>
                  <p>{language === 'ar' ? 'جامعة الجيلالي اليابس' : 'Université Djilali Liabès'}</p>
                  <p>{language === 'ar' ? 'إشراف: د:رمدوم نورة' : 'Supervision : DR RAMDOUM NORA'}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </main>
    </ProtectedRoute>
  );
}
