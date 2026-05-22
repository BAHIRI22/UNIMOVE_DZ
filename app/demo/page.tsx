'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { PresentationMode } from '@/components/PresentationMode';
import { Card } from '@/components/ui/card';
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, Rocket, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DemoPage() {
  const { language } = useLanguage();

  const demoHighlights = [
    language === 'ar' ? 'التسجيل عبر OTP التجريبي' : 'Inscription avec OTP Test Mode',
    language === 'ar' ? 'حجز مسار ذكي' : 'Réservation trajet intelligent',
    language === 'ar' ? 'دفع تجريبي' : 'Paiement simulé',
    language === 'ar' ? 'بطاقة QR رقمية' : 'QR Card digitale',
    language === 'ar' ? 'لوحة المستخدم' : 'Dashboard utilisateur',
    language === 'ar' ? 'لوحة الإدارة' : 'Admin panel',
    language === 'ar' ? 'نموذج الأعمال' : 'Business model',
    language === 'ar' ? 'الخطة المالية' : 'Financial plan',
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <PresentationMode />

        <section className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <Card className="rounded-[2rem] border-emerald-100 bg-white/85 p-7 shadow-xl backdrop-blur-xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg">
              <Rocket className="h-7 w-7" />
            </div>
            <h2 className="text-3xl font-black text-slate-950">
              {language === 'ar' ? 'مسار العرض التوضيحي' : 'Parcours démonstration'}
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              {language === 'ar'
                ? 'وضع عرض احترافي يسمح بشرح التطبيق خطوة بخطوة أمام لجنة أو حاضنة أو مستثمر.'
                : 'Un mode professionnel pour expliquer l’application étape par étape devant jury, incubateur ou investisseurs.'}
            </p>
            <Link href="/demo-flow" className="mt-6 inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-6 text-base font-black text-white shadow-xl shadow-emerald-600/20 transition hover:-translate-y-1">
              {language === 'ar' ? 'بدء العرض التوضيحي' : 'Démarrer démonstration'}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Card>

          <Card className="rounded-[2rem] border-emerald-100 bg-white/85 p-7 shadow-xl backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  {language === 'ar' ? 'المحتوى المعروض' : 'Contenu présenté'}
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  {language === 'ar' ? 'مسار كامل من المستخدم إلى خطة الأعمال' : 'Parcours complet de l’utilisateur au business plan'}
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {demoHighlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700">
                    {index + 1}
                  </span>
                  <span className="text-sm font-black text-slate-800">{item}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card className="rounded-[2rem] border-emerald-100 bg-white/85 p-7 shadow-xl backdrop-blur-xl lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-emerald-700" />
              <h2 className="text-3xl font-black text-slate-950">
                {language === 'ar' ? 'القسم الأكاديمي' : 'Section académique'}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-emerald-50 p-5">
                <p className="text-sm font-bold text-emerald-700">الطالبة</p>
                <h3 className="mt-1 text-2xl font-black text-slate-950">مراح ابتسام</h3>
                <p className="mt-3 font-bold text-slate-600">ماستر 2 قانون عام</p>
                <p className="font-bold text-slate-600">2025/2026</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm font-bold text-emerald-700">المؤسسة الجامعية</p>
                <h3 className="mt-1 text-xl font-black leading-8 text-slate-950">كلية الحقوق والعلوم السياسية</h3>
                <p className="mt-3 font-bold text-slate-600">جامعة الجيلالي اليابس سيدي بلعباس</p>
              </div>
              <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <p className="text-sm font-bold text-emerald-300">إشراف</p>
                <h3 className="mt-1 text-xl font-black">د:رمدوم نورة</h3>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-5 text-white">
                <p className="text-sm font-bold text-emerald-100">إنجاز وتطوير</p>
                <h3 className="mt-1 text-xl font-black">{language === 'ar' ? 'مشروع UNIMOVE-DZ' : 'Projet UNIMOVE-DZ'}</h3>
                <p className="mt-2 text-lg font-black">{language === 'ar' ? 'منصة النقل الجامعي الذكي' : 'Plateforme de transport universitaire intelligent'}</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-[2rem] border-emerald-100 bg-slate-950 p-7 text-white shadow-xl">
            <ShieldCheck className="mb-5 h-9 w-9 text-emerald-300" />
            <h2 className="text-2xl font-black">
              {language === 'ar' ? 'وضع مناقشة آمن' : 'Mode soutenance sécurisé'}
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">
              {language === 'ar'
                ? 'لا يتم تعديل Firebase OTP أو نظام المصادقة. العرض يستخدم صفحات التطبيق الحالية وروابط واضحة.'
                : 'Firebase OTP et l’authentification ne sont pas modifiés. La présentation utilise les pages existantes avec un parcours clair.'}
            </p>
            <div className="mt-6 space-y-3">
              <Link href="/business-model" className="flex h-12 items-center justify-center rounded-2xl bg-white/10 text-sm font-black transition hover:bg-white/15">
                {language === 'ar' ? 'عرض نموذج الأعمال' : 'Voir business model'}
              </Link>
              <Link href="/financial-plan" className="flex h-12 items-center justify-center rounded-2xl bg-white/10 text-sm font-black transition hover:bg-white/15">
                {language === 'ar' ? 'عرض الخطة المالية' : 'Voir financial plan'}
              </Link>
              <Link href="/my-card" className="flex h-12 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-black text-white transition hover:bg-emerald-400">
                {language === 'ar' ? 'عرض بطاقة QR' : 'Voir QR Card'}
              </Link>
            </div>
          </Card>
        </section>

        <Card className="rounded-[2rem] border-emerald-100 bg-white/85 p-7 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-7 w-7 text-emerald-700" />
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  {language === 'ar' ? 'طريقة اختبار العرض' : 'Comment tester la démo'}
                </h2>
                <p className="text-sm font-semibold text-slate-600">
                  {language === 'ar' ? 'افتح /demo ثم اضغط بدء العرض التوضيحي' : 'Ouvrez /demo puis cliquez sur Démarrer démonstration'}
                </p>
              </div>
            </div>
            <Link href="/demo-flow" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5">
              /demo-flow
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
