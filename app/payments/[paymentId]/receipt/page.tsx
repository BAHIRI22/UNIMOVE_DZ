'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Printer, Download, CheckCircle, QrCode } from 'lucide-react';
import { QRCodeDisplay } from '@/components/QRCodeDisplay';

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

export default function ReceiptPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { language, isRTL } = useLanguage();
  const isAr = language === 'ar';

  const paymentId = params?.paymentId as string;
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !paymentId) {
      setLoading(false);
      return;
    }

    const fetchPayment = async () => {
      const snap = await getDoc(doc(db, 'payments', paymentId));
      if (snap.exists()) {
        const data = { id: snap.id, ...(snap.data() as any) } as Payment;
        // Safety check: user can only see their own payments unless admin
        if (data.userId !== user.id && user.role !== 'admin') {
          router.replace('/dashboard');
          return;
        }
        setPayment(data);
      }
      setLoading(false);
    };

    fetchPayment();
  }, [user, authLoading, paymentId, router]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-emerald-400 font-bold">{isAr ? 'جاري التحميل...' : 'Chargement...'}</p>
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-10" dir={isRTL ? 'rtl' : 'ltr'}>
        <p className="text-center text-slate-400 font-bold">{isAr ? 'لم يتم العثور على الدفع.' : 'Paiement introuvable.'}</p>
      </div>
    );
  }

  const methodLabel = METHOD_LABELS[payment.paymentMethod || 'mock'] || { ar: payment.paymentMethod || '-', fr: payment.paymentMethod || '-' };
  const dateStr = payment.paidAt?.toDate
    ? new Date(payment.paidAt.toDate()).toLocaleString(isAr ? 'ar-DZ' : 'fr-FR')
    : payment.createdAt?.toDate
    ? new Date(payment.createdAt.toDate()).toLocaleString(isAr ? 'ar-DZ' : 'fr-FR')
    : '-';

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top actions */}
      <div className="max-w-2xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <Button onClick={() => router.back()} variant="outline" className="border-white/10 hover:bg-white/5 text-white font-bold h-12 rounded-xl">
          <ArrowRight className={`w-5 h-5 ${isAr ? 'ml-2 rotate-180' : 'mr-2'}`} />
          {isAr ? 'رجوع' : 'Retour'}
        </Button>
        <div className="flex gap-3">
          <Button onClick={handlePrint} variant="outline" className="border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400 font-bold h-12 rounded-xl">
            <Printer className="w-4 h-4 mr-2" />
            {isAr ? 'طباعة / PDF' : 'Imprimer / PDF'}
          </Button>
        </div>
      </div>

      {/* Receipt Card */}
      <div className="max-w-2xl mx-auto" id="receipt">
        <Card className="border-2 border-emerald-500/30 bg-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <span className="text-9xl font-black text-emerald-500 rotate-[-15deg]">UNIMOVE</span>
          </div>

          {/* Header */}
          <div className="text-center mb-10 relative">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-black text-white">UNIMOVE-DZ</h1>
            </div>
            <p className="text-emerald-400 font-bold text-lg">{isAr ? 'إيصال الدفع' : 'Reçu de paiement'}</p>
            <p className="text-slate-400 text-sm mt-1 font-mono">{payment.receiptNumber || payment.transactionRef || payment.id}</p>
          </div>

          {/* Status badge */}
          <div className="flex justify-center mb-8">
            <span className="px-4 py-1.5 rounded-full text-sm font-black bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              {payment.paymentStatus === 'paid' ? (isAr ? '✅ مدفوع' : '✅ Payé') : isAr ? '⏳ قيد الانتظار' : '⏳ En attente'}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-4">
            {[
              { label: isAr ? 'الاسم' : 'Nom', value: payment.fullName || '-' },
              { label: isAr ? 'الهاتف' : 'Téléphone', value: payment.phoneNumber || '-' },
              { label: isAr ? 'نوع المعاملة' : 'Type', value: payment.relatedType === 'booking' ? (isAr ? 'حجز رحلة' : 'Réservation') : payment.relatedType === 'subscription' ? (isAr ? 'اشتراك' : 'Abonnement') : '-' },
              { label: isAr ? 'المبلغ' : 'Montant', value: `${payment.amount} DA`, highlight: true },
              { label: isAr ? 'طريقة الدفع' : 'Méthode', value: isAr ? methodLabel.ar : methodLabel.fr },
              { label: isAr ? 'رقم المعاملة' : 'Réf. transaction', value: payment.transactionRef || '-', mono: true },
              { label: isAr ? 'التاريخ' : 'Date', value: dateStr },
            ].map((item, i) => (
              <div key={i} className={`flex justify-between items-center p-4 rounded-xl ${item.highlight ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/5 border border-white/5'}`}>
                <span className="text-sm text-slate-400 font-bold">{item.label}</span>
                <span className={`text-sm font-extrabold text-white ${item.mono ? 'font-mono' : ''} ${item.highlight ? 'text-emerald-300' : ''}`}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Real QR Code */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <QRCodeDisplay
              value={payment.receiptNumber || payment.id}
              size={120}
              className="w-32 h-32 p-3 bg-white rounded-2xl flex items-center justify-center"
            />
            <p className="text-xs text-slate-500 font-mono">{payment.receiptNumber || payment.id}</p>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-500">
              {isAr
                ? 'شكراً لثقتكم بـ UNIMOVE-DZ. هذا الإيصال صالح كدفع رسمي.'
                : 'Merci de faire confiance à UNIMOVE-DZ. Ce reçu est valable comme preuve de paiement.'}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
