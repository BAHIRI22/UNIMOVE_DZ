'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
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

  const startupKpis = [
    { icon: Users, value: '+10K', label: language === 'ar' ? 'Ù…Ø³ØªØ®Ø¯Ù… Ù…Ø³ØªÙ‡Ø¯Ù' : 'Utilisateurs ciblÃ©s', trend: '+45%' },
    { icon: DollarSign, value: '12.5M DA', label: language === 'ar' ? 'Ø¥ÙŠØ±Ø§Ø¯Ø§Øª Ø³Ù†ÙˆÙŠØ© Ù…Ù‚Ø¯Ø±Ø©' : 'Revenus annuels estimÃ©s', trend: '+32%' },
    { icon: Car, value: '+120', label: language === 'ar' ? 'Ø±Ø­Ù„Ø© ÙŠÙˆÙ…ÙŠØ© Ù…Ø­ØªÙ…Ù„Ø©' : 'Trajets quotidiens potentiels', trend: '+38%' },
    { icon: Trophy, value: '7', label: language === 'ar' ? 'Ù…ØµØ§Ø¯Ø± Ø¯Ø®Ù„' : 'Sources revenus', trend: '+20%' },
  ];

  const marketProblems = [
    { icon: CalendarClock, stat: '40%', title: language === 'ar' ? 'ØªØ£Ø®Ø± Ù…ØªÙƒØ±Ø±' : 'Retards frÃ©quents', text: language === 'ar' ? 'Ø§Ù„Ø·Ù„Ø¨Ø© ÙŠÙÙ‚Ø¯ÙˆÙ† ÙˆÙ‚ØªØ§Ù‹ ÙŠÙˆÙ…ÙŠØ§Ù‹ Ø¨Ø³Ø¨Ø¨ Ø§Ù„Ù†Ù‚Ù„ ØºÙŠØ± Ø§Ù„Ù…Ù†Ø¸Ù….' : 'Les Ã©tudiants perdent du temps chaque jour Ã  cause dâ€™un transport peu organisÃ©.' },
    { icon: Flame, stat: '65%', title: language === 'ar' ? 'ØªÙˆØªØ± ÙÙŠ Ø§Ù„ØªÙ†Ù‚Ù„' : 'Stress mobilitÃ©', text: language === 'ar' ? 'ØºÙŠØ§Ø¨ Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø© ÙˆØ§Ù„Ø­Ø¬Ø² ÙŠØ®Ù„Ù‚ Ø¶ØºØ·Ø§Ù‹ ÙŠÙˆÙ…ÙŠØ§Ù‹.' : 'Lâ€™absence dâ€™information et de rÃ©servation crÃ©e une pression quotidienne.' },
    { icon: Network, stat: '0', title: language === 'ar' ? 'Ø­Ù„ Ø±Ù‚Ù…ÙŠ Ù…ÙˆØ­Ø¯' : 'Solution digitale unifiÃ©e', text: language === 'ar' ? 'Ø§Ù„Ø³ÙˆÙ‚ ÙŠØ­ØªØ§Ø¬ Ù…Ù†ØµØ© ÙˆØ§Ø­Ø¯Ø© ØªØ±Ø¨Ø· Ø§Ù„Ø­Ø¬Ø² ÙˆØ§Ù„ØªØªØ¨Ø¹ ÙˆØ§Ù„Ø¯ÙØ¹.' : 'Le marchÃ© a besoin dâ€™une plateforme unique reliant rÃ©servation, suivi et paiement.' },
  ];

  const solutionFeatures = [
    { icon: Smartphone, title: language === 'ar' ? 'Ø­Ø¬Ø² Ø°ÙƒÙŠ' : 'RÃ©servation intelligente' },
    { icon: MapPin, title: language === 'ar' ? 'ØªØªØ¨Ø¹ GPS' : 'GPS tracking' },
    { icon: QrCode, title: language === 'ar' ? 'Ø¨Ø·Ø§Ù‚Ø© QR' : 'QR Card' },
    { icon: Wifi, title: language === 'ar' ? 'Wi-Fi' : 'Wi-Fi' },
    { icon: CreditCard, title: language === 'ar' ? 'Ø¯ÙØ¹ Ù…Ø±Ù†' : 'Paiement flexible' },
    { icon: Zap, title: language === 'ar' ? 'Ø¥Ø´Ø¹Ø§Ø±Ø§Øª ÙÙˆØ±ÙŠØ©' : 'Notifications instantanÃ©es' },
  ];

  const segments = [
    { icon: Users, name: language === 'ar' ? 'Ø§Ù„Ø·Ù„Ø¨Ø©' : 'Ã‰tudiants', size: '85%', potential: language === 'ar' ? 'Ø·Ù„Ø¨ ÙŠÙˆÙ…ÙŠ Ø¹Ø§Ù„Ù' : 'Demande quotidienne Ã©levÃ©e' },
    { icon: GraduationCap, name: language === 'ar' ? 'Ø§Ù„Ø£Ø³Ø§ØªØ°Ø©' : 'Enseignants', size: '7%', potential: language === 'ar' ? 'Ø§Ø´ØªØ±Ø§ÙƒØ§Øª Ù…Ù…ÙŠØ²Ø©' : 'Abonnements premium' },
    { icon: Building2, name: language === 'ar' ? 'Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠÙˆÙ†' : 'Administratifs', size: '5%', potential: language === 'ar' ? 'Ø§Ø³ØªÙ‚Ø±Ø§Ø± Ø´Ù‡Ø±ÙŠ' : 'StabilitÃ© mensuelle' },
    { icon: Trophy, name: language === 'ar' ? 'Ø§Ù„Ø£Ù†Ø¯ÙŠØ© Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠØ©' : 'Clubs universitaires', size: '3%', potential: language === 'ar' ? 'Ø£Ø­Ø¯Ø§Ø« ÙˆØ±Ø­Ù„Ø§Øª' : 'Ã‰vÃ©nements et voyages' },
  ];

  const revenue = [
    { label: language === 'ar' ? 'Ø§Ù„Ø§Ø´ØªØ±Ø§ÙƒØ§Øª' : 'Abonnements', value: 45, amount: '5.62M DA' },
    { label: language === 'ar' ? 'Ø§Ù„Ø±Ø­Ù„Ø§Øª Ø§Ù„Ù…Ø¨Ø§Ø´Ø±Ø©' : 'Trajets directs', value: 30, amount: '3.75M DA' },
    { label: language === 'ar' ? 'Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†Ø§Øª' : 'PublicitÃ©', value: 5, amount: '625K DA' },
    { label: language === 'ar' ? 'Ø´Ø±Ø§ÙƒØ§Øª Ø§Ù„Ø¬Ø§Ù…Ø¹Ø§Øª' : 'Partenariats universitÃ©s', value: 2, amount: '250K DA' },
    { label: language === 'ar' ? 'Ø¹Ù…ÙˆÙ„Ø§Øª Ø§Ù„Ù…Ø³ØªØ«Ù…Ø±ÙŠÙ†' : 'Commissions investisseurs', value: 4, amount: '500K DA' },
    { label: language === 'ar' ? 'Ø§Ù„Ù…Ø·Ø§Ø± ÙˆØ§Ù„Ø³ÙŠØ§Ø­Ø© ÙˆØ§Ù„Ø£Ø­Ø¯Ø§Ø«' : 'AÃ©roport, tourisme, Ã©vÃ©nements', value: 14, amount: '1.75M DA' },
  ];

  const projections = [
    { year: 'Y1', value: 3.2 },
    { year: 'Y2', value: 7.8 },
    { year: 'Y3', value: 12.5 },
    { year: 'Y4', value: 21.4 },
    { year: 'Y5', value: 34.0 },
  ];

  const roadmap = [
    { phase: '01', title: 'MVP', text: language === 'ar' ? 'Ù†Ø³Ø®Ø© Ø£ÙˆÙ„ÙŠØ© Ù„Ù„Ø­Ø¬Ø² ÙˆØ§Ù„Ø¨Ø·Ø§Ù‚Ø© Ø§Ù„Ø±Ù‚Ù…ÙŠØ©.' : 'Version initiale rÃ©servation et carte digitale.' },
    { phase: '02', title: language === 'ar' ? 'Ø¥Ø·Ù„Ø§Ù‚ Ø§Ù„Ø¬Ø§Ù…Ø¹Ø©' : 'Lancement universitÃ©', text: language === 'ar' ? 'ØªØ´ØºÙŠÙ„ Ø¯Ø§Ø®Ù„ Ø¬Ø§Ù…Ø¹Ø© Ø§Ù„Ø¬ÙŠÙ„Ø§Ù„ÙŠ Ø§Ù„ÙŠØ§Ø¨Ø³.' : 'DÃ©ploiement Ã  lâ€™UniversitÃ© Djilali LiabÃ¨s.' },
    { phase: '03', title: language === 'ar' ? 'ØªÙˆØ³Ø¹ Ø§Ù„ÙˆÙ„Ø§ÙŠØ©' : 'Expansion wilaya', text: language === 'ar' ? 'Ø±Ø¨Ø· Ù…Ø¤Ø³Ø³Ø§Øª ÙˆÙ…Ù†Ø§Ø·Ù‚ Ø¬Ø§Ù…Ø¹ÙŠØ© Ø¥Ø¶Ø§ÙÙŠØ©.' : 'Connexion de zones et institutions supplÃ©mentaires.' },
    { phase: '04', title: language === 'ar' ? 'ØªÙˆØ³Ø¹ ÙˆØ·Ù†ÙŠ' : 'Expansion nationale', text: language === 'ar' ? 'Ù†Ù…ÙˆØ°Ø¬ Ù‚Ø§Ø¨Ù„ Ù„Ù„ØªÙƒØ±Ø§Ø± ÙÙŠ Ø¬Ø§Ù…Ø¹Ø§Øª Ø§Ù„Ø¬Ø²Ø§Ø¦Ø±.' : 'ModÃ¨le rÃ©plicable dans les universitÃ©s algÃ©riennes.' },
    { phase: '05', title: language === 'ar' ? 'ØªØ·Ø¨ÙŠÙ‚Ø§Øª Ø£ØµÙ„ÙŠØ©' : 'Mobile app native', text: language === 'ar' ? 'Android/iOS Ø¨ØªØ¬Ø±Ø¨Ø© Ø£Ø³Ø±Ø¹ ÙˆØ£ÙƒØ«Ø± ØªÙƒØ§Ù…Ù„Ø§Ù‹.' : 'Android/iOS avec expÃ©rience plus rapide et intÃ©grÃ©e.' },
    { phase: '06', title: language === 'ar' ? 'Ø°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ' : 'AI optimization', text: language === 'ar' ? 'ØªØ­Ø³ÙŠÙ† Ø§Ù„Ù…Ø³Ø§Ø±Ø§Øª ÙˆØ§Ù„ØªÙ†Ø¨Ø¤ Ø¨Ø§Ù„Ø·Ù„Ø¨.' : 'Optimisation des itinÃ©raires et prÃ©vision de demande.' },
    { phase: '07', title: language === 'ar' ? 'Smart Campus' : 'Smart campus ecosystem', text: language === 'ar' ? 'Ù…Ù†Ø¸ÙˆÙ…Ø© ØªÙ†Ù‚Ù„ ÙˆØ®Ø¯Ù…Ø§Øª Ø¬Ø§Ù…Ø¹ÙŠØ© Ù…ØªÙƒØ§Ù…Ù„Ø©.' : 'Ã‰cosystÃ¨me mobilitÃ© et services campus intÃ©grÃ©s.' },
  ];

  const techStack = [
    { icon: Code2, title: 'Next.js', text: language === 'ar' ? 'ÙˆØ§Ø¬Ù‡Ø© ÙˆÙŠØ¨ Ø­Ø¯ÙŠØ«Ø© ÙˆØ³Ø±ÙŠØ¹Ø©' : 'Interface web moderne et rapide' },
    { icon: ShieldCheck, title: 'Firebase', text: language === 'ar' ? 'Ù…ØµØ§Ø¯Ù‚Ø© OTP ÙˆØ¨Ù†ÙŠØ© Ø¢Ù…Ù†Ø©' : 'Authentification OTP et backend sÃ©curisÃ©' },
    { icon: Sparkles, title: 'TailwindCSS', text: language === 'ar' ? 'ØªØµÙ…ÙŠÙ… Ù…ØªØ¬Ø§ÙˆØ¨ ÙˆÙ…Ø±Ù†' : 'Design responsive et flexible' },
    { icon: LineChart, title: 'Framer Motion', text: language === 'ar' ? 'Ø­Ø±ÙƒØ§Øª Ø³Ù„Ø³Ø© ÙˆØ¹ØµØ±ÙŠØ©' : 'Animations fluides et modernes' },
    { icon: QrCode, title: 'QR System', text: language === 'ar' ? 'Ø¨Ø·Ø§Ù‚Ø§Øª Ø±Ù‚Ù…ÙŠØ© Ù„Ù„Ø­Ø¬Ø²' : 'Cartes digitales de rÃ©servation' },
    { icon: MapPin, title: 'GPS Integration', text: language === 'ar' ? 'ØªØªØ¨Ø¹ Ø§Ù„Ø±Ø­Ù„Ø§Øª ÙˆØ§Ù„Ù…Ø³Ø§Ø±Ø§Øª' : 'Suivi trajets et itinÃ©raires' },
    { icon: Cloud, title: 'Cloud Infrastructure', text: language === 'ar' ? 'Ù‚Ø§Ø¨Ù„ÙŠØ© ØªÙˆØ³Ø¹ Ø¹Ø§Ù„ÙŠØ©' : 'ScalabilitÃ© Ã©levÃ©e' },
    { icon: Database, title: 'Analytics Layer', text: language === 'ar' ? 'Ù…Ø¤Ø´Ø±Ø§Øª ØªØ´ØºÙŠÙ„ÙŠØ© ÙˆÙ…Ø§Ù„ÙŠØ©' : 'Indicateurs opÃ©rationnels et financiers' },
  ];

  const maxProjection = Math.max(...projections.map((item) => item.value));

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.26),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.20),transparent_42%)]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-emerald-100 backdrop-blur-xl">
              <Rocket className="h-4 w-4" />
              {language === 'ar' ? 'Investor Pitch Experience' : 'Investor Pitch Experience'}
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              {language === 'ar'
                ? 'UNIMOVE-DZ Ù…Ù†ØµØ© Ù†Ù‚Ù„ Ø¬Ø§Ù…Ø¹ÙŠ Ø°ÙƒÙŠØ© Ø¬Ø§Ù‡Ø²Ø© Ù„Ù„Ø¹Ø±Ø¶ Ø£Ù…Ø§Ù… Ø§Ù„Ø­Ø§Ø¶Ù†Ø§Øª ÙˆØ§Ù„Ù…Ø³ØªØ«Ù…Ø±ÙŠÙ†.'
                : 'UNIMOVE-DZ, une plateforme de mobilitÃ© universitaire intelligente prÃªte pour incubateurs et investisseurs.'}
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300 md:text-2xl">
              {language === 'ar'
                ? 'Ù†Ù…ÙˆØ°Ø¬ SaaS Ø¬Ø§Ù…Ø¹ÙŠ ÙŠØ¬Ù…Ø¹ Ø§Ù„Ø­Ø¬Ø²ØŒ GPSØŒ QRØŒ Ø§Ù„Ø§Ø´ØªØ±Ø§ÙƒØ§ØªØŒ Ø§Ù„Ø¯ÙØ¹ØŒ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§ØªØŒ ÙˆØ§Ù„ØªÙˆØ³Ø¹ Ø§Ù„Ø§Ù‚ØªØµØ§Ø¯ÙŠ ÙÙŠ Ù…Ù†ØªØ¬ ÙˆØ§Ø­Ø¯ Ù‚Ø§Ø¨Ù„ Ù„Ù„Ø¹Ø±Ø¶ ÙˆØ§Ù„ØªØ·Ø¨ÙŠÙ‚.'
                : 'Un modÃ¨le SaaS universitaire rÃ©unissant rÃ©servation, GPS, QR, abonnements, paiement, data et scalabilitÃ© Ã©conomique dans un produit dÃ©montrable.'}
            </p>
          </motion.div>

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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'ProblÃ¨me marchÃ©' : 'ProblÃ¨me marchÃ©'}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            {language === 'ar'
              ? 'Ø§Ù„Ù†Ù‚Ù„ Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ ÙŠØ¹Ø§Ù†ÙŠ Ù…Ù† ØºÙŠØ§Ø¨ Ø§Ù„ØªÙ†Ø¸ÙŠÙ… Ø§Ù„Ø±Ù‚Ù…ÙŠØŒ ØªØ£Ø®Ø± Ø§Ù„Ø·Ù„Ø¨Ø©ØŒ Ø¶ØºØ· ÙŠÙˆÙ…ÙŠØŒ ÙˆØ¹Ø¯Ù… ÙˆØ¬ÙˆØ¯ Ù…Ù†ØµØ© Ù…ÙˆØ­Ø¯Ø© Ù„Ù„Ø­Ø¬Ø² ÙˆØ§Ù„ØªØªØ¨Ø¹.'
              : 'Le transport universitaire souffre dâ€™un manque dâ€™organisation digitale, de retards Ã©tudiants, de stress quotidien et dâ€™absence de plateforme unifiÃ©e.'}
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
                  ? 'Ø­Ù„ Ù…Ù†Ø¸Ù… ÙŠØ­ÙˆÙ„ Ø§Ù„Ù†Ù‚Ù„ Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ Ø¥Ù„Ù‰ Ø®Ø¯Ù…Ø© Ø°ÙƒÙŠØ© Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„Ù‚ÙŠØ§Ø³ØŒ Ø§Ù„Ø¯ÙØ¹ØŒ Ø§Ù„Ø­Ø¬Ø²ØŒ ÙˆØ§Ù„ØªØ­Ø³ÙŠÙ† Ø§Ù„Ù…Ø³ØªÙ…Ø±.'
                  : 'Une solution organisÃ©e qui transforme le transport universitaire en service intelligent, mesurable, payable, rÃ©servable et optimisable.'}
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
          <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'MarchÃ© cible' : 'MarchÃ© cible'}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            {language === 'ar' ? 'Ø´Ø±Ø§Ø¦Ø­ Ø§Ø³ØªØ®Ø¯Ø§Ù… ÙˆØ§Ø¶Ø­Ø© Ø¯Ø§Ø®Ù„ Ø§Ù„Ø¬Ø§Ù…Ø¹Ø© Ù…Ø¹ Ù‚Ø§Ø¨Ù„ÙŠØ© ØªÙˆØ³Ø¹ Ø¥Ù„Ù‰ Ø¹Ø¯Ø© Ø¬Ø§Ù…Ø¹Ø§Øª.' : 'Segments dâ€™usage clairs au sein de lâ€™universitÃ© avec potentiel multi-campus.'}
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
                <h2 className="text-2xl font-black">{language === 'ar' ? 'Business opportunity' : 'Business opportunity'}</h2>
                <p className="text-sm text-slate-300">{language === 'ar' ? 'Ù…ØµØ§Ø¯Ø± Ø¥ÙŠØ±Ø§Ø¯Ø§Øª Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„ØªÙˆØ³Ø¹' : 'Sources de revenus scalables'}</p>
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
                <h2 className="text-2xl font-black">{language === 'ar' ? 'Projections revenus' : 'Projections revenus'}</h2>
                <p className="text-sm text-slate-300">{language === 'ar' ? 'Croissance estimÃ©e sur 5 ans' : 'Croissance estimÃ©e sur 5 ans'}</p>
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
          <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'Roadmap startup' : 'Roadmap startup'}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            {language === 'ar' ? 'Ù…Ù† MVP Ø¥Ù„Ù‰ Ù…Ù†Ø¸ÙˆÙ…Ø© Smart Campus.' : 'Du MVP Ã  un Ã©cosystÃ¨me Smart Campus.'}
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
          <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'Technologies & architecture' : 'Technologies & architecture'}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            {language === 'ar' ? 'Stack moderne pour une plateforme SaaS dÃ©montrable et Ã©volutive.' : 'Stack moderne pour une plateforme SaaS dÃ©montrable et Ã©volutive.'}
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

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="rounded-3xl border-white/10 bg-gradient-to-br from-white to-emerald-50 p-8 text-slate-950 shadow-2xl md:p-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'Ã‰quipe & crÃ©dibilitÃ© acadÃ©mique' : 'Ã‰quipe & crÃ©dibilitÃ© acadÃ©mique'}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                {language === 'ar' ? 'Ù…Ø´Ø±ÙˆØ¹ Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠ Ù‚Ø§Ø¨Ù„ Ù„Ù„Ø¹Ø±Ø¶ ÙƒÙ…Ù†ØªØ¬ Startup.' : 'Un projet acadÃ©mique prÃ©sentable comme produit startup.'}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                <Rocket className="mb-4 h-8 w-8 text-emerald-600" />
                <h3 className="text-xl font-black">DR: BEHIRI ABDELKADER</h3>
                <p className="mt-2 text-2xl font-black text-emerald-700">Ø¯ Ø¨Ø­ÙŠØ±ÙŠ Ø¹Ø¨Ø¯ Ø§Ù„Ù‚Ø§Ø¯Ø±</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                <GraduationCap className="mb-4 h-8 w-8 text-emerald-600" />
                <h3 className="text-xl font-black">{language === 'ar' ? 'Ø§Ù„Ø·Ø§Ù„Ø¨Ø©: Ù…Ø±Ø§Ø­ Ø§Ø¨ØªØ³Ø§Ù…' : 'Ã‰tudiante : Ù…Ø±Ø§Ø­ Ø§Ø¨ØªØ³Ø§Ù…'}</h3>
                <div className="mt-3 space-y-2 text-sm font-bold text-slate-600">
                  <p>{language === 'ar' ? 'Ù…Ø§Ø³ØªØ± 2 Ù‚Ø§Ù†ÙˆÙ† Ø¹Ø§Ù…' : 'Master 2 Droit GÃ©nÃ©ral'}</p>
                  <p>2025/2026</p>
                  <p>{language === 'ar' ? 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø­Ù‚ÙˆÙ‚ ÙˆØ§Ù„Ø¹Ù„ÙˆÙ… Ø§Ù„Ø³ÙŠØ§Ø³ÙŠØ©' : 'FacultÃ© de Droit et Sciences Politiques'}</p>
                  <p>{language === 'ar' ? 'Ø¬Ø§Ù…Ø¹Ø© Ø§Ù„Ø¬ÙŠÙ„Ø§Ù„ÙŠ Ø§Ù„ÙŠØ§Ø¨Ø³' : 'UniversitÃ© Djilali LiabÃ¨s'}</p>
                  <p>{language === 'ar' ? 'إشراف: د:رمدوم نورة' : 'Supervision : DR RAMDOUM NORA'}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
