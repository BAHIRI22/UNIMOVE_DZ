'use client';

import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  MapPin, Calendar, Clock, Users, Bus, Car, ChevronRight, ChevronLeft,
  CheckCircle, ArrowRightLeft, Sparkles, Plane, Ship, TrainFront,
  Hospital, Building2, School, Home, Landmark, Briefcase, Trophy,
  FlaskConical, Palette, Mountain, GraduationCap, UserCheck, Star,
  Info, Navigation, MapPinned
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import transportData from '@/data/transport-data.json';
import { calculateDynamicPricing, recommendVehicle, PricingResult, TransportNature, TRANSPORT_NATURE_OPTIONS } from '@/lib/pricing';

interface MissionBookingWizardProps {
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
    missionType?: string;
    departureDaira?: string;
    departureCommune?: string;
    meetingPoint?: string;
    destinationType?: string;
    destinationName?: string;
  }) => void;
}

const STEP_LABELS_AR = [
  'نوع المهمة',
  'طبيعة النقل',
  'نقطة الانطلاق',
  'الوجهة',
  'التاريخ',
  'الوقت',
  'عدد المسافرين',
  'ذهاب وإياب',
  'اختيار المركبة',
  'السعر والتأكيد',
];

const STEP_LABELS_FR = [
  'Type de mission',
  'Nature du transport',
  'Point de départ',
  'Destination',
  'Date',
  'Heure',
  'Nombre de voyageurs',
  'Aller-Retour',
  'Choix du véhicule',
  'Prix et confirmation',
];

