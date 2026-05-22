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
      name: language === 'ar' ? 'Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª Ø§Ù„Ø³Ù†ÙˆÙŠØ©' : 'Revenus Annuels', 
      value: '12,500,000 DA', 
      change: '+25%', 
      positive: true,
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600'
    },
    { 
      name: language === 'ar' ? 'Ø§Ù„ØªØ¯ÙÙ‚ Ø§Ù„Ù†Ù‚Ø¯ÙŠ' : 'Cash Flow', 
      value: '3,200,000 DA', 
      change: '+18%', 
      positive: true,
      icon: Wallet,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      name: language === 'ar' ? 'Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„ØªÙƒØ§Ù„ÙŠÙ' : 'CoÃ»ts Totaux', 
      value: '8,500,000 DA', 
      change: '-12%', 
      positive: true,
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600'
    },
    { 
      name: language === 'ar' ? 'ØµØ§ÙÙŠ Ø§Ù„Ø£Ø±Ø¨Ø§Ø­' : 'BÃ©nÃ©fices Nets', 
      value: '4,000,000 DA', 
      change: '+32%', 
      positive: true,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    },
  ];

  const revenueProjections = [
    { month: language === 'ar' ? 'ÙŠÙ†Ø§ÙŠØ±' : 'Jan', value: 800000 },
    { month: language === 'ar' ? 'ÙØ¨Ø±Ø§ÙŠØ±' : 'FÃ©v', value: 950000 },
    { month: language === 'ar' ? 'Ù…Ø§Ø±Ø³' : 'Mar', value: 1100000 },
    { month: language === 'ar' ? 'Ø£Ø¨Ø±ÙŠÙ„' : 'Avr', value: 1050000 },
    { month: language === 'ar' ? 'Ù…Ø§ÙŠÙˆ' : 'Mai', value: 1200000 },
    { month: language === 'ar' ? 'ÙŠÙˆÙ†ÙŠÙˆ' : 'Juin', value: 1350000 },
    { month: language === 'ar' ? 'ÙŠÙˆÙ„ÙŠÙˆ' : 'Juil', value: 1250000 },
    { month: language === 'ar' ? 'Ø£ØºØ³Ø·Ø³' : 'AoÃ»t', value: 1150000 },
    { month: language === 'ar' ? 'Ø³Ø¨ØªÙ…Ø¨Ø±' : 'Sep', value: 1300000 },
    { month: language === 'ar' ? 'Ø£ÙƒØªÙˆØ¨Ø±' : 'Oct', value: 1450000 },
    { month: language === 'ar' ? 'Ù†ÙˆÙÙ…Ø¨Ø±' : 'Nov', value: 1400000 },
    { month: language === 'ar' ? 'Ø¯ÙŠØ³Ù…Ø¨Ø±' : 'DÃ©c', value: 1500000 },
  ];

  const costBreakdown = [
    { name: language === 'ar' ? 'ØªØ·ÙˆÙŠØ± Ø§Ù„ØªØ·Ø¨ÙŠÙ‚' : 'DÃ©veloppement application', value: 18, color: 'bg-emerald-500' },
    { name: language === 'ar' ? 'Ø§Ø³ØªØ¶Ø§ÙØ© Ø§Ù„Ø³Ø­Ø§Ø¨Ø©' : 'HÃ©bergement cloud', value: 8, color: 'bg-blue-500' },
    { name: language === 'ar' ? 'Wi-Fi' : 'Wi-Fi', value: 7, color: 'bg-cyan-500' },
    { name: language === 'ar' ? 'Ø§Ù„ÙˆÙ‚ÙˆØ¯' : 'Carburant', value: 22, color: 'bg-orange-500' },
    { name: language === 'ar' ? 'ØµÙŠØ§Ù†Ø© Ø§Ù„Ù…Ø±ÙƒØ¨Ø§Øª' : 'Maintenance vÃ©hicules', value: 12, color: 'bg-purple-500' },
    { name: language === 'ar' ? 'Ø§Ù„Ø±ÙˆØ§ØªØ¨' : 'Salaires', value: 16, color: 'bg-pink-500' },
    { name: language === 'ar' ? 'Ø§Ù„ØªØ³ÙˆÙŠÙ‚' : 'Marketing', value: 7, color: 'bg-lime-500' },
    { name: language === 'ar' ? 'Ø§Ù„ØªØ£Ù…ÙŠÙ†Ø§Øª' : 'Assurances', value: 4, color: 'bg-indigo-500' },
    { name: language === 'ar' ? 'Ø§Ù„Ù…ÙƒØªØ¨' : 'Bureau', value: 3, color: 'bg-slate-500' },
    { name: language === 'ar' ? 'Ø§Ù„Ø¶Ø±Ø§Ø¦Ø¨' : 'Taxes', value: 3, color: 'bg-red-500' },
  ];

  const revenueStreams = [
    { name: language === 'ar' ? 'Ø­Ø¬ÙˆØ²Ø§Øª Ù…Ø¨Ø§Ø´Ø±Ø©' : 'RÃ©servations directes', value: '30%', amount: '3.75M DA' },
    { name: language === 'ar' ? 'Ø§Ù„Ø§Ø´ØªØ±Ø§ÙƒØ§Øª' : 'Abonnements', value: '45%', amount: '5.62M DA' },
    { name: language === 'ar' ? 'Ø¥Ø¹Ù„Ø§Ù†Ø§Øª Ø§Ù„ØªØ·Ø¨ÙŠÙ‚' : 'PublicitÃ© application', value: '5%', amount: '625K DA' },
    { name: language === 'ar' ? 'Ø¹Ù…ÙˆÙ„Ø§Øª Ø§Ù„Ù…Ø³ØªØ«Ù…Ø±ÙŠÙ†' : 'Commissions investisseurs', value: '4%', amount: '500K DA' },
    { name: language === 'ar' ? 'Ù†Ù‚Ù„ Ø§Ù„Ø£Ø­Ø¯Ø§Ø«' : 'Transport Ã©vÃ©nements', value: '6%', amount: '750K DA' },
    { name: language === 'ar' ? 'Ù†Ù‚Ù„ Ø§Ù„Ù…Ø·Ø§Ø±' : 'Transport aÃ©roport', value: '4%', amount: '500K DA' },
    { name: language === 'ar' ? 'Ø±Ø­Ù„Ø§Øª Ø³ÙŠØ§Ø­ÙŠØ©' : 'Voyages touristiques', value: '4%', amount: '500K DA' },
    { name: language === 'ar' ? 'Ø´Ø±Ø§ÙƒØ§Øª Ø§Ù„Ø¬Ø§Ù…Ø¹Ø§Øª' : 'Partenariats universitÃ©s', value: '2%', amount: '250K DA' },
  ];

  const growthMetrics = [
    { 
      name: language === 'ar' ? 'Ù†Ù…Ùˆ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ†' : 'Croissance Utilisateurs', 
      value: '45%', 
      icon: Users,
      desc: language === 'ar' ? 'Ø²ÙŠØ§Ø¯Ø© Ø´Ù‡Ø±ÙŠØ©' : 'Augmentation mensuelle'
    },
    { 
      name: language === 'ar' ? 'Ù†Ù…Ùˆ Ø§Ù„Ø±Ø­Ù„Ø§Øª' : 'Croissance Trajets', 
      value: '38%', 
      icon: Car,
      desc: language === 'ar' ? 'Ø²ÙŠØ§Ø¯Ø© Ø´Ù‡Ø±ÙŠØ©' : 'Augmentation mensuelle'
    },
    { 
      name: language === 'ar' ? 'Ù…Ø¹Ø¯Ù„ Ø§Ù„Ø§Ø­ØªÙØ§Ø¸' : 'Taux de RÃ©tention', 
      value: '85%', 
      icon: Shield,
      desc: language === 'ar' ? 'Ù…Ø¹Ø¯Ù„ Ø¹Ø§Ù„Ù' : 'Taux Ã©levÃ©'
    },
    { 
      name: language === 'ar' ? 'Ø§Ù„ÙˆÙ‚Øª Ø§Ù„Ù…Ø³ØªØ¬ÙŠØ¨' : 'Temps de RÃ©ponse', 
      value: '2.5s', 
      icon: Zap,
      desc: language === 'ar' ? 'Ù…ØªÙˆØ³Ø· Ø§Ù„ØªØ·Ø¨ÙŠÙ‚' : 'Moyenne application'
    },
  ];

  const quarterlyGoals = [
    { 
      quarter: language === 'ar' ? 'Ø§Ù„Ø±Ø¨Ø¹ Ø§Ù„Ø£ÙˆÙ„' : 'Q1 2025', 
      target: language === 'ar' ? 'Ø¥Ø·Ù„Ø§Ù‚ Ø§Ù„Ù†Ø³Ø®Ø© Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠØ©' : 'Lancement Beta',
      status: language === 'ar' ? 'Ù…ÙƒØªÙ…Ù„' : 'ComplÃ©tÃ©',
      completed: true
    },
    { 
      quarter: language === 'ar' ? 'Ø§Ù„Ø±Ø¨Ø¹ Ø§Ù„Ø«Ø§Ù†ÙŠ' : 'Q2 2025', 
      target: language === 'ar' ? 'ØªÙˆØ³Ø¹ Ø¥Ù„Ù‰ 3 Ø¬Ø§Ù…Ø¹Ø§Øª' : 'Expansion 3 universitÃ©s',
      status: language === 'ar' ? 'Ù‚ÙŠØ¯ Ø§Ù„ØªÙ‚Ø¯Ù…' : 'En cours',
      completed: false
    },
    { 
      quarter: language === 'ar' ? 'Ø§Ù„Ø±Ø¨Ø¹ Ø§Ù„Ø«Ø§Ù„Ø«' : 'Q3 2025', 
      target: language === 'ar' ? 'Ø¥Ø·Ù„Ø§Ù‚ Ø§Ù„Ø¥ØµØ¯Ø§Ø± Ø§Ù„ÙƒØ§Ù…Ù„' : 'Lancement complet',
      status: language === 'ar' ? 'Ù‚Ø§Ø¯Ù…' : 'Ã€ venir',
      completed: false
    },
    { 
      quarter: language === 'ar' ? 'Ø§Ù„Ø±Ø¨Ø¹ Ø§Ù„Ø±Ø§Ø¨Ø¹' : 'Q4 2025', 
      target: language === 'ar' ? 'Ø§Ù„Ø±Ø¨Ø­ÙŠØ©' : 'RentabilitÃ©',
      status: language === 'ar' ? 'Ù‚Ø§Ø¯Ù…' : 'Ã€ venir',
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
                {language === 'ar' ? 'Ø§Ù„Ø®Ø·Ø© Ø§Ù„Ù…Ø§Ù„ÙŠØ©' : 'Plan Financier'}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              {language === 'ar' ? 'Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ… Ø§Ù„Ù…Ø§Ù„ÙŠØ©' : 'Tableau de Bord Financier'}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-emerald-100 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'Ù†Ø¸Ø±Ø© Ø´Ø§Ù…Ù„Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø£Ø¯Ø§Ø¡ Ø§Ù„Ù…Ø§Ù„ÙŠ ÙˆØ§Ù„ØªÙˆÙ‚Ø¹Ø§Øª Ø§Ù„Ù…Ø³ØªÙ‚Ø¨Ù„ÙŠØ©'
                : 'Vue complÃ¨te de la performance financiÃ¨re et des projections futures'}
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
                  {language === 'ar' ? 'ØªÙˆÙ‚Ø¹Ø§Øª Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª' : 'Projections Revenus'}
                </h2>
                <p className="text-gray-600">
                  {language === 'ar' ? 'Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª Ø§Ù„Ø´Ù‡Ø±ÙŠØ© Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø©' : 'Revenus mensuels projetÃ©s'}
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
                  {language === 'ar' ? 'Ù…ØµØ§Ø¯Ø± Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª' : 'Sources de revenus'}
                </h2>
                <p className="text-gray-600">
                  {language === 'ar' ? 'ØªÙ†ÙˆÙŠØ¹ Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª Ø­Ø³Ø¨ Ø®Ø·Ø© Ø§Ù„Ø£Ø¹Ù…Ø§Ù„' : 'Diversification des revenus selon le business plan'}
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
                    {language === 'ar' ? 'ØªÙˆØ²ÙŠØ¹ Ø§Ù„ØªÙƒØ§Ù„ÙŠÙ' : 'RÃ©partition CoÃ»ts'}
                  </h2>
                  <p className="text-gray-600">
                    {language === 'ar' ? 'ØªØ­Ù„ÙŠÙ„ Ù‡ÙŠÙƒÙ„ Ø§Ù„ØªÙƒØ§Ù„ÙŠÙ' : 'Analyse structure coÃ»ts'}
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
                    {language === 'ar' ? 'Ù…Ù‚Ø§ÙŠÙŠØ³ Ø§Ù„Ù†Ù…Ùˆ' : 'MÃ©triques Croissance'}
                  </h2>
                  <p className="text-gray-600">
                    {language === 'ar' ? 'Ù…Ø¤Ø´Ø±Ø§Øª Ø§Ù„Ø£Ø¯Ø§Ø¡ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©' : 'Indicateurs clÃ©s performance'}
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
                  {language === 'ar' ? 'Ø§Ù„Ø£Ù‡Ø¯Ø§Ù Ø§Ù„ÙØµÙ„ÙŠØ©' : 'Objectifs Trimestriels'}
                </h2>
                <p className="text-gray-600">
                  {language === 'ar' ? 'Ø®Ø§Ø±Ø·Ø© Ø§Ù„Ø·Ø±ÙŠÙ‚ Ø§Ù„Ù…Ø§Ù„ÙŠØ©' : 'Feuille de route financiÃ¨re'}
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
                {language === 'ar' ? 'Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø§Ù„Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠØ©' : 'Informations AcadÃ©miques du Projet'}
              </h3>
              <div className="space-y-3 text-slate-300">
                <p><span className="font-semibold text-white">{language === 'ar' ? 'Ø§Ù„Ø·Ø§Ù„Ø¨Ø©:' : 'Ã‰tudiante:'}</span> Ù…Ø±Ø§Ø­ Ø§Ø¨ØªØ³Ø§Ù…</p>
                <p><span className="font-semibold text-white">{language === 'ar' ? 'Ù…Ø§Ø³ØªØ± 2:' : 'Master 2:'}</span> {language === 'ar' ? 'Ù‚Ø§Ù†ÙˆÙ† Ø¹Ø§Ù…' : 'Droit GÃ©nÃ©ral'}</p>
                <p><span className="font-semibold text-white">{language === 'ar' ? 'Ø§Ù„Ø³Ù†Ø© Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠØ©:' : 'AnnÃ©e Universitaire:'}</span> 2025/2026</p>
                <p><span className="font-semibold text-white">{language === 'ar' ? 'Ø§Ù„ÙƒÙ„ÙŠØ©:' : 'FacultÃ©:'}</span> {language === 'ar' ? 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø­Ù‚ÙˆÙ‚ ÙˆØ§Ù„Ø¹Ù„ÙˆÙ… Ø§Ù„Ø³ÙŠØ§Ø³ÙŠØ©' : 'FacultÃ© de Droit et Sciences Politiques'}</p>
                <p><span className="font-semibold text-white">{language === 'ar' ? 'Ø§Ù„Ø¬Ø§Ù…Ø¹Ø©:' : 'UniversitÃ©:'}</span> {language === 'ar' ? 'Ø¬Ø§Ù…Ø¹Ø© Ø§Ù„Ø¬ÙŠÙ„Ø§Ù„ÙŠ Ø§Ù„ÙŠØ§Ø¨Ø³ Ø³ÙŠØ¯ÙŠ Ø¨Ù„Ø¹Ø¨Ø§Ø³' : 'UniversitÃ© Djilali LiabÃ¨s Sidi Bel AbbÃ¨s'}</p>
                <p><span className="font-semibold text-white">{language === 'ar' ? 'Ø§Ù„Ø¥Ø´Ø±Ø§Ù:' : 'Supervision:'}</span> {language === 'ar' ? 'Ø§Ù„Ø¯ÙƒØªÙˆØ±Ø© Ø±Ù…Ø¯ÙˆÙ… Ù†ÙˆØ±Ø©' : 'DR RAMDOUM NORA'}</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black mb-4 text-emerald-400">
                {language === 'ar' ? 'Ø§Ù„Ø¥Ù†ØªØ§Ø¬ ÙˆØ§Ù„ØªØ·ÙˆÙŠØ±' : 'Production et DÃ©veloppement'}
              </h3>
              <div className="space-y-3 text-slate-300">
                <p><span className="font-semibold text-white">DR:</span> BEHIRI ABDELKADER</p>
                <p className="text-2xl font-bold text-emerald-400">Ø¯ Ø¨Ø­ÙŠØ±ÙŠ Ø¹Ø¨Ø¯ Ø§Ù„Ù‚Ø§Ø¯Ø±</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
