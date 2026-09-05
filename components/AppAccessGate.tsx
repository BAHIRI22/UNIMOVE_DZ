'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { LockKeyhole, ArrowRight } from 'lucide-react';

const ACCESS_PASSWORD = 'MERAH2026';
const ACCESS_KEY = 'unimove_app_access';

export function AppAccessGate({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsUnlocked(sessionStorage.getItem(ACCESS_KEY) === 'granted');
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === ACCESS_PASSWORD) {
      sessionStorage.setItem(ACCESS_KEY, 'granted');
      setIsUnlocked(true);
      setHasError(false);
      return;
    }

    setPassword('');
    setHasError(true);
    inputRef.current?.focus();
  };

  if (isUnlocked) return <>{children}</>;

  return (
    <main
      className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-slate-950 px-4 py-8"
      style={{
        backgroundImage: "linear-gradient(135deg, rgba(2, 44, 34, 0.9), rgba(15, 23, 42, 0.78)), url('/images/UNIMOVE_DZ.jpg')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/95 p-7 text-center shadow-2xl backdrop-blur-xl sm:p-9">
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg ring-4 ring-emerald-100">
          <Image
            src="/images/logo.png?v=logo-clean"
            alt="Logo UNIMOVE-DZ"
            width={96}
            height={96}
            priority
            className="h-full w-full object-contain"
          />
        </div>

        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">UNIMOVE-DZ</p>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Accès à l&apos;application</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">Entrez le mot de passe pour continuer vers votre espace.</p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4 text-left">
          <label htmlFor="app-password" className="sr-only">Mot de passe</label>
          <div className={`flex items-center gap-3 rounded-2xl border bg-slate-50 px-4 transition-colors ${hasError ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100'}`}>
            <LockKeyhole className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
            <input
              ref={inputRef}
              id="app-password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setHasError(false);
              }}
              placeholder="Mot de passe"
              autoComplete="current-password"
              aria-invalid={hasError}
              className="h-14 min-w-0 flex-1 bg-transparent text-base font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
          {hasError && <p className="px-1 text-sm font-semibold text-red-600" role="alert">Mot de passe incorrect.</p>}
          <button type="submit" className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 font-bold text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200">
            Se connecter
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </form>
      </div>
    </main>
  );
}
