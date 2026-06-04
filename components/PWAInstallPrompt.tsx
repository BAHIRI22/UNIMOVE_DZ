'use client';

import { useEffect, useState } from 'react';
import { Download, CheckCircle2, X, Smartphone, Share2, PlusSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export function PWAInstallPrompt() {
  const { language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSHelp, setShowIOSHelp] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as Navigator & { standalone?: boolean }).standalone;
    setIsInstalled(Boolean(standalone));

    // Detect iOS Safari (no beforeinstallprompt support)
    const ua = window.navigator.userAgent.toLowerCase();
    const iOSDevice = /iphone|ipad|ipod/.test(ua);
    setIsIOS(iOSDevice);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setIsVisible(!standalone);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);

    // Show prompt after a short delay on mobile if not installed
    const timer = setTimeout(() => {
      if (!standalone && !deferredPrompt && iOSDevice) {
        setIsVisible(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => undefined);
    }
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSHelp(true);
      return;
    }
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setIsInstalled(true);
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          className="fixed bottom-24 left-4 right-4 z-[70] mx-auto max-w-md rounded-[1.5rem] border border-emerald-100 bg-white/95 p-4 shadow-2xl shadow-emerald-900/20 backdrop-blur-xl md:bottom-6 md:left-auto md:right-6"
        >
          <button
            type="button"
            onClick={() => { setIsVisible(false); setShowIOSHelp(false); }}
            className="absolute right-3 top-3 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close install prompt"
          >
            <X className="h-4 w-4" />
          </button>

          {showIOSHelp ? (
            <div className="pr-8">
              <h3 className="font-black text-slate-950 mb-2">
                {language === 'ar' ? 'تثبيت على iPhone / iPad' : 'Installer sur iPhone / iPad'}
              </h3>
              <ol className="text-sm font-semibold leading-7 text-slate-700 list-decimal list-inside space-y-1">
                <li className="flex items-start gap-2">
                  <Share2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  {language === 'ar' ? 'اضغط على زر "مشاركة" في شريط Safari' : 'Appuyez sur le bouton Partager dans Safari'}
                </li>
                <li className="flex items-start gap-2">
                  <PlusSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  {language === 'ar' ? 'اختر "إضافة إلى الشاشة الرئيسية"' : 'Choisissez "Ajouter à l\'écran d\'accueil"'}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  {language === 'ar' ? 'اضغط "إضافة" — سيظهر التطبيق كأيقونة!' : 'Appuyez sur "Ajouter" — l\'apparaîtra comme une icône !'}
                </li>
              </ol>
            </div>
          ) : (
            <div className="flex gap-4 pr-8">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg">
                <Smartphone className="h-7 w-7" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-black text-slate-950">
                  {language === 'ar' ? 'ثبّت تطبيق UNIMOVE-DZ' : 'Installer UNIMOVE-DZ'}
                </h3>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                  {language === 'ar'
                    ? 'استخدم المنصة كتطبيق هاتف مستقل وسريع.'
                    : 'Utilisez la plateforme comme une vraie application mobile.'}
                </p>
                <button
                  type="button"
                  onClick={handleInstall}
                  className="mt-4 inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-4 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5"
                >
                  <Download className="h-4 w-4" />
                  {language === 'ar'
                    ? (isIOS ? 'كيفية التثبيت' : 'تثبيت التطبيق')
                    : (isIOS ? 'Comment installer' : 'Installer l\'application')}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
