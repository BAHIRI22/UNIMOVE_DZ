'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, doc, updateDoc, serverTimestamp, where, addDoc, orderBy } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { createNotification } from '@/lib/notifications';
import { useLanguage } from '@/contexts/LanguageContext';

interface User {
  id: string;
  fullName: string;
  phone: string;
  role: string;
  university?: string;
  faculty?: string;
  status: string;
  verified: boolean;
  verificationStatus?: string;
  accountStatus?: string;
  verificationDocumentUrl?: string;
  verificationDocumentType?: string;
  verificationDocumentName?: string;
  adminNote?: string;
  createdAt?: any;
}

interface Booking {
  id: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  fromPoint: string;
  toDestination: string;
  daira?: string;
  commune?: string;
  date: string;
  time: string;
  vehicleType: string;
  passengersCount: number;
  price: number;
  status: 'pending' | 'approved' | 'assigned' | 'started' | 'completed' | 'cancelled' | 'rejected';
  paymentStatus: string;
  assignedVehicleId?: string;
  assignedDriverId?: string;
  finalPrice?: number;
  approvedAt?: any;
  assignedDriverName?: string;
  assignedDriverPhone?: string;
  assignedVehicleNumber?: string;
  createdAt?: any;
}

export default function AdminPanelPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUserId, setAdminUserId] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [adminNotifications, setAdminNotifications] = useState<any[]>([]);
  const [adminSubscriptions, setAdminSubscriptions] = useState<any[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    assigned: 0,
    started: 0,
    rejected: 0,
    completed: 0,
    cancelled: 0,
  });

  // Fleet management & Routes states
  const [activeTab, setActiveTab] = useState<'overview' | 'drivers' | 'vehicles' | 'routes' | 'tracking' | 'payments'>('overview');
  const [drivers, setDrivers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [tripLocations, setTripLocations] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  // Expandable form toggles
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showRouteForm, setShowRouteForm] = useState(false);

  // Driver Form fields
  const [driverId, setDriverId] = useState<string | null>(null);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [driverEmail, setDriverEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const [driverStatus, setDriverStatus] = useState('active');
  const [driverAssignedVehicle, setDriverAssignedVehicle] = useState('');

  // Vehicle Form fields
  const [vehicleId, setVehicleId] = useState<string | null>(null);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleReg, setVehicleReg] = useState('');
  const [vehicleType, setVehicleType] = useState('bus');
  const [vehicleCapacity, setVehicleCapacity] = useState('45');
  const [vehicleStatus, setVehicleStatus] = useState('active');
  const [vehicleAssignedDriver, setVehicleAssignedDriver] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');

  // Route Form fields
  const [routeId, setRouteId] = useState<string | null>(null);
  const [routeName, setRouteName] = useState('');
  const [routeDeparture, setRouteDeparture] = useState('');
  const [routeDestination, setRouteDestination] = useState('');
  const [routeDepTime, setRouteDepTime] = useState('');
  const [routeArrTime, setRouteArrTime] = useState('');
  const [routeVehicle, setRouteVehicle] = useState('');
  const [routeDriver, setRouteDriver] = useState('');
  const [routeSeats, setRouteSeats] = useState('45');
  const [routePrice, setRoutePrice] = useState('100');
  const [routeStatus, setRouteStatus] = useState('active');

  // Booking assignment inline edit states
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [editBookingVehicle, setEditBookingVehicle] = useState('');
  const [editBookingDriver, setEditBookingDriver] = useState('');
  const [editBookingFinalPrice, setEditBookingFinalPrice] = useState('');

  // Real-time listener for drivers
  useEffect(() => {
    if (!isAdmin) return;
    try {
      const q = query(collection(db, 'drivers'));
      const unsub = onSnapshot(q, (snap) => {
        const items: any[] = [];
        snap.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setDrivers(items);
      }, (err) => console.error('[Admin Panel] drivers error:', err));
      return () => unsub();
    } catch (e) {
      console.error('[Admin Panel] drivers subscribe error:', e);
    }
  }, [isAdmin]);

  // Real-time listener for vehicles
  useEffect(() => {
    if (!isAdmin) return;
    try {
      const q = query(collection(db, 'vehicles'));
      const unsub = onSnapshot(q, (snap) => {
        const items: any[] = [];
        snap.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setVehicles(items);
      }, (err) => console.error('[Admin Panel] vehicles error:', err));
      return () => unsub();
    } catch (e) {
      console.error('[Admin Panel] vehicles subscribe error:', e);
    }
  }, [isAdmin]);

  // Real-time listener for routes
  useEffect(() => {
    if (!isAdmin) return;
    try {
      const q = query(collection(db, 'routes'));
      const unsub = onSnapshot(q, (snap) => {
        const items: any[] = [];
        snap.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setRoutes(items);
      }, (err) => console.error('[Admin Panel] routes error:', err));
      return () => unsub();
    } catch (e) {
      console.error('[Admin Panel] routes subscribe error:', e);
    }
  }, [isAdmin]);

  useEffect(() => {
    // Security check - verify from Firestore user data
    const storedPhone = typeof window !== 'undefined' ? localStorage.getItem('unimove_current_phone') : null;
    
    if (!storedPhone) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    // Load users from Firestore and check admin status
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allUsers: User[] = [];
      let total = 0;
      let pending = 0;
      let approved = 0;
      let rejected = 0;
      let currentAdminId: string | null = null;
      let isAdminUser = false;

      snapshot.forEach((doc) => {
        const data = doc.data();
        total++;
        if (data.status === 'pending') pending++;
        else if (data.status === 'approved') approved++;
        else if (data.status === 'rejected') rejected++;

        // Check if this is the current admin user
        const userPhone = data.phone || data.phoneNumber || '';
        if (userPhone === storedPhone) {
          if (data.role === 'admin' && data.verified === true && data.status === 'approved') {
            isAdminUser = true;
            currentAdminId = doc.id;
          }
        }

        allUsers.push({
          id: doc.id,
          fullName: data.fullName || 'مستخدم جديد',
          phone: data.phone || data.phoneNumber || '',
          role: data.role || 'student',
          university: data.university || '',
          faculty: data.faculty || '',
          status: data.status || 'pending',
          verified: data.verified || false,
          verificationStatus: data.verificationStatus || 'pending',
          accountStatus: data.accountStatus || 'pending',
          verificationDocumentUrl: data.verificationDocumentUrl || '',
          verificationDocumentType: data.verificationDocumentType || '',
          verificationDocumentName: data.verificationDocumentName || '',
          adminNote: data.adminNote || '',
          createdAt: data.createdAt,
        });
      });

      setIsAdmin(isAdminUser);
      setAdminUserId(currentAdminId);
      setUsers(allUsers);
      setStats({ total, pending, approved, rejected });
      setLoading(false);
    }, (error) => {
      console.error('[Admin Panel] Error loading users:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to bookings
  useEffect(() => {
    if (!isAdmin) return;
    try {
      const q = query(collection(db, 'bookings'));
      const unsub = onSnapshot(
        q,
        (snap) => {
          const items: Booking[] = [];
          let total = 0, pending = 0, approved = 0, assigned = 0, started = 0, rejected = 0, completed = 0, cancelled = 0;
          snap.forEach((d) => {
            const data = d.data() as any;
            total++;
            if (data.status === 'pending') pending++;
            else if (data.status === 'approved') approved++;
            else if (data.status === 'assigned') assigned++;
            else if (data.status === 'started') started++;
            else if (data.status === 'rejected') rejected++;
            else if (data.status === 'completed') completed++;
            else if (data.status === 'cancelled') cancelled++;
            items.push({ id: d.id, ...data } as Booking);
          });
          items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
          setBookings(items);
          setBookingStats({ total, pending, approved, assigned, started, rejected, completed, cancelled });
        },
        (err) => console.error('[Admin Panel] bookings error:', err)
      );
      return () => unsub();
    } catch (e) {
      console.error('[Admin Panel] bookings subscribe error:', e);
    }
  }, [isAdmin]);

  // Subscribe to tripLocations (Phase 13)
  useEffect(() => {
    if (!isAdmin) return;
    try {
      const q = query(collection(db, 'tripLocations'), orderBy('updatedAt', 'desc'));
      const unsub = onSnapshot(
        q,
        (snap) => {
          const items: any[] = [];
          snap.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          setTripLocations(items);
        },
        (err) => console.error('[Admin Panel] tripLocations error:', err)
      );
      return () => unsub();
    } catch (e) {
      console.error('[Admin Panel] tripLocations subscribe error:', e);
    }
  }, [isAdmin]);

  // Subscribe to payments (Phase 14)
  useEffect(() => {
    if (!isAdmin) return;
    try {
      const q = query(collection(db, 'payments'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(
        q,
        (snap) => {
          const items: any[] = [];
          snap.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          setPayments(items);
        },
        (err) => console.error('[Admin Panel] payments error:', err)
      );
      return () => unsub();
    } catch (e) {
      console.error('[Admin Panel] payments subscribe error:', e);
    }
  }, [isAdmin]);

  // Subscribe to admin notifications
  useEffect(() => {
    if (!isAdmin) return;
    try {
      const q = query(collection(db, 'notifications'), where('userId', '==', 'admin'));
      const unsub = onSnapshot(
        q,
        (snap) => {
          const items: any[] = [];
          snap.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          // Sort by creation date desc
          items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
          setAdminNotifications(items);
        },
        (err) => console.error('[Admin Panel] notifications error:', err)
      );
      return () => unsub();
    } catch (e) {
      console.error('[Admin Panel] notifications subscribe error:', e);
    }
  }, [isAdmin]);

  // Subscribe to subscriptions collection
  useEffect(() => {
    if (!isAdmin) return;
    try {
      const q = query(collection(db, 'subscriptions'));
      const unsub = onSnapshot(
        q,
        (snap) => {
          const items: any[] = [];
          snap.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          // Sort by creation date desc (or startDate/createdAt)
          items.sort((a, b) => {
            const bTime = b.createdAt?.seconds || new Date(b.startDate || 0).getTime() / 1000;
            const aTime = a.createdAt?.seconds || new Date(a.startDate || 0).getTime() / 1000;
            return bTime - aTime;
          });
          setAdminSubscriptions(items);
        },
        (err) => console.error('[Admin Panel] subscriptions error:', err)
      );
      return () => unsub();
    } catch (e) {
      console.error('[Admin Panel] subscriptions subscribe error:', e);
    }
  }, [isAdmin]);

  const handleBookingAction = async (bookingId: string, newStatus: 'approved' | 'assigned' | 'started' | 'completed' | 'cancelled' | 'rejected') => {
    try {
      const ref = doc(db, 'bookings', bookingId);
      const updates: any = { status: newStatus };
      if (newStatus === 'approved') updates.approvedAt = serverTimestamp();
      if (newStatus === 'assigned') updates.assignedAt = serverTimestamp();
      if (newStatus === 'started') updates.startedAt = serverTimestamp();
      if (newStatus === 'completed') updates.completedAt = serverTimestamp();
      if (newStatus === 'cancelled') updates.cancelledAt = serverTimestamp();
      if (newStatus === 'rejected') updates.rejectedAt = serverTimestamp();
      await updateDoc(ref, updates);
      // [Admin Panel] booking action processed
    } catch (e) {
      console.error('[Admin Panel] Booking action error:', e);
    }
  };

  const validateBookingAssignment = (vehicleId: string, driverId: string, passengersCount: number) => {
    const isAr = language === 'ar';
    const selectedVehicle = vehicles.find(v => v.id === vehicleId);
    const selectedDriver = drivers.find(d => d.id === driverId);

    if (!selectedVehicle) {
      alert(isAr ? 'يرجى اختيار مركبة.' : 'Veuillez sélectionner un véhicule.');
      return false;
    }
    if (!selectedDriver) {
      alert(isAr ? 'يرجى اختيار سائق.' : 'Veuillez sélectionner un chauffeur.');
      return false;
    }
    if (selectedDriver.status !== 'active') {
      alert(isAr ? 'السائق غير نشط. يرجى اختيار سائق نشط.' : 'Le chauffeur est inactif. Veuillez choisir un chauffeur actif.');
      return false;
    }
    if (selectedVehicle.status === 'maintenance') {
      alert(isAr ? 'المركبة في الصيانة. يرجى اختيار مركبة أخرى.' : 'Le véhicule est en maintenance. Veuillez en choisir un autre.');
      return false;
    }
    if (selectedVehicle.status !== 'active') {
      alert(isAr ? 'المركبة غير نشطة. يرجى اختيار مركبة نشطة.' : 'Le véhicule est inactif. Veuillez en choisir un actif.');
      return false;
    }
    if ((selectedVehicle.capacity || 0) < (passengersCount || 1)) {
      alert(isAr ? `سعة المركبة (${selectedVehicle.capacity}) أقل من عدد الركاب (${passengersCount}).` : `La capacité du véhicule (${selectedVehicle.capacity}) est inférieure au nombre de passagers (${passengersCount}).`);
      return false;
    }
    return { selectedVehicle, selectedDriver };
  };

  const handleApproveBooking = async (bookingId: string) => {
    const isAr = language === 'ar';
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const validation = validateBookingAssignment(editBookingVehicle, editBookingDriver, booking.passengersCount || 1);
    if (!validation) return;
    const { selectedVehicle, selectedDriver } = validation;

    const finalPriceVal = parseFloat(editBookingFinalPrice) || (booking.price || 0);

    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: 'assigned',
        assignedVehicleId: selectedVehicle.id,
        assignedDriverId: selectedDriver.id,
        finalPrice: finalPriceVal,
        approvedAt: serverTimestamp(),
        assignedDriverName: selectedDriver.fullName,
        assignedDriverPhone: selectedDriver.phoneNumber,
        assignedVehicleNumber: selectedVehicle.vehicleNumber,
        paymentStatus: 'unpaid',
      });

      // Create pending payment record (Phase 14)
      await addDoc(collection(db, 'payments'), {
        paymentId: `PAY-${Date.now()}`,
        userId: booking.userId || '',
        fullName: booking.fullName || '',
        phoneNumber: booking.phoneNumber || '',
        relatedType: 'booking',
        relatedId: bookingId,
        amount: finalPriceVal,
        currency: 'DZD',
        paymentMethod: 'mock',
        paymentStatus: 'pending',
        createdAt: serverTimestamp(),
      });

      // Notify user
      if (booking.userId) {
        await createNotification({
          userId: booking.userId,
          titleAr: 'تم قبول رحلتك 🎉',
          titleFr: 'Votre trajet a été approuvé 🎉',
          messageAr: `تم قبول رحلتك من ${booking.fromPoint} إلى ${booking.toDestination}. السائق: ${selectedDriver.fullName}, المركبة: ${selectedVehicle.vehicleNumber}, السعر النهائي: ${finalPriceVal} DZD.`,
          messageFr: `Votre trajet de ${booking.fromPoint} vers ${booking.toDestination} a été approuvé. Chauffeur : ${selectedDriver.fullName}, Véhicule : ${selectedVehicle.vehicleNumber}, Tarif final : ${finalPriceVal} DZD.`,
          type: 'system',
        });
      }

      // Notify driver
      const matchedUser = users.find(u => u.phone === selectedDriver.phoneNumber || u.phone.includes(selectedDriver.phoneNumber || ''));
      if (matchedUser) {
        await createNotification({
          userId: matchedUser.id,
          titleAr: 'تم تعيينك لرحلة جديدة 🚌',
          titleFr: 'Nouvelle course assignée 🚌',
          messageAr: `تم تعيينك لرحلة جديدة: ${booking.fromPoint} إلى ${booking.toDestination} بتاريخ ${booking.date} (${booking.passengersCount || 1} ركاب).`,
          messageFr: `Vous avez été assigné à une nouvelle course : ${booking.fromPoint} vers ${booking.toDestination} le ${booking.date} (${booking.passengersCount || 1} passagers).`,
          type: 'system',
        });
      }

      setEditingBookingId(null);
      setEditBookingVehicle('');
      setEditBookingDriver('');
      setEditBookingFinalPrice('');
    } catch (e) {
      console.error('Error approving booking:', e);
      alert(isAr ? 'حدث خطأ أثناء قبول الرحلة.' : 'Erreur lors de l\'approbation du trajet.');
    }
  };

  const handleUpdateBookingAssignment = async (bookingId: string) => {
    const isAr = language === 'ar';
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const validation = validateBookingAssignment(editBookingVehicle, editBookingDriver, booking.passengersCount || 1);
    if (!validation) return;
    const { selectedVehicle, selectedDriver } = validation;

    const finalPriceVal = parseFloat(editBookingFinalPrice) || (booking.finalPrice || booking.price || 0);

    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        assignedVehicleId: selectedVehicle.id,
        assignedDriverId: selectedDriver.id,
        finalPrice: finalPriceVal,
        assignedDriverName: selectedDriver.fullName,
        assignedDriverPhone: selectedDriver.phoneNumber,
        assignedVehicleNumber: selectedVehicle.vehicleNumber,
      });

      // Notify user about updated assignment
      if (booking.userId) {
        await createNotification({
          userId: booking.userId,
          titleAr: 'تم تحديث تعيين الرحلة 🔄',
          titleFr: 'Mise à jour de l\'assignation 🔄',
          messageAr: `تم تحديث تعيين رحلتك. السائق: ${selectedDriver.fullName}, المركبة: ${selectedVehicle.vehicleNumber}, السعر النهائي: ${finalPriceVal} DZD.`,
          messageFr: `L\'assignation de votre trajet a été mise à jour. Chauffeur : ${selectedDriver.fullName}, Véhicule : ${selectedVehicle.vehicleNumber}, Tarif final : ${finalPriceVal} DZD.`,
          type: 'system',
        });
      }

      // Notify driver if changed
      const matchedUser = users.find(u => u.phone === selectedDriver.phoneNumber || u.phone.includes(selectedDriver.phoneNumber || ''));
      if (matchedUser && matchedUser.id !== booking.assignedDriverId) {
        await createNotification({
          userId: matchedUser.id,
          titleAr: 'تم تعيينك لرحلة جديدة 🚌',
          titleFr: 'Nouvelle course assignée 🚌',
          messageAr: `تم تعيينك لرحلة جديدة: ${booking.fromPoint} إلى ${booking.toDestination} بتاريخ ${booking.date}.`,
          messageFr: `Vous avez été assigné à une nouvelle course : ${booking.fromPoint} vers ${booking.toDestination} le ${booking.date}.`,
          type: 'system',
        });
      }

      setEditingBookingId(null);
      setEditBookingVehicle('');
      setEditBookingDriver('');
      setEditBookingFinalPrice('');
    } catch (e) {
      console.error('Error updating booking assignment:', e);
      alert(isAr ? 'حدث خطأ أثناء تحديث التعيين.' : 'Erreur lors de la mise à jour de l\'assignation.');
    }
  };

  const handleSubscriptionAction = async (
    subId: string,
    userId: string,
    planType: string,
    action: 'activate' | 'cancel' | 'expire'
  ) => {
    try {
      const subRef = doc(db, 'subscriptions', subId);
      const userRef = doc(db, 'users', userId);

      let durationDays = 30;
      if (planType === 'daily') durationDays = 1;
      else if (planType === 'weekly') durationDays = 7;
      else if (planType === 'monthly') durationDays = 30;
      else if (planType === 'semester') durationDays = 180;
      else if (planType === 'yearly') durationDays = 365;

      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + durationDays);

      const startDateString = startDate.toISOString();
      const endDateString = endDate.toISOString();

      if (action === 'activate') {
        // Update subscription
        await updateDoc(subRef, {
          status: 'active',
          paymentStatus: 'paid',
          startDate: startDateString,
          endDate: endDateString,
        });

        // Update user
        await updateDoc(userRef, {
          subscriptionStatus: 'active',
          subscriptionPlan: planType,
          subscriptionEndDate: endDateString,
          validUntil: endDate.toLocaleDateString('fr-FR'),
          subscription: planType,
        });

        // Create notification
        await createNotification({
          userId,
          titleAr: 'تم تفعيل اشتراكك 💳',
          titleFr: 'Abonnement activé 💳',
          messageAr: `قام المشرف بتفعيل اشتراكك (${planType}) وهو صالح لغاية ${endDate.toLocaleDateString('ar-DZ')}.`,
          messageFr: `L'administrateur a activé votre abonnement (${planType}). Il est valide jusqu'au ${endDate.toLocaleDateString('fr-FR')}.`,
          type: 'system',
        });
      } else if (action === 'cancel') {
        // Update subscription
        await updateDoc(subRef, {
          status: 'cancelled',
        });

        // Update user
        await updateDoc(userRef, {
          subscriptionStatus: 'cancelled',
        });

        // Create notification
        await createNotification({
          userId,
          titleAr: 'تم إلغاء اشتراكك ❌',
          titleFr: 'Abonnement annulé ❌',
          messageAr: `تم إلغاء اشتراكك (${planType}) من قبل الإدارة.`,
          messageFr: `Votre abonnement (${planType}) a été annulé par l'administration.`,
          type: 'system',
        });
      } else if (action === 'expire') {
        // Update subscription
        await updateDoc(subRef, {
          status: 'expired',
        });

        // Update user
        await updateDoc(userRef, {
          subscriptionStatus: 'expired',
        });

        // Create notification
        await createNotification({
          userId,
          titleAr: 'انتهت صلاحية اشتراكك ⚠️',
          titleFr: 'Abonnement expiré ⚠️',
          messageAr: `انتهت صلاحية اشتراكك (${planType}). يرجى تجديد الاشتراك لتتمكن من استخدام الخدمات.`,
          messageFr: `Votre abonnement (${planType}) a expiré. Veuillez le renouveler pour continuer à utiliser nos services.`,
          type: 'subscription_expiring',
        });
      }

      // [Admin Panel] subscription action processed
    } catch (e) {
      console.error('[Admin Panel] Subscription action error:', e);
    }
  };

  const handleSaveDriver = async () => {
    const isAr = language === 'ar';
    if (!driverName || !driverPhone) {
      alert(isAr ? 'يرجى ملء الاسم والهاتف.' : 'Veuillez saisir le nom et le téléphone.');
      return;
    }
    try {
      if (driverId) {
        await updateDoc(doc(db, 'drivers', driverId), {
          fullName: driverName,
          phoneNumber: driverPhone,
          email: driverEmail,
          licenseNumber: driverLicense,
          status: driverStatus,
          assignedVehicleId: driverAssignedVehicle,
          updatedAt: serverTimestamp(),
        });

        if (driverAssignedVehicle) {
          await updateDoc(doc(db, 'vehicles', driverAssignedVehicle), {
            assignedDriverId: driverId,
            updatedAt: serverTimestamp(),
          });

          // Notify driver
          const matchedUser = users.find(u => u.phone === driverPhone || u.phone.includes(driverPhone));
          if (matchedUser) {
            await createNotification({
              userId: matchedUser.id,
              titleAr: 'تم تعيين مركبة جديدة 🚌',
              titleFr: 'Nouveau véhicule assigné 🚌',
              messageAr: 'تم تحديث مركبتك المعينة من قبل المشرف.',
              messageFr: 'Votre véhicule assigné a été mis à jour par le superviseur.',
              type: 'system',
            });
          }
        }
      } else {
        const docRef = await addDoc(collection(db, 'drivers'), {
          fullName: driverName,
          phoneNumber: driverPhone,
          email: driverEmail,
          licenseNumber: driverLicense,
          role: 'driver',
          status: driverStatus,
          assignedVehicleId: driverAssignedVehicle,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        const matchingUser = users.find(u => u.phone === driverPhone || u.phone.includes(driverPhone));
        if (matchingUser) {
          await updateDoc(doc(db, 'users', matchingUser.id), {
            role: 'driver',
          });

          await createNotification({
            userId: matchingUser.id,
            titleAr: 'تم تعيينك كسائق 🚌',
            titleFr: 'Vous êtes nommé chauffeur 🚌',
            messageAr: 'مرحباً بك في فريق السائقين! تم تعيين دورك كسائق من قبل الإدارة.',
            messageFr: 'Bienvenue dans l\'équipe ! Votre rôle de chauffeur a été configuré par l\'administration.',
            type: 'system',
          });
        }

        if (driverAssignedVehicle) {
          await updateDoc(doc(db, 'vehicles', driverAssignedVehicle), {
            assignedDriverId: docRef.id,
            updatedAt: serverTimestamp(),
          });
        }
      }

      setDriverId(null);
      setDriverName('');
      setDriverPhone('');
      setDriverEmail('');
      setDriverLicense('');
      setDriverStatus('active');
      setDriverAssignedVehicle('');
      setShowDriverForm(false);
    } catch (e) {
      console.error('Error saving driver:', e);
    }
  };

  const handleSaveVehicle = async () => {
    const isAr = language === 'ar';
    if (!vehicleNumber || !vehicleReg) {
      alert(isAr ? 'يرجى ملء رقم الحافلة ورقم التسجيل.' : 'Veuillez remplir le numéro et l\'immatriculation.');
      return;
    }
    try {
      if (vehicleId) {
        await updateDoc(doc(db, 'vehicles', vehicleId), {
          vehicleNumber,
          registrationNumber: vehicleReg,
          type: vehicleType,
          brand: vehicleBrand,
          model: vehicleModel,
          capacity: parseInt(vehicleCapacity) || 45,
          status: vehicleStatus,
          assignedDriverId: vehicleAssignedDriver,
          updatedAt: serverTimestamp(),
        });

        if (vehicleAssignedDriver) {
          await updateDoc(doc(db, 'drivers', vehicleAssignedDriver), {
            assignedVehicleId: vehicleId,
            updatedAt: serverTimestamp(),
          });

          const matchingDriver = drivers.find(d => d.id === vehicleAssignedDriver);
          const matchedUser = users.find(u => u.phone === matchingDriver?.phoneNumber || u.phone.includes(matchingDriver?.phoneNumber || ''));
          if (matchedUser) {
            await createNotification({
              userId: matchedUser.id,
              titleAr: 'تم تعيين مركبة جديدة 🚌',
              titleFr: 'Nouveau véhicule assigné 🚌',
              messageAr: `تم تعيين حافلة جديدة لك: رقم ${vehicleNumber} (تسجيل: ${vehicleReg}).`,
              messageFr: `Un nouveau bus vous a été assigné : N° ${vehicleNumber} (Immatriculation : ${vehicleReg}).`,
              type: 'system',
            });
          }
        }
      } else {
        const docRef = await addDoc(collection(db, 'vehicles'), {
          vehicleNumber,
          registrationNumber: vehicleReg,
          type: vehicleType,
          brand: vehicleBrand,
          model: vehicleModel,
          capacity: parseInt(vehicleCapacity) || 45,
          status: vehicleStatus,
          assignedDriverId: vehicleAssignedDriver,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        if (vehicleAssignedDriver) {
          await updateDoc(doc(db, 'drivers', vehicleAssignedDriver), {
            assignedVehicleId: docRef.id,
            updatedAt: serverTimestamp(),
          });

          const matchingDriver = drivers.find(d => d.id === vehicleAssignedDriver);
          const matchedUser = users.find(u => u.phone === matchingDriver?.phoneNumber || u.phone.includes(matchingDriver?.phoneNumber || ''));
          if (matchedUser) {
            await createNotification({
              userId: matchedUser.id,
              titleAr: 'تم تعيين مركبة جديدة 🚌',
              titleFr: 'Nouveau véhicule assigné 🚌',
              messageAr: `تم تعيين حافلة جديدة لك: رقم ${vehicleNumber}.`,
              messageFr: `Un nouveau bus vous a été assigné : N° ${vehicleNumber}.`,
              type: 'system',
            });
          }
        }
      }

      setVehicleId(null);
      setVehicleNumber('');
      setVehicleReg('');
      setVehicleType('bus');
      setVehicleCapacity('45');
      setVehicleStatus('active');
      setVehicleAssignedDriver('');
      setVehicleBrand('');
      setVehicleModel('');
      setShowVehicleForm(false);
    } catch (e) {
      console.error('Error saving vehicle:', e);
    }
  };

  const handleSaveRoute = async () => {
    const isAr = language === 'ar';
    if (!routeName || !routeDeparture || !routeDestination) {
      alert(isAr ? 'يرجى ملء اسم المسار ونقاط الانطلاق والوصول.' : 'Veuillez remplir le nom du trajet, départ et destination.');
      return;
    }
    try {
      if (routeId) {
        const oldRouteDoc = routes.find(r => r.id === routeId);
        await updateDoc(doc(db, 'routes', routeId), {
          routeName,
          departurePoint: routeDeparture,
          destination: routeDestination,
          departureTime: routeDepTime,
          arrivalTime: routeArrTime,
          vehicleId: routeVehicle,
          driverId: routeDriver,
          availableSeats: parseInt(routeSeats) || 45,
          price: parseFloat(routePrice) || 100,
          status: routeStatus,
          updatedAt: serverTimestamp(),
        });

        // Notify users & driver of cancelled or modified status
        if (routeStatus !== oldRouteDoc?.status) {
          if (routeStatus === 'cancelled') {
            // Notify driver
            if (routeDriver) {
              const matchingDriver = drivers.find(d => d.id === routeDriver);
              const matchedUser = users.find(u => u.phone === matchingDriver?.phoneNumber || u.phone.includes(matchingDriver?.phoneNumber || ''));
              if (matchedUser) {
                await createNotification({
                  userId: matchedUser.id,
                  titleAr: 'تم إلغاء خط المسار الخاص بك ❌',
                  titleFr: 'Votre trajet a été annulé ❌',
                  messageAr: `تم إلغاء الخط المعين لك: ${routeName} (من ${routeDeparture} إلى ${routeDestination}).`,
                  messageFr: `Le trajet qui vous a été assigné a été annulé : ${routeName} (de ${routeDeparture} à ${routeDestination}).`,
                  type: 'system',
                });
              }
            }

            // Notify all users in parallel
            users.forEach(async (u) => {
              if (u.role === 'student' || u.role === 'user') {
                await createNotification({
                  userId: u.id,
                  titleAr: 'إلغاء خط حافلة ⚠️',
                  titleFr: 'Trajet de bus annulé ⚠️',
                  messageAr: `نعتذر منكم، لقد تم إلغاء المسار ${routeName} لليوم من قبل الإدارة.`,
                  messageFr: `Nous nous excusons, le trajet ${routeName} a été annulé aujourd'hui par l'administration.`,
                  type: 'system',
                });
              }
            });
          }
        } else {
          // General modification notification
          if (routeDriver) {
            const matchingDriver = drivers.find(d => d.id === routeDriver);
            const matchedUser = users.find(u => u.phone === matchingDriver?.phoneNumber || u.phone.includes(matchingDriver?.phoneNumber || ''));
            if (matchedUser) {
              await createNotification({
                userId: matchedUser.id,
                titleAr: 'تعديل في المسار الخاص بك 🚌',
                titleFr: 'Votre trajet a été modifié 🚌',
                messageAr: `تم تعديل بيانات المسار الخاص بك: ${routeName}.`,
                messageFr: `Les détails de votre trajet ont été mis à jour : ${routeName}.`,
                type: 'system',
              });
            }
          }

          // Notify all users in parallel of route modification
          users.forEach(async (u) => {
            if (u.role === 'student' || u.role === 'user') {
              await createNotification({
                userId: u.id,
                titleAr: 'تحديث في خطوط الحافلات 🚌',
                titleFr: 'Mise à jour sur les trajets 🚌',
                messageAr: `تم تحديث مسار الحافلة ${routeName} (من ${routeDeparture} إلى ${routeDestination} في ${routeDepTime}).`,
                messageFr: `Le trajet de bus ${routeName} a été mis à jour (de ${routeDeparture} à ${routeDestination} à ${routeDepTime}).`,
                type: 'system',
              });
            }
          });
        }
      } else {
        await addDoc(collection(db, 'routes'), {
          routeName,
          departurePoint: routeDeparture,
          destination: routeDestination,
          departureTime: routeDepTime,
          arrivalTime: routeArrTime,
          vehicleId: routeVehicle,
          driverId: routeDriver,
          availableSeats: parseInt(routeSeats) || 45,
          price: parseFloat(routePrice) || 100,
          status: routeStatus,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        if (routeDriver) {
          const matchingDriver = drivers.find(d => d.id === routeDriver);
          const matchedUser = users.find(u => u.phone === matchingDriver?.phoneNumber || u.phone.includes(matchingDriver?.phoneNumber || ''));
          if (matchedUser) {
            await createNotification({
              userId: matchedUser.id,
              titleAr: 'تم تعيين مسار جديد لك 🚌',
              titleFr: 'Nouveau trajet assigné 🚌',
              messageAr: `تم تعيين مسار جديد لك من قبل المشرف: ${routeName} (من ${routeDeparture} إلى ${routeDestination}).`,
              messageFr: `Un nouveau trajet vous a été affecté par l'administrateur : ${routeName} (de ${routeDeparture} à ${routeDestination}).`,
              type: 'system',
            });
          }
        }
      }

      setRouteId(null);
      setRouteName('');
      setRouteDeparture('');
      setRouteDestination('');
      setRouteDepTime('');
      setRouteArrTime('');
      setRouteVehicle('');
      setRouteDriver('');
      setRouteSeats('45');
      setRoutePrice('100');
      setRouteStatus('active');
      setShowRouteForm(false);
    } catch (e) {
      console.error('Error saving route:', e);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        status: 'approved',
        verified: true,
        verificationStatus: 'approved',
        accountStatus: 'active',
        approvedAt: serverTimestamp(),
      });
      // [Admin Panel] user approved

      // Create notification
      await createNotification({
        userId,
        titleAr: 'تم قبول حسابك',
        titleFr: 'Compte approuvé',
        messageAr: 'تم التحقق من حسابك ويمكنك الآن استعمال البطاقة والحجز.',
        messageFr: 'Votre compte a été vérifié et vous pouvez maintenant utiliser votre carte et réserver.',
        type: 'account_approved',
      });
    } catch (error) {
      console.error('[Admin Panel] Error approving user:', error);
    }
  };

  const handleReject = async (userId: string) => {
    const reason = typeof window !== 'undefined' ? window.prompt('سبب الرفض / Motif du refus:', '') : '';
    if (reason === null) return;
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        status: 'rejected',
        verified: false,
        verificationStatus: 'rejected',
        accountStatus: 'pending',
        adminNote: reason || '',
        rejectedAt: serverTimestamp(),
      });
      // [Admin Panel] user rejected

      // Create notification
      await createNotification({
        userId,
        titleAr: 'تم رفض حسابك',
        titleFr: 'Compte refusé',
        messageAr: reason
          ? `تم رفض التحقق من حسابك. السبب: ${reason}`
          : 'تم رفض التحقق من حسابك. يرجى مراجعة الملاحظة وإعادة إرسال الوثيقة.',
        messageFr: reason
          ? `Votre demande de vérification a été rejetée. Motif : ${reason}`
          : 'Votre demande de vérification a été rejetée. Veuillez vérifier le motif et soumettre à nouveau.',
        type: 'account_rejected',
      });
    } catch (error) {
      console.error('[Admin Panel] Error rejecting user:', error);
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

  const handleRefresh = () => {
    setLoading(true);
    // The onSnapshot will automatically refresh data
    setTimeout(() => setLoading(false), 500);
  };

  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', background: '#031813', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 20 }}>غير مصرح لك بالدخول</h1>
          <p style={{ fontSize: 24, opacity: 0.7 }}>Unauthorized Access</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#031813', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 50, height: 50, border: '4px solid #10b981', borderTop: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          <p style={{ marginTop: 20 }}>جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container" style={{ minHeight: '100vh', background: '#031813', color: 'white', padding: 40 }}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 640px) {
          .admin-container { padding: 16px !important; }
          .admin-title { font-size: 28px !important; }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="admin-title" style={{ fontSize: 48, fontWeight: 900, marginBottom: 10 }}>لوحة الإدارة</h1>
          <p style={{ fontSize: 24, opacity: 0.7 }}>Admin Panel</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleRefresh}
            style={{
              padding: '12px 24px',
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#10b981',
              border: '1px solid rgba(16, 185, 129, 0.5)',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            تحديث البيانات
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '12px 24px',
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* Tab Navigation Menu */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 30, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 16, flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'overview' ? '#10b981' : 'rgba(255,255,255,0.05)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 15,
            transition: 'all 0.3s'
          }}
        >
          لوحة التحكم والتحقق
        </button>
        <button
          onClick={() => setActiveTab('drivers')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'drivers' ? '#10b981' : 'rgba(255,255,255,0.05)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 15,
            transition: 'all 0.3s'
          }}
        >
          إدارة السائقين
        </button>
        <button
          onClick={() => setActiveTab('vehicles')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'vehicles' ? '#10b981' : 'rgba(255,255,255,0.05)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 15,
            transition: 'all 0.3s'
          }}
        >
          إدارة المركبات
        </button>
        <button
          onClick={() => setActiveTab('routes')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'routes' ? '#10b981' : 'rgba(255,255,255,0.05)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 15,
            transition: 'all 0.3s'
          }}
        >
          إدارة الخطوط
        </button>
        <button
          onClick={() => setActiveTab('tracking')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'tracking' ? '#10b981' : 'rgba(255,255,255,0.05)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 15,
            transition: 'all 0.3s'
          }}
        >
          متابعة الرحلات
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'payments' ? '#10b981' : 'rgba(255,255,255,0.05)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 15,
            transition: 'all 0.3s'
          }}
        >
          المدفوعات
        </button>
      </div>

      {/* Development Mode Warning (Phase 15) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#fbbf24' }}>وضع التطوير مفعل / Mode développement actif</p>
            <p style={{ fontSize: 12, opacity: 0.7 }}>تذكر: في الإنتاج يجب نشر قواعد Firestore وتفعيل التحميل الموقّع لـ Cloudinary.</p>
          </div>
        </div>
      )}

      {activeTab === 'overview' && (
        <>
          {/* Statistics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>إجمالي المستخدمين</p>
              <p style={{ fontSize: 36, fontWeight: 900 }}>{stats.total}</p>
            </div>
            <div style={{ background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>قيد الانتظار</p>
              <p style={{ fontSize: 36, fontWeight: 900 }}>{stats.pending}</p>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>مقبولون</p>
              <p style={{ fontSize: 36, fontWeight: 900 }}>{stats.approved}</p>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>مرفوضون</p>
              <p style={{ fontSize: 36, fontWeight: 900 }}>{stats.rejected}</p>
            </div>
          </div>

          {/* Administrative Fleet & Route Stats */}
          <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>مؤشرات أسطول النقل والرحلات</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>إجمالي السائقين</p>
              <p style={{ fontSize: 36, fontWeight: 900 }}>{drivers.length}</p>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>المركبات النشطة</p>
              <p style={{ fontSize: 36, fontWeight: 900 }}>{vehicles.filter(v => v.status === 'active').length}</p>
            </div>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>الخطوط المفتوحة</p>
              <p style={{ fontSize: 36, fontWeight: 900 }}>{routes.filter(r => r.status === 'active').length}</p>
            </div>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>إجمالي الرحلات المكتملة</p>
              <p style={{ fontSize: 36, fontWeight: 900 }}>{routes.filter(r => r.status === 'completed').length}</p>
            </div>
          </div>

          {/* Verification Documents */}
          <h2 style={{ fontSize: 32, fontWeight: 900, marginTop: 20, marginBottom: 20 }}>وثائق التحقق</h2>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: 16, overflow: 'auto', marginBottom: 40 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
              <thead>
                <tr style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الاسم</th>
                  <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الهاتف</th>
                  <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الجامعة</th>
                  <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>نوع الوثيقة</th>
                  <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الوثيقة</th>
                  <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>تاريخ الرفع</th>
                  <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {users.filter((u) => Boolean(u.verificationDocumentUrl)).length === 0 && (
                  <tr><td colSpan={7} style={{ padding: 24, textAlign: 'center', opacity: 0.6 }}>لا توجد وثائق تحقق</td></tr>
                )}
                {users.filter((u) => Boolean(u.verificationDocumentUrl)).map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: 16 }}>{u.fullName}</td>
                    <td style={{ padding: 16 }}>{u.phone}</td>
                    <td style={{ padding: 16 }}>{u.university || '-'}</td>
                    <td style={{ padding: 16 }}>{u.verificationDocumentType || '-'}</td>
                    <td style={{ padding: 16 }}>
                      <a href={u.verificationDocumentUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                        {u.verificationDocumentUrl?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                          <img src={u.verificationDocumentUrl} alt="document" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
                        ) : (
                          <span style={{ padding: '6px 12px', background: '#3b82f6', color: 'white', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>عرض الوثيقة</span>
                        )}
                      </a>
                    </td>
                    <td style={{ padding: 16, fontSize: 13, opacity: 0.8 }}>
                      {u.createdAt?.seconds ? new Date(u.createdAt.seconds * 1000).toLocaleDateString('ar-DZ') : '-'}
                    </td>
                    <td style={{ padding: 16 }}>
                      {u.id === adminUserId ? (
                        <span style={{ opacity: 0.5, fontSize: 12 }}>(أنت)</span>
                      ) : (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {u.status !== 'approved' && (
                            <button
                              onClick={() => handleApprove(u.id)}
                              style={{ padding: '8px 16px', background: '#10b981', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
                            >
                              قبول
                            </button>
                          )}
                          {u.status !== 'rejected' && (
                            <button
                              onClick={() => handleReject(u.id)}
                              style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
                            >
                              رفض
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Admin Notifications */}
          <h2 style={{ fontSize: 32, fontWeight: 900, marginTop: 20, marginBottom: 20 }}>آخر الإشعارات الإدارية</h2>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: 16, padding: 24, marginBottom: 40, maxHeight: 350, overflowY: 'auto' }}>
            {adminNotifications.length === 0 ? (
              <p style={{ opacity: 0.6, textAlign: 'center', margin: '40px 0' }}>لا توجد إشعارات حالياً</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {adminNotifications.map((n) => (
                  <div key={n.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: 18, fontWeight: 800, color: '#10b981' }}>{n.titleAr}</h4>
                      <p style={{ margin: 0, opacity: 0.8, fontSize: 15, lineHeight: '22px' }}>{n.messageAr}</p>
                      {n.userPhone && (
                        <p style={{ margin: '6px 0 0 0', opacity: 0.6, fontSize: 13 }}>الهاتف: {n.userPhone}</p>
                      )}
                    </div>
                    <span style={{ fontSize: 12, opacity: 0.5, whiteSpace: 'nowrap' }}>
                      {n.createdAt?.seconds ? new Date(n.createdAt.seconds * 1000).toLocaleDateString('ar-DZ', { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subscription Management */}
          <h2 style={{ fontSize: 32, fontWeight: 900, marginTop: 20, marginBottom: 20 }}>إدارة الاشتراكات</h2>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: 16, overflow: 'auto', marginBottom: 40 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
              <thead>
                <tr style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>المشترك</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الهاتف</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الباقة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>السعر</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الحالة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الدفع</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>تاريخ البدء</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>تاريخ الانتهاء</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {adminSubscriptions.length === 0 && (
                  <tr><td colSpan={9} style={{ padding: 24, textAlign: 'center', opacity: 0.6 }}>لا توجد اشتراكات مسجلة</td></tr>
                )}
                {adminSubscriptions.map((sub) => {
                  const statusBg = sub.status === 'active' ? 'rgba(16,185,129,0.2)' : sub.status === 'pending' ? 'rgba(249,115,22,0.2)' : sub.status === 'expired' ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.1)';
                  const statusColor = sub.status === 'active' ? '#10b981' : sub.status === 'pending' ? '#f97316' : sub.status === 'expired' ? '#ef4444' : '#aaaaaa';
                  const statusLabel = sub.status === 'active' ? 'نشط' : sub.status === 'pending' ? 'معلق' : sub.status === 'expired' ? 'منتهي' : 'ملغى';

                  const payBg = sub.paymentStatus === 'paid' ? 'rgba(16,185,129,0.2)' : sub.paymentStatus === 'unpaid' ? 'rgba(249,115,22,0.2)' : 'rgba(239,68,68,0.2)';
                  const payColor = sub.paymentStatus === 'paid' ? '#10b981' : sub.paymentStatus === 'unpaid' ? '#f97316' : '#ef4444';
                  const payLabel = sub.paymentStatus === 'paid' ? 'مدفوع' : sub.paymentStatus === 'unpaid' ? 'غير مدفوع' : 'فشل';

                  const formatSubDate = (dStr?: string) => {
                    if (!dStr) return '-';
                    try {
                      return new Date(dStr).toLocaleDateString('ar-DZ');
                    } catch (e) {
                      return dStr;
                    }
                  };

                  return (
                    <tr key={sub.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: 14 }}>{sub.fullName}</td>
                      <td style={{ padding: 14 }}>{sub.userPhone}</td>
                      <td style={{ padding: 14, fontWeight: 700, color: '#10b981' }}>{sub.planNameAr}</td>
                      <td style={{ padding: 14 }}>{sub.price} DZD</td>
                      <td style={{ padding: 14 }}>
                        <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: statusBg, color: statusColor }}>
                          {statusLabel}
                        </span>
                      </td>
                      <td style={{ padding: 14 }}>
                        <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: payBg, color: payColor }}>
                          {payLabel}
                        </span>
                      </td>
                      <td style={{ padding: 14 }}>{formatSubDate(sub.startDate)}</td>
                      <td style={{ padding: 14 }}>{formatSubDate(sub.endDate)}</td>
                      <td style={{ padding: 14 }}>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {sub.status !== 'active' && (
                            <button
                              onClick={() => handleSubscriptionAction(sub.id, sub.userId, sub.planType, 'activate')}
                              style={{ padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}
                            >
                              تفعيل
                            </button>
                          )}
                          {sub.status === 'active' && (
                            <>
                              <button
                                onClick={() => handleSubscriptionAction(sub.id, sub.userId, sub.planType, 'cancel')}
                                style={{ padding: '6px 12px', background: '#aaaaaa', color: '#111111', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}
                              >
                                إلغاء
                              </button>
                              <button
                                onClick={() => handleSubscriptionAction(sub.id, sub.userId, sub.planType, 'expire')}
                                style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}
                              >
                                إنهاء الصلاحية
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Bookings Stats */}
          <h2 style={{ fontSize: 32, fontWeight: 900, marginTop: 20, marginBottom: 20 }}>طلبات الحجز</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 30 }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>إجمالي الحجوزات</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{bookingStats.total}</p>
            </div>
            <div style={{ background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>قيد الانتظار</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{bookingStats.pending}</p>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>مقبولة</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{bookingStats.approved}</p>
            </div>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>معينة</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{bookingStats.assigned}</p>
            </div>
            <div style={{ background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>بدأت</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{bookingStats.started}</p>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>مرفوضة</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{bookingStats.rejected}</p>
            </div>
            <div style={{ background: 'rgba(100, 116, 139, 0.1)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>ملغاة</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{bookingStats.cancelled}</p>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>مكتملة</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{bookingStats.completed}</p>
            </div>
          </div>

          {/* Bookings Table */}
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: 16, overflow: 'auto', marginBottom: 40 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1100 }}>
              <thead>
                <tr style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الاسم</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الهاتف</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>نقطة الانطلاق</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الوجهة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>التاريخ</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الوقت</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الركاب</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>السعر التقديري</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>المركبة المعينة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>السائق المعين</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>السعر النهائي</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الحالة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 && (
                  <tr><td colSpan={13} style={{ padding: 24, textAlign: 'center', opacity: 0.6 }}>لا توجد حجوزات مسجلة</td></tr>
                )}
                {bookings.map((booking) => {
                  const bBg = booking.status === 'approved' ? 'rgba(16,185,129,0.2)' : booking.status === 'assigned' ? 'rgba(99,102,241,0.2)' : booking.status === 'started' ? 'rgba(14,165,233,0.2)' : booking.status === 'pending' ? 'rgba(249,115,22,0.2)' : booking.status === 'completed' ? 'rgba(16,185,129,0.2)' : booking.status === 'cancelled' ? 'rgba(100,116,139,0.2)' : 'rgba(239,68,68,0.2)';
                  const bColor = booking.status === 'approved' ? '#10b981' : booking.status === 'assigned' ? '#6366f1' : booking.status === 'started' ? '#0ea5e9' : booking.status === 'pending' ? '#f97316' : booking.status === 'completed' ? '#10b981' : booking.status === 'cancelled' ? '#64748b' : '#ef4444';
                  const bLabel = booking.status === 'approved' ? 'مقبول' : booking.status === 'assigned' ? 'معينة' : booking.status === 'started' ? 'بدأت' : booking.status === 'pending' ? 'انتظار' : booking.status === 'completed' ? 'مكتمل' : booking.status === 'cancelled' ? 'ملغاة' : 'مرفوض';
                  const isEditing = editingBookingId === booking.id;
                  const assignedVeh = vehicles.find(v => v.id === booking.assignedVehicleId);
                  const assignedDrv = drivers.find(d => d.id === booking.assignedDriverId);

                  return (
                    <>
                      <tr key={booking.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: 14 }}>{booking.fullName}</td>
                        <td style={{ padding: 14 }}>{booking.phoneNumber}</td>
                        <td style={{ padding: 14 }}>{booking.fromPoint}</td>
                        <td style={{ padding: 14 }}>{booking.toDestination}</td>
                        <td style={{ padding: 14 }}>{booking.date}</td>
                        <td style={{ padding: 14 }}>{booking.time}</td>
                        <td style={{ padding: 14 }}>{booking.passengersCount}</td>
                        <td style={{ padding: 14 }}>{booking.price} DA</td>
                        <td style={{ padding: 14, fontSize: 12 }}>
                          {assignedVeh ? `H-${assignedVeh.vehicleNumber}` : '-'}
                        </td>
                        <td style={{ padding: 14, fontSize: 12 }}>
                          {assignedDrv ? assignedDrv.fullName : '-'}
                        </td>
                        <td style={{ padding: 14, fontSize: 12, fontWeight: 700 }}>
                          {booking.finalPrice ? `${booking.finalPrice} DA` : '-'}
                        </td>
                        <td style={{ padding: 14 }}>
                          <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: bBg, color: bColor }}>
                            {bLabel}
                          </span>
                        </td>
                        <td style={{ padding: 14 }}>
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {!isEditing && (booking.status === 'pending' || booking.status === 'rejected') && (
                              <>
                                <button
                                  onClick={() => {
                                    setEditingBookingId(booking.id);
                                    setEditBookingVehicle(booking.assignedVehicleId || '');
                                    setEditBookingDriver(booking.assignedDriverId || '');
                                    setEditBookingFinalPrice(String(booking.price || ''));
                                  }}
                                  style={{ padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}
                                >
                                  قبول وتعيين
                                </button>
                                <button
                                  onClick={() => handleBookingAction(booking.id, 'rejected')}
                                  style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}
                                >
                                  رفض
                                </button>
                              </>
                            )}
                            {!isEditing && (booking.status === 'approved' || booking.status === 'assigned') && (
                              <>
                                <button
                                  onClick={() => {
                                    setEditingBookingId(booking.id);
                                    setEditBookingVehicle(booking.assignedVehicleId || '');
                                    setEditBookingDriver(booking.assignedDriverId || '');
                                    setEditBookingFinalPrice(String(booking.finalPrice || booking.price || ''));
                                  }}
                                  style={{ padding: '6px 12px', background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}
                                >
                                  تعديل التعيين
                                </button>
                                <button
                                  onClick={() => handleBookingAction(booking.id, 'completed')}
                                  style={{ padding: '6px 12px', background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}
                                >
                                  إكمال
                                </button>
                                <button
                                  onClick={() => handleBookingAction(booking.id, 'cancelled')}
                                  style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}
                                >
                                  إلغاء
                                </button>
                              </>
                            )}
                            {!isEditing && booking.status === 'started' && (
                              <>
                                <button
                                  onClick={() => handleBookingAction(booking.id, 'completed')}
                                  style={{ padding: '6px 12px', background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}
                                >
                                  إكمال
                                </button>
                                <button
                                  onClick={() => handleBookingAction(booking.id, 'cancelled')}
                                  style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}
                                >
                                  إلغاء
                                </button>
                              </>
                            )}
                            {isEditing && (
                              <button
                                onClick={() => setEditingBookingId(null)}
                                style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}
                              >
                                إلغاء
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                      {isEditing && (
                        <tr key={`${booking.id}-edit`} style={{ background: 'rgba(0,0,0,0.4)' }}>
                          <td colSpan={13} style={{ padding: 16 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, alignItems: 'end' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontWeight: 700 }}>المركبة</label>
                                <select value={editBookingVehicle} onChange={e => setEditBookingVehicle(e.target.value)} style={{ width: '100%', padding: 10, background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: 'white', fontSize: 13 }}>
                                  <option value="">-- اختر مركبة --</option>
                                  {vehicles.filter(v => v.status === 'active').map(v => (
                                    <option key={v.id} value={v.id}>{v.vehicleNumber} ({v.capacity} مقعد)</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontWeight: 700 }}>السائق</label>
                                <select value={editBookingDriver} onChange={e => setEditBookingDriver(e.target.value)} style={{ width: '100%', padding: 10, background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: 'white', fontSize: 13 }}>
                                  <option value="">-- اختر سائق --</option>
                                  {drivers.filter(d => d.status === 'active').map(d => (
                                    <option key={d.id} value={d.id}>{d.fullName}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 12, marginBottom: 4, fontWeight: 700 }}>السعر النهائي (DA)</label>
                                <input type="number" value={editBookingFinalPrice} onChange={e => setEditBookingFinalPrice(e.target.value)} style={{ width: '100%', padding: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: 'white', fontSize: 13 }} />
                              </div>
                              <div style={{ display: 'flex', gap: 8 }}>
                                <button onClick={() => {
                                  if (booking.status === 'pending' || booking.status === 'rejected' || booking.status === 'approved') {
                                    handleApproveBooking(booking.id);
                                  } else {
                                    handleUpdateBookingAssignment(booking.id);
                                  }
                                }} style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
                                  {booking.status === 'pending' || booking.status === 'rejected' || booking.status === 'approved' ? 'تأكيد القبول' : 'تحديث التعيين'}
                                </button>
                                <button onClick={() => setEditingBookingId(null)} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
                                  إلغاء
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'drivers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 32, fontWeight: 900 }}>إدارة السائقين</h2>
            <button
              onClick={() => {
                setDriverId(null);
                setDriverName('');
                setDriverPhone('');
                setDriverEmail('');
                setDriverLicense('');
                setDriverStatus('active');
                setDriverAssignedVehicle('');
                setShowDriverForm(!showDriverForm);
              }}
              style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}
            >
              {showDriverForm ? 'إلغاء' : 'إضافة سائق جديد'}
            </button>
          </div>

          {showDriverForm && (
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 16, padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>الاسم الكامل</label>
                <input value={driverName} onChange={e => setDriverName(e.target.value)} type="text" placeholder="محمد بلقاسم" style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>رقم الهاتف</label>
                <input value={driverPhone} onChange={e => setDriverPhone(e.target.value)} type="tel" placeholder="0550123456" style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>البريد الإلكتروني (اختياري)</label>
                <input value={driverEmail} onChange={e => setDriverEmail(e.target.value)} type="email" placeholder="driver@unimove.dz" style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>رقم رخصة السياقة</label>
                <input value={driverLicense} onChange={e => setDriverLicense(e.target.value)} type="text" placeholder="DZ-12345-67" style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>حالة السائق</label>
                <select value={driverStatus} onChange={e => setDriverStatus(e.target.value)} style={{ width: '100%', padding: 12, background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }}>
                  <option value="active">نشط (Active)</option>
                  <option value="inactive">غير نشط (Inactive)</option>
                  <option value="suspended">موقوف (Suspended)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>تعيين الحافلة</label>
                <select value={driverAssignedVehicle} onChange={e => setDriverAssignedVehicle(e.target.value)} style={{ width: '100%', padding: 12, background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }}>
                  <option value="">-- اختر حافلة معينة --</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>حافلة {v.vehicleNumber} (تسجيل: {v.registrationNumber})</option>
                  ))}
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
                <button onClick={handleSaveDriver} style={{ padding: '10px 24px', background: '#10b981', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>حفظ بيانات السائق</button>
              </div>
            </div>
          )}

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: 16, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
              <thead>
                <tr style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>السائق</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الهاتف</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>البريد الإلكتروني</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>رخصة السياقة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الحافلة المعينة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الحالة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {drivers.length === 0 && (
                  <tr><td colSpan={7} style={{ padding: 24, textAlign: 'center', opacity: 0.6 }}>لا يوجد سائقون مسجلون بعد</td></tr>
                )}
                {drivers.map(drv => {
                  const assignedBus = vehicles.find(v => v.id === drv.assignedVehicleId);
                  const sBg = drv.status === 'active' ? 'rgba(16,185,129,0.2)' : drv.status === 'inactive' ? 'rgba(255,255,255,0.1)' : 'rgba(239,68,68,0.2)';
                  const sColor = drv.status === 'active' ? '#10b981' : drv.status === 'inactive' ? '#aaaaaa' : '#ef4444';
                  const sLabel = drv.status === 'active' ? 'نشط' : drv.status === 'inactive' ? 'غير نشط' : 'موقوف';

                  return (
                    <tr key={drv.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: 14 }}>{drv.fullName}</td>
                      <td style={{ padding: 14 }}>{drv.phoneNumber}</td>
                      <td style={{ padding: 14 }}>{drv.email || '-'}</td>
                      <td style={{ padding: 14, fontFamily: 'monospace' }}>{drv.licenseNumber || '-'}</td>
                      <td style={{ padding: 14, color: '#10b981', fontWeight: 600 }}>
                        {assignedBus ? `حافلة رقم ${assignedBus.vehicleNumber}` : 'غير معينة'}
                      </td>
                      <td style={{ padding: 14 }}>
                        <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: sBg, color: sColor }}>{sLabel}</span>
                      </td>
                      <td style={{ padding: 14 }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            onClick={() => {
                              setDriverId(drv.id);
                              setDriverName(drv.fullName || '');
                              setDriverPhone(drv.phoneNumber || '');
                              setDriverEmail(drv.email || '');
                              setDriverLicense(drv.licenseNumber || '');
                              setDriverStatus(drv.status || 'active');
                              setDriverAssignedVehicle(drv.assignedVehicleId || '');
                              setShowDriverForm(true);
                            }}
                            style={{ padding: '6px 12px', background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
                          >
                            تعديل
                          </button>
                          {drv.status === 'active' && (
                            <button
                              onClick={async () => {
                                await updateDoc(doc(db, 'drivers', drv.id), { status: 'inactive' });
                              }}
                              style={{ padding: '6px 12px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
                            >
                              تعطيل
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'vehicles' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 32, fontWeight: 900 }}>إدارة الأسطول والمركبات</h2>
            <button
              onClick={() => {
                setVehicleId(null);
                setVehicleNumber('');
                setVehicleReg('');
                setVehicleType('bus');
                setVehicleCapacity('45');
                setVehicleStatus('active');
                setVehicleAssignedDriver('');
                setVehicleBrand('');
                setVehicleModel('');
                setShowVehicleForm(!showVehicleForm);
              }}
              style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}
            >
              {showVehicleForm ? 'إلغاء' : 'إضافة مركبة جديدة'}
            </button>
          </div>

          {showVehicleForm && (
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 16, padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>رقم الحافلة/المركبة</label>
                <input value={vehicleNumber} onChange={e => setVehicleNumber(e.target.value)} type="text" placeholder="105" style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>رقم التسجيل (Matricule)</label>
                <input value={vehicleReg} onChange={e => setVehicleReg(e.target.value)} type="text" placeholder="00123-116-16" style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>الماركة (Brand)</label>
                <input value={vehicleBrand} onChange={e => setVehicleBrand(e.target.value)} type="text" placeholder="Mercedes-Benz" style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>الطراز (Model)</label>
                <input value={vehicleModel} onChange={e => setVehicleModel(e.target.value)} type="text" placeholder="Sprinter 2022" style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>النوع</label>
                <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} style={{ width: '100%', padding: 12, background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }}>
                  <option value="bus">حافلة كبيرة (Bus)</option>
                  <option value="minibus">حافلة صغيرة (Minibus)</option>
                  <option value="car">سيارة (Car)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>السعة (عدد المقاعد)</label>
                <input value={vehicleCapacity} onChange={e => setVehicleCapacity(e.target.value)} type="number" placeholder="45" style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>حالة المركبة</label>
                <select value={vehicleStatus} onChange={e => setVehicleStatus(e.target.value)} style={{ width: '100%', padding: 12, background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }}>
                  <option value="active">نشطة (Active)</option>
                  <option value="maintenance">صيانة (Maintenance)</option>
                  <option value="inactive">غير نشطة (Inactive)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>تعيين السائق</label>
                <select value={vehicleAssignedDriver} onChange={e => setVehicleAssignedDriver(e.target.value)} style={{ width: '100%', padding: 12, background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }}>
                  <option value="">-- اختر سائقاً للمركبة --</option>
                  {drivers.map(d => (
                    <option key={d.id} value={d.id}>{d.fullName} ({d.phoneNumber})</option>
                  ))}
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
                <button onClick={handleSaveVehicle} style={{ padding: '10px 24px', background: '#10b981', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>حفظ المركبة</button>
              </div>
            </div>
          )}

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: 16, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
              <thead>
                <tr style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>رقم المركبة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>رقم التسجيل</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الماركة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الطراز</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>النوع</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>السعة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>السائق المعين</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الحالة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.length === 0 && (
                  <tr><td colSpan={9} style={{ padding: 24, textAlign: 'center', opacity: 0.6 }}>لا توجد مركبات مسجلة بعد</td></tr>
                )}
                {vehicles.map(v => {
                  const assignedDriver = drivers.find(d => d.id === v.assignedDriverId);
                  const sBg = v.status === 'active' ? 'rgba(16,185,129,0.2)' : v.status === 'maintenance' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.1)';
                  const sColor = v.status === 'active' ? '#10b981' : v.status === 'maintenance' ? '#f59e0b' : '#aaaaaa';
                  const sLabel = v.status === 'active' ? 'نشطة' : v.status === 'maintenance' ? 'صيانة' : 'غير نشطة';

                  const typeMapping: any = { bus: 'حافلة كبيرة', minibus: 'حافلة صغيرة', car: 'سيارة عادية' };

                  return (
                    <tr key={v.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: 14, fontWeight: 700 }}>مركبة رقم {v.vehicleNumber}</td>
                      <td style={{ padding: 14, fontFamily: 'monospace' }}>{v.registrationNumber}</td>
                      <td style={{ padding: 14 }}>{v.brand || '-'}</td>
                      <td style={{ padding: 14 }}>{v.model || '-'}</td>
                      <td style={{ padding: 14 }}>{typeMapping[v.type] || v.type}</td>
                      <td style={{ padding: 14 }}>{v.capacity} مقعد</td>
                      <td style={{ padding: 14, color: '#10b981', fontWeight: 600 }}>{assignedDriver ? assignedDriver.fullName : 'غير معين'}</td>
                      <td style={{ padding: 14 }}>
                        <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: sBg, color: sColor }}>{sLabel}</span>
                      </td>
                      <td style={{ padding: 14 }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            onClick={() => {
                              setVehicleId(v.id);
                              setVehicleNumber(v.vehicleNumber || '');
                              setVehicleReg(v.registrationNumber || '');
                              setVehicleType(v.type || 'bus');
                              setVehicleCapacity(String(v.capacity || '45'));
                              setVehicleStatus(v.status || 'active');
                              setVehicleAssignedDriver(v.assignedDriverId || '');
                              setVehicleBrand(v.brand || '');
                              setVehicleModel(v.model || '');
                              setShowVehicleForm(true);
                            }}
                            style={{ padding: '6px 12px', background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
                          >
                            تعديل
                          </button>
                          {v.status !== 'maintenance' && (
                            <button
                              onClick={async () => {
                                await updateDoc(doc(db, 'vehicles', v.id), { status: 'maintenance' });
                              }}
                              style={{ padding: '6px 12px', background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
                            >
                              صيانة
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'routes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 32, fontWeight: 900 }}>إدارة خطوط النقل والرحلات</h2>
            <button
              onClick={() => {
                setRouteId(null);
                setRouteName('');
                setRouteDeparture('');
                setRouteDestination('');
                setRouteDepTime('');
                setRouteArrTime('');
                setRouteVehicle('');
                setRouteDriver('');
                setRouteSeats('45');
                setRoutePrice('100');
                setRouteStatus('active');
                setShowRouteForm(!showRouteForm);
              }}
              style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}
            >
              {showRouteForm ? 'إلغاء' : 'إنشاء خط رحلة جديد'}
            </button>
          </div>

          {showRouteForm && (
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 16, padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>اسم الخط/المسار</label>
                <input value={routeName} onChange={e => setRouteName(e.target.value)} type="text" placeholder="خط جامعة باب الزوار - الجزائر الوسطى" style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>نقطة الانطلاق (Departure)</label>
                <input value={routeDeparture} onChange={e => setRouteDeparture(e.target.value)} type="text" placeholder="باب الزوار (USTHB)" style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>الوجهة (Destination)</label>
                <input value={routeDestination} onChange={e => setRouteDestination(e.target.value)} type="text" placeholder="ساحة الشهداء" style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>وقت الانطلاق</label>
                <input value={routeDepTime} onChange={e => setRouteDepTime(e.target.value)} type="time" style={{ width: '100%', padding: 12, background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>وقت الوصول المتوقع</label>
                <input value={routeArrTime} onChange={e => setRouteArrTime(e.target.value)} type="time" style={{ width: '100%', padding: 12, background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>المركبة المخصصة</label>
                <select value={routeVehicle} onChange={e => setRouteVehicle(e.target.value)} style={{ width: '100%', padding: 12, background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }}>
                  <option value="">-- اختر المركبة --</option>
                  {vehicles.filter(v => v.status === 'active').map(v => (
                    <option key={v.id} value={v.id}>حافلة {v.vehicleNumber} ({v.capacity} مقعد)</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>السائق المعين</label>
                <select value={routeDriver} onChange={e => setRouteDriver(e.target.value)} style={{ width: '100%', padding: 12, background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }}>
                  <option value="">-- اختر السائق --</option>
                  {drivers.filter(d => d.status === 'active').map(d => (
                    <option key={d.id} value={d.id}>{d.fullName} ({d.phoneNumber})</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>المقاعد المتاحة</label>
                <input value={routeSeats} onChange={e => setRouteSeats(e.target.value)} type="number" placeholder="45" style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>سعر التذكرة (DA)</label>
                <input value={routePrice} onChange={e => setRoutePrice(e.target.value)} type="number" placeholder="100" style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 6, fontWeight: 700 }}>حالة الخط</label>
                <select value={routeStatus} onChange={e => setRouteStatus(e.target.value)} style={{ width: '100%', padding: 12, background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white' }}>
                  <option value="active">نشط (Active)</option>
                  <option value="cancelled">ملغي (Cancelled)</option>
                  <option value="completed">مكتمل (Completed)</option>
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
                <button onClick={handleSaveRoute} style={{ padding: '10px 24px', background: '#10b981', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>حفظ بيانات الخط</button>
              </div>
            </div>
          )}

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: 16, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 950 }}>
              <thead>
                <tr style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>المسار</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الانطلاق</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الوصول</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>التوقيت</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>المقاعد</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>المركبة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>السائق</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>السعر</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الحالة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {routes.length === 0 && (
                  <tr><td colSpan={10} style={{ padding: 24, textAlign: 'center', opacity: 0.6 }}>لا توجد خطوط رحلات بعد</td></tr>
                )}
                {routes.map(r => {
                  const veh = vehicles.find(v => v.id === r.vehicleId);
                  const drv = drivers.find(d => d.id === r.driverId);
                  const sBg = r.status === 'active' ? 'rgba(16,185,129,0.2)' : r.status === 'completed' ? 'rgba(99,102,241,0.2)' : 'rgba(239,68,68,0.2)';
                  const sColor = r.status === 'active' ? '#10b981' : r.status === 'completed' ? '#6366f1' : '#ef4444';
                  const sLabel = r.status === 'active' ? 'نشط' : r.status === 'completed' ? 'مكتمل' : 'ملغي';

                  return (
                    <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: 14, fontWeight: 700 }}>{r.routeName}</td>
                      <td style={{ padding: 14 }}>{r.departurePoint}</td>
                      <td style={{ padding: 14 }}>{r.destination}</td>
                      <td style={{ padding: 14, direction: 'ltr', textAlign: 'right' }}>{r.departureTime} - {r.arrivalTime}</td>
                      <td style={{ padding: 14 }}>{r.availableSeats} مقعد</td>
                      <td style={{ padding: 14 }}>{veh ? `حافلة ${veh.vehicleNumber}` : '-'}</td>
                      <td style={{ padding: 14 }}>{drv ? drv.fullName : '-'}</td>
                      <td style={{ padding: 14 }}>{r.price} DA</td>
                      <td style={{ padding: 14 }}>
                        <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: sBg, color: sColor }}>{sLabel}</span>
                      </td>
                      <td style={{ padding: 14 }}>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          <button
                            onClick={() => {
                              setRouteId(r.id);
                              setRouteName(r.routeName || '');
                              setRouteDeparture(r.departurePoint || '');
                              setRouteDestination(r.destination || '');
                              setRouteDepTime(r.departureTime || '');
                              setRouteArrTime(r.arrivalTime || '');
                              setRouteVehicle(r.vehicleId || '');
                              setRouteDriver(r.driverId || '');
                              setRouteSeats(String(r.availableSeats || '45'));
                              setRoutePrice(String(r.price || '100'));
                              setRouteStatus(r.status || 'active');
                              setShowRouteForm(true);
                            }}
                            style={{ padding: '6px 12px', background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
                          >
                            تعديل
                          </button>
                          {r.status === 'active' && (
                            <>
                              <button
                                onClick={async () => {
                                  await updateDoc(doc(db, 'routes', r.id), { status: 'completed' });
                                }}
                                style={{ padding: '6px 12px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
                              >
                                إكمال
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm(language === 'ar' ? 'هل أنت متأكد من إلغاء الرحلة؟' : 'Confirmer l\'annulation du trajet ?')) {
                                    await updateDoc(doc(db, 'routes', r.id), { status: 'cancelled' });
                                  }
                                }}
                                style={{ padding: '6px 12px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
                              >
                                إلغاء
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'tracking' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h2 style={{ fontSize: 32, fontWeight: 900 }}>متابعة الرحلات اللحظية</h2>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>معينة</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{bookings.filter(b => b.status === 'assigned' || b.status === 'approved').length}</p>
            </div>
            <div style={{ background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>بدأت</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{bookings.filter(b => b.status === 'started').length}</p>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>مكتملة</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{bookings.filter(b => b.status === 'completed').length}</p>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>ملغاة</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{bookings.filter(b => b.status === 'cancelled').length}</p>
            </div>
          </div>

          {/* Tracking Table */}
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: 16, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1100 }}>
              <thead>
                <tr style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الراكب</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الانطلاق</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الوجهة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>السائق</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>المركبة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>آخر موقع</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>آخر تحديث</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الحالة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {bookings.filter(b => ['assigned', 'approved', 'started', 'completed', 'cancelled'].includes(b.status)).length === 0 && (
                  <tr><td colSpan={9} style={{ padding: 24, textAlign: 'center', opacity: 0.6 }}>لا توجد رحلات قيد التنفيذ</td></tr>
                )}
                {bookings.filter(b => ['assigned', 'approved', 'started', 'completed', 'cancelled'].includes(b.status)).map((booking) => {
                  const bBg = booking.status === 'started' ? 'rgba(14,165,233,0.2)' : booking.status === 'assigned' || booking.status === 'approved' ? 'rgba(99,102,241,0.2)' : booking.status === 'completed' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)';
                  const bColor = booking.status === 'started' ? '#0ea5e9' : booking.status === 'assigned' || booking.status === 'approved' ? '#6366f1' : booking.status === 'completed' ? '#10b981' : '#ef4444';
                  const bLabel = booking.status === 'started' ? 'بدأت' : booking.status === 'assigned' || booking.status === 'approved' ? 'معينة' : booking.status === 'completed' ? 'مكتملة' : 'ملغاة';
                  const assignedDrv = drivers.find(d => d.id === booking.assignedDriverId);
                  const assignedVeh = vehicles.find(v => v.id === booking.assignedVehicleId);
                  const lastLoc = tripLocations.find((tl: any) => tl.bookingId === booking.id);

                  return (
                    <tr key={booking.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: 14 }}>{booking.fullName}</td>
                      <td style={{ padding: 14 }}>{booking.fromPoint}</td>
                      <td style={{ padding: 14 }}>{booking.toDestination}</td>
                      <td style={{ padding: 14 }}>{assignedDrv ? assignedDrv.fullName : '-'}</td>
                      <td style={{ padding: 14 }}>{assignedVeh ? `H-${assignedVeh.vehicleNumber}` : '-'}</td>
                      <td style={{ padding: 14, fontSize: 12, fontFamily: 'monospace' }}>
                        {lastLoc ? `${lastLoc.latitude.toFixed(4)}, ${lastLoc.longitude.toFixed(4)}` : '-'}
                      </td>
                      <td style={{ padding: 14, fontSize: 12, opacity: 0.7 }}>
                        {lastLoc && lastLoc.updatedAt?.toDate ? new Date(lastLoc.updatedAt.toDate()).toLocaleString('ar-DZ') : '-'}
                      </td>
                      <td style={{ padding: 14 }}>
                        <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: bBg, color: bColor }}>{bLabel}</span>
                      </td>
                      <td style={{ padding: 14 }}>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {booking.status === 'started' && (
                            <button onClick={() => router.push(`/live-tracking/${booking.id}`)} style={{ padding: '6px 12px', background: 'rgba(14, 165, 233, 0.2)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.3)', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>
                              تتبع
                            </button>
                          )}
                          {(booking.status === 'assigned' || booking.status === 'approved') && (
                            <button onClick={() => handleBookingAction(booking.id, 'completed')} style={{ padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>
                              إكمال
                            </button>
                          )}
                          {booking.status === 'started' && (
                            <button onClick={() => handleBookingAction(booking.id, 'completed')} style={{ padding: '6px 12px', background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>
                              إكمال
                            </button>
                          )}
                          {(booking.status === 'assigned' || booking.status === 'approved' || booking.status === 'started') && (
                            <button onClick={() => handleBookingAction(booking.id, 'cancelled')} style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>
                              إلغاء
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h2 style={{ fontSize: 32, fontWeight: 900 }}>إدارة المدفوعات</h2>

          {/* Payment Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>إجمالي المدفوعات</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{payments.length}</p>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>مدفوعة</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{payments.filter((p: any) => p.paymentStatus === 'paid').length}</p>
            </div>
            <div style={{ background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>معلقة</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{payments.filter((p: any) => p.paymentStatus === 'pending').length}</p>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>فاشلة / ملغاة</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{payments.filter((p: any) => ['failed', 'cancelled', 'refunded'].includes(p.paymentStatus)).length}</p>
            </div>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>الإيرادات (DA)</p>
              <p style={{ fontSize: 32, fontWeight: 900 }}>{payments.filter((p: any) => p.paymentStatus === 'paid').reduce((sum: number, p: any) => sum + (p.amount || 0), 0)}</p>
            </div>
          </div>

          {/* Payments Table */}
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: 16, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1100 }}>
              <thead>
                <tr style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>المستخدم</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الهاتف</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>النوع</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>المبلغ</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الطريقة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الحالة</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>المرجع</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>التاريخ</th>
                  <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 && (
                  <tr><td colSpan={9} style={{ padding: 24, textAlign: 'center', opacity: 0.6 }}>لا توجد مدفوعات مسجلة</td></tr>
                )}
                {payments.map((p: any) => {
                  const pBg = p.paymentStatus === 'paid' ? 'rgba(16,185,129,0.2)' : p.paymentStatus === 'pending' ? 'rgba(249,115,22,0.2)' : 'rgba(239,68,68,0.2)';
                  const pColor = p.paymentStatus === 'paid' ? '#10b981' : p.paymentStatus === 'pending' ? '#f97316' : '#ef4444';
                  const pLabel = p.paymentStatus === 'paid' ? 'مدفوع' : p.paymentStatus === 'pending' ? 'معلق' : p.paymentStatus === 'refunded' ? 'مسترجع' : 'ملغى';
                  const methodLabel = p.paymentMethod === 'cash' ? 'نقدي' : p.paymentMethod === 'tpe' ? 'TPE' : p.paymentMethod === 'baridimob' ? 'بريدي موب' : p.paymentMethod === 'cib' ? 'CIB' : p.paymentMethod === 'edahabia' ? 'الذهبية' : p.paymentMethod === 'mock' ? 'تجريبي' : p.paymentMethod || '-';

                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: 14 }}>{p.fullName || '-'}</td>
                      <td style={{ padding: 14, fontFamily: 'monospace', fontSize: 12 }}>{p.phoneNumber || '-'}</td>
                      <td style={{ padding: 14 }}>{p.relatedType === 'booking' ? 'حجز' : p.relatedType === 'subscription' ? 'اشتراك' : '-'}</td>
                      <td style={{ padding: 14, fontWeight: 700 }}>{p.amount} {p.currency || 'DZD'}</td>
                      <td style={{ padding: 14 }}>{methodLabel}</td>
                      <td style={{ padding: 14 }}>
                        <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: pBg, color: pColor }}>{pLabel}</span>
                      </td>
                      <td style={{ padding: 14, fontSize: 11, fontFamily: 'monospace', opacity: 0.8 }}>{p.transactionRef || '-'}</td>
                      <td style={{ padding: 14, fontSize: 12, opacity: 0.7 }}>
                        {p.createdAt?.toDate ? new Date(p.createdAt.toDate()).toLocaleString('ar-DZ') : '-'}
                      </td>
                      <td style={{ padding: 14 }}>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {p.paymentStatus === 'pending' && (
                            <>
                              <button onClick={async () => {
                                await updateDoc(doc(db, 'payments', p.id), { paymentStatus: 'paid', paidAt: serverTimestamp(), transactionRef: `TXN-${Date.now()}` });
                              }} style={{ padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>
                                تأكيد
                              </button>
                              <button onClick={async () => {
                                await updateDoc(doc(db, 'payments', p.id), { paymentStatus: 'cancelled', cancelledAt: serverTimestamp() });
                              }} style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>
                                إلغاء
                              </button>
                            </>
                          )}
                          {p.paymentStatus === 'paid' && (
                            <button onClick={async () => {
                              await updateDoc(doc(db, 'payments', p.id), { paymentStatus: 'refunded', refundedAt: serverTimestamp() });
                            }} style={{ padding: '6px 12px', background: 'rgba(99, 102, 241, 0.2)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>
                              استرجاع
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
