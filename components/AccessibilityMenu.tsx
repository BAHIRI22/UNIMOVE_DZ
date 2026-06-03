'use client';

import { useState, useRef, useEffect } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, Type, MonitorStop, Accessibility } from 'lucide-react';

export function AccessibilityMenu() {
  const { language } = useLanguage();
  const { highContrast, largeFonts, reducedMotion, toggleHighContrast, toggleLargeFonts, toggleReducedMotion } = useAccessibility();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isAr = language === 'ar';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-9 w-9 rounded-full bg-slate-100 hover:bg-emerald-100 flex items-center justify-center transition-colors"
        aria-label={isAr ? 'إعدادات إمكانية الوصول' : 'Paramètres d\'accessibilité'}
        title={isAr ? 'إعدادات إمكانية الوصول' : 'Paramètres d\'accessibilité'}
      >
        <Accessibility className="w-4 h-4 text-slate-700" />
      </button>

      {open && (
        <div className={`absolute top-10 z-50 w-64 rounded-2xl border border-slate-200 bg-white shadow-xl p-4 space-y-3 ${isAr ? 'left-0' : 'right-0'}`}>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {isAr ? 'إمكانية الوصول' : 'Accessibilité'}
          </p>

          <button
            onClick={toggleHighContrast}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
              highContrast ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 hover:bg-slate-50'
            }`}
            aria-pressed={highContrast}
            aria-label={isAr ? 'تبديل وضوح عالٍ' : 'Basculer contraste élevé'}
          >
            <Eye className="w-5 h-5 shrink-0" />
            <span className="text-sm font-bold">{isAr ? 'وضوح عالٍ' : 'Contraste élevé'}</span>
          </button>

          <button
            onClick={toggleLargeFonts}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
              largeFonts ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 hover:bg-slate-50'
            }`}
            aria-pressed={largeFonts}
            aria-label={isAr ? 'تبديل خط كبير' : 'Basculer grandes polices'}
          >
            <Type className="w-5 h-5 shrink-0" />
            <span className="text-sm font-bold">{isAr ? 'خط كبير' : 'Grandes polices'}</span>
          </button>

          <button
            onClick={toggleReducedMotion}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
              reducedMotion ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 hover:bg-slate-50'
            }`}
            aria-pressed={reducedMotion}
            aria-label={isAr ? 'تبديل تقليل الحركة' : 'Basculer réduire mouvements'}
          >
            <MonitorStop className="w-5 h-5 shrink-0" />
            <span className="text-sm font-bold">{isAr ? 'تقليل الحركة' : 'Réduire mouvements'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
