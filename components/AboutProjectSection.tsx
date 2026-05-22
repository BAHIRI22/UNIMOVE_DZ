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
    { label: 'Projet préparé par', value: 'مراح ابتسام' },
    { label: 'Niveau', value: 'Deuxième année Master' },
    { label: 'Spécialité', value: 'قانون عام' },
    { label: 'Année universitaire', value: '2025/2026' },
    { label: 'Faculté', value: 'كلية الحقوق والعلوم السياسية' },
    { label: 'Université', value: 'جامعة الجيلالي اليابس سيدي بلعباس\n19 مارس 1962' },
    { label: 'Sous la supervision de', value: 'الدكتورة رمدوم نورة' },
  ];

  const arabicServices = [
    { icon: Bus, text: 'نظام حجز ذكي' },
    { icon: Wifi, text: 'خدمة الواي فاي داخل الحافلات' },
    { icon: CreditCard, text: 'طرق دفع متعددة' },
    { icon: Shield, text: 'تنقل آمن ومريح' },
  ];

  const frenchServices = [
    { icon: Bus, text: 'Système de réservation intelligent' },
    { icon: Wifi, text: 'Service Wi-Fi à bord' },
    { icon: CreditCard, text: 'Méthodes de paiement multiples' },
    { icon: Shield, text: 'Déplacement sûr et confortable' },
  ];

  const additionalServicesArabic = [
    'النقل للمسابقات العلمية والرياضية',
    'الرحلات الجامعية والسياحية',
    'النقل نحو المطارات',
    'دعم التنقل الآمن والمريح',
  ];

  const additionalServicesFrench = [
    'Transport vers les concours scientifiques et sportifs',
    'Voyages universitaires et touristiques',
    'Transport vers les aéroports',
    'Expérience de déplacement plus sûre et plus confortable',
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-to-b from-slate-50 via-white to-emerald-50/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <StaggerContainer>
          {/* Header */}
          <div className="text-center mb-24">
            <StaggerItem>
              <Badge className="mb-8 bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 hover:from-emerald-200 hover:to-emerald-300 px-8 py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
                {language === 'ar' ? 'من نحن' : 'À propos'}
              </Badge>
            </StaggerItem>
            <StaggerItem>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
                {language === 'ar' ? 'من نحن' : 'À propos'}
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-2xl md:text-3xl lg:text-4xl text-emerald-600 font-extrabold mb-10 leading-tight">
                UNIMOVE-DZ — {language === 'ar' ? 'الجامعة أقرب، أسهل، و أأمن' : 'L\'université plus proche, plus facile et plus sûre'}
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
                      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">من نحن</h3>
                      <p className="text-slate-700 leading-[2.2] text-xl md:text-2xl font-medium">
                        UNIMOVE-DZ هو مشروع مؤسسة ناشئة مبتكرة يهدف إلى تطوير خدمات النقل الجامعي الذكي في ولاية سيدي بلعباس، من خلال توفير منصة رقمية حديثة تربط الطلبة والأساتذة والموظفين الإداريين بمختلف الجامعات والكليات والمعاهد والإقامات الجامعية.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">الهدف</h3>
                      <p className="text-slate-700 leading-[2.2] text-xl md:text-2xl font-medium">
                        يهدف التطبيق إلى تسهيل التنقل الجامعي اليومي عبر نظام حجز ذكي، وسائل نقل منظمة، مواعيد دقيقة، وخدمات حديثة مثل الواي فاي داخل الحافلات والسيارات، مع توفير عدة طرق للدفع بما في ذلك الدفع الإلكتروني والدفع نقدًا عند الركوب.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">الخدمات الإضافية</h3>
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
                        UNIMOVE-DZ ليس مجرد تطبيق نقل، بل رؤية مستقبلية لمؤسسة ناشئة تسعى إلى تحسين الحياة الجامعية وجعل الجامعة أقرب، أسهل، و أأمن.
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  <div className="space-y-12">
                    <div>
                      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">À propos</h3>
                      <p className="text-slate-700 leading-[2.2] text-xl md:text-2xl font-medium">
                        UNIMOVE-DZ est une idée de startup innovante dédiée au transport universitaire intelligent dans la wilaya de Sidi Bel Abbès. La plateforme vise à connecter les étudiants, enseignants et personnels administratifs aux différentes universités, facultés, instituts et résidences universitaires grâce à une solution numérique moderne.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">Notre mission</h3>
                      <p className="text-slate-700 leading-[2.2] text-xl md:text-2xl font-medium">
                        L'application permet de simplifier les déplacements universitaires quotidiens grâce à un système de réservation intelligent, des moyens de transport organisés, des horaires fiables, un service Wi-Fi à bord et plusieurs méthodes de paiement.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">Services complémentaires</h3>
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
                        UNIMOVE-DZ représente une vision moderne d'une startup algérienne ayant pour objectif d'améliorer la mobilité universitaire et de rendre l'université plus proche, plus facile et plus sûre.
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
                    {language === 'ar' ? 'معلومات المشروع الأكاديمي' : 'Informations académiques du projet'}
                  </Badge>
                  <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                    {language === 'ar' ? 'معلومات المشروع الأكاديمي' : 'Informations académiques du projet'}
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
                    {language === 'ar' ? 'Conception et développement supervisés par:' : 'Conception et développement supervisés par:'}
                  </p>
                  <p className="text-3xl font-black text-emerald-600 mb-3">DR: BEHIRI ABDELKADER</p>
                  <p className="text-xl text-slate-500 font-medium">د بحيري عبد القادر</p>
                </div>
              </Card>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
