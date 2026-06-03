'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Car, Users, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';

interface CarpoolOffer {
  id: string;
  driverName: string;
  from: string;
  to: string;
  date: string;
  time: string;
  seats: number;
  price: number;
  vehicleType: string;
}

export default function CarpoolPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [offers] = useState<CarpoolOffer[]>([
    {
      id: '1',
      driverName: 'Karim B.',
      from: 'Sidi Bel Abbès',
      to: 'Université Djillali Liabès',
      date: '2025-09-15',
      time: '08:00',
      seats: 3,
      price: 150,
      vehicleType: 'Citadine',
    },
    {
      id: '2',
      driverName: 'Sami R.',
      from: 'Sidi Bel Abbès Centre',
      to: 'Université Djillali Liabès',
      date: '2025-09-15',
      time: '07:30',
      seats: 2,
      price: 120,
      vehicleType: 'SUV',
    },
  ]);

  const filtered = offers.filter((o) =>
    (!from || o.from.toLowerCase().includes(from.toLowerCase())) &&
    (!to || o.to.toLowerCase().includes(to.toLowerCase())) &&
    (!date || o.date === date)
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">
            <Car className="w-4 h-4" />
            {isAr ? 'قريباً' : 'Bientôt disponible'}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">
            {isAr ? 'مشاركة الرحلات' : 'Covoiturage'}
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            {isAr
              ? 'وفر المال والوقت بتشارك رحلاتك مع طلاب آخرين. اطلب رحلة أو انضم إلى رحلة موجودة.'
              : 'Économisez de l\'argent et du temps en partageant vos trajets avec d\'autres étudiants. Demandez un trajet ou rejoignez-en un existant.'}
          </p>
        </div>

        {/* Search */}
        <Card className="p-6 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder={isAr ? 'نقطة الانطلاق' : 'Point de départ'}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder={isAr ? 'الوجهة' : 'Destination'}
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </Card>

        {/* Offers */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {isAr ? 'الرحلات المتاحة' : 'Trajets disponibles'}
          </h2>
          {filtered.length === 0 && (
            <Card className="p-8 text-center border border-slate-200">
              <p className="text-slate-500">{isAr ? 'لا توجد رحلات مطابقة' : 'Aucun trajet correspondant'}</p>
            </Card>
          )}
          {filtered.map((offer) => (
            <Card key={offer.id} className="p-6 border border-slate-200 hover:shadow-lg transition">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    {offer.from}
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    {offer.to}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {offer.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {offer.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {offer.seats} {isAr ? 'مقاعد' : 'places'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Car className="w-4 h-4" />
                      {offer.vehicleType}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{isAr ? 'السائق:' : 'Chauffeur:'} {offer.driverName}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-black text-emerald-600">{offer.price} DA</p>
                    <p className="text-xs text-slate-500">{isAr ? 'للشخص' : 'par personne'}</p>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl">
                    {isAr ? 'انضمام' : 'Rejoindre'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Create Offer CTA */}
        <Card className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 text-center space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            {isAr ? 'هل لديك سيارة؟' : 'Vous avez une voiture ?'}
          </h3>
          <p className="text-slate-600 max-w-md mx-auto">
            {isAr
              ? 'قدم رحلة مشاركة وساعد الطلاب الآخرين في الوصول إلى الجامعة. اكسب المال وقلل الازدحام.'
              : 'Proposez un trajet de covoiturage et aidez d\'autres étudiants à se rendre à l\'université. Gagnez de l\'argent et réduisez la congestion.'}
          </p>
          <Button variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold rounded-xl">
            {isAr ? 'إنشاء رحلة' : 'Créer un trajet'}
          </Button>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
