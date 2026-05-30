'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Edit, Trash2, Calendar, MapPin, Users, CheckCircle, XCircle, Clock, Bus, Car, ArrowRightLeft } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, updateDoc, doc, deleteDoc, orderBy } from 'firebase/firestore';

interface Booking {
  id: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  fromPoint: string;
  toDestination: string;
  date: string;
  time: string;
  vehicleType: string;
  passengersCount: number;
  price: number;
  status: string;
  paymentStatus: string;
  reservationNumber: string;
  createdAt: any;
  tripCategory?: string;
  missionType?: string;
  departureDaira?: string;
  departureCommune?: string;
  meetingPoint?: string;
  destinationType?: string;
  destinationName?: string;
  driverId?: string;
  bookingStatus?: string;
  roundTrip?: boolean;
  estimatedDistanceKm?: number;
  estimatedTravelTime?: number;
}

export default function AdminBookingsPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: Booking[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() } as Booking);
      });
      setBookings(items);
      setLoading(false);
    }, (err) => {
      console.error('[Admin Bookings] Error:', err);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleApprove = async (bookingId: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status: 'approved', bookingStatus: 'approved' });
    } catch (e) { console.error(e); }
  };

  const handleReject = async (bookingId: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status: 'rejected', bookingStatus: 'rejected' });
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (bookingId: string) => {
    if (confirm(isAr ? 'هل أنت متأكد من حذف هذا الحجز؟' : 'Confirmer la suppression ?')) {
      try { await deleteDoc(doc(db, 'bookings', bookingId)); } catch (e) { console.error(e); }
    }
  };

  const filtered = bookings.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.fullName?.toLowerCase().includes(q) ||
      b.phoneNumber?.toLowerCase().includes(q) ||
      b.fromPoint?.toLowerCase().includes(q) ||
      b.toDestination?.toLowerCase().includes(q) ||
      b.reservationNumber?.toLowerCase().includes(q)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'started': return 'bg-sky-100 text-sky-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, { ar: string; fr: string }> = {
      approved: { ar: 'مقبول', fr: 'Approuvé' },
      pending: { ar: 'قيد الانتظار', fr: 'En attente' },
      completed: { ar: 'مكتمل', fr: 'Terminé' },
      rejected: { ar: 'مرفوض', fr: 'Refusé' },
      started: { ar: 'جاري', fr: 'En cours' },
    };
    return labels[status]?.[language] || status;
  };

  const getVehicleIcon = (type: string) => {
    return type === 'car' ? <Car className="w-4 h-4 text-gray-500" /> : <Bus className="w-4 h-4 text-gray-500" />;
  };

  return (
    <DashboardLayout role="admin">
      <div className="max-w-[95rem] mx-auto space-y-8 p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {isAr ? 'إدارة الحجوزات' : 'Gestion des réservations'}
            </h1>
            <p className="text-gray-600">
              {isAr ? 'إدارة ومراقبة جميع الحجوزات والرحلات' : 'Gérer et surveiller toutes les réservations et trajets'}
            </p>
          </div>
        </div>

        {/* Search */}
        <Card className="p-4 border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'بحث بالاسم، الهاتف، الوجهة أو رقم الحجز...' : 'Rechercher par nom, téléphone, destination ou n° réservation...'}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Bookings Table */}
        <Card className="border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">{isAr ? 'جاري التحميل...' : 'Chargement...'}</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-bold text-gray-900">{isAr ? 'المستخدم' : 'Utilisateur'}</TableHead>
                    <TableHead className="font-bold text-gray-900">{isAr ? 'الهاتف' : 'Téléphone'}</TableHead>
                    <TableHead className="font-bold text-gray-900">{isAr ? 'نوع المهمة' : 'Mission'}</TableHead>
                    <TableHead className="font-bold text-gray-900">{isAr ? 'الانطلاق' : 'Départ'}</TableHead>
                    <TableHead className="font-bold text-gray-900">{isAr ? 'الوجهة' : 'Destination'}</TableHead>
                    <TableHead className="font-bold text-gray-900">{isAr ? 'التاريخ/الوقت' : 'Date/Heure'}</TableHead>
                    <TableHead className="font-bold text-gray-900">{isAr ? 'المركبة' : 'Véhicule'}</TableHead>
                    <TableHead className="font-bold text-gray-900">{isAr ? 'المسافرين' : 'Passagers'}</TableHead>
                    <TableHead className="font-bold text-gray-900">{isAr ? 'السعر' : 'Prix'}</TableHead>
                    <TableHead className="font-bold text-gray-900">{isAr ? 'الحالة' : 'Statut'}</TableHead>
                    <TableHead className="font-bold text-gray-900">{isAr ? 'إجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={11} className="text-center py-12 text-gray-500">
                        {isAr ? 'لا توجد حجوزات' : 'Aucune réservation'}
                      </TableCell>
                    </TableRow>
                  )}
                  {filtered.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium whitespace-nowrap">{booking.fullName || booking.userId}</TableCell>
                      <TableCell className="text-sm text-gray-600 whitespace-nowrap">{booking.phoneNumber}</TableCell>
                      <TableCell className="text-sm whitespace-nowrap">
                        <span className="px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold">
                          {booking.missionType || booking.tripCategory || '-'}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm max-w-[180px] truncate">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{booking.fromPoint}</span>
                        </div>
                        {booking.departureDaira && (
                          <p className="text-[10px] text-gray-400 mt-0.5">{booking.departureDaira}{booking.departureCommune ? ` — ${booking.departureCommune}` : ''}</p>
                        )}
                      </TableCell>
                      <TableCell className="text-sm max-w-[180px] truncate">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span>{booking.toDestination}</span>
                        </div>
                        {booking.destinationType && (
                          <p className="text-[10px] text-gray-400 mt-0.5">{booking.destinationType}</p>
                        )}
                      </TableCell>
                      <TableCell className="text-sm whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span>{booking.time}</span>
                        </div>
                        {booking.roundTrip && (
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                            <ArrowRightLeft className="w-3 h-3" /> {isAr ? 'ذهاب وإياب' : 'A/R'}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {getVehicleIcon(booking.vehicleType)}
                          <span>{booking.vehicleType}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span>{booking.passengersCount}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-emerald-600 whitespace-nowrap">{booking.price} DA</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusLabel(booking.status)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {booking.status === 'pending' && (
                            <>
                              <Button variant="ghost" size="sm" onClick={() => handleApprove(booking.id)} className="p-2 text-emerald-600 hover:bg-emerald-50">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleReject(booking.id)} className="p-2 text-red-600 hover:bg-red-50">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm" className="p-2 text-gray-600 hover:bg-gray-50">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(booking.id)} className="p-2 text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
