'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Sparkles, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from './FadeInSection';

export function VisionSection() {
  const { t } = useLanguage();

  const visionPoints = [
    {
      icon: Globe,
      titleKey: 'vision.expansion',
      color: 'from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
      shadowColor: 'shadow-blue-500/20',
    },
    {
      icon: Sparkles,
      titleKey: 'vision.ai',
      color: 'from-purple-50 to-purple-100',
      iconColor: 'text-purple-600',
      shadowColor: 'shadow-purple-500/20',
    },
    {
      icon: Leaf,
      titleKey: 'vision.sustainability',
      color: 'from-green-50 to-green-100',
      iconColor: 'text-green-600',
      shadowColor: 'shadow-green-500/20',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-white via-emerald-50/30 to-emerald-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <StaggerContainer>
          <div className="text-center mb-20">
            <StaggerItem>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tight">
                {t('vision.title')}
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-2xl md:text-3xl text-slate-600 leading-[2.2] max-w-4xl mx-auto font-medium">
                {t('hero.description')}
              </p>
            </StaggerItem>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {visionPoints.map((point) => {
              const Icon = point.icon;
              return (
                <StaggerItem key={point.titleKey}>
                  <motion.div
                    className={`rounded-3xl p-12 bg-gradient-to-br ${point.color} hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] border border-white/50 hover:${point.shadowColor}`}
                    whileHover={{ y: -10 }}
                  >
                    <motion.div
                      className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className={`w-12 h-12 ${point.iconColor}`} />
                    </motion.div>
                    <h3 className="text-3xl font-black text-gray-900 leading-tight">
                      {t(point.titleKey)}
                    </h3>
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
