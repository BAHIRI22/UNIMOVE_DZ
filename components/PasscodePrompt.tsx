'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBusinessUnlock } from '@/hooks/useBusinessUnlock';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, AlertCircle } from 'lucide-react';

interface PasscodePromptProps {
  onSuccess: () => void;
  onCancel?: () => void;
  pageKey: string;
}

export function PasscodePrompt({ onSuccess, onCancel, pageKey }: PasscodePromptProps) {
  const { language } = useLanguage();
  const { unlock } = useBusinessUnlock(pageKey);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    if (unlock(input.trim())) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 p-2">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
          <Lock className="w-6 h-6 text-emerald-600" />
        </div>
        <h2 className="text-xl font-black text-slate-900">
          {language === 'ar' ? 'أدخل مفتاح المرور' : 'Entrez le mot de passe'}
        </h2>
        <p className="text-sm text-slate-500">
          {language === 'ar'
            ? 'هذه الصفحة محمية بكلمة مرور.'
            : 'Cette page est protégée par un mot de passe.'}
        </p>
      </div>

      <div className="space-y-3">
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          onKeyDown={handleKeyDown}
          placeholder="UNIMOVE-DZ"
          className={`h-12 text-center text-base font-bold tracking-widest uppercase ${
            error ? 'border-red-400 focus-visible:ring-red-400' : ''
          }`}
        />

        {error && (
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>
              {language === 'ar' ? 'مفتاح المرور غير صحيح' : 'Mot de passe incorrect'}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {onCancel && (
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 h-12 text-base font-bold rounded-xl"
          >
            {language === 'ar' ? 'إلغاء' : 'Annuler'}
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          className="flex-1 h-12 text-base font-black rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
        >
          {language === 'ar' ? 'دخول' : 'Entrer'}
        </Button>
      </div>
    </div>
  );
}
