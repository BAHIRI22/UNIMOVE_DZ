'use client';

import Link from 'next/link';
import { LucideIcon, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface DemoStepCardProps {
  step: number;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
  completed?: boolean;
  actionLabel: string;
}

export function DemoStepCard({ step, title, description, href, icon: Icon, active, completed, actionLabel }: DemoStepCardProps) {
  return (
    <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Card className={`h-full overflow-hidden rounded-3xl border p-6 shadow-xl transition-all ${
        active
          ? 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-white shadow-emerald-600/15'
          : completed
          ? 'border-emerald-100 bg-white/90'
          : 'border-slate-200 bg-white/80'
      }`}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ${active ? 'bg-gradient-to-br from-emerald-600 to-teal-700' : 'bg-slate-900'}`}>
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <div className="text-sm font-black text-emerald-700">Étape {step}</div>
              <h3 className="text-xl font-black text-slate-950">{title}</h3>
            </div>
          </div>
          {completed && <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-emerald-600" />}
        </div>
        <p className="mb-6 min-h-14 text-sm font-semibold leading-7 text-slate-600">{description}</p>
        <Link
          href={href}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-5 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Card>
    </motion.div>
  );
}
