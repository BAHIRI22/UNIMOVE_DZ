'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
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

  const sections = [
    {
      icon: AlertTriangle,
      title: language === 'ar' ? 'Ø§Ù„Ù…Ø´ÙƒÙ„Ø©' : 'ProblÃ¨me',
      text: language === 'ar'
        ? 'ÙŠØ¹Ø§Ù†ÙŠ Ø§Ù„Ø·Ù„Ø¨Ø© Ù…Ù† ØªØ£Ø®Ø± Ø§Ù„Ù†Ù‚Ù„ØŒ ØºÙŠØ§Ø¨ Ø§Ù„Ø­Ø¬Ø² Ø§Ù„Ù…Ø³Ø¨Ù‚ØŒ Ù†Ù‚Øµ Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§ØªØŒ Ø§Ù„Ø§Ø²Ø¯Ø­Ø§Ù…ØŒ ÙˆØ¹Ø¯Ù… ÙˆØ¶ÙˆØ­ Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø§Ù„Ø±Ø­Ù„Ø§Øª.'
        : 'Les Ã©tudiants subissent retards, absence de rÃ©servation, manque dâ€™information, surcharge et horaires peu visibles.',
      tone: 'from-red-500 to-orange-500',
    },
    {
      icon: CheckCircle2,
      title: language === 'ar' ? 'Ø§Ù„Ø­Ù„' : 'Solution',
      text: language === 'ar'
        ? 'UNIMOVE-DZ ØªÙ‚Ø¯Ù… Ù…Ù†ØµØ© Ø±Ù‚Ù…ÙŠØ© Ù„Ù„Ø­Ø¬Ø²ØŒ QRØŒ ØªØªØ¨Ø¹ GPSØŒ Ø¥Ø´Ø¹Ø§Ø±Ø§ØªØŒ Ø§Ø´ØªØ±Ø§ÙƒØ§ØªØŒ ÙˆØ¯ÙØ¹ Ù…Ø±Ù† Ø¯Ø§Ø®Ù„ ØªØ¬Ø±Ø¨Ø© Ù…ÙˆØ­Ø¯Ø©.'
        : 'UNIMOVE-DZ propose une plateforme digitale pour rÃ©servation, QR, GPS, notifications, abonnements et paiement flexible.',
      tone: 'from-emerald-500 to-teal-500',
    },
    {
      icon: ShieldCheck,
      title: language === 'ar' ? 'Ø§Ù„Ø£Ù…Ø§Ù†' : 'SÃ©curitÃ©',
      text: language === 'ar'
        ? 'Ø¨Ø·Ø§Ù‚Ø§Øª Ø±Ù‚Ù…ÙŠØ©ØŒ ØªØªØ¨Ø¹ Ø§Ù„Ø±Ø­Ù„Ø§ØªØŒ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª ÙˆØ§Ø¶Ø­Ø©ØŒ ÙˆØ³Ø§Ø¦Ù‚ÙˆÙ† Ù…Ù†Ø¸Ù…ÙˆÙ† ÙŠØ±ÙØ¹ÙˆÙ† Ø§Ù„Ø«Ù‚Ø© ÙˆØ§Ù„Ø£Ù…Ø§Ù† Ø¯Ø§Ø®Ù„ Ø§Ù„Ù†Ù‚Ù„ Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ.'
        : 'Cartes digitales, suivi des trajets, informations claires et chauffeurs organisÃ©s renforcent la confiance et la sÃ©curitÃ©.',
      tone: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Building2,
      title: language === 'ar' ? 'Ø§Ù„ØªÙ†Ø¸ÙŠÙ…' : 'Organisation',
      text: language === 'ar'
        ? 'ØªØ­ÙˆÙŠÙ„ Ø§Ù„Ù†Ù‚Ù„ Ù…Ù† Ø®Ø¯Ù…Ø© ØªÙ‚Ù„ÙŠØ¯ÙŠØ© Ø¥Ù„Ù‰ Ù†Ø¸Ø§Ù… Ù‚Ø§Ø¨Ù„ Ù„Ù„Ù‚ÙŠØ§Ø³ ÙˆØ§Ù„ØªØ­Ø³ÙŠÙ† Ø¹Ø¨Ø± Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙˆÙ…Ø¤Ø´Ø±Ø§Øª Ø§Ù„Ø£Ø¯Ø§Ø¡.'
        : 'Transformer le transport traditionnel en systÃ¨me mesurable et optimisable via la donnÃ©e et les indicateurs.',
      tone: 'from-purple-500 to-indigo-500',
    },
  ];

  const stats = [
    { icon: Users, value: '10K+', label: language === 'ar' ? 'Ù…Ø³ØªØ®Ø¯Ù… Ù…Ø³ØªÙ‡Ø¯Ù' : 'Utilisateurs ciblÃ©s' },
    { icon: Clock, value: '35%', label: language === 'ar' ? 'ØªÙ‚Ù„ÙŠÙ„ Ø§Ù„ØªØ£Ø®ÙŠØ±' : 'RÃ©duction retards' },
    { icon: BarChart3, value: '9', label: language === 'ar' ? 'Ù…Ø­Ø§ÙˆØ± Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„' : 'Blocs business model' },
    { icon: Rocket, value: '5', label: language === 'ar' ? 'Ù…Ø±Ø§Ø­Ù„ Ù†Ù…Ùˆ' : 'Phases croissance' },
  ];

  const innovation = [
    { icon: MapPinned, title: language === 'ar' ? 'ØªØªØ¨Ø¹ Ù…Ø¨Ø§Ø´Ø± Ù„Ù„Ø±Ø­Ù„Ø§Øª' : 'Suivi trajets en direct' },
    { icon: Wifi, title: language === 'ar' ? 'Wi-Fi Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…Ø±ÙƒØ¨Ø§Øª' : 'Wi-Fi embarquÃ©' },
    { icon: LockKeyhole, title: language === 'ar' ? 'Ø¨Ø·Ø§Ù‚Ø© QR Ø¢Ù…Ù†Ø©' : 'Carte QR sÃ©curisÃ©e' },
    { icon: Database, title: language === 'ar' ? 'ØªØ­Ù„ÙŠÙ„Ø§Øª ØªØ´ØºÙŠÙ„ÙŠØ©' : 'Analytique opÃ©rationnelle' },
    { icon: Target, title: language === 'ar' ? 'ØªØ³Ø¹ÙŠØ± Ù‚Ø§Ø¨Ù„ Ù„Ù„ØªÙˆØ³Ø¹' : 'Tarification scalable' },
    { icon: GraduationCap, title: language === 'ar' ? 'Ù…ØµÙ…Ù… Ù„Ù„Ø¬Ø§Ù…Ø¹Ø©' : 'ConÃ§u pour lâ€™universitÃ©' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50/40">
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm font-black text-emerald-700 shadow-lg backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              {language === 'ar' ? 'Ø¹Ù† Ø§Ù„Ù…Ø´Ø±ÙˆØ¹' : 'Ã€ propos du projet'}
            </div>
            <h1 className="mx-auto max-w-5xl text-5xl font-black tracking-tight text-slate-950 md:text-7xl">
              {language === 'ar' ? 'UNIMOVE-DZ Ù…Ø´Ø±ÙˆØ¹ Ø¬Ø§Ù…Ø¹ÙŠ Ø¨Ù…Ù†Ø·Ù‚ Ø´Ø±ÙƒØ© Ù†Ø§Ø´Ø¦Ø©.' : 'UNIMOVE-DZ, un projet universitaire pensÃ© comme une startup.'}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-2xl">
              {language === 'ar'
                ? 'Ù…Ù†ØµØ© Ø°ÙƒÙŠØ© Ù„ØªØ­Ø³ÙŠÙ† Ø§Ù„Ù†Ù‚Ù„ Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ Ø¹Ø¨Ø± Ø§Ù„ØªÙƒÙ†ÙˆÙ„ÙˆØ¬ÙŠØ§ØŒ Ø§Ù„ØªÙ†Ø¸ÙŠÙ…ØŒ Ø§Ù„Ø£Ù…Ø§Ù†ØŒ ÙˆÙ†Ù…ÙˆØ°Ø¬ Ø§Ù‚ØªØµØ§Ø¯ÙŠ ÙˆØ§Ø¶Ø­.'
                : 'Une plateforme intelligente pour amÃ©liorer le transport universitaire grÃ¢ce Ã  la technologie, lâ€™organisation, la sÃ©curitÃ© et un modÃ¨le Ã©conomique clair.'}
            </p>
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
              <h2 className="text-4xl font-black md:text-5xl">
                {language === 'ar' ? 'Ø§Ù„Ø§Ø¨ØªÙƒØ§Ø± ÙÙŠ Ø®Ø¯Ù…Ø© Ø§Ù„Ù†Ù‚Ù„ Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ' : 'Lâ€™innovation au service de la mobilitÃ© universitaire'}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                {language === 'ar'
                  ? 'ÙŠØ¬Ù…Ø¹ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø¨ÙŠÙ† ØªØ¬Ø±Ø¨Ø© Ù…Ø³ØªØ®Ø¯Ù… Ø¨Ø³ÙŠØ·Ø© ÙˆÙ†Ø¸Ø§Ù… ØªØ´ØºÙŠÙ„ Ù‚Ø§Ø¨Ù„ Ù„Ù„Ù‚ÙŠØ§Ø³ØŒ Ù…Ø§ ÙŠØ¬Ø¹Ù„Ù‡ Ù‚Ø§Ø¨Ù„Ø§Ù‹ Ù„Ù„ØªØ·Ø¨ÙŠÙ‚ Ø¯Ø§Ø®Ù„ Ø§Ù„Ø¬Ø§Ù…Ø¹Ø© ÙˆØ§Ù„ØªÙˆØ³Ø¹ Ø¥Ù„Ù‰ Ù…Ø¤Ø³Ø³Ø§Øª Ø£Ø®Ø±Ù‰.'
                  : 'Le projet combine une expÃ©rience utilisateur simple et un systÃ¨me dâ€™exploitation mesurable, applicable Ã  lâ€™universitÃ© et extensible Ã  dâ€™autres institutions.'}
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
                {language === 'ar' ? 'Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø© Ø§Ù„Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠØ©' : 'Informations acadÃ©miques'}
              </h2>
              <div className="mt-6 space-y-3 text-lg font-semibold text-emerald-50">
                <p>{language === 'ar' ? 'Ø§Ù„Ø·Ø§Ù„Ø¨Ø©: Ù…Ø±Ø§Ø­ Ø§Ø¨ØªØ³Ø§Ù…' : 'Ã‰tudiante : Ù…Ø±Ø§Ø­ Ø§Ø¨ØªØ³Ø§Ù…'}</p>
                <p>{language === 'ar' ? 'Ù…Ø§Ø³ØªØ± 2 Ù‚Ø§Ù†ÙˆÙ† Ø¹Ø§Ù… - 2025/2026' : 'Master 2 Droit GÃ©nÃ©ral - 2025/2026'}</p>
                <p>{language === 'ar' ? 'Ø¬Ø§Ù…Ø¹Ø© Ø§Ù„Ø¬ÙŠÙ„Ø§Ù„ÙŠ Ø§Ù„ÙŠØ§Ø¨Ø³ Ø³ÙŠØ¯ÙŠ Ø¨Ù„Ø¹Ø¨Ø§Ø³' : 'UniversitÃ© Djilali LiabÃ¨s Sidi Bel AbbÃ¨s'}</p>
                <p>{language === 'ar' ? 'الإشراف: د:رمدوم نورة' : 'Supervision : DR RAMDOUM NORA'}</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black md:text-4xl">
                {language === 'ar' ? 'Ø§Ù„ØªØ·ÙˆÙŠØ±' : 'DÃ©veloppement'}
              </h2>
              <div className="mt-6 space-y-3 text-lg font-semibold text-emerald-50">
                <p>DR BEHIRI ABDELKADER</p>
                <p className="text-2xl font-black">Ø¯ Ø¨Ø­ÙŠØ±ÙŠ Ø¹Ø¨Ø¯ Ø§Ù„Ù‚Ø§Ø¯Ø±</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
