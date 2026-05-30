'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { createNotification } from '@/lib/notifications';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, CheckCircle, XCircle, Clock, Receipt, Loader2, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Payment {
  id: string;
  paymentId?: string;
  userId: string;
  fullName?: string;
  phoneNumber?: string;
  relatedType?: string;
  relatedId?: string;
  amount: number;
  currency?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  transactionRef?: string;
  receiptNumber?: string;
  createdAt?: any;
  paidAt?: any;
}

const METHOD_LABELS: Record<string, { ar: string; fr: string }> = {
  cash: { ar: 'نقدي', fr: 'Espèces' },
  tpe: { ar: 'بطاقة بنكية (TPE)', fr: 'Carte bancaire (TPE)' },
  baridimob: { ar: 'بريدي موب', fr: 'BaridiMob' },
  cib: { ar: 'CIB', fr: 'CIB' },
  edahabia: { ar: 'الذهبية', fr: 'Edahabia' },
  mock: { ar: 'دفع تجريبي', fr: 'Paiement test' },
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  paid: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  failed: 'bg-red-500/15 text-red-300 border-red-500/30',
  cancelled: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  refunded: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
};

const STATUS_LABELS_AR: Record<string, string> = {
  pending: 'قيد الانتظار',
  paid: 'مدفوع',
  failed: 'فاشل',
  cancelled: 'ملغى',
  refunded: 'مسترجع',
};

const STATUS_LABELS_FR: Record<string, string> = {
  pending: 'En attente',
  paid: 'Payé',
  failed: 'Échoué',
  cancelled: 'Annulé',
  refunded: 'Remboursé',
};

