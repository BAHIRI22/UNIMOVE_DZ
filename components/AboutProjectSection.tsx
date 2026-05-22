'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Bus, Wifi, CreditCard, Plane, GraduationCap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from './FadeInSection';

export function AboutProjectSection() {
  const { t, language } = useLanguage();

  const academicDetails = [
    { label: 'Projet prÃ©parÃ© par', value: 'Ù…Ø±Ø§Ø­ Ø§Ø¨ØªØ³Ø§Ù…' },
    { label: 'Niveau', value: 'DeuxiÃ¨me annÃ©e Master' },
    { label: 'SpÃ©cialitÃ©', value: 'Ù‚Ø§Ù†ÙˆÙ† Ø¹Ø§Ù…' },
    { label: 'AnnÃ©e universitaire', value: '2025/2026' },
    { label: 'FacultÃ©', value: 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø­Ù‚ÙˆÙ‚ ÙˆØ§Ù„Ø¹Ù„ÙˆÙ… Ø§Ù„Ø³ÙŠØ§Ø³ÙŠØ©' },
    { label: 'UniversitÃ©', value: 'Ø¬Ø§Ù…Ø¹Ø© Ø§Ù„Ø¬ÙŠÙ„Ø§Ù„ÙŠ Ø§Ù„ÙŠØ§Ø¨Ø³ Ø³ÙŠØ¯ÙŠ Ø¨Ù„Ø¹Ø¨Ø§Ø³\n19 Ù…Ø§Ø±Ø³ 1962' },
    { label: 'Sous la supervision de', value: 'Ø§Ù„Ø¯ÙƒØªÙˆØ±Ø© Ø±Ù…Ø¯ÙˆÙ… Ù†ÙˆØ±Ø©' },
  ];

  const arabicServices = [
    { icon: Bus, text: 'Ù†Ø¸Ø§Ù… Ø­Ø¬Ø² Ø°ÙƒÙŠ' },
    { icon: Wifi, text: 'Ø®Ø¯Ù…Ø© Ø§Ù„ÙˆØ§ÙŠ ÙØ§ÙŠ Ø¯Ø§Ø®Ù„ Ø§Ù„Ø­Ø§ÙÙ„Ø§Øª' },
    { icon: CreditCard, text: 'Ø·Ø±Ù‚ Ø¯ÙØ¹ Ù…ØªØ¹Ø¯Ø¯Ø©' },
    { icon: Shield, text: 'ØªÙ†Ù‚Ù„ Ø¢Ù…Ù† ÙˆÙ…Ø±ÙŠØ­' },
  ];

  const frenchServices = [
    { icon: Bus, text: 'SystÃ¨me de rÃ©servation intelligent' },
    { icon: Wifi, text: 'Service Wi-Fi Ã  bord' },
    { icon: CreditCard, text: 'MÃ©thodes de paiement multiples' },
    { icon: Shield, text: 'DÃ©placement sÃ»r et confortable' },
  ];

  const additionalServicesArabic = [
    'Ø§Ù„Ù†Ù‚Ù„ Ù„Ù„Ù…Ø³Ø§Ø¨Ù‚Ø§Øª Ø§Ù„Ø¹Ù„Ù…ÙŠØ© ÙˆØ§Ù„Ø±ÙŠØ§Ø¶ÙŠØ©',
    'Ø§Ù„Ø±Ø­Ù„Ø§Øª Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠØ© ÙˆØ§Ù„Ø³ÙŠØ§Ø­ÙŠØ©',
    'Ø§Ù„Ù†Ù‚Ù„ Ù†Ø­Ùˆ Ø§Ù„Ù…Ø·Ø§Ø±Ø§Øª',
    'Ø¯Ø¹Ù… Ø§Ù„ØªÙ†Ù‚Ù„ Ø§Ù„Ø¢Ù…Ù† ÙˆØ§Ù„Ù…Ø±ÙŠØ­',
  ];

  const additionalServicesFrench = [
    'Transport vers les concours scientifiques et sportifs',
    'Voyages universitaires et touristiques',
    'Transport vers les aÃ©roports',
    'ExpÃ©rience de dÃ©placement plus sÃ»re et plus confortable',
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-to-b from-slate-50 via-white to-emerald-50/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <StaggerContainer>
          {/* Header */}
          <div className="text-center mb-24">
            <StaggerItem>
              <Badge className="mb-8 bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 hover:from-emerald-200 hover:to-emerald-300 px-8 py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
                {language === 'ar' ? 'Ù…Ù† Ù†Ø­Ù†' : 'Ã€ propos'}
              </Badge>
            </StaggerItem>
            <StaggerItem>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
                {language === 'ar' ? 'Ù…Ù† Ù†Ø­Ù†' : 'Ã€ propos'}
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-2xl md:text-3xl lg:text-4xl text-emerald-600 font-extrabold mb-10 leading-tight">
                UNIMOVE-DZ â€” {language === 'ar' ? 'Ø§Ù„Ø¬Ø§Ù…Ø¹Ø© Ø£Ù‚Ø±Ø¨ØŒ Ø£Ø³Ù‡Ù„ØŒ Ùˆ Ø£Ø£Ù…Ù†' : 'L\'universitÃ© plus proche, plus facile et plus sÃ»re'}
              </p>
            </StaggerItem>
          </div>

          {/* Main Content Card */}
          <StaggerItem>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-12 md:p-20 border border-slate-200 shadow-2xl rounded-3xl mb-20 bg-white hover:shadow-3xl hover:shadow-emerald-500/20 transition-all duration-500">
                {language === 'ar' ? (
                  <div className="space-y-12" dir="rtl">
                    <div>
                      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">Ù…Ù† Ù†Ø­Ù†</h3>
                      <p className="text-slate-700 leading-[2.2] text-xl md:text-2xl font-medium">
                        UNIMOVE-DZ Ù‡Ùˆ Ù…Ø´Ø±ÙˆØ¹ Ù…Ø¤Ø³Ø³Ø© Ù†Ø§Ø´Ø¦Ø© Ù…Ø¨ØªÙƒØ±Ø© ÙŠÙ‡Ø¯Ù Ø¥Ù„Ù‰ ØªØ·ÙˆÙŠØ± Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù†Ù‚Ù„ Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ Ø§Ù„Ø°ÙƒÙŠ ÙÙŠ ÙˆÙ„Ø§ÙŠØ© Ø³ÙŠØ¯ÙŠ Ø¨Ù„Ø¹Ø¨Ø§Ø³ØŒ Ù…Ù† Ø®Ù„Ø§Ù„ ØªÙˆÙÙŠØ± Ù…Ù†ØµØ© Ø±Ù‚Ù…ÙŠØ© Ø­Ø¯ÙŠØ«Ø© ØªØ±Ø¨Ø· Ø§Ù„Ø·Ù„Ø¨Ø© ÙˆØ§Ù„Ø£Ø³Ø§ØªØ°Ø© ÙˆØ§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠÙŠÙ† Ø¨Ù…Ø®ØªÙ„Ù Ø§Ù„Ø¬Ø§Ù…Ø¹Ø§Øª ÙˆØ§Ù„ÙƒÙ„ÙŠØ§Øª ÙˆØ§Ù„Ù…Ø¹Ø§Ù‡Ø¯ ÙˆØ§Ù„Ø¥Ù‚Ø§Ù…Ø§Øª Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠØ©.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">Ø§Ù„Ù‡Ø¯Ù</h3>
                      <p className="text-slate-700 leading-[2.2] text-xl md:text-2xl font-medium">
                        ÙŠÙ‡Ø¯Ù Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø¥Ù„Ù‰ ØªØ³Ù‡ÙŠÙ„ Ø§Ù„ØªÙ†Ù‚Ù„ Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ Ø§Ù„ÙŠÙˆÙ…ÙŠ Ø¹Ø¨Ø± Ù†Ø¸Ø§Ù… Ø­Ø¬Ø² Ø°ÙƒÙŠØŒ ÙˆØ³Ø§Ø¦Ù„ Ù†Ù‚Ù„ Ù…Ù†Ø¸Ù…Ø©ØŒ Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø¯Ù‚ÙŠÙ‚Ø©ØŒ ÙˆØ®Ø¯Ù…Ø§Øª Ø­Ø¯ÙŠØ«Ø© Ù…Ø«Ù„ Ø§Ù„ÙˆØ§ÙŠ ÙØ§ÙŠ Ø¯Ø§Ø®Ù„ Ø§Ù„Ø­Ø§ÙÙ„Ø§Øª ÙˆØ§Ù„Ø³ÙŠØ§Ø±Ø§ØªØŒ Ù…Ø¹ ØªÙˆÙÙŠØ± Ø¹Ø¯Ø© Ø·Ø±Ù‚ Ù„Ù„Ø¯ÙØ¹ Ø¨Ù…Ø§ ÙÙŠ Ø°Ù„Ùƒ Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ ÙˆØ§Ù„Ø¯ÙØ¹ Ù†Ù‚Ø¯Ù‹Ø§ Ø¹Ù†Ø¯ Ø§Ù„Ø±ÙƒÙˆØ¨.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ø¥Ø¶Ø§ÙÙŠØ©</h3>
                      <ul className="space-y-6">
                        {additionalServicesArabic.map((service, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-5"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
                            <span className="text-slate-700 text-xl md:text-2xl font-medium leading-[2.2]">{service}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <motion.div
                      className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-10 rounded-3xl border border-emerald-200"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-slate-800 font-black text-xl md:text-2xl leading-[2.2]">
                        UNIMOVE-DZ Ù„ÙŠØ³ Ù…Ø¬Ø±Ø¯ ØªØ·Ø¨ÙŠÙ‚ Ù†Ù‚Ù„ØŒ Ø¨Ù„ Ø±Ø¤ÙŠØ© Ù…Ø³ØªÙ‚Ø¨Ù„ÙŠØ© Ù„Ù…Ø¤Ø³Ø³Ø© Ù†Ø§Ø´Ø¦Ø© ØªØ³Ø¹Ù‰ Ø¥Ù„Ù‰ ØªØ­Ø³ÙŠÙ† Ø§Ù„Ø­ÙŠØ§Ø© Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠØ© ÙˆØ¬Ø¹Ù„ Ø§Ù„Ø¬Ø§Ù…Ø¹Ø© Ø£Ù‚Ø±Ø¨ØŒ Ø£Ø³Ù‡Ù„ØŒ Ùˆ Ø£Ø£Ù…Ù†.
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  <div className="space-y-12">
                    <div>
                      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">Ã€ propos</h3>
                      <p className="text-slate-700 leading-[2.2] text-xl md:text-2xl font-medium">
                        UNIMOVE-DZ est une idÃ©e de startup innovante dÃ©diÃ©e au transport universitaire intelligent dans la wilaya de Sidi Bel AbbÃ¨s. La plateforme vise Ã  connecter les Ã©tudiants, enseignants et personnels administratifs aux diffÃ©rentes universitÃ©s, facultÃ©s, instituts et rÃ©sidences universitaires grÃ¢ce Ã  une solution numÃ©rique moderne.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">Notre mission</h3>
                      <p className="text-slate-700 leading-[2.2] text-xl md:text-2xl font-medium">
                        L'application permet de simplifier les dÃ©placements universitaires quotidiens grÃ¢ce Ã  un systÃ¨me de rÃ©servation intelligent, des moyens de transport organisÃ©s, des horaires fiables, un service Wi-Fi Ã  bord et plusieurs mÃ©thodes de paiement.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">Services complÃ©mentaires</h3>
                      <ul className="space-y-6">
                        {additionalServicesFrench.map((service, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-5"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
                            <span className="text-slate-700 text-xl md:text-2xl font-medium leading-[2.2]">{service}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <motion.div
                      className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-10 rounded-3xl border border-emerald-200"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-slate-800 font-black text-xl md:text-2xl leading-[2.2]">
                        UNIMOVE-DZ reprÃ©sente une vision moderne d'une startup algÃ©rienne ayant pour objectif d'amÃ©liorer la mobilitÃ© universitaire et de rendre l'universitÃ© plus proche, plus facile et plus sÃ»re.
                      </p>
                    </motion.div>
                  </div>
                )}
              </Card>
            </motion.div>
          </StaggerItem>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
            {(language === 'ar' ? arabicServices : frenchServices).map((service, index) => {
              const Icon = service.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-10 border border-slate-200 shadow-xl rounded-3xl bg-white hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500">
                      <div className="flex flex-col items-center text-center">
                        <motion.div
                          className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mb-8"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-10 h-10 text-emerald-600" />
                        </motion.div>
                        <p className="text-slate-800 font-black text-xl md:text-2xl">{service.text}</p>
                      </div>
                    </Card>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </div>

          {/* Academic Information Card */}
          <StaggerItem>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-12 md:p-20 border border-slate-200 shadow-2xl rounded-3xl bg-white hover:shadow-3xl hover:shadow-emerald-500/20 transition-all duration-500">
                <div className="text-center mb-16">
                  <Badge className="mb-8 bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 hover:from-emerald-200 hover:to-emerald-300 px-8 py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
                    {language === 'ar' ? 'Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø§Ù„Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠ' : 'Informations acadÃ©miques du projet'}
                  </Badge>
                  <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                    {language === 'ar' ? 'Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø§Ù„Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠ' : 'Informations acadÃ©miques du projet'}
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  {academicDetails.slice(0, 4).map((detail, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-lg font-bold text-slate-600 mb-3">{detail.label}</p>
                      <p className="text-slate-900 font-black text-2xl whitespace-pre-line leading-relaxed">{detail.value}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="grid md:grid-cols-3 gap-12 mt-12">
                  {academicDetails.slice(4).map((detail, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-lg font-bold text-slate-600 mb-3">{detail.label}</p>
                      <p className="text-slate-900 font-black text-2xl whitespace-pre-line leading-relaxed">{detail.value}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-16 pt-16 border-t border-slate-200 text-center">
                  <p className="text-lg text-slate-600 italic mb-4 font-medium">
                    {language === 'ar' ? 'Conception et dÃ©veloppement supervisÃ©s par:' : 'Conception et dÃ©veloppement supervisÃ©s par:'}
                  </p>
                  <p className="text-3xl font-black text-emerald-600 mb-3">DR: BEHIRI ABDELKADER</p>
                  <p className="text-xl text-slate-500 font-medium">Ø¯ Ø¨Ø­ÙŠØ±ÙŠ Ø¹Ø¨Ø¯ Ø§Ù„Ù‚Ø§Ø¯Ø±</p>
                </div>
              </Card>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
