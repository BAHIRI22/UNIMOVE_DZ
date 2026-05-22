'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
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

  const pillars = [
    {
      icon: Target,
      title: language === 'ar' ? 'Ø§Ù„Ø±Ø¤ÙŠØ©' : 'Vision',
      text: language === 'ar'
        ? 'Ø¨Ù†Ø§Ø¡ Ø£ÙˆÙ„ Ù…Ù†Ø¸ÙˆÙ…Ø© Ù†Ù‚Ù„ Ø¬Ø§Ù…Ø¹ÙŠ Ø°ÙƒÙŠØ© ÙÙŠ Ø§Ù„Ø¬Ø²Ø§Ø¦Ø± ØªØ±Ø¨Ø· Ø§Ù„Ø·Ø§Ù„Ø¨ØŒ Ø§Ù„Ø¬Ø§Ù…Ø¹Ø©ØŒ Ø§Ù„Ø³Ø§Ø¦Ù‚ØŒ ÙˆØ§Ù„Ø®Ø¯Ù…Ø© Ø§Ù„Ø±Ù‚Ù…ÙŠØ© ÙÙŠ ØªØ¬Ø±Ø¨Ø© ÙˆØ§Ø­Ø¯Ø© Ø¢Ù…Ù†Ø© ÙˆÙ…Ù†Ø¸Ù…Ø©.'
        : 'Construire le premier Ã©cosystÃ¨me algÃ©rien de mobilitÃ© universitaire intelligente reliant Ã©tudiant, universitÃ©, chauffeur et service digital dans une expÃ©rience sÃ»re et organisÃ©e.',
    },
    {
      icon: Rocket,
      title: language === 'ar' ? 'Ø§Ù„Ù…Ù‡Ù…Ø©' : 'Mission',
      text: language === 'ar'
        ? 'ØªÙ‚Ù„ÙŠÙ„ Ø§Ù„ØªØ£Ø®Ø±ØŒ ØªØ­Ø³ÙŠÙ† Ø§Ù„Ø£Ù…Ø§Ù†ØŒ Ø¶Ù…Ø§Ù† Ø§Ù„Ø­Ø¬Ø²ØŒ ÙˆØªÙ‚Ø¯ÙŠÙ… Ø®Ø¯Ù…Ø© Ù†Ù‚Ù„ Ø¬Ø§Ù…Ø¹ÙŠ Ø§Ø­ØªØ±Ø§ÙÙŠØ© Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„ØªÙˆØ³Ø¹ Ø§Ù‚ØªØµØ§Ø¯ÙŠØ§Ù‹.'
        : 'RÃ©duire les retards, renforcer la sÃ©curitÃ©, garantir la rÃ©servation et offrir un service de transport universitaire professionnel Ã©conomiquement scalable.',
    },
    {
      icon: Lightbulb,
      title: language === 'ar' ? 'Ø§Ù„Ø§Ø¨ØªÙƒØ§Ø±' : 'Innovation',
      text: language === 'ar'
        ? 'Ù…Ù†ØµØ© ØªØ¬Ù…Ø¹ Ø§Ù„Ø­Ø¬Ø²ØŒ QRØŒ GPSØŒ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§ØªØŒ Ø§Ù„Ø§Ø´ØªØ±Ø§ÙƒØ§ØªØŒ Wi-FiØŒ ÙˆØ§Ù„Ø¯ÙØ¹ Ø§Ù„Ù…Ø±Ù† ÙÙŠ Ø­Ù„ ÙˆØ§Ø­Ø¯.'
        : 'Une plateforme intÃ©grant rÃ©servation, QR, GPS, notifications, abonnements, Wi-Fi et paiement flexible dans une solution unique.',
    },
  ];

  const impact = [
    { icon: Users, value: '+10K', label: language === 'ar' ? 'Ø·Ø§Ù„Ø¨ Ù…Ø³ØªÙ‡Ø¯Ù' : 'Ã‰tudiants ciblÃ©s' },
    { icon: Car, value: '+120', label: language === 'ar' ? 'Ø±Ø­Ù„Ø© ÙŠÙˆÙ…ÙŠØ©' : 'Trajets quotidiens' },
    { icon: TrendingUp, value: '35%', label: language === 'ar' ? 'ØªÙ‚Ù„ÙŠÙ„ Ø§Ù„ØªØ£Ø®ÙŠØ±' : 'RÃ©duction retards' },
    { icon: ShieldCheck, value: '24/7', label: language === 'ar' ? 'Ø£Ù…Ø§Ù† ÙˆØ¯Ø¹Ù…' : 'SÃ©curitÃ© & support' },
  ];

  const roadmap = [
    {
      phase: '01',
      title: language === 'ar' ? 'Ø§Ù„ØªØ­Ù‚Ù‚ Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ' : 'Validation universitaire',
      text: language === 'ar' ? 'Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„Ø®Ø¯Ù…Ø© Ø¯Ø§Ø®Ù„ Ø¬Ø§Ù…Ø¹Ø© Ø§Ù„Ø¬ÙŠÙ„Ø§Ù„ÙŠ Ø§Ù„ÙŠØ§Ø¨Ø³ ÙˆØ¬Ù…Ø¹ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù….' : 'Tester le service au sein de lâ€™UniversitÃ© Djilali LiabÃ¨s et collecter les donnÃ©es dâ€™usage.',
    },
    {
      phase: '02',
      title: language === 'ar' ? 'Ø¥Ø·Ù„Ø§Ù‚ ØªØ¬Ø§Ø±ÙŠ' : 'Lancement commercial',
      text: language === 'ar' ? 'ØªÙØ¹ÙŠÙ„ Ø§Ù„Ø§Ø´ØªØ±Ø§ÙƒØ§ØªØŒ Ø§Ù„ØªØ³Ø¹ÙŠØ±ØŒ ÙˆØ§Ù„Ø¯ÙØ¹ Ù…Ø¹ ØªØ´ØºÙŠÙ„ Ø£Ø³Ø·ÙˆÙ„ Ø£ÙˆÙ„ÙŠ Ù…Ù† Ø§Ù„Ù…Ø±ÙƒØ¨Ø§Øª.' : 'Activer abonnements, tarification et paiement avec une premiÃ¨re flotte opÃ©rationnelle.',
    },
    {
      phase: '03',
      title: language === 'ar' ? 'Ø§Ù„ØªÙˆØ³Ø¹ Ø§Ù„ÙˆØ·Ù†ÙŠ' : 'Expansion nationale',
      text: language === 'ar' ? 'ØªÙƒØ±Ø§Ø± Ø§Ù„Ù†Ù…ÙˆØ°Ø¬ ÙÙŠ Ø¬Ø§Ù…Ø¹Ø§Øª Ø£Ø®Ø±Ù‰ ÙˆØ±Ø¨Ø· Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù…Ø·Ø§Ø± ÙˆØ§Ù„Ø³ÙŠØ§Ø­Ø© ÙˆØ§Ù„Ø£Ø­Ø¯Ø§Ø«.' : 'RÃ©pliquer le modÃ¨le dans dâ€™autres universitÃ©s et connecter aÃ©roport, tourisme et Ã©vÃ©nements.',
    },
    {
      phase: '04',
      title: language === 'ar' ? 'Ø°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ÙˆØªØ´ØºÙŠÙ„ Ø°ÙƒÙŠ' : 'IA & optimisation intelligente',
      text: language === 'ar' ? 'ØªØ­Ø³ÙŠÙ† Ø§Ù„Ù…Ø³Ø§Ø±Ø§ØªØŒ Ø§Ù„ØªÙ†Ø¨Ø¤ Ø¨Ø§Ù„Ø·Ù„Ø¨ØŒ ÙˆØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø£Ø¯Ø§Ø¡ Ø§Ù„Ù…Ø§Ù„ÙŠ ÙˆØ§Ù„ØªØ´ØºÙŠÙ„ÙŠ.' : 'Optimiser itinÃ©raires, prÃ©voir la demande et analyser performance financiÃ¨re et opÃ©rationnelle.',
    },
  ];

  const smartFeatures = [
    { icon: MapPin, title: language === 'ar' ? 'ØªØªØ¨Ø¹ GPS Ù…Ø¨Ø§Ø´Ø±' : 'Suivi GPS en direct' },
    { icon: Wifi, title: language === 'ar' ? 'Wi-Fi Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…Ø±ÙƒØ¨Ø§Øª' : 'Wi-Fi embarquÃ©' },
    { icon: Calendar, title: language === 'ar' ? 'Ø§Ø´ØªØ±Ø§ÙƒØ§Øª Ù…Ø±Ù†Ø©' : 'Abonnements flexibles' },
    { icon: Brain, title: language === 'ar' ? 'ØªØ­Ù„ÙŠÙ„Ø§Øª Ø°ÙƒÙŠØ©' : 'Analytique intelligente' },
    { icon: Globe2, title: language === 'ar' ? 'Ù…Ù†ØµØ© Ø«Ù†Ø§Ø¦ÙŠØ© Ø§Ù„Ù„ØºØ©' : 'Plateforme bilingue' },
    { icon: Zap, title: language === 'ar' ? 'Ø­Ø¬Ø² Ø³Ø±ÙŠØ¹' : 'RÃ©servation rapide' },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white">
      <section className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.18),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-emerald-100 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              {language === 'ar' ? 'Ù‚ØµØ© Ø´Ø±ÙƒØ© Ù†Ø§Ø´Ø¦Ø© Ø¬Ø§Ù…Ø¹ÙŠØ©' : 'Startup universitaire premium'}
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              {language === 'ar' ? 'UNIMOVE-DZ Ù„ÙŠØ³Øª Ù…Ø¬Ø±Ø¯ Ù†Ù‚Ù„ØŒ Ø¥Ù†Ù‡Ø§ Ø¨Ù†ÙŠØ© ØªØ­ØªÙŠØ© Ø¬Ø§Ù…Ø¹ÙŠØ© Ø°ÙƒÙŠØ©.' : 'UNIMOVE-DZ nâ€™est pas un simple transport, câ€™est une infrastructure universitaire intelligente.'}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50/80 md:text-2xl">
              {language === 'ar'
                ? 'Ù…Ø´Ø±ÙˆØ¹ Ù†Ø§Ø´Ø¦ ÙŠØ­ÙˆÙ„ Ø§Ù„ÙÙˆØ¶Ù‰ Ø§Ù„ÙŠÙˆÙ…ÙŠØ© ÙÙŠ Ø§Ù„Ù†Ù‚Ù„ Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ Ø¥Ù„Ù‰ ØªØ¬Ø±Ø¨Ø© Ø±Ù‚Ù…ÙŠØ© Ù…ÙˆØ«ÙˆÙ‚Ø©ØŒ Ø§Ù‚ØªØµØ§Ø¯ÙŠØ©ØŒ Ø¢Ù…Ù†Ø© ÙˆÙ‚Ø§Ø¨Ù„Ø© Ù„Ù„ØªÙˆØ³Ø¹.'
                : 'Une startup qui transforme la complexitÃ© quotidienne du transport universitaire en expÃ©rience digitale fiable, Ã©conomique, sÃ©curisÃ©e et scalable.'}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="/business-model" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-4 font-black text-slate-950 shadow-2xl shadow-emerald-500/30 transition hover:-translate-y-1 hover:bg-emerald-300">
                {language === 'ar' ? 'Ø§Ø³ØªÙƒØ´Ù Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„' : 'Explorer le business model'}
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href="/financial-plan" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 font-black text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15">
                {language === 'ar' ? 'Ø§Ù„Ø®Ø·Ø© Ø§Ù„Ù…Ø§Ù„ÙŠØ©' : 'Plan financier'}
              </a>
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
          <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'Ø§Ù„ØªÙ†Ù‚Ù„ Ø§Ù„Ø°ÙƒÙŠ ÙƒØ®Ø¯Ù…Ø© Ø¬Ø§Ù…Ø¹ÙŠØ©' : 'La mobilitÃ© intelligente comme service universitaire'}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            {language === 'ar'
              ? 'UNIMOVE-DZ ÙŠØ¬Ù…Ø¹ Ø§Ù„ØªÙƒÙ†ÙˆÙ„ÙˆØ¬ÙŠØ§ØŒ Ø§Ù„ØªÙ†Ø¸ÙŠÙ…ØŒ Ø§Ù„Ø£Ù…Ø§Ù†ØŒ ÙˆØ§Ù„Ø§Ø³ØªØ¯Ø§Ù…Ø© Ø§Ù„Ù…Ø§Ù„ÙŠØ© Ø¯Ø§Ø®Ù„ ØªØ¬Ø±Ø¨Ø© ÙˆØ§Ø­Ø¯Ø© Ù…ØµÙ…Ù…Ø© Ù„Ù„Ø¬Ø§Ù…Ø¹Ø© Ø§Ù„Ø¬Ø²Ø§Ø¦Ø±ÙŠØ©.'
              : 'UNIMOVE-DZ rÃ©unit technologie, organisation, sÃ©curitÃ© et durabilitÃ© financiÃ¨re dans une expÃ©rience pensÃ©e pour lâ€™universitÃ© algÃ©rienne.'}
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
          <h2 className="text-4xl font-black md:text-5xl">{language === 'ar' ? 'Ø®Ø§Ø±Ø·Ø© Ø§Ù„Ø·Ø±ÙŠÙ‚' : 'Roadmap stratÃ©gique'}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            {language === 'ar' ? 'Ù…Ù† Ù…Ø´Ø±ÙˆØ¹ Ø¬Ø§Ù…Ø¹ÙŠ Ø¥Ù„Ù‰ Ø´Ø±ÙƒØ© Ù†Ø§Ø´Ø¦Ø© Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„Ù†Ù…Ùˆ.' : 'Du projet universitaire Ã  une startup scalable.'}
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

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="rounded-3xl border-white/10 bg-gradient-to-br from-emerald-400 to-cyan-300 p-8 text-slate-950 shadow-2xl md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <HeartHandshake className="mb-5 h-10 w-10" />
              <h2 className="text-3xl font-black md:text-5xl">
                {language === 'ar' ? 'Ù…Ø´Ø±ÙˆØ¹ Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠ Ø¨Ø±ÙˆØ­ Ø´Ø±ÙƒØ© Ù†Ø§Ø´Ø¦Ø©' : 'Un projet acadÃ©mique avec lâ€™ambition dâ€™une startup'}
              </h2>
            </div>
            <div className="space-y-3 text-lg font-bold leading-8">
              <p>{language === 'ar' ? 'Ø§Ù„Ø·Ø§Ù„Ø¨Ø©: Ù…Ø±Ø§Ø­ Ø§Ø¨ØªØ³Ø§Ù…' : 'Ã‰tudiante : Ù…Ø±Ø§Ø­ Ø§Ø¨ØªØ³Ø§Ù…'}</p>
              <p>{language === 'ar' ? 'Ù…Ø§Ø³ØªØ± 2 Ù‚Ø§Ù†ÙˆÙ† Ø¹Ø§Ù… - 2025/2026' : 'Master 2 Droit GÃ©nÃ©ral - 2025/2026'}</p>
              <p>{language === 'ar' ? 'Ø¬Ø§Ù…Ø¹Ø© Ø§Ù„Ø¬ÙŠÙ„Ø§Ù„ÙŠ Ø§Ù„ÙŠØ§Ø¨Ø³ Ø³ÙŠØ¯ÙŠ Ø¨Ù„Ø¹Ø¨Ø§Ø³' : 'UniversitÃ© Djilali LiabÃ¨s Sidi Bel AbbÃ¨s'}</p>
              <p>{language === 'ar' ? 'Ø§Ù„Ø¥Ø´Ø±Ø§Ù: Ø§Ù„Ø¯ÙƒØªÙˆØ±Ø© Ø±Ù…Ø¯ÙˆÙ… Ù†ÙˆØ±Ø©' : 'Supervision : DR RAMDOUM NORA'}</p>
              <p>DR BEHIRI ABDELKADER - Ø¯ Ø¨Ø­ÙŠØ±ÙŠ Ø¹Ø¨Ø¯ Ø§Ù„Ù‚Ø§Ø¯Ø±</p>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
