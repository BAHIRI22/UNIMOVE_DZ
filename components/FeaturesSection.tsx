'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import {
  Smartphone,
  Building2,
  QrCode,
  CreditCard,
  BookOpen,
  Navigation,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from './FadeInSection';

export function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Smartphone,
      titleKey: 'features.registration',
    },
    {
      icon: Building2,
      titleKey: 'features.institution',
    },
    {
      icon: QrCode,
      titleKey: 'features.qrCode',
    },
    {
      icon: CreditCard,
      titleKey: 'features.membership',
    },
    {
      icon: BookOpen,
      titleKey: 'features.booking',
    },
    {
      icon: Navigation,
      titleKey: 'features.tracking',
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <StaggerContainer>
          <div className="text-center mb-20">
            <StaggerItem>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tight">
                {t('nav.features')}
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-2xl md:text-3xl text-slate-600 leading-[2.2] max-w-4xl mx-auto font-medium">
                {t('hero.description')}
              </p>
            </StaggerItem>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={feature.titleKey}>
                  <motion.div
                    className="flex flex-col items-start gap-8 p-10 rounded-3xl border border-slate-200 bg-white hover:shadow-2xl hover:border-emerald-500 transition-all duration-500 group hover:scale-[1.03] hover:shadow-emerald-500/20"
                    whileHover={{ y: -8 }}
                  >
                    <motion.div
                      className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 group-hover:from-emerald-100 group-hover:to-emerald-200 transition-all duration-500"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-10 h-10 text-emerald-600" />
                    </motion.div>
                    <h3 className="font-black text-gray-900 text-2xl leading-tight">
                      {t(feature.titleKey)}
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
