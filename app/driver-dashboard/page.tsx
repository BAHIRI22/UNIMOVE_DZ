'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { createNotification, createAdminNotification } from '@/lib/notifications';
import {
  Bus,
  User,
  Users,
  Calendar,
  Clock,
  QrCode,
  CheckCircle,
  Play,
  Square,
  RefreshCw,
  LogOut,
  MapPin,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DriverDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { language, isRTL } = useLanguage();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [driverProfile, setDriverProfile] = useState<any>(null);
  const [assignedVehicle, setAssignedVehicle] = useState<any>(null);
  const [assignedRoutes, setAssignedRoutes] = useState<any[]>([]);
  const [todayBookings, setTodayBookings] = useState<any[]>([]);
  const [scanHistory, setScanHistory] = useState<any[]>([]);
  const [tripValidations, setTripValidations] = useState<any[]>([]);

  // QR Scanning Simulation States
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState<{ success: boolean; messageAr: string; messageFr: string } | null>(null);
  const [showScanModal, setShowScanModal] = useState(false);

  // Cancel modal states
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  // GPS tracking states (Phase 13)
  const [activeTrackingBookingId, setActiveTrackingBookingId] = useState<string | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const trackingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check role & load profile
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.replace('/login');
      return;
    }

    if (user.role !== 'driver') {
      router.replace('/dashboard');
      return;
    }

    const userPhone = user.phone || user.phoneNumber || '';
    if (!userPhone) {
      setLoading(false);
      return;
    }

    // Subscribe to driver profiles
    const q = query(collection(db, 'drivers'), where('phoneNumber', '==', userPhone));
    const unsubscribeDriver = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const dDoc = snapshot.docs[0];
        const dData: any = { id: dDoc.id, ...dDoc.data() };
        setDriverProfile(dData);

        // Fetch assigned vehicle
        if (dData.assignedVehicleId) {
          const unsubVeh = onSnapshot(doc(db, 'vehicles', dData.assignedVehicleId), (vSnap) => {
            if (vSnap.exists()) {
              setAssignedVehicle({ id: vSnap.id, ...vSnap.data() });
            }
          });
          return () => unsubVeh();
        } else {
          setAssignedVehicle(null);
        }
      } else {
        setDriverProfile(null);
        setAssignedVehicle(null);
      }
      setLoading(false);
    });

    return () => unsubscribeDriver();
  }, [user, authLoading, router]);

  // Subscribe to driver's routes
  useEffect(() => {
    if (!driverProfile?.id) return;

    const q = query(collection(db, 'routes'), where('driverId', '==', driverProfile.id));
    const unsubscribeRoutes = onSnapshot(q, (snapshot) => {
      const items: any[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setAssignedRoutes(items);
    });

    return () => unsubscribeRoutes();
  }, [driverProfile?.id]);

  // Subscribe to today's bookings for the assigned routes
  useEffect(() => {
    if (assignedRoutes.length === 0) {
      setTodayBookings([]);
      return;
    }

    const unsubscribes = assignedRoutes.map((route) => {
      // Find bookings where departure & destination match the route
      const q = query(
        collection(db, 'bookings'),
        where('fromPoint', '==', route.departurePoint),
        where('toDestination', '==', route.destination)
      );

      return onSnapshot(q, (snapshot) => {
        const bItems: any[] = [];
        snapshot.forEach((doc) => {
          const bData = doc.data();
          // Filter for active bookings of today (or approved bookings)
          bItems.push({ id: doc.id, routeName: route.routeName, ...bData });
        });

        setTodayBookings((prev) => {
          // Merge and prevent duplicates by id
          const existingIds = new Set(bItems.map((b) => b.id));
          const otherBookings = prev.filter((p) => !existingIds.has(p.id));
          return [...otherBookings, ...bItems];
        });
      });
    });

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [assignedRoutes]);

  // Subscribe to bookings directly assigned to this driver (Phase 11)
  useEffect(() => {
    if (!driverProfile?.id) return;

    const q = query(
      collection(db, 'bookings'),
      where('assignedDriverId', '==', driverProfile.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bItems: any[] = [];
      snapshot.forEach((doc) => {
        bItems.push({ id: doc.id, ...doc.data() });
      });

      setTodayBookings((prev) => {
        const existingIds = new Set(bItems.map((b) => b.id));
        const otherBookings = prev.filter((p) => !existingIds.has(p.id));
        return [...otherBookings, ...bItems];
      });
    });

    return () => unsubscribe();
  }, [driverProfile?.id]);

  // Start route
  const handleStartRoute = async (routeId: string) => {
    try {
      await updateDoc(doc(db, 'routes', routeId), {
        status: 'active',
      });

      // Notify students who booked this route
      const route = assignedRoutes.find((r) => r.id === routeId);
      todayBookings
        .filter((b) => b.routeName === route?.routeName)
        .forEach(async (booking) => {
          await createNotification({
            userId: booking.userId,
            titleAr: 'انطلقت الحافلة! 🚌',
            titleFr: 'Le bus est parti ! 🚌',
            messageAr: `انطلقت الرحلة الخاصة بك من ${route?.departurePoint} إلى ${route?.destination} الآن. يرجى التواجد في النقطة المحددة.`,
            messageFr: `Le trajet de ${route?.departurePoint} vers ${route?.destination} a débuté. Veuillez vous positionner au point d'arrêt.`,
            type: 'system',
          });
        });

      alert(language === 'ar' ? 'تم بدء الرحلة بنجاح وبث الإشعارات للركاب!' : 'Le trajet a démarré avec succès. Les passagers ont été notifiés !');
    } catch (e) {
      console.error('[Driver Dashboard] Start route error:', e);
    }
  };

  // End route
  const handleEndRoute = async (routeId: string) => {
    try {
      await updateDoc(doc(db, 'routes', routeId), {
        status: 'completed',
      });
      alert(language === 'ar' ? 'تم إنهاء الرحلة بنجاح. شكراً لجهودك!' : 'Le trajet est terminé avec succès. Merci pour vos efforts !');
    } catch (e) {
      console.error('[Driver Dashboard] End route error:', e);
    }
  };

  // Scan QR Simulation
  const handleSimulateScan = async () => {
    if (!scanInput.trim()) return;

    // Search for a user with this card number / card code
    // In our app, users have user.cardNumber, qrCode
    const cardInput = scanInput.trim();
    
    // Scan logic: check if there's an approved user with this cardNumber
    const userQuery = query(collection(db, 'users'), where('cardNumber', '==', cardInput));
    
    onSnapshot(userQuery, async (snapshot) => {
      if (!snapshot.empty) {
        const uDoc = snapshot.docs[0];
        const uData = uDoc.data() as any;

        const isVerified = uData.verified === true || uData.verificationStatus === 'approved';
        const isSubscribed = uData.subscriptionStatus === 'active';

        if (isVerified && isSubscribed) {
          const endDate = uData.subscriptionEndDate ? new Date(uData.subscriptionEndDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          const successMsgAr = `البطاقة صالحة! المشترك: ${uData.fullName}. الاشتراك نشط لغاية ${endDate.toLocaleDateString('ar-DZ')}.`;
          const successMsgFr = `Carte valide ! Passager : ${uData.fullName}. Abonnement actif jusqu'au ${endDate.toLocaleDateString('fr-FR')}.`;

          setScanResult({
            success: true,
            messageAr: successMsgAr,
            messageFr: successMsgFr,
          });

          // Add to validation history
          const valDoc = {
            id: Math.random().toString(36).substring(7),
            passengerName: uData.fullName,
            cardNumber: cardInput,
            validatedAt: new Date().toLocaleTimeString(language === 'ar' ? 'ar-DZ' : 'fr-FR', { hour: '2-digit', minute: '2-digit' }),
            status: 'valid',
          };
          setScanHistory((prev) => [valDoc, ...prev]);

          // Create notification for passenger
          await createNotification({
            userId: uDoc.id,
            titleAr: 'تم تسجيل الركوب 🎫',
            titleFr: 'Embarquement enregistré 🎫',
            messageAr: `تم مسح بطاقتك بنجاح من قبل السائق وصعودك إلى الحافلة. رحلة ممتعة!`,
            messageFr: `Votre carte a été scannée avec succès par le chauffeur. Bon voyage !`,
            type: 'system',
          });

        } else {
          setScanResult({
            success: false,
            messageAr: `البطاقة غير صالحة أو منتهية الصلاحية! المشترك: ${uData.fullName}.`,
            messageFr: `Carte invalide ou expirée ! Passager : ${uData.fullName}.`,
          });
        }
      } else {
        setScanResult({
          success: false,
          messageAr: 'لم يتم العثور على بطاقة مطابقة في قواعد البيانات.',
          messageFr: 'Aucune carte correspondante trouvée dans la base de données.',
        });
      }
    });

    setScanInput('');
  };

  // GPS Tracking helpers (Phase 13)
  const saveLocation = async (bookingId: string, position: GeolocationPosition) => {
    if (!driverProfile?.id || !assignedVehicle?.id) return;
    try {
      await addDoc(collection(db, 'tripLocations'), {
        bookingId,
        driverId: driverProfile.id,
        vehicleId: assignedVehicle.id,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed ? Math.round(position.coords.speed * 3.6) : 0,
        heading: position.coords.heading || 0,
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.error('[Driver Dashboard] saveLocation error:', e);
    }
  };

  const startGpsTracking = (bookingId: string) => {
    const isAr = language === 'ar';
    if (!navigator.geolocation) {
      setGpsError(isAr ? 'المتصفح لا يدعم GPS.' : 'Le navigateur ne supporte pas le GPS.');
      return;
    }

    // Request permission and get initial position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsError(null);
        setActiveTrackingBookingId(bookingId);
        saveLocation(bookingId, position);

        // Start interval tracking every 10 seconds
        const interval = setInterval(() => {
          navigator.geolocation.getCurrentPosition(
            (pos) => saveLocation(bookingId, pos),
            (err) => console.error('[Driver Dashboard] GPS interval error:', err),
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 5000 }
          );
        }, 10000);

        trackingIntervalRef.current = interval;
      },
      async (err) => {
        console.error('[Driver Dashboard] GPS permission denied:', err);
        const errMsg = isAr
          ? 'تعذر تفعيل GPS، يرجى السماح بالموقع.'
          : 'Impossible d\'activer le GPS. Veuillez autoriser la localisation.';
        setGpsError(errMsg);
        // Notify admin (Phase 22)
        await createAdminNotification({
          titleAr: 'GPS غير مفعل ⚠️',
          titleFr: 'GPS désactivé ⚠️',
          messageAr: `تعذر تفعيل GPS للسائق ${driverProfile?.fullName || ''}. ${errMsg}`,
          messageFr: `Impossible d\'activer le GPS pour le chauffeur ${driverProfile?.fullName || ''}. ${errMsg}`,
          type: 'system',
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const stopGpsTracking = () => {
    if (trackingIntervalRef.current) {
      clearInterval(trackingIntervalRef.current);
      trackingIntervalRef.current = null;
    }
    setActiveTrackingBookingId(null);
    setGpsError(null);
  };

  // Booking actions (Phase 12 + 13)
  const handleStartBooking = async (bookingId: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: 'started',
        startedAt: serverTimestamp(),
        trackingEnabled: true,
      });

      const booking = todayBookings.find((b) => b.id === bookingId);
      if (booking?.userId) {
        await createNotification({
          userId: booking.userId,
          titleAr: 'بدأت رحلتك! 🚌',
          titleFr: 'Votre trajet a commencé ! 🚌',
          messageAr: `بدأت رحلتك من ${booking.fromPoint} إلى ${booking.toDestination}. السائق في الطريق إليك. يمكنك تتبع الرحلة الآن.`,
          messageFr: `Votre trajet de ${booking.fromPoint} vers ${booking.toDestination} a commencé. Le chauffeur est en route. Vous pouvez suivre le trajet maintenant.`,
          type: 'system',
        });
      }

      // Start GPS tracking
      startGpsTracking(bookingId);

      // Notify admin (Phase 22)
      await createAdminNotification({
        titleAr: 'السائق بدأ الرحلة 🚌',
        titleFr: 'Le chauffeur a démarré le trajet 🚌',
        messageAr: `بدأ السائق ${driverProfile?.fullName || ''} الرحلة رقم ${bookingId}.`,
        messageFr: `Le chauffeur ${driverProfile?.fullName || ''} a démarré le trajet ${bookingId}.`,
        type: 'system',
      });

      alert(language === 'ar' ? 'تم بدء الرحلة وتفعيل GPS!' : 'Le trajet a démarré et le GPS est actif !');
    } catch (e) {
      console.error('[Driver Dashboard] Start booking error:', e);
    }
  };

  const handleCompleteBooking = async (bookingId: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: 'completed',
        completedAt: serverTimestamp(),
        trackingEnabled: false,
      });

      const booking = todayBookings.find((b) => b.id === bookingId);

      // Free driver and vehicle (Phase 16/20)
      if (driverProfile?.id) {
        await updateDoc(doc(db, 'drivers', driverProfile.id), {
          currentStatus: 'available',
          availabilityStatus: 'available',
          currentBookingId: null,
        });
      }
      if (assignedVehicle?.id) {
        await updateDoc(doc(db, 'vehicles', assignedVehicle.id), {
          currentStatus: 'available',
          availabilityStatus: 'available',
          currentBookingId: null,
        });
      }

      if (booking?.userId) {
        await createNotification({
          userId: booking.userId,
          titleAr: 'وصلت الرحلة إلى الوجهة ✅',
          titleFr: 'Votre trajet est arrivé à destination ✅',
          messageAr: `وصلت رحلتك من ${booking.fromPoint} إلى ${booking.toDestination}. شكراً لاختيارك UNIMOVE!`,
          messageFr: `Votre trajet de ${booking.fromPoint} vers ${booking.toDestination} est arrivé. Merci d'avoir choisi UNIMOVE !`,
          type: 'system',
        });
      }

      // Notify admin (Phase 22)
      await createAdminNotification({
        titleAr: 'السائق أنهى الرحلة ✅',
        titleFr: 'Le chauffeur a terminé le trajet ✅',
        messageAr: `أنهى السائق ${driverProfile?.fullName || ''} الرحلة رقم ${bookingId}.`,
        messageFr: `Le chauffeur ${driverProfile?.fullName || ''} a terminé le trajet ${bookingId}.`,
        type: 'system',
      });

      // Stop GPS tracking if active for this booking
      if (activeTrackingBookingId === bookingId) {
        stopGpsTracking();
      }

      alert(language === 'ar' ? 'تم إنهاء الرحلة بنجاح!' : 'Le trajet est terminé avec succès !');
    } catch (e) {
      console.error('[Driver Dashboard] Complete booking error:', e);
    }
  };

  const openCancelModal = (bookingId: string) => {
    setCancelBookingId(bookingId);
    setCancelReason('');
    setShowCancelModal(true);
  };

  const handleConfirmCancel = async () => {
    if (!cancelBookingId || !cancelReason.trim()) {
      alert(language === 'ar' ? 'يرجى كتابة سبب الإلغاء.' : 'Veuillez indiquer un motif d\'annulation.');
      return;
    }
    try {
      await updateDoc(doc(db, 'bookings', cancelBookingId), {
        status: 'cancelled',
        cancelledAt: serverTimestamp(),
        cancelReason,
        trackingEnabled: false,
      });

      const booking = todayBookings.find((b) => b.id === cancelBookingId);

      // Free driver and vehicle (Phase 16/20)
      if (driverProfile?.id) {
        await updateDoc(doc(db, 'drivers', driverProfile.id), {
          currentStatus: 'available',
          availabilityStatus: 'available',
          currentBookingId: null,
        });
      }
      if (assignedVehicle?.id) {
        await updateDoc(doc(db, 'vehicles', assignedVehicle.id), {
          currentStatus: 'available',
          availabilityStatus: 'available',
          currentBookingId: null,
        });
      }

      if (booking?.userId) {
        await createNotification({
          userId: booking.userId,
          titleAr: 'تم إلغاء الرحلة ❌',
          titleFr: 'Trajet annulé ❌',
          messageAr: `تم إلغاء رحلتك من ${booking.fromPoint} إلى ${booking.toDestination}. السبب: ${cancelReason}`,
          messageFr: `Votre trajet de ${booking.fromPoint} vers ${booking.toDestination} a été annulé. Motif : ${cancelReason}`,
          type: 'system',
        });
      }

      // Notify admin (Phase 22)
      await createAdminNotification({
        titleAr: 'تم إلغاء رحلة ❌',
        titleFr: 'Trajet annulé ❌',
        messageAr: `ألغى السائق ${driverProfile?.fullName || ''} الرحلة رقم ${cancelBookingId}. السبب: ${cancelReason}`,
        messageFr: `Le chauffeur ${driverProfile?.fullName || ''} a annulé le trajet ${cancelBookingId}. Motif : ${cancelReason}`,
        type: 'system',
      });

      // Stop GPS tracking if active for this booking
      if (activeTrackingBookingId === cancelBookingId) {
        stopGpsTracking();
      }

      setShowCancelModal(false);
      setCancelBookingId(null);
      setCancelReason('');
      alert(language === 'ar' ? 'تم إلغاء الرحلة.' : 'Le trajet a été annulé.');
    } catch (e) {
      console.error('[Driver Dashboard] Cancel booking error:', e);
    }
  };

  // Passenger validation (Phase 12)
  const handleValidatePassenger = async (bookingId: string, qrToken: string) => {
    if (!qrToken.trim() || !driverProfile?.id) return;
    try {
      const booking = todayBookings.find((b) => b.id === bookingId);
      if (!booking) return;

      await addDoc(collection(db, 'tripValidations'), {
        bookingId,
        userId: booking.userId || null,
        driverId: driverProfile.id,
        qrToken: qrToken.trim(),
        result: 'valid',
        createdAt: serverTimestamp(),
      });

      setTripValidations((prev) => [
        {
          id: Math.random().toString(36).substring(7),
          bookingId,
          passengerName: booking.fullName,
          qrToken: qrToken.trim(),
          validatedAt: new Date().toLocaleTimeString(language === 'ar' ? 'ar-DZ' : 'fr-FR', { hour: '2-digit', minute: '2-digit' }),
          status: 'valid',
        },
        ...prev,
      ]);

      alert(language === 'ar' ? 'تم تأكيد صعود الراكب بنجاح.' : 'Passager validé avec succès.');
    } catch (e) {
      console.error('[Driver Dashboard] Validate passenger error:', e);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('unimove_current_phone');
      localStorage.removeItem('unimove_dev_phone');
      localStorage.removeItem('unimove_user_role');
      sessionStorage.clear();
    }
    router.replace('/login');
  };

  if (authLoading || loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#02100d', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <div style={{ width: 50, height: 50, border: '4px solid #10b981', borderTop: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          <p className="mt-4 text-emerald-400 font-bold">{language === 'ar' ? 'جاري تحميل لوحة السائق...' : 'Chargement du tableau de bord...'}</p>
        </div>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  const isAr = language === 'ar';

  return (
    <div style={{ minHeight: '100vh', background: '#02100d', color: 'white', padding: '24px md:padding-40px' }} className="p-6 md:p-10" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white flex items-center gap-3">
            <Bus className="w-10 h-10 text-emerald-400" />
            {isAr ? 'لوحة تحكم السائق' : 'Espace Chauffeur'}
          </h1>
          <p className="text-sm md:text-lg text-emerald-400/80 font-bold mt-1">
            {isAr ? `مرحباً بك، الكابتن ${driverProfile?.fullName || user?.fullName}` : `Bienvenue, Capitaine ${driverProfile?.fullName || user?.fullName}`}
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button
            onClick={() => setShowScanModal(true)}
            className="flex-1 md:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl flex items-center gap-2"
          >
            <QrCode className="w-5 h-5" />
            {isAr ? 'مسح تذكرة QR' : 'Scanner Ticket'}
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500/50 hover:bg-red-500/15 text-red-400 font-bold h-12 rounded-xl"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Profile & Vehicle */}
        <div className="space-y-6 lg:col-span-1">
          {/* Profile Card */}
          <Card className="p-6 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl">
            <h3 className="text-xl font-extrabold text-emerald-400 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              {isAr ? 'الملف الشخصي' : 'Profil'}
            </h3>
            <div className="space-y-3 font-semibold text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="opacity-70">{isAr ? 'الاسم الكامل' : 'Nom Complet'}</span>
                <span>{driverProfile?.fullName || user?.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="opacity-70">{isAr ? 'رقم الهاتف' : 'N° Téléphone'}</span>
                <span>{driverProfile?.phoneNumber || user?.phone}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="opacity-70">{isAr ? 'رقم الرخصة' : 'N° Licence'}</span>
                <span>{driverProfile?.licenseNumber || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">{isAr ? 'الحالة' : 'Statut'}</span>
                <span className="text-emerald-400">{driverProfile?.status === 'active' ? (isAr ? 'نشط' : 'Actif') : (isAr ? 'معلق' : 'Suspendu')}</span>
              </div>
            </div>
          </Card>

          {/* Vehicle Card */}
          <Card className="p-6 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl">
            <h3 className="text-xl font-extrabold text-emerald-400 mb-4 flex items-center gap-2">
              <Bus className="w-5 h-5" />
              {isAr ? 'معلومات المركبة' : 'Véhicule Assigné'}
            </h3>
            {assignedVehicle ? (
              <div className="space-y-3 font-semibold text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="opacity-70">{isAr ? 'رقم الحافلة' : 'Numéro Bus'}</span>
                  <span className="text-emerald-400 font-extrabold text-base">H-{assignedVehicle.vehicleNumber}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="opacity-70">{isAr ? 'رقم التسجيل' : 'Immatriculation'}</span>
                  <span className="font-mono">{assignedVehicle.registrationNumber}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="opacity-70">{isAr ? 'النوع' : 'Type'}</span>
                  <span className="capitalize">{assignedVehicle.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">{isAr ? 'السعة الكلية' : 'Capacité Max'}</span>
                  <span>{assignedVehicle.capacity} {isAr ? 'مقعد' : 'places'}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2 animate-bounce" />
                <p className="text-sm font-bold text-amber-300">
                  {isAr ? 'لم يتم تعيين حافلة لك بعد.' : 'Aucun véhicule ne vous a été assigné.'}
                </p>
              </div>
            )}
          </Card>

          {/* Passenger scanning simulation list */}
          <Card className="p-6 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl">
            <h3 className="text-xl font-extrabold text-emerald-400 mb-4 flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              {isAr ? 'سجل صعود الركاب' : 'Historique Validation QR'}
            </h3>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {scanHistory.length === 0 ? (
                <p className="text-xs text-center opacity-50 py-4">
                  {isAr ? 'لا توجد عمليات مسح سابقة.' : 'Aucune validation enregistrée.'}
                </p>
              ) : (
                scanHistory.map((scan) => (
                  <div key={scan.id} className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center gap-2">
                    <div>
                      <p className="text-xs font-bold text-white">{scan.passengerName}</p>
                      <p className="text-[10px] font-mono opacity-60">رقم: {scan.cardNumber}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-emerald-400 block">{scan.validatedAt}</span>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">مقبول</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Right Columns: Assigned Trips & Passengers */}
        <div className="space-y-6 lg:col-span-2">
          {/* GPS Error Banner */}
          {gpsError && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-300 text-sm font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              {gpsError}
            </div>
          )}

          {/* Today's Assigned Trips */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <MapPin className="w-6 h-6 text-emerald-400" />
              {isAr ? 'رحلات اليوم المعينة' : 'Trajets Assignés du Jour'}
            </h2>

            {todayBookings.length === 0 ? (
              <Card className="p-10 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl text-center">
                <Bus className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <p className="text-base font-bold text-slate-400">
                  {isAr ? 'لا توجد رحلات معينة لك حالياً من الإدارة.' : 'Aucun trajet ne vous est assigné aujourd\'hui.'}
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {todayBookings.map((b) => {
                  const isAssigned = b.status === 'assigned' || b.status === 'approved';
                  const isStarted = b.status === 'started';
                  const isCompleted = b.status === 'completed';
                  const isCancelled = b.status === 'cancelled';

                  const statusBg = isStarted ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' : isAssigned ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' : isCompleted ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' : isCancelled ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-slate-500/20 text-slate-300 border-slate-500/40';
                  const statusLabel = isStarted ? (isAr ? 'بدأت' : 'En cours') : isAssigned ? (isAr ? 'معينة' : 'Assigné') : isCompleted ? (isAr ? 'مكتملة' : 'Terminé') : isCancelled ? (isAr ? 'ملغاة' : 'Annulé') : (isAr ? 'انتظار' : 'En attente');

                  return (
                    <Card key={b.id} className={`p-6 border-2 rounded-2xl transition-all duration-300 ${
                      isStarted ? 'border-sky-500 bg-sky-950/10 shadow-lg shadow-sky-500/5' : 'border-emerald-500/10 bg-black/40'
                    }`}>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-[11px] font-black border ${statusBg}`}>
                              {statusLabel}
                            </span>
                            {activeTrackingBookingId === b.id && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                GPS
                              </span>
                            )}
                            <span className="text-xs opacity-60 font-mono">{b.date} {b.time}</span>
                          </div>
                          <h3 className="text-lg font-black text-white">{b.fromPoint} → {b.toDestination}</h3>
                          <div className="flex flex-wrap gap-3 text-xs font-semibold opacity-80">
                            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-emerald-500" /> {b.fullName}</span>
                            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-emerald-500" /> {b.passengersCount || 1} {isAr ? 'ركاب' : 'passagers'}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-500" /> {b.phoneNumber}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs opacity-60">{isAr ? 'السعر النهائي' : 'Tarif final'}</p>
                          <p className="font-extrabold text-emerald-400 text-sm">{b.finalPrice || b.price || 0} DZD</p>
                        </div>
                      </div>

                      {/* Driver actions */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {isAssigned && (
                          <Button
                            onClick={() => handleStartBooking(b.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 rounded-xl flex items-center gap-2 px-4"
                          >
                            <Play className="w-4 h-4 fill-current" />
                            {isAr ? 'بدء الرحلة' : 'Démarrer le trajet'}
                          </Button>
                        )}
                        {isStarted && (
                          <>
                            <Button
                              onClick={() => handleCompleteBooking(b.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 rounded-xl flex items-center gap-2 px-4"
                            >
                              <Square className="w-4 h-4 fill-current" />
                              {isAr ? 'إنهاء الرحلة' : 'Terminer le trajet'}
                            </Button>
                            <Button
                              onClick={() => openCancelModal(b.id)}
                              variant="outline"
                              className="border-red-500/50 hover:bg-red-500/15 text-red-400 font-bold h-10 rounded-xl px-4"
                            >
                              {isAr ? 'إلغاء بسبب عذر' : 'Annuler (motif)'}
                            </Button>
                          </>
                        )}
                      </div>

                      {/* Passenger validation for started trips */}
                      {isStarted && (
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                          <p className="text-xs font-bold text-emerald-400 mb-2">{isAr ? 'تأكيد صعود الراكب' : 'Valider un passager'}</p>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder={isAr ? 'رمز التذكرة / QR' : 'Code ticket / QR'}
                              id={`val-${b.id}`}
                              className="flex-1 h-9 px-3 rounded-lg bg-black/40 border border-emerald-500/30 text-white text-xs font-mono"
                            />
                            <Button
                              onClick={() => {
                                const el = document.getElementById(`val-${b.id}`) as HTMLInputElement;
                                if (el) handleValidatePassenger(b.id, el.value);
                              }}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-9 rounded-lg text-xs px-3"
                            >
                              <CheckCircle className="w-3.5 h-3.5 mr-1" />
                              {isAr ? 'تحقق' : 'Valider'}
                            </Button>
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Trip Validations History */}
          {tripValidations.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                {isAr ? 'سجل التحقق من الركاب' : 'Historique validations'}
              </h2>
              <Card className="p-6 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl">
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {tripValidations.map((tv) => (
                    <div key={tv.id} className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center gap-2">
                      <div>
                        <p className="text-xs font-bold text-white">{tv.passengerName || '-'}</p>
                        <p className="text-[10px] font-mono opacity-60">Token: {tv.qrToken}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-emerald-400 block">{tv.validatedAt}</span>
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">{isAr ? 'مقبول' : 'Validé'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* QR Simulation Scan Dialog Modal */}
      {showScanModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="bg-slate-900 border-2 border-emerald-500 rounded-[2rem] p-8 max-w-md w-full space-y-6 relative shadow-2xl">
            <h3 className="text-2xl font-black text-white text-center flex items-center justify-center gap-2">
              <QrCode className="w-6 h-6 text-emerald-400" />
              {isAr ? 'محاكاة ماسح QR التذاكر' : 'Simulateur Scanner QR'}
            </h3>

            <p className="text-sm font-semibold text-slate-300 text-center leading-6">
              {isAr
                ? 'أدخل رقم بطاقة الطالب الرقمية أو رقم QR Code لمحاكاة عملية المسح والتحقق.'
                : 'Saisissez le numéro de carte de l\'étudiant pour simuler la validation du QR.'}
            </p>

            <div className="space-y-2">
              <input
                value={scanInput}
                onChange={(e) => {
                  setScanInput(e.target.value);
                  setScanResult(null);
                }}
                type="text"
                placeholder={isAr ? "مثال: UD-7281-22" : "Ex: UD-7281-22"}
                className="w-full h-12 px-4 rounded-xl bg-black/40 border border-emerald-500/40 text-white font-mono text-center tracking-widest text-lg"
              />
            </div>

            {scanResult && (
              <div className={`p-4 rounded-xl border text-center font-bold text-sm ${
                scanResult.success ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/40 text-red-300'
              }`}>
                {isAr ? scanResult.messageAr : scanResult.messageFr}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleSimulateScan}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl"
              >
                {isAr ? 'تحقق ومسح' : 'Vérifier'}
              </Button>
              <Button
                onClick={() => {
                  setScanResult(null);
                  setScanInput('');
                  setShowScanModal(false);
                }}
                variant="outline"
                className="flex-1 border-white/10 hover:bg-white/5 text-white font-bold h-12 rounded-xl"
              >
                {isAr ? 'إغلاق' : 'Fermer'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Reason Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-50" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="bg-slate-900 border-2 border-red-500 rounded-[2rem] p-8 max-w-md w-full space-y-6 relative shadow-2xl">
            <h3 className="text-2xl font-black text-white text-center flex items-center justify-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              {isAr ? 'إلغاء الرحلة' : 'Annuler le trajet'}
            </h3>
            <p className="text-sm font-semibold text-slate-300 text-center leading-6">
              {isAr
                ? 'يرجى كتابة سبب إلغاء الرحلة. سيتم إشعار الراكب فوراً.'
                : 'Veuillez indiquer le motif d\'annulation du trajet. Le passager sera notifié immédiatement.'}
            </p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              rows={3}
              placeholder={isAr ? 'مثال: عطل ميكانيكي مفاجئ...' : 'Ex: Panne mécanique imprévue...'}
              className="w-full p-4 rounded-xl bg-black/40 border border-red-500/40 text-white text-sm resize-none"
            />
            <div className="flex gap-3">
              <Button
                onClick={handleConfirmCancel}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-xl"
              >
                {isAr ? 'تأكيد الإلغاء' : 'Confirmer l\'annulation'}
              </Button>
              <Button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelBookingId(null);
                  setCancelReason('');
                }}
                variant="outline"
                className="flex-1 border-white/10 hover:bg-white/5 text-white font-bold h-12 rounded-xl"
              >
                {isAr ? 'إلغاء' : 'Annuler'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
