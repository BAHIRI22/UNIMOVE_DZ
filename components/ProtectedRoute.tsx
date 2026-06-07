'use client';

import { usePathname } from 'next/navigation';
import { useBusinessUnlock } from '@/hooks/useBusinessUnlock';
import { getUnlockKey } from '@/lib/passcode';
import { PasscodePrompt } from './PasscodePrompt';
import { Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageKey = getUnlockKey(pathname);
  const { isUnlocked, isReady } = useBusinessUnlock(pageKey);
  const { language } = useLanguage();

  if (!isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-white font-bold text-lg">
          {language === 'ar' ? 'جارٍ التحميل...' : 'Chargement...'}
        </div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-2">
              <Lock className="w-7 h-7 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              {language === 'ar' ? 'أدخل مفتاح المرور' : 'Entrez le mot de passe'}
            </h2>
            <p className="text-sm text-slate-500">
              {language === 'ar'
                ? 'هذه الصفحة محمية بكلمة مرور.'
                : 'Cette page est protégée par un mot de passe.'}
            </p>
          </div>
          <PasscodePrompt
            onSuccess={() => {}}
            pageKey={pageKey}
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
