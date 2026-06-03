'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, doc, updateDoc, getDocs } from 'firebase/firestore';
import { Search, Star, Phone, Mail, ToggleLeft, ToggleRight, Bus } from 'lucide-react';

interface Driver {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  licenseNumber?: string;
  assignedVehicleId?: string;
  status: 'active' | 'inactive' | 'suspended';
  currentStatus?: string;
  currentBookingId?: string;
  createdAt?: any;
}

interface DriverRating {
  driverId: string;
  sum: number;
  count: number;
}

export default function AdminDriversPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [ratings, setRatings] = useState<Record<string, DriverRating>>({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'drivers'));
    const unsub = onSnapshot(q, (snap) => {
      const items: Driver[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() } as Driver));
      setDrivers(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const loadRatings = async () => {
      try {
        const snap = await getDocs(collection(db, 'ratings'));
        const map: Record<string, DriverRating> = {};
        snap.forEach((d) => {
          const r = d.data();
          const did = r.driverId || 'unknown';
          if (!map[did]) map[did] = { driverId: did, sum: 0, count: 0 };
          map[did].sum += r.rating || 0;
          map[did].count += 1;
        });
        setRatings(map);
      } catch (e) {
        console.error('[Drivers] ratings load error:', e);
      }
    };
    loadRatings();
  }, []);

  const toggleDriverStatus = async (driverId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await updateDoc(doc(db, 'drivers', driverId), { status: newStatus });
    } catch (e) {
      console.error('[Drivers] toggle status error:', e);
    }
  };

  const getRating = (driverId: string) => {
    const r = ratings[driverId];
    if (!r || r.count === 0) return '-';
    return (Math.round((r.sum / r.count) * 10) / 10).toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      case 'suspended':
        return 'bg-rose-100 text-rose-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, Record<string, string>> = {
      ar: { active: 'نشط', inactive: 'غير نشط', suspended: 'موقوف' },
      fr: { active: 'Actif', inactive: 'Inactif', suspended: 'Suspendu' },
    };
    return labels[language]?.[status] || status;
  };

  const filteredDrivers = drivers.filter((d) =>
    d.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    d.phoneNumber?.includes(search) ||
    d.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="admin">
      <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {isAr ? 'إدارة السائقين' : 'Gestion des chauffeurs'}
            </h1>
            <p className="text-gray-600">
              {isAr ? 'إدارة فريق السائقين والمركبات' : 'Gérer l\'équipe de chauffeurs et les véhicules'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-2xl font-black text-slate-900">{drivers.length}</p>
              <p className="text-xs text-slate-500">{isAr ? 'سائق' : 'Chauffeurs'}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Bus className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Search */}
        <Card className="p-4 border border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isAr ? 'بحث باسم، هاتف، أو بريد...' : 'Rechercher par nom, téléphone ou email...'}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Drivers Table */}
        <Card className="border border-slate-200 overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-500">{isAr ? 'جاري التحميل...' : 'Chargement...'}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-bold text-slate-900">{isAr ? 'الاسم' : 'Nom'}</TableHead>
                  <TableHead className="font-bold text-slate-900">{isAr ? 'الهاتف' : 'Téléphone'}</TableHead>
                  <TableHead className="font-bold text-slate-900">{isAr ? 'البريد' : 'Email'}</TableHead>
                  <TableHead className="font-bold text-slate-900">{isAr ? 'الرخصة' : 'Permis'}</TableHead>
                  <TableHead className="font-bold text-slate-900">{isAr ? 'التقييم' : 'Note'}</TableHead>
                  <TableHead className="font-bold text-slate-900">{isAr ? 'الحالة' : 'Statut'}</TableHead>
                  <TableHead className="font-bold text-slate-900">{isAr ? 'تفعيل/تعطيل' : 'Activer/Désactiver'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                      {isAr ? 'لا يوجد سائقين' : 'Aucun chauffeur'}
                    </TableCell>
                  </TableRow>
                )}
                {filteredDrivers.map((driver) => (
                  <TableRow key={driver.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">{driver.fullName || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>{driver.phoneNumber || '-'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span>{driver.email || '-'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{driver.licenseNumber || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{getRating(driver.id)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(driver.status)}`}>
                        {getStatusLabel(driver.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => toggleDriverStatus(driver.id, driver.status)}
                        className="flex items-center gap-1 text-sm font-bold transition hover:scale-105"
                      >
                        {driver.status === 'active' ? (
                          <>
                            <ToggleRight className="w-6 h-6 text-emerald-600" />
                            <span className="text-emerald-600">{isAr ? 'نشط' : 'Actif'}</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-6 h-6 text-gray-400" />
                            <span className="text-gray-500">{isAr ? 'غير نشط' : 'Inactif'}</span>
                          </>
                        )}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
