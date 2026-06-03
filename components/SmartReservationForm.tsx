'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateDynamicPricing, recommendVehicle, PricingResult, TransportNature, TRANSPORT_NATURE_OPTIONS } from '@/lib/pricing';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Bus,
  Car,
  CreditCard,
  Wallet,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Navigation,
  ArrowRightLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface SmartReservationFormProps {
  onReservationSubmit: (data: {
    tripCategory: string;
    departurePoint: string;
    destination: string;
    customDeparture?: string;
    customDestination?: string;
    date: string;
    time: string;
    vehicleType: 'car' | 'minibus' | 'bus';
    seats: number;
    paymentMethod: string;
    roundTrip: boolean;
    totalPrice: number;
    estimatedDistanceKm: number;
    estimatedTravelTime: number;
    vehicleRecommended: string;
    comfortLevel: string;
    groupBooking: boolean;
    transportNature: TransportNature;
  }) => void;
}

export function SmartReservationForm({ onReservationSubmit }: SmartReservationFormProps) {
  const { language, isRTL } = useLanguage();
  const { user } = useAuth();

  const isAr = language === 'ar';

  // Form Fields
  const [tripCategory, setTripCategory] = useState('daily_university');
  const [departurePoint, setDeparturePoint] = useState('Centre-ville');
  const [customDeparture, setCustomDeparture] = useState('');
  const [destination, setDestination] = useState('Pôle universitaire');
  const [customDestination, setCustomDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [vehicleType, setVehicleType] = useState<'car' | 'minibus' | 'bus'>('bus');
  const [seats, setSeats] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [roundTrip, setRoundTrip] = useState(false);
  const [transportNature, setTransportNature] = useState<TransportNature>('daily_university');

  // Smart states
  const [pricing, setPricing] = useState<PricingResult | null>(null);
  const [similarGroupCount, setSimilarGroupCount] = useState(0);

  // Check user details for discounts
  const isStudentVerified = user?.verified === true || user?.verificationStatus === 'approved' || user?.verificationStatus === 'verified';
  const isSubscriptionActive = user?.subscriptionStatus === 'active';

  // 1. Recalculate Dynamic Pricing
  useEffect(() => {
    const res = calculateDynamicPricing({
      vehicleType,
      tripCategory,
      passengersCount: seats,
      isStudentVerified,
      isSubscriptionActive,
      isRoundTrip: roundTrip,
      transportNature,
    });
    setPricing(res);
  }, [vehicleType, tripCategory, seats, isStudentVerified, isSubscriptionActive, roundTrip, transportNature]);

  // 2. Auto Recommendation Trigger
  const recommended = recommendVehicle(seats);

  // 3. Simulate Smart Grouping based on destination, date and time
  useEffect(() => {
    if (destination && date && time) {
      // Deterministic pseudo-random number of matching travelers
      const seed = (destination.length + date.length + time.length) % 15 + 3;
      setSimilarGroupCount(seed);
    } else {
      setSimilarGroupCount(0);
    }
  }, [destination, date, time]);

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check Capacity Limit
    const maxCapacity = vehicleType === 'car' ? 4 : vehicleType === 'minibus' ? 18 : 60;
    if (seats > maxCapacity) {
      alert(
        isAr
          ? `عذراً، سعة الـ ${vehicleType === 'car' ? 'سيارة' : vehicleType === 'minibus' ? 'حافلة صغيرة' : 'حافلة'} القصوى هي ${maxCapacity} ركاب.`
          : `Désolé, la capacité maximale de type ${vehicleType === 'car' ? 'Voiture' : vehicleType === 'minibus' ? 'Mini Bus' : 'Bus'} est de ${maxCapacity} passagers.`
      );
      return;
    }

    if (!date || !time) {
      alert(isAr ? 'يرجى اختيار التاريخ والوقت.' : 'Veuillez choisir la date et l\'heure.');
      return;
    }

    const finalDeparture = departurePoint === 'custom' ? customDeparture : departurePoint;
    const finalDestination = destination === 'custom' ? customDestination : destination;

    if (!finalDeparture || !finalDestination) {
      alert(isAr ? 'يرجى تحديد نقطة الانطلاق والوصول.' : 'Veuillez préciser le départ et la destination.');
      return;
    }

    onReservationSubmit({
      tripCategory,
      departurePoint: finalDeparture,
      destination: finalDestination,
      customDeparture: departurePoint === 'custom' ? customDeparture : undefined,
      customDestination: destination === 'custom' ? customDestination : undefined,
      date,
      time,
      vehicleType,
      seats,
      paymentMethod,
      roundTrip,
      totalPrice: pricing?.estimatedPrice || 100,
      estimatedDistanceKm: pricing?.estimatedDistanceKm || 5,
      estimatedTravelTime: pricing?.estimatedTravelTimeMins || 15,
      vehicleRecommended: recommended.type,
      comfortLevel: vehicleType === 'car' ? 'high' : vehicleType === 'minibus' ? 'medium' : 'standard',
      groupBooking: seats > 1,
      transportNature,
    });
  };

  // Categories
  const categories = [
    { value: 'daily_university', ar: 'تنقل يومي للجامعة', fr: 'Navette Universitaire' },
    { value: 'inter_commune', ar: 'بين البلديات', fr: 'Inter-communes' },
    { value: 'inter_daira', ar: 'بين الدوائر', fr: 'Inter-daïras' },
    { value: 'inter_wilaya', ar: 'بين الولايات', fr: 'Inter-wilayas' },
    { value: 'airport_transfer', ar: 'نقل إلى المطار ✈️', fr: 'Transfert Aéroport ✈️' },
    { value: 'port_transfer', ar: 'نقل إلى الميناء 🚢', fr: 'Transfert Port 🚢' },
    { value: 'scientific_event', ar: 'ملتقيات وعروض علمية 🔬', fr: 'Événement Scientifique 🔬' },
    { value: 'sport_event', ar: 'فعاليات رياضية 🏆', fr: 'Événement Sportif 🏆' },
    { value: 'cultural_event', ar: 'تظاهرات ثقافية 🎭', fr: 'Événement Culturel 🎭' },
    { value: 'tourism_trip', ar: 'رحلات سياحية 🚌', fr: 'Voyage Touristique 🚌' },
    { value: 'competition_trip', ar: 'مسابقات وطنية 🏅', fr: 'Concours Scientifique 🏅' },
    { value: 'internship_trip', ar: 'تنقل للتربص والتدريب 💼', fr: 'Trajet de Stage 💼' },
    { value: 'conference_trip', ar: 'مؤتمرات جامعية 🎤', fr: 'Conférence Universitaire 🎤' },
    { value: 'special_trip', ar: 'رحلة خاصة مخصصة 🌟', fr: 'Trajet Spécial 🌟' },
    { value: 'group_trip', ar: 'رحلة جماعية للطلبة 👥', fr: 'Voyage de Groupe 👥' },
    { value: 'recurring_trip', ar: 'رحلة دورية متكررة 🔄', fr: 'Trajet Récurrent 🔄' },
  ];

  // Departures
  const departures = [
    { value: 'Centre-ville', ar: 'وسط المدينة', fr: 'Centre-ville' },
    { value: 'Gare routière', ar: 'محطة الحافلات', fr: 'Gare routière' },
    { value: 'Gare ferroviaire', ar: 'محطة القطار', fr: 'Gare ferroviaire' },
    { value: 'Résidence universitaire', ar: 'الإقامة الجامعية', fr: 'Résidence universitaire' },
    { value: 'Faculté', ar: 'الكلية', fr: 'Faculté' },
    { value: 'Institut', ar: 'المعهد', fr: 'Institut' },
    { value: 'Pôle universitaire', ar: 'القطب الجامعي', fr: 'Pôle universitaire' },
    { value: 'Arrêt transport universitaire', ar: 'موقف النقل الجامعي', fr: 'Arrêt transport' },
    { value: 'Aéroport', ar: 'المطار', fr: 'Aéroport' },
    { value: 'Port', ar: 'الميناء', fr: 'Port' },
    { value: 'custom', ar: '📍 نقطة انطلاق مخصصة', fr: '📍 Point personnalisé' },
  ];

  // Destinations
  const destinations = [
    { value: 'Pôle universitaire SB-Abbès', ar: 'القطب الجامعي سيدي بلعباس', fr: 'Pôle universitaire SBA' },
    { value: 'Université d\'Oran - USTO', ar: 'جامعة العلوم والتكنولوجيا وهران', fr: 'Université d\'Oran USTO' },
    { value: 'Université de Tlemcen', ar: 'جامعة تلمسان', fr: 'Université de Tlemcen' },
    { value: 'Résidence Universitaire SBA', ar: 'الإقامة الجامعية سيدي بلعباس', fr: 'Résidence SBA' },
    { value: 'Aéroport d\'Alger Houari Boumédiène', ar: 'مطار الجزائر الدولي', fr: 'Aéroport d\'Alger' },
    { value: 'Aéroport d\'Oran Ahmed Ben Bella', ar: 'مطار وهران الدولي', fr: 'Aéroport d\'Oran' },
    { value: 'Port de Ghazaouet', ar: 'ميناء الغزوات', fr: 'Port de Ghazaouet' },
    { value: 'Port de Mostaganem', ar: 'ميناء مستغانم', fr: 'Port de Mostaganem' },
    { value: 'Centre de conférences d\'Oran', ar: 'مركز المؤتمرات وهران', fr: 'Centre de Conférences Oran' },
    { value: 'Complex olympique de Miloud Hadefi', ar: 'المركب الأولمبي ميلود هدفي', fr: 'Complexe Sportif Oran' },
    { value: 'custom', ar: '📍 وجهة مخصصة جديدة', fr: '📍 Destination personnalisée' },
  ];

  const vehicleOptions = [
    {
      value: 'car',
      titleAr: '🚗 سيارة خاصة',
      titleFr: '🚗 Voiture',
      capacityAr: '1 إلى 4 ركاب',
      capacityFr: '1 à 4 passagers',
      descAr: 'خدمة سريعة، مريحة ومرنة للغاية تناسب التنقل الفردي والمجموعات الصغيرة.',
      descFr: 'Trajet individuel, rapide et flexible. Idéal pour un confort premium.',
      priceTextAr: 'سعر مرتفع (35 د.ج/كم)',
      priceTextFr: 'Tarif élevé (35 DA/km)',
    },
    {
      value: 'minibus',
      titleAr: '🚐 حافلة صغيرة',
      titleFr: '🚐 Mini Bus',
      capacityAr: '5 إلى 18 راكباً',
      capacityFr: '5 à 18 passagers',
      descAr: 'مثالية للمجموعات الدراسية المتوسطة، الرحلات العلمية، والتربصات الميدانية.',
      descFr: 'Transport semi-collectif idéal pour groupes d\'études et stages.',
      priceTextAr: 'سعر متوسط (25 د.ج/كم)',
      priceTextFr: 'Tarif moyen (25 DA/km)',
    },
    {
      value: 'bus',
      titleAr: '🚌 حافلة كبيرة',
      titleFr: '🚌 Bus',
      capacityAr: '19 إلى 60 راكباً',
      capacityFr: '19 à 60 passagers',
      descAr: 'النقل الجماعي الاقتصادي الأفضل، مثالي للمناسبات الرياضية الكبرى والرحلات المشتركة.',
      descFr: 'Transport collectif économique. Prix réduit par passager.',
      priceTextAr: 'سعر منخفض ومخفّض (18 د.ج/كم)',
      priceTextFr: 'Tarif réduit (18 DA/km)',
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-slate-100" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* UDL Header Logo */}
      <div className="flex items-center gap-2 mb-2">
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image src="/images/udl-logo.jpeg" alt="UDL" fill className="object-contain rounded-sm" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-emerald-400/80">
            {isAr ? 'بالتعاون مع جامعة الجيلالي اليابس سيدي بلعباس' : 'En partenariat avec'}
          </span>
          <span className="text-[10px] font-bold text-emerald-300/70">
            {isAr ? '' : 'Université Djillali Liabès'}
          </span>
        </div>
      </div>

      {/* 1. Category Selector */}
      <Card className="p-6 border border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-[2rem]">
        <h3 className="text-lg font-black text-emerald-400 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          {isAr ? 'نوع وتصنيف الرحلة الذكية' : 'Catégorie de trajet intelligent'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setTripCategory(cat.value)}
              className={`p-3 rounded-xl border text-right transition-all flex items-center justify-between ${
                tripCategory === cat.value
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                  : 'border-white/10 hover:border-emerald-500/30 text-slate-300'
              }`}
            >
              <span>{isAr ? cat.ar : cat.fr}</span>
              {tripCategory === cat.value && <CheckCircle className="w-4 h-4 text-emerald-400" />}
            </button>
          ))}
        </div>
      </Card>

      {/* 1b. Transport Nature */}
      <Card className="p-6 border border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-[2rem]">
        <h3 className="text-lg font-black text-emerald-400 mb-4 flex items-center gap-2">
          <Bus className="w-5 h-5 text-emerald-400" />
          {isAr ? 'طبيعة وسيلة النقل' : 'Nature du transport'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {TRANSPORT_NATURE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTransportNature(opt.value)}
              className={`p-3 rounded-xl border text-right transition-all flex items-center justify-between ${
                transportNature === opt.value
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                  : 'border-white/10 hover:border-emerald-500/30 text-slate-300'
              }`}
            >
              <span className="text-sm">{isAr ? opt.labelAr : opt.labelFr}</span>
              {transportNature === opt.value && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
            </button>
          ))}
        </div>
        {pricing && pricing.transportNatureMultiplier !== 1.0 && (
          <p className="text-xs text-amber-300 mt-3 font-bold">
            {isAr
              ? `مضاعف السعر: ×${pricing.transportNatureMultiplier}`
              : `Multiplicateur tarif : ×${pricing.transportNatureMultiplier}`}
          </p>
        )}
      </Card>

      {/* 2. Departure & Destination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Departure */}
        <Card className="p-6 border border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-[2rem] space-y-4">
          <h3 className="text-lg font-black text-emerald-400 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            {isAr ? 'نقطة الانطلاق' : 'Point de départ'}
          </h3>
          <select
            value={departurePoint}
            onChange={(e) => setDeparturePoint(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-emerald-500 font-semibold"
          >
            {departures.map((dep) => (
              <option key={dep.value} value={dep.value}>
                {isAr ? dep.ar : dep.fr}
              </option>
            ))}
          </select>

          {departurePoint === 'custom' && (
            <Input
              value={customDeparture}
              onChange={(e) => setCustomDeparture(e.target.value)}
              placeholder={isAr ? "اكتب نقطة الانطلاق المخصصة بالتفصيل..." : "Saisissez l'adresse de départ personnalisée..."}
              className="bg-slate-900 border-emerald-500/40 text-white rounded-xl h-11"
              required
            />
          )}
        </Card>

        {/* Destination */}
        <Card className="p-6 border border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-[2rem] space-y-4">
          <h3 className="text-lg font-black text-emerald-400 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            {isAr ? 'الوجهة المحددة' : 'Destination'}
          </h3>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-emerald-500 font-semibold"
          >
            {destinations.map((dest) => (
              <option key={dest.value} value={dest.value}>
                {isAr ? dest.ar : dest.fr}
              </option>
            ))}
          </select>

          {destination === 'custom' && (
            <Input
              value={customDestination}
              onChange={(e) => setCustomDestination(e.target.value)}
              placeholder={isAr ? "اكتب الوجهة المخصصة بالتفصيل..." : "Saisissez la destination personnalisée..."}
              className="bg-slate-900 border-emerald-500/40 text-white rounded-xl h-11"
              required
            />
          )}
        </Card>
      </div>

      {/* 3. DateTime & RoundTrip & Passengers */}
      <Card className="p-6 border border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-[2rem] space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="text-slate-300 font-bold mb-2 block">{isAr ? 'التاريخ' : 'Date'}</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-slate-900 border-white/10 text-white rounded-xl h-12 font-semibold"
              required
            />
          </div>
          <div>
            <Label className="text-slate-300 font-bold mb-2 block">{isAr ? 'وقت الانطلاق' : 'Heure de départ'}</Label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-slate-900 border-white/10 text-white rounded-xl h-12 font-semibold"
              required
            />
          </div>
          <div>
            <Label className="text-slate-300 font-bold mb-2 block">{isAr ? 'عدد المسافرين بالرحلة' : 'Nombre de passagers'}</Label>
            <div className="flex items-center gap-4 h-12 bg-slate-900 rounded-xl px-4 border border-white/10">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setSeats(Math.max(1, seats - 1))}
                className="text-emerald-400 hover:text-emerald-300 text-2xl p-0 h-8 w-8 rounded-lg"
              >
                -
              </Button>
              <span className="flex-1 text-center font-extrabold text-white text-lg">{seats}</span>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setSeats(Math.min(60, seats + 1))}
                className="text-emerald-400 hover:text-emerald-300 text-2xl p-0 h-8 w-8 rounded-lg"
              >
                +
              </Button>
            </div>
          </div>
        </div>

        {/* Round Trip Toggle */}
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <ArrowRightLeft className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="font-bold text-white text-sm">{isAr ? 'حجز ذهاب وإياب' : 'Aller-Retour'}</p>
              <p className="text-xs opacity-60">{isAr ? 'وفر 20% على رحلة الإياب الخاصة بك' : 'Économisez 20% sur le trajet retour'}</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={roundTrip}
            onChange={(e) => setRoundTrip(e.target.checked)}
            className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
          />
        </div>

        {/* Smart Grouping Display */}
        {similarGroupCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <h4 className="font-black text-sm text-blue-300 flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {isAr ? `تم العثور على ${similarGroupCount} مسافرين مشابهين!` : `${similarGroupCount} voyageurs similaires trouvés !`}
              </h4>
              <p className="text-xs text-blue-100 opacity-80">
                {isAr
                  ? `بناءً على وجهتك ووقتك، نوصي بالحافلات لتوفير لغاية 35% من التكلفة.`
                  : `Sur la même destination et horaire. Nous recommandons un Bus pour économiser jusqu'à 35%.`}
              </p>
            </div>
            <span className="bg-blue-500/20 text-blue-300 text-xs font-black px-3 py-1 rounded-full whitespace-nowrap">
              Smart Grouping
            </span>
          </motion.div>
        )}
      </Card>

      {/* 4. Auto Recommendation Display */}
      <Card className="p-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-[1.5rem] flex items-center gap-3">
        <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse shrink-0" />
        <div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-black uppercase tracking-wider block w-fit mb-1">
            {isAr ? 'توصية يونيموف الذكية' : 'Recommandation UNIMOVE'}
          </span>
          <p className="text-sm font-bold text-white">
            {isAr
              ? `المركبة المقترحة لعدد ركابك (${seats}): ${recommended.labelAr} — ${recommended.capacityTextAr}`
              : `Véhicule recommandé pour vos (${seats}) voyageurs : ${recommended.labelFr} — ${recommended.capacityTextFr}`}
          </p>
        </div>
      </Card>

      {/* 5. Choice of Vehicle */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <Bus className="w-6 h-6 text-emerald-400" />
          {isAr ? 'اختر فئة المركبة المطلوبة' : 'Sélectionnez la catégorie du véhicule'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicleOptions.map((opt) => {
            const isRecommended = opt.value === recommended.type;
            const isSelected = opt.value === vehicleType;

            return (
              <Card
                key={opt.value}
                onClick={() => setVehicleType(opt.value as any)}
                className={`p-6 border-2 rounded-[2rem] cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-950/20 shadow-xl'
                    : 'border-white/10 bg-black/40 hover:border-emerald-500/30'
                }`}
              >
                {isRecommended && (
                  <span className="absolute top-0 right-0 bg-emerald-500 text-black text-[9px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 fill-current" />
                    {isAr ? 'موصى به' : 'Conseillé'}
                  </span>
                )}

                <div className="space-y-3">
                  <h4 className="font-extrabold text-base text-white">{isAr ? opt.titleAr : opt.titleFr}</h4>
                  <p className="text-xs opacity-65 leading-5 font-semibold text-slate-300">{isAr ? opt.descAr : opt.descFr}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>{isAr ? 'القدرة القصوى:' : 'Capacité max :'}</span>
                    <span className="text-emerald-400">{isAr ? opt.capacityAr : opt.capacityFr}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>{isAr ? 'معدل التعريفة:' : 'Tarif de base :'}</span>
                    <span className="text-emerald-400">{isAr ? opt.priceTextAr : opt.priceTextFr}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 6. Dynamic Pricing Details & Breakdowns */}
      {pricing && (
        <Card className="p-6 border border-emerald-500/10 bg-white/5 rounded-[2rem] space-y-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-black text-sm text-emerald-400">{isAr ? 'تفاصيل احتساب السعر التلقائي' : 'Détails du calcul du tarif'}</h4>
              <p className="text-xs text-slate-300 leading-5">
                {isAr ? pricing.pricingDetailsAr : pricing.pricingDetailsFr}
              </p>
              <p className="text-xs text-emerald-300 font-bold">
                {isAr ? pricing.discountDetailsAr : pricing.discountDetailsFr}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-white/5 text-xs text-slate-400 font-semibold">
            <div>
              <p className="opacity-70">{isAr ? 'المسافة المقدرة' : 'Distance estimée'}</p>
              <p className="text-white font-extrabold text-sm mt-0.5">{pricing.estimatedDistanceKm} كم</p>
            </div>
            <div>
              <p className="opacity-70">{isAr ? 'مدة الرحلة التقريبية' : 'Durée estimée'}</p>
              <p className="text-white font-extrabold text-sm mt-0.5">{pricing.estimatedTravelTimeMins} دقيقة</p>
            </div>
            <div>
              <p className="opacity-70">{isAr ? 'خصومات الطلاب المطبقة' : 'Réductions cumulées'}</p>
              <p className="text-emerald-400 font-extrabold text-sm mt-0.5">-{pricing.totalDiscountsPercent}%</p>
            </div>
            <div>
              <p className="opacity-70">{isAr ? 'التكلفة لكل مقعد' : 'Coût par passager'}</p>
              <p className="text-white font-extrabold text-sm mt-0.5">
                {Math.round(pricing.estimatedPrice / seats)} DA
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* 7. Warnings and Submissions */}
      <Card className="p-6 border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-emerald-900/10 to-teal-950/40 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6">
        {isSubscriptionActive ? (
          <div className="text-center md:text-right space-y-1">
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-black uppercase tracking-wider block w-fit mb-1">
              {isAr ? 'رحلة مغطاة بالاشتراك' : 'Trajet inclus'}
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-1">
              <span className="text-4xl font-black text-emerald-400">{isAr ? 'مجانية بالكامل' : 'Gratuit'}</span>
            </div>
            <p className="text-[10px] text-emerald-300 font-semibold">
              {isAr
                ? '* لن يتم احتساب أي تكاليف أو مطالبة بالدفع'
                : '* Aucune charge ne sera appliquée'}
            </p>
          </div>
        ) : (
          <div className="text-center md:text-right space-y-1">
            <p className="text-xs text-slate-300/80 font-bold">{isAr ? 'السعر التقديري النهائي للرحلة' : 'Prix total estimé'}</p>
            <div className="flex items-baseline justify-center md:justify-start gap-1">
              <span className="text-4xl font-black text-emerald-400">{pricing?.estimatedPrice || 100}</span>
              <span className="text-sm text-emerald-400 font-bold">DA</span>
            </div>
            <p className="text-[10px] text-amber-300 font-semibold">
              {isAr
                ? '* السعر تقديري وقد يتغير بعد موافقة الإدارة'
                : '* Le tarif est estimé et peut être réajusté après validation par l\'administration'}
            </p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full md:w-auto h-14 px-10 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
        >
          {isAr ? 'تأكيد وحجز الرحلة الذكية' : 'Confirmer et réserver le trajet'}
          <ChevronRight className="w-5 h-5 shrink-0" />
        </Button>
      </Card>
    </form>
  );
}
