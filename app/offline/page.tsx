'use client';

import { WifiOff, RefreshCw, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function OfflinePage() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-slate-100 px-4 py-12">
      <section className="relative w-full max-w-lg rounded-[2rem] border border-emerald-100 bg-white/85 p-8 text-center shadow-2xl backdrop-blur-xl">
        <div className="absolute top-4 left-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="h-9 rounded-lg text-slate-800 bg-white/70 hover:bg-white/90 border border-emerald-100"
          >
            ← رجوع
          </Button>
        </div>
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-emerald-100 text-emerald-700 shadow-lg">
          <WifiOff className="h-12 w-12" />
        </div>
        <div className="mb-6 flex items-center justify-center gap-2 text-sm font-black text-emerald-700">
          <Bus className="h-4 w-4" />
          UNIMOVE-DZ
        </div>
        <h1 className="mb-4 text-3xl font-black text-slate-950 md:text-4xl">
          أنت غير متصل بالإنترنت
        </h1>
        <p className="mb-8 text-lg font-semibold leading-8 text-slate-600">
          Veuillez vérifier votre connexion internet
        </p>
        <button
          type="button"
          onClick={() => typeof window !== 'undefined' && window.location.reload()}
          className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-6 text-base font-black text-white shadow-xl shadow-emerald-600/25 transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <RefreshCw className="h-5 w-5" />
          Réessayer
        </button>
      </section>
    </main>
  );
}
