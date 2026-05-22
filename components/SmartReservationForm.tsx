'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Wifi,
  CheckCircle,
  AlertCircle,
  Navigation,
  ShieldCheck,
  Timer,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import dairasData from '@/data/dairas.json';
import universityData from '@/data/university-destinations.json';
import routesData from '@/data/sidi-bel-abbes-routes.json';
import { ReservationFormData, VehicleType, PaymentMethod } from '@/types/reservation';

interface SmartReservationFormProps {
  onReservationSubmit: (data: ReservationFormData & { totalPrice: number; selectedRoute: any; selectedVehicle: any }) => void;
}

export function SmartReservationForm({ onReservationSubmit }: SmartReservationFormProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<ReservationFormData>({
    departurePoint: '',
    destination: '',
    university: '',
    faculty: '',
    residence: '',
    date: '',
    time: '',
    vehicleType: 'bus',
    seats: 1,
    paymentMethod: 'subscription',
  });
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [selectedDaïra, setSelectedDaïra] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [selectedDeparturePoint, setSelectedDeparturePoint] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [destinationType, setDestinationType] = useState<'faculty' | 'institute' | 'residence' | 'university'>('faculty');

  const bookingSteps = [
    language === 'ar' ? 'المسار' : 'Trajet',
    language === 'ar' ? 'الوقت' : 'Horaire',
    language === 'ar' ? 'المركبة' : 'Véhicule',
    language === 'ar' ? 'الدفع' : 'Paiement',
  ];

  const vehicleTypes: { value: VehicleType; label: string; labelAr: string; icon: any }[] = [
    { value: 'bus', label: 'Bus', labelAr: 'حافلة', icon: Bus },
    { value: 'minibus', label: 'Minibus', labelAr: 'ميني باص', icon: Bus },
    { value: 'car', label: 'Voiture', labelAr: 'سيارة', icon: Car },
  ];

  const paymentMethods: { value: PaymentMethod; label: string; labelAr: string; icon: any; disabled?: boolean }[] = [
    { value: 'subscription', label: 'Abonnement', labelAr: 'اشتراك', icon: CreditCard },
    { value: 'cash', label: 'Espèces (au départ)', labelAr: 'نقد (عند الركوب)', icon: Wallet },
    { value: 'baridimob', label: 'BaridiMob', labelAr: 'باريديموب', icon: Smartphone, disabled: true },
    { value: 'edahabia', label: 'Edahabia', labelAr: 'الإدحابية', icon: Smartphone, disabled: true },
  ];

  const calculatePrice = () => {
    if (!selectedRoute) return 0;
    const basePrice = selectedRoute.transport.price;
    const vehicleMultiplier = formData.vehicleType === 'bus' ? 1 : formData.vehicleType === 'minibus' ? 1.2 : 1.5;
    return Math.round(basePrice * vehicleMultiplier * formData.seats);
  };

  const handleRouteChange = (routeId: string) => {
    const route = routesData.routes.find((r: any) => r.id === routeId);
    setSelectedRoute(route);
    setFormData(prev => ({
      ...prev,
      departurePoint: route?.from.point || '',
      destination: route?.to.name || '',
      university: route?.to.id || '',
    }));
    updatePrice();
  };

  const handleVehicleTypeChange = (type: VehicleType) => {
    setFormData(prev => ({ ...prev, vehicleType: type }));
    setSelectedVehicle({
      type,
      features: {
        wifi: true,
        wifiPassword: 'UNIMOVE_DZ',
        usbCharging: type === 'bus',
        airConditioning: true,
      },
    });
    updatePrice();
  };

  const updatePrice = () => {
    setEstimatedPrice(calculatePrice());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoute || !selectedVehicle) {
      alert(language === 'ar' ? 'يرجى اختيار المسار والمركبة' : 'Veuillez choisir la route et le véhicule');
      return;
    }
    onReservationSubmit({
      ...formData,
      totalPrice: estimatedPrice,
      selectedRoute,
      selectedVehicle,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="overflow-hidden rounded-3xl border border-emerald-100 bg-white/85 p-5 shadow-xl backdrop-blur-xl">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900">
              {language === 'ar' ? 'تجربة حجز ذكية' : 'Expérience réservation intelligente'}
            </h3>
            <p className="text-sm text-slate-500">
              {language === 'ar' ? 'اختر، أكد، وانطلق مثل تطبيق نقل حقيقي' : 'Choisissez, confirmez et partez comme une vraie app mobilité'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {bookingSteps.map((step, index) => (
            <div key={step} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-3">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700">
                {index + 1}
              </div>
              <p className="text-sm font-black text-slate-800">{step}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Daïra Selection */}
      <Card className="p-6 border border-gray-200 rounded-3xl bg-white/85 backdrop-blur-xl shadow-xl">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          {language === 'ar' ? 'اختر الدائرة' : 'Choisir la daïra'}
        </h3>
        <select
          value={selectedDaïra}
          onChange={(e) => {
            setSelectedDaïra(e.target.value);
            setSelectedCommune('');
            setSelectedDeparturePoint('');
          }}
          className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">{language === 'ar' ? 'اختر الدائرة...' : 'Choisir la daïra...'}</option>
          {dairasData.dairas.map((daïra: any) => (
            <option key={daïra.id} value={daïra.id}>
              {language === 'ar' ? daïra.name : daïra.nameFr}
            </option>
          ))}
        </select>
      </Card>

      {/* Commune Selection */}
      {selectedDaïra && (
        <Card className="p-6 border border-gray-200 rounded-3xl bg-white/85 backdrop-blur-xl shadow-xl">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {language === 'ar' ? 'اختر البلدية' : 'Choisir la commune'}
          </h3>
          <select
            value={selectedCommune}
            onChange={(e) => {
              setSelectedCommune(e.target.value);
              setSelectedDeparturePoint('');
            }}
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">{language === 'ar' ? 'اختر البلدية...' : 'Choisir la commune...'}</option>
            {dairasData.dairas.find((d: any) => d.id === selectedDaïra)?.communes.map((commune: any) => (
              <option key={commune.id} value={commune.id}>
                {language === 'ar' ? commune.nameAr : commune.name}
              </option>
            ))}
          </select>
        </Card>
      )}

      {/* Departure Point Selection */}
      {selectedCommune && (
        <Card className="p-6 border border-gray-200 rounded-3xl bg-white/85 backdrop-blur-xl shadow-xl">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {language === 'ar' ? 'اختر نقطة الانطلاق' : 'Choisir le point de départ'}
          </h3>
          <select
            value={selectedDeparturePoint}
            onChange={(e) => setSelectedDeparturePoint(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">{language === 'ar' ? 'اختر نقطة الانطلاق...' : 'Choisir le point de départ...'}</option>
            {dairasData.dairas.find((d: any) => d.id === selectedDaïra)?.communes.find((c: any) => c.id === selectedCommune)?.departurePoints.map((point: string, index: number) => (
              <option key={index} value={point}>
                {point}
              </option>
            ))}
          </select>
        </Card>
      )}

      {/* Destination Type Selection */}
      {selectedDeparturePoint && (
        <Card className="p-6 border border-gray-200 rounded-3xl bg-white/85 backdrop-blur-xl shadow-xl">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {language === 'ar' ? 'نوع الوجهة' : 'Type de destination'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: 'faculty', label: language === 'ar' ? 'كلية' : 'Faculté', labelAr: 'كلية' },
              { value: 'institute', label: language === 'ar' ? 'معهد' : 'Institut', labelAr: 'معهد' },
              { value: 'residence', label: language === 'ar' ? 'سكن' : 'Résidence', labelAr: 'سكن' },
              { value: 'university', label: language === 'ar' ? 'جامعة' : 'Université', labelAr: 'جامعة' },
            ].map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setDestinationType(type.value as any)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  destinationType === type.value
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-200'
                }`}
              >
                <span className="font-medium text-gray-900">{language === 'ar' ? type.labelAr : type.label}</span>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Destination Selection */}
      {destinationType && (
        <Card className="p-6 border border-gray-200 rounded-3xl bg-white/85 backdrop-blur-xl shadow-xl">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {language === 'ar' ? 'اختر الوجهة' : 'Choisir la destination'}
          </h3>
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">{language === 'ar' ? 'اختر الوجهة...' : 'Choisir la destination...'}</option>
            {destinationType === 'faculty' && universityData.university.faculties.map((faculty: any) => (
              <option key={faculty.id} value={faculty.id}>
                {language === 'ar' ? faculty.nameAr : faculty.name}
              </option>
            ))}
            {destinationType === 'institute' && universityData.university.institutes.map((institute: any) => (
              <option key={institute.id} value={institute.id}>
                {language === 'ar' ? institute.nameAr : institute.name}
              </option>
            ))}
            {destinationType === 'residence' && universityData.university.residences.map((residence: any) => (
              <option key={residence.id} value={residence.id}>
                {language === 'ar' ? residence.nameAr : residence.name}
              </option>
            ))}
            {destinationType === 'university' && (
              <option value={universityData.university.id}>
                {language === 'ar' ? universityData.university.nameAr : universityData.university.name}
              </option>
            )}
          </select>
        </Card>
      )}

      {/* Available Routes */}
      {selectedDeparturePoint && selectedDestination && (
        <Card className="p-6 border border-gray-200 rounded-3xl bg-white/85 backdrop-blur-xl shadow-xl">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {language === 'ar' ? 'المسارات المتاحة' : 'Routes disponibles'}
          </h3>
          <div className="space-y-3">
            {routesData.routes
              .filter((route: any) => 
                route.from.point === selectedDeparturePoint && 
                route.to.id === selectedDestination
              )
              .map((route: any, index: number) => (
              <motion.div
                key={route.id}
                whileHover={{ y: -4, scale: 1.01 }}
                onClick={() => handleRouteChange(route.id)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all shadow-sm ${
                  selectedRoute?.id === route.id
                    ? 'border-emerald-500 bg-emerald-50 shadow-emerald-500/20'
                    : 'border-gray-200 hover:border-emerald-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h4 className="font-black text-gray-900">{route.from.point} → {route.to.name}</h4>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                        {language === 'ar' ? 'متاح الآن' : 'Disponible'}
                      </span>
                      {index === 0 && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">
                          {language === 'ar' ? 'الأسرع' : 'Plus rapide'}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600 md:grid-cols-4">
                      <span className="rounded-xl bg-white px-3 py-2 font-bold">{route.transport.distance} km</span>
                      <span className="rounded-xl bg-white px-3 py-2 font-bold">{route.transport.duration} min</span>
                      <span className="rounded-xl bg-white px-3 py-2 font-bold">{route.transport.seatsAvailable}/{route.transport.totalSeats} {language === 'ar' ? 'مقاعد' : 'places'}</span>
                      <span className="rounded-xl bg-white px-3 py-2 font-black text-emerald-700">{route.transport.price} DA</span>
                    </div>
                  </div>
                  {selectedRoute?.id === route.id && (
                    <CheckCircle className="w-7 h-7 text-emerald-600" />
                  )}
                </div>
              </motion.div>
            ))}
            {routesData.routes.filter((route: any) => 
              route.from.point === selectedDeparturePoint && 
              route.to.id === selectedDestination
            ).length === 0 && (
              <p className="text-center text-gray-500 py-4">
                {language === 'ar' ? 'لا توجد مسارات متاحة لهذه الوجهة' : 'Aucune route disponible pour cette destination'}
              </p>
            )}
          </div>
        </Card>
      )}

      {/* Date and Time */}
      <Card className="p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          {language === 'ar' ? 'التاريخ والوقت' : 'Date et heure'}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>{language === 'ar' ? 'التاريخ' : 'Date'}</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-2"
              required
            />
          </div>
          <div>
            <Label>{language === 'ar' ? 'الوقت' : 'Heure'}</Label>
            <Input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="mt-2"
              required
            />
          </div>
        </div>
      </Card>

      {/* Vehicle Type */}
      <Card className="p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Bus className="w-5 h-5" />
          {language === 'ar' ? 'نوع المركبة' : 'Type de véhicule'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {vehicleTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.value}
                whileHover={{ y: -4 }}
                onClick={() => handleVehicleTypeChange(type.value)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all text-center ${
                  formData.vehicleType === type.value
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/10'
                    : 'border-gray-200 hover:border-emerald-200'
                }`}
              >
                <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="font-medium text-gray-900">{language === 'ar' ? type.labelAr : type.label}</p>
                <div className="mt-3 flex justify-center gap-2 text-xs">
                  <span className="rounded-full bg-slate-100 px-2 py-1 font-bold">{language === 'ar' ? 'نشط' : 'Actif'}</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 font-bold text-emerald-700">{language === 'ar' ? 'مقاعد' : 'Places'} {18 - index * 4}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Seats */}
      <Card className="p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          {language === 'ar' ? 'عدد المقاعد' : 'Nombre de sièges'}
        </h3>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setFormData({ ...formData, seats: Math.max(1, formData.seats - 1) })}
            disabled={formData.seats <= 1}
          >
            -
          </Button>
          <span className="text-2xl font-bold text-gray-900 w-12 text-center">{formData.seats}</span>
          <Button
            type="button"
            variant="outline"
            onClick={() => setFormData({ ...formData, seats: Math.min(10, formData.seats + 1) })}
            disabled={formData.seats >= 10}
          >
            +
          </Button>
        </div>
      </Card>

      {/* Payment Method */}
      <Card className="p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          {language === 'ar' ? 'طريقة الدفع' : 'Méthode de paiement'}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.value}
                onClick={() => !method.disabled && setFormData({ ...formData, paymentMethod: method.value })}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.paymentMethod === method.value
                    ? 'border-primary bg-primary/5'
                    : method.disabled
                    ? 'border-gray-200 opacity-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="font-medium text-gray-900">{language === 'ar' ? method.labelAr : method.label}</span>
                  {method.disabled && (
                    <span className="text-xs text-gray-500 ml-auto">
                      ({language === 'ar' ? 'قريباً' : 'Bientôt'})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* WiFi Info */}
      {selectedVehicle?.features.wifi && (
        <Card className="p-5 border border-blue-200 bg-blue-50 rounded-3xl shadow-lg">
          <div className="flex items-center gap-3">
            <Wifi className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">
                {language === 'ar' ? 'Wi-Fi متاح' : 'Wi-Fi disponible'}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'كلمة المرور:' : 'Mot de passe:'} {selectedVehicle.features.wifiPassword}
              </p>
            </div>
          </div>
        </Card>
      )}

      {selectedRoute && (
        <Card className="overflow-hidden rounded-3xl border border-emerald-100 bg-slate-950 p-6 text-white shadow-2xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-emerald-300">{language === 'ar' ? 'معاينة المسار المباشر' : 'Aperçu route live'}</p>
              <h3 className="text-2xl font-black">{language === 'ar' ? 'رحلتك جاهزة' : 'Votre trajet est prêt'}</h3>
            </div>
            <Navigation className="h-8 w-8 text-emerald-300" />
          </div>
          <div className="relative h-32 rounded-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.35),transparent_25%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.32),transparent_30%)]">
            <div className="absolute left-8 right-8 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/20">
              <motion.div initial={{ width: '10%' }} animate={{ width: '68%' }} transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }} className="h-full rounded-full bg-emerald-300" />
            </div>
            <motion.div animate={{ x: [0, 180, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-8 top-1/2 -translate-y-1/2 rounded-2xl bg-emerald-300 p-3 text-slate-950 shadow-xl">
              <Bus className="h-5 w-5" />
            </motion.div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-2xl bg-white/10 p-3">
              <Timer className="mb-2 h-4 w-4 text-emerald-300" />
              <p className="font-black">{selectedRoute.estimatedTime} min</p>
              <p className="text-xs text-slate-300">{language === 'ar' ? 'مدة الرحلة' : 'Durée'}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <Users className="mb-2 h-4 w-4 text-emerald-300" />
              <p className="font-black">14</p>
              <p className="text-xs text-slate-300">{language === 'ar' ? 'أماكن متبقية' : 'Places restantes'}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <ShieldCheck className="mb-2 h-4 w-4 text-emerald-300" />
              <p className="font-black">{language === 'ar' ? 'جاهز' : 'Prêt'}</p>
              <p className="text-xs text-slate-300">{language === 'ar' ? 'حالة المركبة' : 'Statut véhicule'}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Price Summary */}
      <Card className="p-6 border border-gray-200 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-3xl shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{language === 'ar' ? 'السعر المقدر' : 'Prix estimé'}</p>
            <p className="text-3xl font-bold text-primary">{estimatedPrice} DA</p>
          </div>
          <Button
            type="submit"
            className="bg-primary hover:bg-secondary text-white px-8 py-4 text-lg font-semibold"
          >
            {language === 'ar' ? 'تأكيد الحجز' : 'Confirmer la réservation'}
          </Button>
        </div>
      </Card>
    </form>
  );
}
