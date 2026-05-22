'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Phone, Shield, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function HeroSection() {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Phone,
      text: language === 'ar' ? 'تسجيل برقم الهاتف' : 'Inscription par téléphone',
    },
    {
      icon: Shield,
      text: language === 'ar' ? 'آمن وموثوق' : 'Sécurisé et fiable',
    },
    {
      icon: Clock,
      text: language === 'ar' ? 'حجز سريع' : 'Réservation rapide',
    },
    {
      icon: MapPin,
      text: language === 'ar' ? 'تتبع الرحلات' : 'Suivi des trajets',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative py-24 md:py-36 overflow-hidden min-h-[80vh] md:min-h-[85vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/UNIMOVE_DZ.jpg"
          alt="UNIMOVE-DZ Background"
          fill
          className="object-cover"
          priority
        />
        {/* Premium Gradient Overlay with Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-emerald-800/60 to-slate-900/70"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
        {/* Animated Floating Glow Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-slate-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Premium Badge */}
          <motion.div
            className="mb-12 inline-block"
            variants={itemVariants}
          >
            <span className="inline-flex items-center px-8 py-4 rounded-full bg-white/15 text-white text-lg font-bold backdrop-blur-md border border-white/30 hover:bg-white/20 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/30 hover:scale-105">
              {language === 'ar' ? 'المرحلة التجريبية' : 'Phase Pilote'}
              <span className="mx-4">|</span>
              {language === 'ar' ? 'سيدي بلعباس' : 'Sidi Bel Abbès'}
            </span>
          </motion.div>

          {/* Logo/App Name with Glow Effect */}
          <motion.h1
            className="text-7xl md:text-9xl lg:text-[10rem] font-black text-white mb-8 leading-tight tracking-tight text-balance drop-shadow-2xl"
            variants={itemVariants}
          >
            UNIMOVE-DZ
          </motion.h1>

          {/* Slogan with Gradient Text */}
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white/95 mb-12 leading-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
              {language === 'ar' ? 'الجامعة أقرب، أسهل، و أأمن' : 'L\'université plus proche, plus facile et plus sûre'}
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-5xl mx-auto mb-20 leading-[2.2] font-medium"
            variants={itemVariants}
          >
            {language === 'ar'
              ? 'نظام نقل جامعي ذكي للطلاب والأساتذة والموظفين'
              : 'Système de transport universitaire intelligent pour étudiants, enseignants et personnel'}
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black px-14 py-6 text-xl h-20 rounded-2xl shadow-2xl shadow-emerald-500/30 transition-all duration-500 hover:shadow-3xl hover:shadow-emerald-500/50"
              >
                <Link href="/register" className="flex items-center gap-3">
                  {language === 'ar' ? 'ابدأ الآن' : 'Commencer maintenant'}
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white/50 text-white hover:bg-white/20 font-black px-14 py-6 text-xl h-20 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-white/20 backdrop-blur-sm"
              >
                <Link href="#about">
                  {language === 'ar' ? 'من نحن' : 'À propos'}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Premium Features Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
            variants={itemVariants}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-8 hover:bg-white/25 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 group"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex flex-col items-center text-center gap-5">
                    <motion.div
                      className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <p className="text-white font-black text-lg leading-7">{feature.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
