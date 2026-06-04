'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { QRCodeDisplay } from '@/components/QRCodeDisplay';
import { Smartphone, Download, Share2, PlusSquare, CheckCircle2, Globe, Apple } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InstallPage() {
  const { language } = useLanguage();
  const [appUrl, setAppUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const isAr = language === 'ar';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAppUrl(window.location.origin);
    }
  }, []);

  const copyLink = () => {
    if (appUrl) {
      navigator.clipboard.writeText(appUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const steps = [
    {
      icon: Globe,
      titleAr: 'افتح الرابط في المتصفح',
      titleFr: 'Ouvrez le lien dans le navigateur',
      descAr: 'استخدم Chrome على Android أو Safari على iPhone',
      descFr: 'Utilisez Chrome sur Android ou Safari sur iPhone',
    },
    {
      icon: Share2,
      titleAr: 'اضغط زر المشاركة',
      titleFr: 'Appuyez sur Partager',
      descAr: 'في شريط المتصفح السفلي (Safari) أو القائمة العلوية (Chrome)',
      descFr: 'Dans la barre inférieure (Safari) ou le menu (Chrome)',
    },
    {
      icon: PlusSquare,
      titleAr: 'اختر "إضافة إلى الشاشة"',
      titleFr: 'Choisissez "Ajouter à l\'écran"',
      descAr: 'سيظهر اسم UNIMOVE-DZ مع الأيقونة الخضراء',
      descFr: 'Le nom UNIMOVE-DZ apparaîtra avec l\'icône verte',
    },
    {
      icon: CheckCircle2,
      titleAr: 'تم التثبيت!',
      titleFr: 'Installé !',
      descAr: 'ستجد التطبيق كأيقونة على شاشتك الرئيسية',
      descFr: 'Vous trouverez l\'application comme icône sur votre écran',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/30">
            <Smartphone className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3">
            {isAr ? 'ثبّت UNIMOVE-DZ على هاتفك' : 'Installez UNIMOVE-DZ sur votre téléphone'}
          </h1>
          <p className="text-lg text-emerald-200/80 max-w-md mx-auto leading-7">
            {isAr
              ? 'امسح الكود أو انسخ الرابط لتثبيت التطبيق مباشرة على شاشتك الرئيسية'
              : 'Scannez le code ou copiez le lien pour installer l\'application directement sur votre écran d\'accueil'}
          </p>
        </motion.div>

        {/* QR Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-[2rem] border border-emerald-500/20 bg-white/5 p-8 backdrop-blur-xl mb-10"
        >
          <div className="flex flex-col items-center gap-6">
            {appUrl && (
              <div className="rounded-2xl bg-white p-4 shadow-2xl">
                <QRCodeDisplay value={appUrl} size={220} />
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-emerald-300 font-semibold mb-2">
                {isAr ? 'رابط التطبيق' : 'Lien de l\'application'}
              </p>
              <div className="flex items-center gap-2">
                <code className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-mono text-emerald-300 border border-slate-700">
                  {appUrl || '...'}
                </code>
                <button
                  onClick={copyLink}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500 transition"
                >
                  {copied ? (isAr ? 'تم النسخ!' : 'Copié!') : (isAr ? 'نسخ' : 'Copier')}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Download className="w-4 h-4" />
              <span>
                {isAr
                  ? 'اضغط مع الاستمرار على الكود لنسخ الرابط'
                  : 'Appuyez longuement sur le code pour copier le lien'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-black text-center mb-6">
            {isAr ? 'خطوات التثبيت' : 'Étapes d\'installation'}
          </h2>

          <div className="grid gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-4 rounded-2xl border border-emerald-500/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-100">
                    {isAr ? step.titleAr : step.titleFr}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400 leading-6">
                    {isAr ? step.descAr : step.descFr}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Platform Notes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-10 rounded-2xl border border-slate-700 bg-slate-800/50 p-6"
        >
          <h3 className="font-bold text-emerald-200 mb-4">
            {isAr ? 'ملاحظات حسب النظام' : 'Notes par plateforme'}
          </h3>
          <div className="space-y-3 text-sm text-slate-300 leading-7">
            <div className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-white">Android (Chrome):</strong>{' '}
                {isAr
                  ? 'اضغط على القائمة (ثلاث نقاط) → "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية"'
                  : 'Appuyez sur le menu (3 points) → "Installer l\'application" ou "Ajouter à l\'écran d\'accueil"'}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Apple className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-white">iOS (Safari):</strong>{' '}
                {isAr
                  ? 'اضغط على زر المشاركة ↗️ → "إضافة إلى الشاشة الرئيسية" → "إضافة"'
                  : 'Appuyez sur Partager ↗️ → "Ajouter à l\'écran d\'accueil" → "Ajouter"'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-500">
          <p>
            {isAr
              ? 'بعد التثبيت، افتح التطبيق من الأيقونة للوصول المباشر إلى لوحة التحكم'
              : 'Après l\'installation, ouvrez l\'application depuis l\'icône pour un accès direct au tableau de bord'}
          </p>
        </div>
      </div>
    </div>
  );
}
