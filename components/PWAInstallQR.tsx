'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { QRCodeDisplay } from './QRCodeDisplay';
import { Smartphone, Download } from 'lucide-react';

export function PWAInstallQR() {
  const { language } = useLanguage();
  const [appUrl, setAppUrl] = useState('');
  const isAr = language === 'ar';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAppUrl(window.location.origin);
    }
  }, []);

  if (!appUrl) return null;

  return (
    <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/30">
          <Smartphone className="w-4 h-4 text-white" />
        </div>
        <h4 className="font-bold text-sm text-gray-800">
          {isAr ? 'ثبّت التطبيق' : 'Installer l\'app'}
        </h4>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="rounded-xl overflow-hidden shadow-md bg-white p-2 border border-gray-100">
          <QRCodeDisplay value={appUrl} size={140} />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 text-center">
          <Download className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>
            {isAr
              ? 'امسح بالهاتف للتثبيت'
              : 'Scannez avec votre téléphone'}
          </span>
        </div>
      </div>
    </div>
  );
}
