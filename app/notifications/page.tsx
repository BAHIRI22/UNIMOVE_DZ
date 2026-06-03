'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  Check,
  CheckCheck,
  CheckCircle,
  XCircle,
  FileCheck,
  Calendar,
  AlertTriangle,
  Info,
  ChevronLeft,
  Trash2,
} from 'lucide-react';
import { markNotificationAsRead, markAllNotificationsAsRead } from '@/lib/notifications';
import { useRouter } from 'next/navigation';

interface Notification {
  id: string;
  userId: string;
  titleAr: string;
  titleFr: string;
  messageAr: string;
  messageFr: string;
  type: string;
  read: boolean;
  createdAt?: { seconds: number };
}

export default function NotificationsPage() {
  const { language, isRTL } = useLanguage();
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace('/login');
      return;
    }

    const isAdminUser = user.role === 'admin' || user.role === 'superadmin';
    const userIdsToQuery = isAdminUser ? [user.id, 'admin'] : [user.id];

    let unsub: (() => void) | null = null;
    const subscribe = (ordered: boolean) => {
      const col = collection(db, 'notifications');
      const q = ordered
        ? (isAdminUser
            ? query(col, where('userId', 'in', userIdsToQuery), orderBy('createdAt', 'desc'))
            : query(col, where('userId', '==', user.id), orderBy('createdAt', 'desc')))
        : (isAdminUser
            ? query(col, where('userId', 'in', userIdsToQuery))
            : query(col, where('userId', '==', user.id)));

      unsub = onSnapshot(
        q,
        (snapshot) => {
          const raw: Notification[] = [];
          snapshot.forEach((d) => {
            raw.push({ id: d.id, ...(d.data() as any) } as Notification);
          });
          let hiddenLocal: string[] = [];
          if (typeof window !== 'undefined') {
            try { hiddenLocal = JSON.parse(localStorage.getItem(`hidden_notifications_${user.id}`) || '[]'); } catch {}
          }
          const items = raw.filter((n: any) => (!Array.isArray((n as any).hiddenFor) || !(n as any).hiddenFor.includes(user.id)) && !hiddenLocal.includes((n as any).id));
          items.sort((a, b) => {
            if (a.read === b.read) {
              return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
            }
            return a.read ? 1 : -1;
          });
          setNotifications(items);
          setLoading(false);
        },
        (error) => {
          const code = (error as any)?.code || '';
          const msg = (error as any)?.message || '';
          if (ordered && (code === 'failed-precondition' || msg.includes('index'))) {
            console.warn('[Notifications Page] Missing Firestore index. Falling back without orderBy(createdAt).');
            try { unsub && unsub(); } catch {}
            subscribe(false);
            return;
          }
          console.error('[Notifications Page] Error fetching notifications:', error);
          setLoading(false);
        }
      );
    };

    subscribe(true);
    return () => { if (unsub) unsub(); };
  }, [authLoading, user, router]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!user) return;
    try {
      await markAllNotificationsAsRead(user.id);
    } catch (e) {
      console.error(e);
    }
  };

  const [deletingIds, setDeletingIds] = useState<string[]>([]);
  const handleDelete = async (id: string) => {
    if (!user) return;
    setDeletingIds((prev) => Array.from(new Set([...prev, id])));
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    const ref = doc(db, 'notifications', id);
    try {
      await deleteDoc(ref);
    } catch (e: any) {
      try {
        await updateDoc(ref, { hiddenFor: arrayUnion(user.id), read: true });
      } catch (e2) {
        try {
          if (typeof window !== 'undefined') {
            const k = `hidden_notifications_${user.id}`;
            const arr = JSON.parse(localStorage.getItem(k) || '[]');
            if (!Array.isArray(arr)) {
              localStorage.setItem(k, JSON.stringify([id]));
            } else if (!arr.includes(id)) {
              arr.push(id);
              localStorage.setItem(k, JSON.stringify(arr));
            }
          }
        } catch {}
      }
    } finally {
      setDeletingIds((prev) => prev.filter((x) => x !== id));
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'account_approved':
        return <CheckCircle className="h-6 w-6 text-emerald-600" />;
      case 'account_rejected':
        return <XCircle className="h-6 w-6 text-rose-600" />;
      case 'document_uploaded':
        return <FileCheck className="h-6 w-6 text-blue-600" />;
      case 'booking_created':
      case 'booking_approved':
      case 'booking_rejected':
        return <Calendar className="h-6 w-6 text-indigo-600" />;
      case 'subscription_expiring':
        return <AlertTriangle className="h-6 w-6 text-amber-600" />;
      default:
        return <Info className="h-6 w-6 text-slate-600" />;
    }
  };

  const getNotificationBg = (type: string, read: boolean) => {
    if (read) return 'bg-white border-slate-200';
    switch (type) {
      case 'account_approved':
        return 'bg-emerald-50/70 border-emerald-100 hover:bg-emerald-50';
      case 'account_rejected':
        return 'bg-rose-50/70 border-rose-100 hover:bg-rose-50';
      case 'subscription_expiring':
        return 'bg-amber-50/70 border-amber-100 hover:bg-amber-50';
      default:
        return 'bg-slate-50/80 border-slate-100 hover:bg-slate-50';
    }
  };

  if (authLoading || loading) {
    return (
      <DashboardLayout role="user">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
        </div>
      </DashboardLayout>
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DashboardLayout role="user">
      <div className="max-w-4xl mx-auto space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <Bell className="h-10 w-10 text-emerald-600" />
              {language === 'ar' ? 'الإشعارات' : 'Notifications'}
            </h1>
            <p className="text-slate-500 font-semibold text-base">
              {language === 'ar'
                ? 'تابع حالة حسابك وتنبيهات الحجز والاشتراك'
                : 'Suivez le statut de votre compte, réservations et abonnements'}
            </p>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {unreadCount > 0 && (
              <Button
                onClick={handleMarkAllAsRead}
                variant="outline"
                className="h-11 rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-bold gap-2"
              >
                <CheckCheck className="h-5 w-5" />
                {language === 'ar' ? 'تحديد الكل كمقروء' : 'Tout marquer comme lu'}
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard')}
              className="h-11 rounded-xl font-bold gap-2"
            >
              <ChevronLeft className="h-5 w-5 rotate-180" />
              {language === 'ar' ? 'الرئيسية' : 'Dashboard'}
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <Card className="p-16 text-center border border-dashed border-slate-300 rounded-[2rem] bg-slate-50">
            <div className="mx-auto w-20 h-20 bg-slate-200 rounded-3xl flex items-center justify-center mb-6">
              <Bell className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-700">
              {language === 'ar' ? 'لا توجد إشعارات حالياً' : 'Aucune notification pour le moment'}
            </h3>
            <p className="text-slate-500 mt-2 font-semibold">
              {language === 'ar' ? 'سنقوم بإعلامك فور وجود أي تحديث جديد.' : 'Nous vous informerons dès qu\'il y aura du nouveau.'}
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((n) => (
              <Card
                key={n.id}
                className={`p-6 border-2 transition rounded-3xl flex items-start gap-4 shadow-sm hover:shadow-md ${getNotificationBg(
                  n.type,
                  n.read
                )}`}
              >
                <div className="p-3 bg-white rounded-2xl border border-slate-100 flex-shrink-0 shadow-sm">
                  {getNotificationIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className={`text-lg font-extrabold truncate ${n.read ? 'text-slate-700' : 'text-slate-900'}`}>
                      {language === 'ar' ? n.titleAr : n.titleFr}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!n.read && (
                        <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-full">
                          {language === 'ar' ? 'جديد' : 'Nouveau'}
                        </Badge>
                      )}
                      <span className="text-xs font-semibold text-slate-400">
                        {n.createdAt?.seconds
                          ? new Date(n.createdAt.seconds * 1000).toLocaleDateString(
                              language === 'ar' ? 'ar-DZ' : 'fr-FR',
                              { hour: '2-digit', minute: '2-digit' }
                            )
                          : ''}
                      </span>
                    </div>
                  </div>
                  <p className={`text-base leading-6 font-semibold ${n.read ? 'text-slate-500' : 'text-slate-700'}`}>
                    {language === 'ar' ? n.messageAr : n.messageFr}
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    {!n.read && (
                      <Button
                        onClick={() => handleMarkAsRead(n.id)}
                        variant="ghost"
                        size="sm"
                        className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50/50 h-8 px-3 font-bold rounded-xl"
                      >
                        <Check className="h-4 w-4 mr-1 ml-1" />
                        {language === 'ar' ? 'تحديد كمقروء' : 'Marquer comme lu'}
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(n.id)}
                      variant="ghost"
                      size="sm"
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50/50 h-8 px-3 font-bold rounded-xl"
                    >
                      <Trash2 className="h-4 w-4 mr-1 ml-1" />
                      {language === 'ar' ? 'حذف' : 'Supprimer'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
