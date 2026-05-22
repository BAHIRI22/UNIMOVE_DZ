'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { AlertCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from './FadeInSection';

export function ProblemSolutionSection() {
  const { t } = useLanguage();

  const items = [
    {
      icon: AlertCircle,
      titleKey: 'problem.title',
      descKey: 'problem.description',
      color: 'from-red-50 to-red-100',
      iconColor: 'text-red-600',
      shadowColor: 'shadow-red-500/20',
    },
    {
      icon: Lightbulb,
      titleKey: 'solution.title',
      descKey: 'solution.description',
      color: 'from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
      shadowColor: 'shadow-blue-500/20',
    },
    {
      icon: TrendingUp,
      titleKey: 'impact.title',
      descKey: 'impact.description',
      color: 'from-green-50 to-green-100',
      iconColor: 'text-green-600',
      shadowColor: 'shadow-green-500/20',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-12">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.titleKey}>
                  <motion.div
                    className={`rounded-3xl p-12 bg-gradient-to-br ${item.color} hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] border border-white/50 hover:${item.shadowColor}`}
                    whileHover={{ y: -10 }}
                  >
                    <motion.div
                      className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className={`w-12 h-12 ${item.iconColor}`} />
                    </motion.div>
                    <h3 className="text-3xl font-black text-gray-900 mb-6 leading-tight">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-xl text-gray-700 leading-[2.2] font-medium">
                      {t(item.descKey)}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
