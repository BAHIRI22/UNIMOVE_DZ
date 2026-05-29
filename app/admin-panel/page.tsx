'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

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
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  paymentStatus: string;
  createdAt?: any;
}

export default function AdminPanelPage() {
  const router = useRouter();
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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    completed: 0,
  });

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
          let total = 0, pending = 0, approved = 0, rejected = 0, completed = 0;
          snap.forEach((d) => {
            const data = d.data() as any;
            total++;
            if (data.status === 'pending') pending++;
            else if (data.status === 'approved') approved++;
            else if (data.status === 'rejected') rejected++;
            else if (data.status === 'completed') completed++;
            items.push({ id: d.id, ...data } as Booking);
          });
          items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
          setBookings(items);
          setBookingStats({ total, pending, approved, rejected, completed });
        },
        (err) => console.error('[Admin Panel] bookings error:', err)
      );
      return () => unsub();
    } catch (e) {
      console.error('[Admin Panel] bookings subscribe error:', e);
    }
  }, [isAdmin]);

  const handleBookingAction = async (bookingId: string, newStatus: 'approved' | 'rejected' | 'completed') => {
    try {
      const ref = doc(db, 'bookings', bookingId);
      const updates: any = { status: newStatus };
      if (newStatus === 'approved') updates.approvedAt = serverTimestamp();
      if (newStatus === 'rejected') updates.rejectedAt = serverTimestamp();
      if (newStatus === 'completed') updates.completedAt = serverTimestamp();
      await updateDoc(ref, updates);
      console.log('[Admin Panel] Booking', bookingId, '=>', newStatus);
    } catch (e) {
      console.error('[Admin Panel] Booking action error:', e);
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
      console.log('[Admin Panel] User approved:', userId);
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
      console.log('[Admin Panel] User rejected:', userId);
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
    <div style={{ minHeight: '100vh', background: '#031813', color: 'white', padding: 40 }}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 10 }}>لوحة الإدارة</h1>
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

      {/* Statistics */}
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

      {/* Bookings Stats */}
      <h2 style={{ fontSize: 32, fontWeight: 900, marginTop: 20, marginBottom: 20 }}>طلبات الحجز</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 30 }}>
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
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 16, padding: 20 }}>
          <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>مرفوضة</p>
          <p style={{ fontSize: 32, fontWeight: 900 }}>{bookingStats.rejected}</p>
        </div>
        <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 16, padding: 20 }}>
          <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 10 }}>مكتملة</p>
          <p style={{ fontSize: 32, fontWeight: 900 }}>{bookingStats.completed}</p>
        </div>
      </div>

      {/* Bookings Table */}
      <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: 16, overflow: 'auto', marginBottom: 40 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
          <thead>
            <tr style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
              <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الاسم</th>
              <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الهاتف</th>
              <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>نقطة الانطلاق</th>
              <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الوجهة</th>
              <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>التاريخ</th>
              <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الوقت</th>
              <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>المركبة</th>
              <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>السعر</th>
              <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الحالة</th>
              <th style={{ padding: 14, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 && (
              <tr><td colSpan={10} style={{ padding: 24, textAlign: 'center', opacity: 0.6 }}>لا توجد حجوزات</td></tr>
            )}
            {bookings.map((b) => {
              const statusBg = b.status === 'pending' ? 'rgba(249,115,22,0.2)' : b.status === 'approved' ? 'rgba(16,185,129,0.2)' : b.status === 'rejected' ? 'rgba(239,68,68,0.2)' : 'rgba(99,102,241,0.2)';
              const statusColor = b.status === 'pending' ? '#f97316' : b.status === 'approved' ? '#10b981' : b.status === 'rejected' ? '#ef4444' : '#6366f1';
              const statusLabel = b.status === 'pending' ? 'قيد الانتظار' : b.status === 'approved' ? 'مقبول' : b.status === 'rejected' ? 'مرفوض' : 'مكتمل';
              return (
                <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: 14 }}>{b.fullName}</td>
                  <td style={{ padding: 14 }}>{b.phoneNumber}</td>
                  <td style={{ padding: 14 }}>{b.fromPoint}</td>
                  <td style={{ padding: 14 }}>{b.toDestination}</td>
                  <td style={{ padding: 14 }}>{b.date}</td>
                  <td style={{ padding: 14 }}>{b.time}</td>
                  <td style={{ padding: 14 }}>{b.vehicleType}</td>
                  <td style={{ padding: 14 }}>{b.price} DZD</td>
                  <td style={{ padding: 14 }}>
                    <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: statusBg, color: statusColor }}>
                      {statusLabel}
                    </span>
                  </td>
                  <td style={{ padding: 14 }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {b.status === 'pending' && (
                        <>
                          <button onClick={() => handleBookingAction(b.id, 'approved')} style={{ padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>قبول</button>
                          <button onClick={() => handleBookingAction(b.id, 'rejected')} style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>رفض</button>
                        </>
                      )}
                      {b.status === 'approved' && (
                        <>
                          <button onClick={() => handleBookingAction(b.id, 'completed')} style={{ padding: '6px 12px', background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>مكتمل</button>
                          <button onClick={() => handleBookingAction(b.id, 'rejected')} style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>رفض</button>
                        </>
                      )}
                      {b.status === 'rejected' && (
                        <button onClick={() => handleBookingAction(b.id, 'approved')} style={{ padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>قبول</button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Users Table */}
      <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 20 }}>المستخدمون</h2>
      <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
              <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الاسم</th>
              <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الهاتف</th>
              <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الدور</th>
              <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الجامعة</th>
              <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الكلية</th>
              <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>الحالة</th>
              <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>موثق</th>
              <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>وثيقة التحقق</th>
              <th style={{ padding: 16, textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: 16 }}>{user.fullName}</td>
                <td style={{ padding: 16 }}>{user.phone}</td>
                <td style={{ padding: 16 }}>{user.role}</td>
                <td style={{ padding: 16 }}>{user.university || '-'}</td>
                <td style={{ padding: 16 }}>{user.faculty || '-'}</td>
                <td style={{ padding: 16 }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    background: user.status === 'pending' ? 'rgba(249, 115, 22, 0.2)' : user.status === 'approved' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: user.status === 'pending' ? '#f97316' : user.status === 'approved' ? '#10b981' : '#ef4444',
                  }}>
                    {user.status === 'pending' ? 'قيد الانتظار' : user.status === 'approved' ? 'مقبول' : 'مرفوض'}
                  </span>
                </td>
                <td style={{ padding: 16 }}>
                  {user.verified ? '✓' : '✗'}
                </td>
                <td style={{ padding: 16 }}>
                  {user.verificationDocumentUrl ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ fontSize: 12, opacity: 0.8 }}>{user.verificationDocumentType || '-'}</span>
                      <span style={{ fontSize: 11, opacity: 0.6, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.verificationDocumentName || ''}</span>
                      <a
                        href={user.verificationDocumentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ padding: '4px 10px', background: '#3b82f6', color: 'white', borderRadius: 6, textDecoration: 'none', fontSize: 12, fontWeight: 600, display: 'inline-block', marginTop: 4, textAlign: 'center' }}
                      >
                        عرض الوثيقة
                      </a>
                    </div>
                  ) : (
                    <span style={{ fontSize: 12, opacity: 0.5 }}>لا توجد</span>
                  )}
                </td>
                <td style={{ padding: 16 }}>
                  {user.id === adminUserId ? (
                    <span style={{ opacity: 0.5, fontSize: 12 }}>(أنت)</span>
                  ) : (
                    <div style={{ display: 'flex', gap: 8 }}>
                      {user.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(user.id)}
                            style={{
                              padding: '8px 16px',
                              background: '#10b981',
                              color: 'white',
                              border: 'none',
                              borderRadius: 8,
                              cursor: 'pointer',
                              fontWeight: 600,
                            }}
                          >
                            قبول
                          </button>
                          <button
                            onClick={() => handleReject(user.id)}
                            style={{
                              padding: '8px 16px',
                              background: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: 8,
                              cursor: 'pointer',
                              fontWeight: 600,
                            }}
                          >
                            رفض
                          </button>
                        </>
                      )}
                      {user.status === 'approved' && (
                        <button
                          onClick={() => handleReject(user.id)}
                          style={{
                            padding: '8px 16px',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: 8,
                            cursor: 'pointer',
                            fontWeight: 600,
                          }}
                        >
                          رفض
                        </button>
                      )}
                      {user.status === 'rejected' && (
                        <button
                          onClick={() => handleApprove(user.id)}
                          style={{
                            padding: '8px 16px',
                            background: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: 8,
                            cursor: 'pointer',
                            fontWeight: 600,
                          }}
                        >
                          قبول
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
    </div>
  );
}
