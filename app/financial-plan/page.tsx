'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Users,
  Car,
  Calendar,
  Award,
  Sparkles,
  Activity,
  Zap,
  Shield,
  Clock
} from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function FinancialPlanPage() {
  const { language } = useLanguage();

  const kpis = [
    { 
      name: language === 'ar' ? 'الإيرادات السنوية' : 'Revenus Annuels', 
      value: '12,500,000 DA', 
      change: '+25%', 
      positive: true,
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600'
    },
    { 
      name: language === 'ar' ? 'التدفق النقدي' : 'Cash Flow', 
      value: '3,200,000 DA', 
      change: '+18%', 
      positive: true,
      icon: Wallet,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      name: language === 'ar' ? 'إجمالي التكاليف' : 'Coûts Totaux', 
      value: '8,500,000 DA', 
      change: '-12%', 
      positive: true,
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600'
    },
    { 
      name: language === 'ar' ? 'صافي الأرباح' : 'Bénéfices Nets', 
      value: '4,000,000 DA', 
      change: '+32%', 
      positive: true,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    },
  ];

  const revenueProjections = [
    { month: language === 'ar' ? 'يناير' : 'Jan', value: 800000 },
    { month: language === 'ar' ? 'فبراير' : 'Fév', value: 950000 },
    { month: language === 'ar' ? 'مارس' : 'Mar', value: 1100000 },
    { month: language === 'ar' ? 'أبريل' : 'Avr', value: 1050000 },
    { month: language === 'ar' ? 'مايو' : 'Mai', value: 1200000 },
    { month: language === 'ar' ? 'يونيو' : 'Juin', value: 1350000 },
    { month: language === 'ar' ? 'يوليو' : 'Juil', value: 1250000 },
    { month: language === 'ar' ? 'أغسطس' : 'Août', value: 1150000 },
    { month: language === 'ar' ? 'سبتمبر' : 'Sep', value: 1300000 },
    { month: language === 'ar' ? 'أكتوبر' : 'Oct', value: 1450000 },
    { month: language === 'ar' ? 'نوفمبر' : 'Nov', value: 1400000 },
    { month: language === 'ar' ? 'ديسمبر' : 'Déc', value: 1500000 },
  ];

  const costBreakdown = [
    { name: language === 'ar' ? 'تطوير التطبيق' : 'Développement application', value: 18, color: 'bg-emerald-500' },
    { name: language === 'ar' ? 'استضافة السحابة' : 'Hébergement cloud', value: 8, color: 'bg-blue-500' },
    { name: language === 'ar' ? 'Wi-Fi' : 'Wi-Fi', value: 7, color: 'bg-cyan-500' },
    { name: language === 'ar' ? 'الوقود' : 'Carburant', value: 22, color: 'bg-orange-500' },
    { name: language === 'ar' ? 'صيانة المركبات' : 'Maintenance véhicules', value: 12, color: 'bg-purple-500' },
    { name: language === 'ar' ? 'الرواتب' : 'Salaires', value: 16, color: 'bg-pink-500' },
    { name: language === 'ar' ? 'التسويق' : 'Marketing', value: 7, color: 'bg-lime-500' },
    { name: language === 'ar' ? 'التأمينات' : 'Assurances', value: 4, color: 'bg-indigo-500' },
    { name: language === 'ar' ? 'المكتب' : 'Bureau', value: 3, color: 'bg-slate-500' },
    { name: language === 'ar' ? 'الضرائب' : 'Taxes', value: 3, color: 'bg-red-500' },
  ];

  const revenueStreams = [
    { name: language === 'ar' ? 'حجوزات مباشرة' : 'Réservations directes', value: '30%', amount: '3.75M DA' },
    { name: language === 'ar' ? 'الاشتراكات' : 'Abonnements', value: '45%', amount: '5.62M DA' },
    { name: language === 'ar' ? 'إعلانات التطبيق' : 'Publicité application', value: '5%', amount: '625K DA' },
    { name: language === 'ar' ? 'عمولات المستثمرين' : 'Commissions investisseurs', value: '4%', amount: '500K DA' },
    { name: language === 'ar' ? 'نقل الأحداث' : 'Transport événements', value: '6%', amount: '750K DA' },
    { name: language === 'ar' ? 'نقل المطار' : 'Transport aéroport', value: '4%', amount: '500K DA' },
    { name: language === 'ar' ? 'رحلات سياحية' : 'Voyages touristiques', value: '4%', amount: '500K DA' },
    { name: language === 'ar' ? 'شراكات الجامعات' : 'Partenariats universités', value: '2%', amount: '250K DA' },
  ];

  const growthMetrics = [
    { 
      name: language === 'ar' ? 'نمو المستخدمين' : 'Croissance Utilisateurs', 
      value: '45%', 
      icon: Users,
      desc: language === 'ar' ? 'زيادة شهرية' : 'Augmentation mensuelle'
    },
    { 
      name: language === 'ar' ? 'نمو الرحلات' : 'Croissance Trajets', 
      value: '38%', 
      icon: Car,
      desc: language === 'ar' ? 'زيادة شهرية' : 'Augmentation mensuelle'
    },
    { 
      name: language === 'ar' ? 'معدل الاحتفاظ' : 'Taux de Rétention', 
      value: '85%', 
      icon: Shield,
      desc: language === 'ar' ? 'معدل عالٍ' : 'Taux élevé'
    },
    { 
      name: language === 'ar' ? 'الوقت المستجيب' : 'Temps de Réponse', 
      value: '2.5s', 
      icon: Zap,
      desc: language === 'ar' ? 'متوسط التطبيق' : 'Moyenne application'
    },
  ];

  const quarterlyGoals = [
    { 
      quarter: language === 'ar' ? 'الربع الأول' : 'Q1 2025', 
      target: language === 'ar' ? 'إطلاق النسخة التجريبية' : 'Lancement Beta',
      status: language === 'ar' ? 'مكتمل' : 'Complété',
      completed: true
    },
    { 
      quarter: language === 'ar' ? 'الربع الثاني' : 'Q2 2025', 
      target: language === 'ar' ? 'توسع إلى 3 جامعات' : 'Expansion 3 universités',
      status: language === 'ar' ? 'قيد التقدم' : 'En cours',
      completed: false
    },
    { 
      quarter: language === 'ar' ? 'الربع الثالث' : 'Q3 2025', 
      target: language === 'ar' ? 'إطلاق الإصدار الكامل' : 'Lancement complet',
      status: language === 'ar' ? 'قادم' : 'À venir',
      completed: false
    },
    { 
      quarter: language === 'ar' ? 'الربع الرابع' : 'Q4 2025', 
      target: language === 'ar' ? 'الربحية' : 'Rentabilité',
      status: language === 'ar' ? 'قادم' : 'À venir',
      completed: false
    },
  ];

  const maxValue = Math.max(...revenueProjections.map(r => r.value));

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
                {language === 'ar' ? 'الخطة المالية' : 'Plan Financier'}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              {language === 'ar' ? 'لوحة التحكم المالية' : 'Tableau de Bord Financier'}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-emerald-100 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'نظرة شاملة على الأداء المالي والتوقعات المستقبلية'
                : 'Vue complète de la performance financière et des projections futures'}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${kpi.color} rounded-2xl`}>
                    <kpi.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${kpi.positive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                    {kpi.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {kpi.change}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{kpi.value}</h3>
                <p className="text-sm text-gray-600">{kpi.name}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                  {language === 'ar' ? 'توقعات الإيرادات' : 'Projections Revenus'}
                </h2>
                <p className="text-gray-600">
                  {language === 'ar' ? 'الإيرادات الشهرية المتوقعة' : 'Revenus mensuels projetés'}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl">
                <LineChart className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="relative h-64 md:h-80">
              <div className="absolute inset-0 flex items-end justify-between gap-2 md:gap-4">
                {revenueProjections.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.value / maxValue) * 100}%` }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg hover:from-emerald-600 hover:to-emerald-500 transition-colors cursor-pointer relative group">
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {(item.value / 1000).toFixed(0)}K DA
                      </div>
                    </div>
                    <span className="text-xs md:text-sm text-gray-600 font-medium">{item.month}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                  {language === 'ar' ? 'مصادر الإيرادات' : 'Sources de revenus'}
                </h2>
                <p className="text-gray-600">
                  {language === 'ar' ? 'تنويع الإيرادات حسب خطة الأعمال' : 'Diversification des revenus selon le business plan'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {revenueStreams.map((stream, index) => (
                <motion.div
                  key={stream.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.04 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-black text-emerald-700">{stream.value}</span>
                    <span className="text-xs font-bold text-slate-500">{stream.amount}</span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900">{stream.name}</h3>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Cost Breakdown & Growth Metrics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Cost Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                    {language === 'ar' ? 'توزيع التكاليف' : 'Répartition Coûts'}
                  </h2>
                  <p className="text-gray-600">
                    {language === 'ar' ? 'تحليل هيكل التكاليف' : 'Analyse structure coûts'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {costBreakdown.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      <span className="text-sm font-bold text-gray-900">{item.value}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ delay: 1.1 + index * 0.05 }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Growth Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                    {language === 'ar' ? 'مقاييس النمو' : 'Métriques Croissance'}
                  </h2>
                  <p className="text-gray-600">
                    {language === 'ar' ? 'مؤشرات الأداء الرئيسية' : 'Indicateurs clés performance'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {growthMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-colors cursor-pointer"
                  >
                    <metric.icon className="w-8 h-8 text-emerald-600 mb-3" />
                    <p className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{metric.value}</p>
                    <p className="text-xs text-gray-600 font-medium">{metric.name}</p>
                    <p className="text-xs text-gray-500">{metric.desc}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Quarterly Goals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                  {language === 'ar' ? 'الأهداف الفصلية' : 'Objectifs Trimestriels'}
                </h2>
                <p className="text-gray-600">
                  {language === 'ar' ? 'خارطة الطريق المالية' : 'Feuille de route financière'}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              {quarterlyGoals.map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className={`p-3 rounded-xl ${goal.completed ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                    <Calendar className={`w-6 h-6 ${goal.completed ? 'text-emerald-600' : 'text-slate-400'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{goal.quarter}</p>
                    <p className="text-sm text-gray-600">{goal.target}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-bold ${goal.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                    {goal.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Academic Info Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
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