export function MissionBookingWizard({ onReservationSubmit }: MissionBookingWizardProps) {
  const { language, isRTL } = useLanguage();
  const { user } = useAuth();
  const isAr = language === 'ar';

  const [step, setStep] = useState(1);
  const [missionType, setMissionType] = useState('');
  const [transportNature, setTransportNature] = useState<TransportNature>('daily_university');
  const [departureDaira, setDepartureDaira] = useState('');
  const [departureCommune, setDepartureCommune] = useState('');
  const [meetingPoint, setMeetingPoint] = useState('');
  const [destinationType, setDestinationType] = useState('');
  const [destinationName, setDestinationName] = useState('');
  const [customDestination, setCustomDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState(1);
  const [roundTrip, setRoundTrip] = useState(false);
  const [vehicleType, setVehicleType] = useState<'car' | 'minibus' | 'bus'>('bus');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [pricing, setPricing] = useState<PricingResult | null>(null);
  const [tripDirection, setTripDirection] = useState<'aller' | 'retour'>('aller');

  const isStudentVerified = user?.verified === true || user?.verificationStatus === 'approved' || user?.verificationStatus === 'verified';
  const isSubscriptionActive = user?.subscriptionStatus === 'active';

  useEffect(() => {
    const res = calculateDynamicPricing({
      vehicleType,
      tripCategory: missionType || 'daily_university',
      passengersCount: seats,
      isStudentVerified,
      isSubscriptionActive,
      isRoundTrip: roundTrip,
      transportNature,
    });
    setPricing(res);
  }, [vehicleType, missionType, seats, isStudentVerified, isSubscriptionActive, roundTrip, transportNature]);

  const recommended = recommendVehicle(seats);

  const dairaOptions = useMemo(() => transportData.dairas, []);
  const selectedDaira = useMemo(() => dairaOptions.find((d) => d.id === departureDaira), [departureDaira, dairaOptions]);
  const communeOptions = useMemo(() => selectedDaira?.communes || [], [selectedDaira]);
  const meetingPointOptions = useMemo(() => transportData.meetingPoints, []);

  const destinationCategories = useMemo(() => [
    { id: 'university', labelAr: 'جامعة / كلية / معهد', labelFr: 'Université / Faculté / Institut', icon: School },
    { id: 'residence', labelAr: 'إقامة جامعية', labelFr: 'Résidence universitaire', icon: Home },
    { id: 'hospital', labelAr: 'مستشفى / مركز صحي', labelFr: 'Hôpital / Centre de santé', icon: Hospital },
    { id: 'airport', labelAr: 'مطار', labelFr: 'Aéroport', icon: Plane },
    { id: 'port', labelAr: 'ميناء', labelFr: 'Port', icon: Ship },
    { id: 'train_station', labelAr: 'محطة قطار', labelFr: 'Gare ferroviaire', icon: TrainFront },
    { id: 'other', labelAr: 'وجهة أخرى', labelFr: 'Autre destination', icon: MapPinned },
  ], []);

  const getDestinationOptions = () => {
    switch (destinationType) {
      case 'university': return transportData.udlStructures;
      case 'residence': return transportData.residences;
      case 'hospital': return transportData.hospitals;
      case 'airport': return transportData.airports;
      case 'port': return transportData.ports;
      case 'train_station': return transportData.trainStations;
      default: return [];
    }
  };

  const vehicleOptions = [
    { value: 'car' as const, titleAr: 'سيارة خاصة', titleFr: 'Voiture', capacity: 4, comfort: 'premium', priceFactor: 1.5 },
    { value: 'minibus' as const, titleAr: 'حافلة صغيرة', titleFr: 'Mini Bus', capacity: 15, comfort: 'confort', priceFactor: 1.2 },
    { value: 'bus' as const, titleAr: 'حافلة كبيرة', titleFr: 'Bus', capacity: 45, comfort: 'standard', priceFactor: 1.0 },
  ];

  const canProceed = () => {
    switch (step) {
      case 1: return !!missionType;
      case 2: return !!transportNature;
      case 3: return !!departureDaira && !!meetingPoint;
      case 4: return !!destinationType && (!!destinationName || (destinationType === 'other' && !!customDestination));
      case 5: return !!date;
      case 6: return !!time;
      case 7: return seats >= 1;
      case 8: return true;
      case 9: return !!vehicleType;
      case 10: return true;
      default: return false;
    }
  };

  const nextStep = () => {
    if (canProceed() && step < 10) setStep((s) => s + 1);
  };
  const prevStep = () => { if (step > 1) setStep((s) => s - 1); };

  const handleConfirm = () => {
    const finalDestination = destinationType === 'other' ? customDestination : destinationName;
    const departureLabel = selectedDaira
      ? `${selectedDaira.nameAr}${departureCommune ? ' — ' + communeOptions.find((c) => c.id === departureCommune)?.nameAr : ''}`
      : '';
    const meetingLabel = meetingPointOptions.find((p) => p.id === meetingPoint)?.nameAr || meetingPoint;
    const fullDeparture = `${departureLabel} (${meetingLabel})`;

    // Swap departure and destination if tripDirection is 'retour'
    const finalDeparturePoint = tripDirection === 'aller' ? fullDeparture : finalDestination;
    const finalDestinationPoint = tripDirection === 'aller' ? finalDestination : fullDeparture;

    onReservationSubmit({
      tripCategory: missionType,
      departurePoint: finalDeparturePoint || '',
      destination: finalDestinationPoint || '',
      customDestination: destinationType === 'other' ? customDestination : undefined,
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
      missionType,
      departureDaira,
      departureCommune,
      meetingPoint,
      destinationType,
      destinationName,
    });
  };

  const renderStepIndicator = () => (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {STEP_LABELS_AR.map((_, i) => {
        const s = i + 1;
        const active = s === step;
        const done = s < step;
        return (
          <div key={s} className="flex items-center gap-2 shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              active ? 'bg-emerald-500 text-black' : done ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {done ? <CheckCircle className="w-4 h-4" /> : s}
            </div>
            <span className={`text-[10px] font-bold hidden md:block ${active ? 'text-emerald-400' : done ? 'text-emerald-600' : 'text-slate-500'}`}>
              {isAr ? STEP_LABELS_AR[i] : STEP_LABELS_FR[i]}
            </span>
            {s < 10 && <div className={`w-4 h-0.5 ${done ? 'bg-emerald-700' : 'bg-slate-800'}`} />}
          </div>
        );
      })}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-black text-emerald-400 flex items-center gap-2 mb-2">
              <Briefcase className="w-7 h-7 text-emerald-400" />
              {isAr ? 'اختر نوع المهمة' : 'Choisissez le type de mission'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {transportData.missionTypes.map((mt) => (
                <button
                  key={mt.id}
                  type="button"
                  onClick={() => setMissionType(mt.id)}
                  className={`p-5 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
                    missionType === mt.id
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-extrabold shadow-lg shadow-emerald-500/10'
                      : 'border-white/10 hover:border-emerald-500/30 text-slate-300'
                  }`}
                >
                  <span className="text-lg md:text-xl font-bold">{isAr ? mt.nameAr : mt.nameFr}</span>
                  {missionType === mt.id && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-black text-emerald-400 flex items-center gap-2 mb-2">
              <Bus className="w-7 h-7 text-emerald-400" />
              {isAr ? 'اختر طبيعة النقل' : 'Choisissez la nature du transport'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {TRANSPORT_NATURE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTransportNature(opt.value)}
                  className={`p-5 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
                    transportNature === opt.value
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-extrabold shadow-lg shadow-emerald-500/10'
                      : 'border-white/10 hover:border-emerald-500/30 text-slate-300'
                  }`}
                >
                  <span className="text-lg md:text-xl font-bold">{isAr ? opt.labelAr : opt.labelFr}</span>
                  {transportNature === opt.value && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-black text-emerald-400 flex items-center gap-2 mb-2">
              <Navigation className="w-7 h-7 text-emerald-400" />
              {isAr ? 'حدد نقطة الانطلاق' : 'Définissez le point de départ'}
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-lg md:text-xl text-slate-200 font-extrabold mb-3 block">{isAr ? 'الدائرة' : 'Daïra'}</Label>
                <select
                  value={departureDaira}
                  onChange={(e) => { setDepartureDaira(e.target.value); setDepartureCommune(''); }}
                  className="w-full h-14 px-5 rounded-2xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-emerald-500 text-lg font-bold"
                >
                  <option value="">{isAr ? 'اختر الدائرة...' : 'Choisir la daïra...'}</option>
                  {dairaOptions.map((d) => (
                    <option key={d.id} value={d.id}>{isAr ? d.nameAr : d.nameFr}</option>
                  ))}
                </select>
              </div>
              {departureDaira && (
                <div>
                  <Label className="text-lg md:text-xl text-slate-200 font-extrabold mb-3 block">{isAr ? 'البلدية (اختياري)' : 'Commune (facultatif)'}</Label>
                  <select
                    value={departureCommune}
                    onChange={(e) => setDepartureCommune(e.target.value)}
                    className="w-full h-14 px-5 rounded-2xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-emerald-500 text-lg font-bold"
                  >
                    <option value="">{isAr ? 'اختر البلدية...' : 'Choisir la commune...'}</option>
                    {communeOptions.map((c) => (
                      <option key={c.id} value={c.id}>{isAr ? c.nameAr : c.nameFr}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <Label className="text-lg md:text-xl text-slate-200 font-extrabold mb-3 block">{isAr ? 'نقطة التجمع' : 'Point de rassemblement'}</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {meetingPointOptions.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setMeetingPoint(p.id)}
                      className={`p-4 rounded-xl border text-right transition-all text-base md:text-lg font-bold ${
                        meetingPoint === p.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-extrabold'
                          : 'border-white/10 hover:border-emerald-500/30 text-slate-300'
                      }`}
                    >
                      {isAr ? p.nameAr : p.nameFr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-black text-emerald-400 flex items-center gap-2 mb-2">
              <MapPin className="w-7 h-7 text-emerald-400" />
              {isAr ? 'حدد الوجهة' : 'Définissez la destination'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {destinationCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => { setDestinationType(cat.id); setDestinationName(''); setCustomDestination(''); }}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      destinationType === cat.id
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-extrabold'
                        : 'border-white/10 hover:border-emerald-500/30 text-slate-300'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm md:text-base font-bold">{isAr ? cat.labelAr : cat.labelFr}</span>
                  </button>
                );
              })}
            </div>
            {destinationType && destinationType !== 'other' && (
              <div>
                <Label className="text-lg md:text-xl text-slate-200 font-extrabold mb-3 block">{isAr ? 'الوجهة المحددة' : 'Destination précise'}</Label>
                <select
                  value={destinationName}
                  onChange={(e) => setDestinationName(e.target.value)}
                  className="w-full h-14 px-5 rounded-2xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-emerald-500 text-lg font-bold"
                >
                  <option value="">{isAr ? 'اختر...' : 'Choisir...'}</option>
                  {getDestinationOptions().map((d: any) => (
                    <option key={d.id} value={d.id}>{isAr ? d.nameAr : d.nameFr}</option>
                  ))}
                </select>
              </div>
            )}
            {destinationType === 'other' && (
              <div>
                <Label className="text-lg md:text-xl text-slate-200 font-extrabold mb-3 block">{isAr ? 'اكتب الوجهة' : 'Saisissez la destination'}</Label>
                <Input
                  value={customDestination}
                  onChange={(e) => setCustomDestination(e.target.value)}
                  placeholder={isAr ? 'مثال: قصر الشباب، مركز تجاري...' : 'Ex: Palais de la culture, Centre commercial...'}
                  className="bg-slate-900 border-white/10 text-white rounded-2xl h-14 text-lg font-bold"
                />
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-black text-emerald-400 flex items-center gap-2 mb-2">
              <Calendar className="w-7 h-7 text-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
              {isAr ? 'اختر تاريخ الرحلة' : 'Choisissez la date du trajet'}
            </h3>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-slate-900 border-white/10 text-white rounded-2xl h-16 text-xl font-bold"
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-black text-emerald-400 flex items-center gap-2 mb-2">
              <Clock className="w-7 h-7 text-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
              {isAr ? 'اختر وقت الانطلاق' : 'Choisissez l\'heure de départ'}
            </h3>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-slate-900 border-white/10 text-white rounded-2xl h-16 text-xl font-bold"
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-black text-emerald-400 flex items-center gap-2 mb-2">
              <Users className="w-7 h-7 text-emerald-400" />
              {isAr ? 'عدد المسافرين' : 'Nombre de voyageurs'}
            </h3>
            <div className="flex items-center justify-center gap-8 py-8">
              <Button type="button" variant="outline" onClick={() => setSeats(Math.max(1, seats - 1))} className="h-16 w-16 rounded-full text-3xl font-black shadow-md">-</Button>
              <span className="text-6xl font-black text-white">{seats}</span>
              <Button type="button" variant="outline" onClick={() => setSeats(Math.min(60, seats + 1))} className="h-16 w-16 rounded-full text-3xl font-black shadow-md">+</Button>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-black text-emerald-400 flex items-center gap-2 mb-2">
              <ArrowRightLeft className="w-7 h-7 text-emerald-400" />
              {isAr ? 'نوع الرحلة' : 'Type de trajet'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRoundTrip(false)}
                className={`p-6 rounded-2xl border-2 text-center transition-all ${
                  !roundTrip ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-extrabold shadow-lg shadow-emerald-500/10' : 'border-white/10 text-slate-300'
                }`}
              >
                <MapPin className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
                <p className="text-xl md:text-2xl font-bold">{isAr ? 'ذهاب فقط' : 'Aller simple'}</p>
              </button>
              <button
                type="button"
                onClick={() => setRoundTrip(true)}
                className={`p-6 rounded-2xl border-2 text-center transition-all ${
                  roundTrip ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-extrabold shadow-lg shadow-emerald-500/10' : 'border-white/10 text-slate-300'
                }`}
              >
                <ArrowRightLeft className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
                <p className="text-xl md:text-2xl font-bold">{isAr ? 'ذهاب وإياب' : 'Aller-Retour'}</p>
                <p className="text-sm mt-2 opacity-70 font-semibold">{isAr ? 'وفر 10% sur le retour' : 'Économisez 10% sur le retour'}</p>
              </button>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-black text-emerald-400 flex items-center gap-2 mb-2">
              <Car className="w-7 h-7 text-emerald-400" />
              {isAr ? 'اختر المركبة' : 'Choisissez le véhicule'}
            </h3>
            {pricing && (
              <Card className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-4 mb-4">
                <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse shrink-0" />
                <p className="text-base font-bold text-white">
                  {isAr
                    ? `المركبة المقترحة لـ ${seats} ركاب: ${recommended.labelAr}`
                    : `Véhicule recommandé pour ${seats} passagers : ${recommended.labelFr}`}
                </p>
              </Card>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vehicleOptions.map((opt) => {
                const isRec = opt.value === recommended.type;
                const isSel = opt.value === vehicleType;
                return (
                  <Card
                    key={opt.value}
                    onClick={() => setVehicleType(opt.value)}
                    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all relative ${
                      isSel ? 'border-emerald-500 bg-emerald-950/20' : 'border-white/10 bg-black/40 hover:border-emerald-500/30'
                    }`}
                  >
                    {isRec && (
                      <span className="absolute top-0 right-0 bg-emerald-500 text-black text-[10px] font-black px-3 py-1.5 rounded-bl-2xl">
                        {isAr ? 'موصى به' : 'Conseillé'}
                      </span>
                    )}
                    <h4 className="font-black text-xl text-white">{isAr ? opt.titleAr : opt.titleFr}</h4>
                    <p className="text-sm md:text-base text-slate-400 mt-2 font-medium">{isAr ? 'القدرة:' : 'Capacité:'} {opt.capacity} {isAr ? 'مقاعد' : 'places'}</p>
                    <p className="text-sm md:text-base text-emerald-400 mt-1 font-bold">{isAr ? 'الراحة:' : 'Confort:'} {opt.comfort}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 10:
        const finalDest = destinationType === 'other' ? customDestination : (isAr ? getDestinationOptions().find((d: any) => d.id === destinationName)?.nameAr : getDestinationOptions().find((d: any) => d.id === destinationName)?.nameFr) || '';
        const depLabel = selectedDaira
          ? `${selectedDaira.nameAr}${departureCommune ? ' — ' + communeOptions.find((c) => c.id === departureCommune)?.nameAr : ''}`
          : '';
        const meetLabel = meetingPointOptions.find((p) => p.id === meetingPoint)?.nameAr || meetingPoint;
        const fullDep = `${depLabel} (${meetLabel})`;

        const summaryDeparture = tripDirection === 'aller' ? fullDep : finalDest;
        const summaryDestination = tripDirection === 'aller' ? finalDest : fullDep;

        return (
          <div className="space-y-5">
            <h3 className="text-2xl md:text-3xl font-black text-emerald-400 flex items-center gap-2 mb-2">
              <CheckCircle className="w-7 h-7 text-emerald-400" />
              {isAr ? 'ملخص الرحلة والتأكيد' : 'Résumé et confirmation'}
            </h3>
            <Card className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <SummaryRow label={isAr ? 'اتجاه الرحلة' : 'Sens du trajet'} value={tripDirection === 'aller' ? (isAr ? 'ذهاب (إلى الجامعة)' : 'Aller (Vers Université)') : (isAr ? 'عودة (إلى المنزل/البلدية)' : 'Retour (Vers Domicile)')} />
              <SummaryRow label={isAr ? 'نوع المهمة' : 'Type de mission'} value={isAr ? transportData.missionTypes.find((m) => m.id === missionType)?.nameAr : transportData.missionTypes.find((m) => m.id === missionType)?.nameFr} />
              <SummaryRow label={isAr ? 'نقطة الانطلاق' : 'Point de départ'} value={summaryDeparture} />
              <SummaryRow label={isAr ? 'الوجهة' : 'Destination'} value={summaryDestination} />
              <SummaryRow label={isAr ? 'التاريخ' : 'Date'} value={date} />
              <SummaryRow label={isAr ? 'الوقت' : 'Heure'} value={time} />
              <SummaryRow label={isAr ? 'المسافرين' : 'Voyageurs'} value={`${seats}`} />
              <SummaryRow label={isAr ? 'المركبة' : 'Véhicule'} value={isAr ? vehicleOptions.find((v) => v.value === vehicleType)?.titleAr : vehicleOptions.find((v) => v.value === vehicleType)?.titleFr} />
              <SummaryRow label={isAr ? 'الذهاب والإياب' : 'Aller-Retour'} value={roundTrip ? (isAr ? 'نعم' : 'Oui') : (isAr ? 'لا' : 'Non')} />
            </Card>
            {pricing && (
              <Card className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                {isSubscriptionActive ? (
                  <div className="text-center space-y-2">
                    <Sparkles className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                    <h4 className="text-xl font-black text-emerald-400">
                      {isAr ? 'الرحلة مجانية بالكامل! 🎉' : 'Trajet 100% Gratuit ! 🎉'}
                    </h4>
                    <p className="text-sm text-emerald-100 font-bold">
                      {isAr ? 'هذا المسار مشمول ومغطى باشتراكك الفعال.' : 'Ce trajet est inclus dans votre abonnement actif.'}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-slate-300">{isAr ? 'السعر التقديري' : 'Prix estimé'}</p>
                        <p className="text-3xl font-black text-emerald-400">{pricing.estimatedPrice} DA</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-300">{isAr ? 'للمسافر الواحد' : 'Par passager'}</p>
                        <p className="text-lg font-bold text-white">{Math.round(pricing.estimatedPrice / seats)} DA</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-amber-300 mt-2">{isAr ? '* السعر تقديري وقد يتغير بعد موافقة الإدارة' : '* Tarif estimé, peut être réajusté après validation'}</p>
                  </>
                )}
              </Card>
            )}
            <Button
              onClick={handleConfirm}
              className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xl rounded-2xl"
            >
              {isAr ? 'تأكيد الحجز' : 'Confirmer la réservation'}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 text-slate-100" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* UDL Logo */}
      <div className="flex items-center gap-3 mb-2">
        <div className="relative w-14 h-14 flex-shrink-0">
          <Image src="/images/udl-logo.jpeg" alt="UDL" fill className="object-contain rounded-lg" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-emerald-400/80">
            {isAr ? 'بالتعاون مع جامعة الجيلالي اليابس' : 'En partenariat avec'}
          </span>
          <span className="text-xs font-bold text-emerald-300/70">
            {isAr ? '' : 'Université Djillali Liabès'}
          </span>
        </div>
      </div>

      {/* Trip Direction Selector */}
      <div className="bg-slate-900/60 p-1.5 rounded-2xl border border-white/10 flex gap-2">
        <button
          type="button"
          onClick={() => setTripDirection('aller')}
          className={`flex-1 py-3 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 ${
            tripDirection === 'aller'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4 shrink-0" />
          <span>{isAr ? 'ذهاب (من المنزل ◀ إلى الجامعة)' : 'Aller (Domicile ◀ Université)'}</span>
        </button>
        <button
          type="button"
          onClick={() => setTripDirection('retour')}
          className={`flex-1 py-3 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 ${
            tripDirection === 'retour'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4 shrink-0 rotate-180" />
          <span>{isAr ? 'عودة (من الجامعة ◀ إلى المنزل)' : 'Retour (Université ◀ Domicile)'}</span>
        </button>
      </div>

      {renderStepIndicator()}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 md:p-8 border-2 border-emerald-500/25 bg-slate-900/95 backdrop-blur-xl rounded-[2rem] shadow-2xl">
            {renderStep()}
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between gap-4">
        {step > 1 && (
          <Button type="button" variant="outline" onClick={prevStep} className="h-14 px-8 rounded-2xl text-lg font-bold">
            <ChevronLeft className="w-6 h-6 mr-1" />
            {isAr ? 'السابق' : 'Précédent'}
          </Button>
        )}
        {step < 10 && (
          <Button
            type="button"
            onClick={nextStep}
            disabled={!canProceed()}
            className="h-14 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-black ml-auto"
          >
            {isAr ? 'التالي' : 'Suivant'}
            <ChevronRight className="w-6 h-6 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-white/5">
      <span className="text-base md:text-lg text-slate-400 font-extrabold">{label}</span>
      <span className="text-base md:text-lg text-white font-extrabold">{value || '-'}</span>
    </div>
  );
}
