'use client';

import { motion } from 'framer-motion';

interface DemoProgressProps {
  currentStep: number;
  totalSteps: number;
  label: string;
}

export function DemoProgress({ currentStep, totalSteps, label }: DemoProgressProps) {
  const progress = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/85 p-5 shadow-xl backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-sm font-black text-slate-800">{label}</p>
        <p className="text-sm font-black text-emerald-700">{progress}%</p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45 }}
        />
      </div>
      <div className="mt-3 grid gap-2" style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all ${index <= currentStep ? 'bg-emerald-500' : 'bg-slate-200'}`}
          />
        ))}
      </div>
    </div>
  );
}
