'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Cog, 
  Sparkles, 
  Heart, 
  Users, 
  Database, 
  Share2, 
  DollarSign, 
  TrendingUp,
  GraduationCap,
  Car,
  Wifi,
  MapPin,
  Smartphone,
  MessageCircle,
  Star,
  Shield,
  Clock,
  Zap,
  Globe,
  Cloud,
  Server,
  Truck,
  Wrench,
  CreditCard,
  Plane,
  Umbrella,
  Building,
  Factory,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Award,
  Fuel,
  Ticket,
  Bell,
  Trophy,
  Calendar
} from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function BusinessModelPage() {
  const { language } = useLanguage();

  const partners = [
    { icon: GraduationCap, name: language === 'ar' ? 'الجامعات' : 'Universités', desc: language === 'ar' ? 'شراكات استراتيجية' : 'Partenariats stratégiques' },
    { icon: Car, name: language === 'ar' ? 'مستثمرو النقل' : 'Investisseurs transport', desc: language === 'ar' ? 'تمويل أسطول' : 'Financement flotte' },
    { icon: Umbrella, name: language === 'ar' ? 'شركات التأمين' : 'Sociétés assurances', desc: language === 'ar' ? 'تغطية شاملة' : 'Couverture complète' },
    { icon: Cloud, name: language === 'ar' ? 'السحابة/البرمجيات' : 'Cloud/Software', desc: language === 'ar' ? 'بنية تحتية' : 'Infrastructure' },
    { icon: Wrench, name: language === 'ar' ? 'الصيانة' : 'Maintenance', desc: language === 'ar' ? 'خدمات فنية' : 'Services techniques' },
    { icon: Phone, name: language === 'ar' ? 'الاتصالات' : 'Télécommunications', desc: language === 'ar' ? 'اتصال مستمر' : 'Connectivité continue' },
    { icon: Wifi, name: language === 'ar' ? 'مزودي الإنترنت' : 'Fournisseurs internet', desc: language === 'ar' ? 'Wi-Fi عالي السرعة' : 'Wi-Fi haute vitesse' },
    { icon: CreditCard, name: language === 'ar' ? 'الدفع الإلكتروني' : 'Paiement électronique', desc: language === 'ar' ? 'حلول دفع' : 'Solutions paiement' },
    { icon: Plane, name: language === 'ar' ? 'السياحة' : 'Tourisme', desc: language === 'ar' ? 'رحلات سياحية' : 'Voyages touristiques' },
  ];

  const activities = [
    { icon: Smartphone, name: language === 'ar' ? 'تطبيق Android/iOS' : 'App Android/iOS', desc: language === 'ar' ? 'تطبيق موبايل' : 'Application mobile' },
    { icon: Globe, name: language === 'ar' ? 'منصة ويب' : 'Plateforme web', desc: language === 'ar' ? 'بوابة رقمية' : 'Portail numérique' },
    { icon: MapPin, name: language === 'ar' ? 'حجز ذكي' : 'Réservation intelligente', desc: language === 'ar' ? 'نظام حجز' : 'Système réservation' },
    { icon: MapPin, name: language === 'ar' ? 'تتبع GPS' : 'GPS tracking', desc: language === 'ar' ? 'موقع في الوقت الفعلي' : 'Position temps réel' },
    { icon: Bell, name: language === 'ar' ? 'إشعارات' : 'Notifications', desc: language === 'ar' ? 'تنبيهات ذكية' : 'Alertes intelligentes' },
    { icon: Users, name: language === 'ar' ? 'إدارة السائقين' : 'Gestion chauffeurs', desc: language === 'ar' ? 'فريق محترف' : 'Équipe professionnelle' },
    { icon: Car, name: language === 'ar' ? 'إدارة الرحلات' : 'Gestion trajets', desc: language === 'ar' ? 'تحسين المسارات' : 'Optimisation itinéraires' },
    { icon: Wrench, name: language === 'ar' ? 'الصيانة' : 'Maintenance', desc: language === 'ar' ? 'صيانة دورية' : 'Maintenance préventive' },
    { icon: CreditCard, name: language === 'ar' ? 'الدفع الإلكتروني' : 'Paiement électronique', desc: language === 'ar' ? 'دفع آمن' : 'Paiement sécurisé' },
    { icon: DollarSign, name: language === 'ar' ? 'الدفع النقدي' : 'Paiement cash', desc: language === 'ar' ? 'خيارات متعددة' : 'Options multiples' },
    { icon: MessageCircle, name: language === 'ar' ? 'دعم العملاء' : 'Support client', desc: language === 'ar' ? 'خدمة 24/7' : 'Service 24/7' },
    { icon: TrendingUp, name: language === 'ar' ? 'التسويق' : 'Marketing', desc: language === 'ar' ? 'استراتيجيات نمو' : 'Stratégies croissance' },
  ];

  const valueProposition = [
    { icon: Shield, name: language === 'ar' ? 'حجز مضمون' : 'Réservation garantie', desc: language === 'ar' ? 'ضمان المقعد' : 'Garantie siège' },
    { icon: Heart, name: language === 'ar' ? 'تقليل التوتر' : 'Réduction stress', desc: language === 'ar' ? 'راحة ذهنية' : 'Sérénité mentale' },
    { icon: Clock, name: language === 'ar' ? 'تقليل التأخير' : 'Réduction retards', desc: language === 'ar' ? 'الوصول في الوقت' : 'Arrivée à temps' },
    { icon: Wifi, name: language === 'ar' ? 'Wi-Fi مدمج' : 'Wi-Fi embarqué', desc: language === 'ar' ? 'إنترنت عالي السرعة' : 'Internet haute vitesse' },
    { icon: Bell, name: language === 'ar' ? 'إشعارات ذكية' : 'Notifications intelligentes', desc: language === 'ar' ? 'تنبيهات في الوقت الفعلي' : 'Alertes temps réel' },
    { icon: Shield, name: language === 'ar' ? 'أمان' : 'Sécurité', desc: language === 'ar' ? 'رحلات آمنة' : 'Trajets sécurisés' },
    { icon: Cog, name: language === 'ar' ? 'تنظيم ذكي' : 'Organisation intelligente', desc: language === 'ar' ? 'إدارة محسنة' : 'Gestion optimisée' },
    { icon: Clock, name: language === 'ar' ? 'توفير الوقت' : 'Gain de temps', desc: language === 'ar' ? 'كفاءة عالية' : 'Haute efficacité' },
    { icon: Smartphone, name: language === 'ar' ? 'بطاقة QR' : 'QR transport card', desc: language === 'ar' ? 'وصول سهل' : 'Accès facile' },
    { icon: CreditCard, name: language === 'ar' ? 'دفع مرن' : 'Paiement flexible', desc: language === 'ar' ? 'خيارات متعددة' : 'Options multiples' },
    { icon: Plane, name: language === 'ar' ? 'نقل المطار' : 'Transport aéroport', desc: language === 'ar' ? 'خدمة VIP' : 'Service VIP' },
    { icon: Star, name: language === 'ar' ? 'نقل الأحداث' : 'Transport événements', desc: language === 'ar' ? 'مناسبات خاصة' : 'Événements spéciaux' },
    { icon: Plane, name: language === 'ar' ? 'رحلات سياحية' : 'Voyages touristiques', desc: language === 'ar' ? 'استكشاف الجزائر' : 'Découverte Algérie' },
    { icon: Trophy, name: language === 'ar' ? 'نقل المسابقات' : 'Transport compétitions', desc: language === 'ar' ? 'دعم رياضي' : 'Support sportif' },
  ];

  const segments = [
    { icon: Users, name: language === 'ar' ? 'طلاب Licence' : 'Étudiants Licence', count: '60%' },
    { icon: GraduationCap, name: language === 'ar' ? 'طلاب Master' : 'Étudiants Master', count: '25%' },
    { icon: Award, name: language === 'ar' ? 'دكتوراه' : 'Doctorants', count: '5%' },
    { icon: Building2, name: language === 'ar' ? 'أساتذة' : 'Enseignants', count: '7%' },
    { icon: Building, name: language === 'ar' ? 'إداريون' : 'Administratifs', count: '2%' },
    { icon: Star, name: language === 'ar' ? 'أندية جامعية' : 'Clubs universitaires', count: '1%' },
  ];

  const relationships = [
    { icon: MessageCircle, name: language === 'ar' ? 'دعم تقني' : 'Support technique', desc: language === 'ar' ? 'مساعدة 24/7' : 'Assistance 24/7' },
    { icon: MessageCircle, name: language === 'ar' ? 'دعم WhatsApp' : 'Support WhatsApp', desc: language === 'ar' ? 'تواصل سريع' : 'Communication rapide' },
    { icon: Bell, name: language === 'ar' ? 'إشعارات ذكية' : 'Notifications intelligentes', desc: language === 'ar' ? 'تنبيهات مفيدة' : 'Alertes utiles' },
    { icon: Smartphone, name: language === 'ar' ? 'دعم التطبيق' : 'Support application', desc: language === 'ar' ? 'توجيه مستمر' : 'Guidance continue' },
    { icon: Facebook, name: language === 'ar' ? 'الشبكات الاجتماعية' : 'Réseaux sociaux', desc: language === 'ar' ? 'مجتمع نشط' : 'Communauté active' },
    { icon: MessageCircle, name: language === 'ar' ? 'دردشة مباشرة' : 'Chat support', desc: language === 'ar' ? 'محادثة فورية' : 'Conversation instantanée' },
    { icon: Star, name: language === 'ar' ? 'نظام التقييم' : 'Système notation', desc: language === 'ar' ? 'تحسين مستمر' : 'Amélioration continue' },
    { icon: Heart, name: language === 'ar' ? 'ولاء الطلاب' : 'Fidélisation étudiants', desc: language === 'ar' ? 'برامج مكافآت' : 'Programmes récompenses' },
  ];

  const resources = [
    { icon: Globe, name: language === 'ar' ? 'منصة UNIMOVE-DZ' : 'Plateforme UNIMOVE-DZ', desc: language === 'ar' ? 'تكنولوجيا متقدمة' : 'Technologie avancée' },
    { icon: Car, name: language === 'ar' ? 'أسطول المركبات' : 'Flotte véhicules', desc: language === 'ar' ? 'حديثة ومريحة' : 'Modernes et confortables' },
    { icon: Users, name: language === 'ar' ? 'السائقون' : 'Chauffeurs', desc: language === 'ar' ? 'محترفون معتمدون' : 'Professionnels certifiés' },
    { icon: Wifi, name: language === 'ar' ? 'Wi-Fi' : 'Wi-Fi', desc: language === 'ar' ? 'إنترنت عالي السرعة' : 'Internet haute vitesse' },
    { icon: MapPin, name: language === 'ar' ? 'نظام GPS' : 'Système GPS', desc: language === 'ar' ? 'تتبع دقيق' : 'Suivi précis' },
    { icon: Cloud, name: language === 'ar' ? 'بنية تحتية سحابية' : 'Infrastructure cloud', desc: language === 'ar' ? 'قابلة للتوسع' : 'Scalable' },
    { icon: Database, name: language === 'ar' ? 'قاعدة البيانات' : 'Base de données', desc: language === 'ar' ? 'آمنة وموثوقة' : 'Sécurisée et fiable' },
    { icon: Cog, name: language === 'ar' ? 'الفريق التقني' : 'Équipe technique', desc: language === 'ar' ? 'خبراء مبدعون' : 'Experts innovants' },
    { icon: Building2, name: language === 'ar' ? 'شبكة الشركاء' : 'Réseau partenaires', desc: language === 'ar' ? 'علاقات قوية' : 'Relations solides' },
  ];

  const channels = [
    { icon: Smartphone, name: language === 'ar' ? 'تطبيق موبايل' : 'Application mobile', desc: language === 'ar' ? 'Android & iOS' : 'Android & iOS' },
    { icon: Globe, name: language === 'ar' ? 'تطبيق ويب' : 'Application web', desc: language === 'ar' ? 'accessible partout' : 'Accessible partout' },
    { icon: MessageCircle, name: language === 'ar' ? 'SMS' : 'SMS', desc: language === 'ar' ? 'تنبيهات فورية' : 'Alertes instantanées' },
    { icon: Mail, name: language === 'ar' ? 'البريد الإلكتروني' : 'Email', desc: language === 'ar' ? 'اتصال رسمي' : 'Communication formelle' },
    { icon: MessageCircle, name: language === 'ar' ? 'WhatsApp' : 'WhatsApp', desc: language === 'ar' ? 'محادثة سريعة' : 'Conversation rapide' },
    { icon: Facebook, name: language === 'ar' ? 'الشبكات الاجتماعية' : 'Réseaux sociaux', desc: language === 'ar' ? 'Facebook, Instagram, Twitter' : 'Facebook, Instagram, Twitter' },
    { icon: GraduationCap, name: language === 'ar' ? 'حملات جامعية' : 'Campagnes universitaires', desc: language === 'ar' ? 'ترويج الحرم الجامعي' : 'Promotion campus' },
    { icon: Building2, name: language === 'ar' ? 'شراكات الجامعات' : 'Partenariats universités', desc: language === 'ar' ? 'تكامل مؤسسي' : 'Intégration institutionnelle' },
  ];

  const costStructure = [
    { icon: Smartphone, name: language === 'ar' ? 'تطوير التطبيق' : 'Développement application', value: '25%' },
    { icon: Cloud, name: language === 'ar' ? 'استضافة السحابة' : 'Hébergement cloud', value: '15%' },
    { icon: Wifi, name: language === 'ar' ? 'Wi-Fi' : 'Wi-Fi', value: '10%' },
    { icon: Fuel, name: language === 'ar' ? 'الوقود' : 'Carburant', value: '20%' },
    { icon: Wrench, name: language === 'ar' ? 'الصيانة' : 'Maintenance', value: '12%' },
    { icon: Users, name: language === 'ar' ? 'الرواتب' : 'Salaires', value: '10%' },
    { icon: TrendingUp, name: language === 'ar' ? 'التسويق' : 'Marketing', value: '5%' },
    { icon: Umbrella, name: language === 'ar' ? 'التأمينات' : 'Assurances', value: '2%' },
    { icon: Building, name: language === 'ar' ? 'المكتب' : 'Bureau', value: '1%' },
    { icon: Building, name: language === 'ar' ? 'الضرائب' : 'Taxes', value: '1%' },
  ];

  const revenueStreams = [
    { icon: Ticket, name: language === 'ar' ? 'حجوزات مباشرة' : 'Réservations directes', value: '30%' },
    { icon: Calendar, name: language === 'ar' ? 'اشتراك يومي' : 'Abonnement journalier', value: '15%' },
    { icon: Calendar, name: language === 'ar' ? 'اشتراك أسبوعي' : 'Abonnement hebdomadaire', value: '20%' },
    { icon: Calendar, name: language === 'ar' ? 'اشتراك شهري' : 'Abonnement mensuel', value: '25%' },
    { icon: TrendingUp, name: language === 'ar' ? 'إعلانات التطبيق' : 'Publicité application', value: '3%' },
    { icon: DollarSign, name: language === 'ar' ? 'عمولات المستثمرين' : 'Commissions investisseurs', value: '2%' },
    { icon: Star, name: language === 'ar' ? 'نقل الأحداث' : 'Transport événements', value: '3%' },
    { icon: Plane, name: language === 'ar' ? 'نقل المطار' : 'Transport aéroport', value: '1%' },
    { icon: Plane, name: language === 'ar' ? 'رحلات سياحية' : 'Voyages touristiques', value: '1%' },
    { icon: GraduationCap, name: language === 'ar' ? 'شراكات الجامعات' : 'Partenariats universités', value: '1%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-blue-50/20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white py-24 md:py-32"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
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
                {language === 'ar' ? 'نموذج الأعمال' : 'Business Model Canvas'}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              {language === 'ar' ? 'UNIMOVE-DZ' : 'UNIMOVE-DZ'}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-emerald-100 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'منصة ذكية للنقل الجامعي - نموذج أعمال مبتكر'
                : 'Plateforme intelligente de transport universitaire - Modèle économique innovant'}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* BMC Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Key Partners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl">
                  <Building2 className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'الشركاء الرئيسيون' : 'Partenaires Clés'}
                </h2>
              </div>
              <div className="space-y-3">
                {partners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-emerald-50 transition-colors"
                  >
                    <partner.icon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{partner.name}</p>
                      <p className="text-sm text-gray-600">{partner.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Key Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl">
                  <Cog className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'الأنشطة الرئيسية' : 'Activités Clés'}
                </h2>
              </div>
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-blue-50 transition-colors"
                  >
                    <activity.icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{activity.name}</p>
                      <p className="text-sm text-gray-600">{activity.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'القيمة المقترحة' : 'Proposition de Valeur'}
                </h2>
              </div>
              <div className="space-y-3">
                {valueProposition.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-white/60 hover:bg-white/80 transition-colors cursor-pointer"
                  >
                    <value.icon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{value.name}</p>
                      <p className="text-sm text-gray-600">{value.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Customer Relationships */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'علاقات العملاء' : 'Relations Clients'}
                </h2>
              </div>
              <div className="space-y-3">
                {relationships.map((rel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-pink-50 transition-colors"
                  >
                    <rel.icon className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{rel.name}</p>
                      <p className="text-sm text-gray-600">{rel.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Customer Segments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'شرائح العملاء' : 'Segments Clients'}
                </h2>
              </div>
              <div className="space-y-3">
                {segments.map((segment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-purple-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <segment.icon className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      <p className="font-semibold text-gray-900">{segment.name}</p>
                    </div>
                    <span className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                      {segment.count}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Key Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl">
                  <Database className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'الموارد الرئيسية' : 'Ressources Clés'}
                </h2>
              </div>
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-orange-50 transition-colors"
                  >
                    <resource.icon className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{resource.name}</p>
                      <p className="text-sm text-gray-600">{resource.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl">
                  <Share2 className="w-6 h-6 text-cyan-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'القنوات' : 'Canaux'}
                </h2>
              </div>
              <div className="space-y-3">
                {channels.map((channel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-cyan-50 transition-colors"
                  >
                    <channel.icon className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{channel.name}</p>
                      <p className="text-sm text-gray-600">{channel.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Cost Structure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'هيكل التكاليف' : 'Structure des Coûts'}
                </h2>
              </div>
              <div className="space-y-3">
                {costStructure.map((cost, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/60 hover:bg-white/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <cost.icon className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="font-semibold text-gray-900">{cost.name}</p>
                    </div>
                    <span className="text-sm font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                      {cost.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Revenue Streams */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'مصادر الإيرادات' : 'Sources de Revenus'}
                </h2>
              </div>
              <div className="space-y-3">
                {revenueStreams.map((revenue, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/60 hover:bg-white/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <revenue.icon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <p className="font-semibold text-gray-900">{revenue.name}</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                      {revenue.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
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
                <p><span className="font-semibold text-white">{language === 'ar' ? 'الإشراف:' : 'Supervision:'}</span> {language === 'ar' ? 'الدكتورة رمدوم نورة' : 'Dr. RMDOM Noura'}</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black mb-4 text-emerald-400">
                {language === 'ar' ? 'الإنتاج والتطوير' : 'Production et Développement'}
              </h3>
              <div className="space-y-3 text-slate-300">
                <p><span className="font-semibold text-white">DR:</span> BEHIRI ABDELKADER</p>
                <p className="text-2xl font-bold text-emerald-400">د بحيري عبد القادر</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
