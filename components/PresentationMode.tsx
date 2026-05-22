'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, GraduationCap, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';

export function PresentationMode() {
  const { language } = useLanguage();

  const audiences = [
    language === 'ar' ? 'لجنة المناقشة' : 'Jury',
    language === 'ar' ? 'الجامعة' : 'Université',
    language === 'ar' ? 'حاضنة أعمال' : 'Incubateur',
    language === 'ar' ? 'مستثمرون' : 'Investisseurs',
  ];

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-white shadow-2xl md:px-10 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.35),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.25),transparent_38%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-emerald-100 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            {language === 'ar' ? 'وضع العرض النهائي' : 'Mode présentation final'}
          </div>
          <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">UNIMOVE-DZ</h1>
          <p className="mt-4 text-2xl font-black text-emerald-200">الجامعة أقرب، أسهل، و أأمن</p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-2xl">
            {language === 'ar'
              ? 'مشروع منصة ذكية للنقل الجامعي يعرض رحلة كاملة من التسجيل، الحجز، الدفع، بطاقة QR، لوحة المستخدم، الإدارة، والنموذج الاقتصادي.'
              : 'Une plateforme intelligente de mobilité universitaire présentée sous forme de parcours complet : inscription, réservation, paiement, QR Card, dashboard, admin et modèle économique.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {audiences.map((audience) => (
              <span key={audience} className="rounded-full bg-white/10 px-4 py-2 text-sm font-black text-slate-100 backdrop-blur-xl">
                {audience}
              </span>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/demo-flow" className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 text-base font-black text-white shadow-xl shadow-emerald-500/25 transition hover:-translate-y-1">
              {language === 'ar' ? 'بدء العرض التوضيحي' : 'Démarrer démonstration'}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/dashboard" className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-6 text-base font-black text-white backdrop-blur-xl transition hover:bg-white/15">
              {language === 'ar' ? 'الذهاب إلى Dashboard' : 'Aller au dashboard'}
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {[
            { icon: Rocket, title: language === 'ar' ? 'Startup Demo' : 'Startup Demo', text: language === 'ar' ? 'جاهز للحاضنات والمسابقات' : 'Prêt incubateur et concours' },
            { icon: GraduationCap, title: language === 'ar' ? 'Soutenance' : 'Soutenance', text: language === 'ar' ? 'عرض أكاديمي واضح ومنظم' : 'Présentation académique claire' },
            { icon: Building2, title: language === 'ar' ? 'Business' : 'Business', text: language === 'ar' ? 'نموذج اقتصادي وتمويل' : 'Modèle économique et finance' },
            { icon: ShieldCheck, title: language === 'ar' ? 'Test Mode' : 'Test Mode', text: language === 'ar' ? 'OTP تجريبي دون كسر Firebase' : 'OTP test sans toucher Firebase' },
          ].map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }}>
              <Card className="rounded-3xl border-white/10 bg-white/10 p-5 text-white backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-emerald-300/15 p-3 text-emerald-200">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-black">{item.title}</h3>
                    <p className="text-sm text-slate-300">{item.text}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