export default function PaymentsPage() {
  const { language, isRTL } = useLanguage();
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const isAr = language === 'ar';

  const [payments, setPayments] = useState<Payment[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'paid' | 'failed'>('pending');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'payments'),
      where('userId', '==', user.id),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const items: Payment[] = [];
        snap.forEach((doc) => items.push({ id: doc.id, ...(doc.data() as any) }));
        setPayments(items);
        setLoading(false);
      },
      (err) => {
        console.error('[Payments] error:', err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [user?.id, authLoading]);

  const filtered = payments.filter((p) => {
    if (activeTab === 'pending') return p.paymentStatus === 'pending';
    if (activeTab === 'paid') return p.paymentStatus === 'paid';
    if (activeTab === 'failed') return ['failed', 'cancelled', 'refunded'].includes(p.paymentStatus || '');
    return true;
  });

  const handleMockPay = async (payment: Payment) => {
    if (!user?.id) return;
    setProcessingId(payment.id);
    try {
      const txnRef = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      const rcptNum = `RCPT-${Date.now()}`;

      await updateDoc(doc(db, 'payments', payment.id), {
        paymentStatus: 'paid',
        paidAt: serverTimestamp(),
        transactionRef: txnRef,
        receiptNumber: rcptNum,
      });

      // Update related booking if applicable
      if (payment.relatedType === 'booking' && payment.relatedId) {
        await updateDoc(doc(db, 'bookings', payment.relatedId), {
          paymentStatus: 'paid',
        });
      }

      // Notify user
      await createNotification({
        userId: user.id,
        titleAr: 'تم الدفع بنجاح ✅',
        titleFr: 'Paiement réussi ✅',
        messageAr: `تم تأكيد دفعك بمبلغ ${payment.amount} DZD. رقم العملية: ${txnRef}`,
        messageFr: `Votre paiement de ${payment.amount} DZD a été confirmé. Réf : ${txnRef}`,
        type: 'system',
      });

      // Notify admin
      await createNotification({
        userId: 'admin',
        titleAr: 'دفع جديد مقبول 💳',
        titleFr: 'Nouveau paiement reçu 💳',
        messageAr: `قام ${payment.fullName || 'مستخدم'} بدفع ${payment.amount} DZD (${payment.relatedType}).`,
        messageFr: `${payment.fullName || 'Utilisateur'} a payé ${payment.amount} DZD (${payment.relatedType}).`,
        type: 'system',
      });
    } catch (e) {
      console.error('[Payments] mock pay error:', e);
    } finally {
      setProcessingId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-500 mx-auto" />
          <p className="mt-4 text-emerald-400 font-bold">{isAr ? 'جاري التحميل...' : 'Chargement...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-emerald-400" />
              {isAr ? 'مدفوعاتي' : 'Mes paiements'}
            </h1>
            <p className="text-emerald-400/70 font-bold mt-1">
              {isAr ? 'إدارة واستعراض جميع معاملاتك المالية' : 'Gérez et consultez toutes vos transactions'}
            </p>
          </div>
          <Button onClick={() => router.push('/dashboard')} variant="outline" className="border-white/10 hover:bg-white/5 text-white font-bold h-12 rounded-xl">
            <ArrowRight className={`w-5 h-5 ${isAr ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {isAr ? 'رجوع' : 'Retour'}
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Tabs */}
        <div className="flex gap-3 flex-wrap">
          {(['pending', 'paid', 'failed'] as const).map((tab) => {
            const count = payments.filter((p) =>
              tab === 'pending' ? p.paymentStatus === 'pending' : tab === 'paid' ? p.paymentStatus === 'paid' : ['failed', 'cancelled', 'refunded'].includes(p.paymentStatus || '')
            ).length;
            const isActive = activeTab === tab;
            const tabLabel =
              tab === 'pending' ? (isAr ? 'قيد الانتظار' : 'En attente') : tab === 'paid' ? (isAr ? 'مدفوعة' : 'Payés') : (isAr ? 'فاشلة / ملغاة' : 'Échoués / Annulés');
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition border ${
                  isActive
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {tabLabel}
                {count > 0 && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-black ${isActive ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-300'}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Payment list */}
        {filtered.length === 0 ? (
          <Card className="p-10 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl text-center">
            <AlertTriangle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-400">
              {isAr ? 'لا توجد مدفوعات في هذا القسم.' : 'Aucun paiement dans cette section.'}
            </p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filtered.map((p) => {
              const methodLabel = METHOD_LABELS[p.paymentMethod || 'mock'] || { ar: p.paymentMethod || '-', fr: p.paymentMethod || '-' };
              const statusLabel = isAr ? STATUS_LABELS_AR[p.paymentStatus || 'pending'] : STATUS_LABELS_FR[p.paymentStatus || 'pending'];
              const statusClass = STATUS_COLORS[p.paymentStatus || 'pending'];
              const isPending = p.paymentStatus === 'pending';

              return (
                <Card key={p.id} className="p-5 border-2 border-emerald-500/10 bg-black/40 backdrop-blur-md rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-black border ${statusClass}`}>
                        {statusLabel}
                      </span>
                      <span className="text-xs opacity-50 font-mono">{p.paymentId || p.id}</span>
                    </div>
                    <p className="text-lg font-extrabold text-white">
                      {p.amount} {p.currency || 'DZD'}
                    </p>
                    <p className="text-xs text-slate-400 font-semibold">
                      {isAr
                        ? `${methodLabel.ar} • ${p.relatedType === 'booking' ? 'حجز رحلة' : p.relatedType === 'subscription' ? 'اشتراك' : p.relatedType || '-'}`
                        : `${methodLabel.fr} • ${p.relatedType === 'booking' ? 'Réservation' : p.relatedType === 'subscription' ? 'Abonnement' : p.relatedType || '-'}`}
                    </p>
                    <p className="text-[10px] opacity-50 font-semibold">
                      {p.createdAt?.toDate ? new Date(p.createdAt.toDate()).toLocaleString(isAr ? 'ar-DZ' : 'fr-FR') : '-'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {isPending && (
                      <Button
                        onClick={() => router.push(`/payments/${p.id}`)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 rounded-xl text-xs px-4"
                      >
                        <CreditCard className="w-4 h-4 mr-1" />
                        {isAr ? 'دفع الآن' : 'Payer maintenant'}
                      </Button>
                    )}
                    {p.paymentStatus === 'paid' && (
                      <Button
                        onClick={() => router.push(`/payments/${p.id}/receipt`)}
                        variant="outline"
                        className="border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400 font-bold h-10 rounded-xl text-xs px-4"
                      >
                        <Receipt className="w-4 h-4 mr-1" />
                        {isAr ? 'عرض الإيصال' : 'Voir le reçu'}
                      </Button>
                    )}
                    {['failed', 'cancelled', 'refunded'].includes(p.paymentStatus || '') && (
                      <span className="flex items-center gap-1 text-xs text-red-400 font-bold">
                        <XCircle className="w-4 h-4" />
                        {isAr ? 'غير ناجح' : 'Non abouti'}
                      </span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
