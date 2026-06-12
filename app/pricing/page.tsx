'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Star, 
  Plane, 
  MapPin, 
  Calendar, 
  Wifi, 
  Shield, 
  Clock, 
  Zap,
  CreditCard,
  Smartphone,
  Users,
  Award,
  Crown,
  Sparkles
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import StudentDayBanner from '@/components/StudentDayBanner';

export default function PricingPage() {
  const { language } = useLanguage();
  const router = useRouter();

  const pricingPlans = [
    {
      name: language === 'ar' ? 'تذكرة بسيطة' : 'Ticket Simple',
      price: { min: 70, max: 70 },
      period: language === 'ar' ? 'رحلة واحدة' : 'Trajet unique',
      popular: false,
      recommended: false,
      features: [
        { icon: MapPin, name: language === 'ar' ? 'رحلة واحدة' : 'Trajet unique', included: true },
        { icon: Wifi, name: language === 'ar' ? 'Wi-Fi' : 'Wi-Fi', included: true },
        { icon: Shield, name: language === 'ar' ? 'أمان' : 'Sécurité', included: true },
        { icon: Clock, name: language === 'ar' ? 'حجز فوري' : 'Réservation instantanée', included: true },
        { icon: Smartphone, name: language === 'ar' ? 'تطبيق موبايل' : 'Application mobile', included: true },
        { icon: CreditCard, name: language === 'ar' ? 'دفع مرن' : 'Paiement flexible', included: true },
        { icon: X, name: language === 'ar' ? 'رحلات غير محدودة' : 'Trajets illimités', included: false },
        { icon: X, name: language === 'ar' ? 'دعم VIP' : 'Support VIP', included: false },
      ],
      color: 'from-slate-500 to-slate-600',
      borderColor: 'border-slate-300',
    },
    {
      name: language === 'ar' ? 'اشتراك يومي' : 'Abonnement Journalier',
      price: { min: 100, max: 100 },
      period: language === 'ar' ? '24 ساعة' : '24 heures',
      popular: false,
      recommended: false,
      features: [
        { icon: MapPin, name: language === 'ar' ? 'رحلات غير محدودة' : 'Trajets illimités', included: true },
        { icon: Wifi, name: language === 'ar' ? 'Wi-Fi' : 'Wi-Fi', included: true },
        { icon: Shield, name: language === 'ar' ? 'أمان' : 'Sécurité', included: true },
        { icon: Clock, name: language === 'ar' ? 'حجز فوري' : 'Réservation instantanée', included: true },
        { icon: Smartphone, name: language === 'ar' ? 'تطبيق موبايل' : 'Application mobile', included: true },
        { icon: CreditCard, name: language === 'ar' ? 'دفع مرن' : 'Paiement flexible', included: true },
        { icon: X, name: language === 'ar' ? 'دعم VIP' : 'Support VIP', included: false },
        { icon: X, name: language === 'ar' ? 'رحلات سياحية' : 'Voyages touristiques', included: false },
      ],
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-300',
    },
    {
      name: language === 'ar' ? 'اشتراك أسبوعي' : 'Abonnement Hebdomadaire',
      price: { min: 500, max: 500 },
      period: language === 'ar' ? '7 أيام' : '7 jours',
      popular: true,
      recommended: false,
      features: [
        { icon: MapPin, name: language === 'ar' ? 'رحلات غير محدودة' : 'Trajets illimités', included: true },
        { icon: Wifi, name: language === 'ar' ? 'Wi-Fi' : 'Wi-Fi', included: true },
        { icon: Shield, name: language === 'ar' ? 'أمان' : 'Sécurité', included: true },
        { icon: Clock, name: language === 'ar' ? 'حجز فوري' : 'Réservation instantanée', included: true },
        { icon: Smartphone, name: language === 'ar' ? 'تطبيق موبايل' : 'Application mobile', included: true },
        { icon: CreditCard, name: language === 'ar' ? 'دفع مرن' : 'Paiement flexible', included: true },
        { icon: Star, name: language === 'ar' ? 'دعم VIP' : 'Support VIP', included: true },
        { icon: X, name: language === 'ar' ? 'رحلات سياحية' : 'Voyages touristiques', included: false },
      ],
      color: 'from-emerald-500 to-emerald-600',
      borderColor: 'border-emerald-300',
    },
    {
      name: language === 'ar' ? 'اشتراك شهري طالب' : 'Abonnement Mensuel Étudiant',
      price: { min: 500, max: 500 },
      period: language === 'ar' ? '30 يوم' : '30 jours',
      popular: false,
      recommended: true,
      features: [
        { icon: MapPin, name: language === 'ar' ? 'رحلات غير محدودة' : 'Trajets illimités', included: true },
        { icon: Wifi, name: language === 'ar' ? 'Wi-Fi' : 'Wi-Fi', included: true },
        { icon: Shield, name: language === 'ar' ? 'أمان' : 'Sécurité', included: true },
        { icon: Clock, name: language === 'ar' ? 'حجز فوري' : 'Réservation instantanée', included: true },
        { icon: Smartphone, name: language === 'ar' ? 'تطبيق موبايل' : 'Application mobile', included: true },
        { icon: CreditCard, name: language === 'ar' ? 'دفع مرن' : 'Paiement flexible', included: true },
        { icon: Star, name: language === 'ar' ? 'دعم VIP' : 'Support VIP', included: true },
        { icon: Award, name: language === 'ar' ? 'رحلات سياحية' : 'Voyages touristiques', included: true },
      ],
      color: 'from-purple-500 to-purple-600',
      borderColor: 'border-purple-300',
    },
    {
      name: language === 'ar' ? 'أساتذة / إداريون' : 'Enseignants / Administratifs',
      price: { min: 5000, max: 8000 },
      period: language === 'ar' ? '30 يوم' : '30 jours',
      popular: false,
      recommended: false,
      features: [
        { icon: MapPin, name: language === 'ar' ? 'رحلات غير محدودة' : 'Trajets illimités', included: true },
        { icon: Wifi, name: language === 'ar' ? 'Wi-Fi' : 'Wi-Fi', included: true },
        { icon: Shield, name: language === 'ar' ? 'أمان' : 'Sécurité', included: true },
        { icon: Clock, name: language === 'ar' ? 'حجز فوري' : 'Réservation instantanée', included: true },
        { icon: Smartphone, name: language === 'ar' ? 'تطبيق موبايل' : 'Application mobile', included: true },
        { icon: CreditCard, name: language === 'ar' ? 'دفع مرن' : 'Paiement flexible', included: true },
        { icon: Star, name: language === 'ar' ? 'دعم VIP' : 'Support VIP', included: true },
        { icon: Award, name: language === 'ar' ? 'رحلات سياحية' : 'Voyages touristiques', included: true },
      ],
      color: 'from-orange-500 to-orange-600',
      borderColor: 'border-orange-300',
    },
  ];

  const offers = [
    {
      icon: Award,
      title: language === 'ar' ? 'خصم الطالب الموثق' : 'Remise étudiant vérifié',
      discount: '-15%',
      desc: language === 'ar' ? 'على جميع الاشتراكات بعد التحقق من البطاقة الجامعية' : 'Sur tous les abonnements après vérification carte d\'étudiant',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Users,
      title: language === 'ar' ? 'خصم الحجز الجماعي' : 'Remise groupe',
      discount: '-10%',
      desc: language === 'ar' ? 'على الرحلات الجماعية (5+ مقاعد)' : 'Sur les trajets groupés (5+ sièges)',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: Calendar,
      title: language === 'ar' ? 'خصم الحجز المبكر' : 'Remise réservation anticipée',
      discount: '-10%',
      desc: language === 'ar' ? 'على الرحلات المحجوزة قبل +7 أيام' : 'Sur les trajets réservés +7 jours à l\'avance',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Zap,
      title: language === 'ar' ? 'خصم الاشتراك النشط' : 'Remise abonnement actif',
      discount: '-5%',
      desc: language === 'ar' ? 'إضافي على الحجوزات اليومية للمشتركين' : 'Additionnel sur les réservations journalières pour abonnés',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const additionalServices = [
    {
      name: language === 'ar' ? 'نقل المطار' : 'Transport Aéroport',
      price: { min: 800, max: 2500 },
      icon: Plane,
      desc: language === 'ar' ? 'خدمة VIP من وإلى المطار' : 'Service VIP aller-retour aéroport',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      name: language === 'ar' ? 'رحلات سياحية' : 'Voyages Touristiques',
      price: { min: 4000, max: 4000 },
      icon: MapPin,
      desc: language === 'ar' ? 'استكشاف معالم الجزائر' : 'Découverte des sites touristiques',
      color: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-blue-50/20">
      <StudentDayBanner />
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white py-24 md:py-32"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div
          className={`absolute z-10 ${language === 'ar' ? 'top-6 right-6 md:top-8 md:right-8' : 'top-6 left-6 md:top-8 md:left-8'}`}
        >
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="h-11 rounded-xl font-bold gap-2 text-white bg-white/10 hover:bg-white/20 border border-white/20"
          >
            <span className={`${language === 'ar' ? 'rotate-180' : ''}`}>←</span>
            {language === 'ar' ? 'رجوع' : 'Retour'}
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold">
                {language === 'ar' ? 'التسعير' : 'Tarification'}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              {language === 'ar' ? 'اختر الخطة المناسبة لك' : 'Choisissez votre plan'}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-emerald-100 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'أسعار تنافسية تناسب جميع الطلاب والأساتذة'
                : 'Tarifs compétitifs adaptés à tous les étudiants et enseignants'}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    {language === 'ar' ? 'الأكثر شعبية' : 'Populaire'}
                  </div>
                </div>
              )}
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    {language === 'ar' ? 'موصى به' : 'Recommandé'}
                  </div>
                </div>
              )}
              <Card className={`p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 ${plan.borderColor} rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 h-full`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 bg-gradient-to-br ${plan.color} rounded-2xl`}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-600">{plan.period}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-black text-gray-900">
                      {plan.price.min}
                    </span>
                    {plan.price.min !== plan.price.max && (
                      <>
                        <span className="text-2xl md:text-3xl text-gray-400">-</span>
                        <span className="text-4xl md:text-5xl font-black text-gray-900">
                          {plan.price.max}
                        </span>
                      </>
                    )}
                    <span className="text-lg text-gray-600">DA</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${feature.included ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                        {feature.included ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <X className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <span className={`text-sm md:text-base ${feature.included ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full h-14 md:h-16 text-base md:text-lg font-bold bg-gradient-to-r ${plan.color} hover:opacity-90 text-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] rounded-2xl`}
                >
                  {language === 'ar' ? 'اشترك الآن' : 'S\'abonner maintenant'}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Offers & Discounts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            {language === 'ar' ? 'عروض وخصومات' : 'Offres et Remises'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'خصومات واقعية تُطبق تلقائياً عند استيفاء الشروط'
              : 'Remises réaliques appliquées automatiquement lorsque les conditions sont remplies'}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 h-full text-center">
                <div className={`inline-flex p-4 bg-gradient-to-br ${offer.color} rounded-2xl mb-6`}>
                  <offer.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">{offer.title}</h3>
                <div className="text-3xl font-black text-emerald-600 mb-3">{offer.discount}</div>
                <p className="text-sm text-gray-600">{offer.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            {language === 'ar' ? 'خدمات إضافية' : 'Services Additionnels'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'خدمات خاصة لتجربة فريدة'
              : 'Services spéciaux pour une expérience unique'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {additionalServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-4 bg-gradient-to-br ${service.color} rounded-2xl`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-base text-gray-600">{service.desc}</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-black text-gray-900">
                    {service.price.min}
                  </span>
                  <span className="text-xl text-gray-400">-</span>
                  <span className="text-3xl md:text-4xl font-black text-gray-900">
                    {service.price.max}
                  </span>
                  <span className="text-lg text-gray-600">DA</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Academic Info Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <Card className="p-8 md:p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-black mb-4 text-emerald-400">
                {language === 'ar' ? 'معلومات المشروع الأكاديمية' : 'Informations Académiques du Projet'}
              </h3>
              <div className="space-y-3 text-slate-300">
                <p><span className="font-semibold text-white">{language === 'ar' ? 'الطالبة:' : 'Étudiante:'}</span> مراح ابتسام</p>
                <p><span className="font-semibold text-white">{language === 'ar' ? 'ماستر 2:' : 'Master 2:'}</span> {language === 'ar' ? 'قانون عام' : 'Droit Général'}</p>
                <p><span className="font-semibold text-white">{language === 'ar' ? 'السنة الجامعية:' : 'Année Universitaire:'}</span> 2025/2026</p>
                <p><span className="font-semibold text-white">{language === 'ar' ? 'الكلية:' : 'Faculté:'}</span> {language === 'ar' ? 'كلية الحقوق والعلوم السياسية' : 'Faculté de Droit et Sciences Politiques'}</p>
                <p><span className="font-semibold text-white">{language === 'ar' ? 'الجامعة:' : 'Université:'}</span> {language === 'ar' ? 'جامعة الجيلالي اليابس سيدي بلعباس' : 'Université Djilali Liabès Sidi Bel Abbès'}</p>
                <p><span className="font-semibold text-white">{language === 'ar' ? 'الإشراف:' : 'Supervision:'}</span> {language === 'ar' ? 'د:رمدوم نورة' : 'DR RAMDOUM NORA'}</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black mb-4 text-emerald-400">
                {language === 'ar' ? 'الإنتاج والتطوير' : 'Production et Développement'}
              </h3>
              <div className="space-y-3 text-slate-300">
                <p className="font-semibold text-white">{language === 'ar' ? 'مشروع UNIMOVE-DZ' : 'Projet UNIMOVE-DZ'}</p>
                <p className="text-2xl font-bold text-emerald-400">{language === 'ar' ? 'منصة النقل الجامعي الذكي' : 'Plateforme de transport universitaire intelligent'}</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
