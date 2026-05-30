'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { createNotification } from '@/lib/notifications';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ArrowRight, Shield, Lock, CreditCard, Smartphone, Banknote,
  CheckCircle, XCircle, Loader2, AlertTriangle, Receipt, Timer
} from 'lucide-react';

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

const METHODS = [
  { id: 'baridimob', nameAr: 'بريدي موب', nameFr: 'BaridiMob', icon: Smartphone, color: '#2563eb' },
  { id: 'edahabia', nameAr: 'الذهبية', nameFr: 'Edahabia', icon: CreditCard, color: '#dc2626' },
  { id: 'cib', nameAr: 'CIB', nameFr: 'CIB', icon: CreditCard, color: '#059669' },
  { id: 'tpe', nameAr: 'بطاقة بنكية (TPE)', nameFr: 'Carte bancaire (TPE)', icon: CreditCard, color: '#7c3aed' },
  { id: 'cash', nameAr: 'نقدي', nameFr: 'Espèces', icon: Banknote, color: '#d97706' },
];

const MOCK_OTP = '123456';

export default function PaymentCheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { language, isRTL } = useLanguage();
  const isAr = language === 'ar';

  const paymentId = params?.paymentId as string;

  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<'method' | 'form' | 'otp' | 'processing' | 'success' | 'failure'>('method');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [txnRef, setTxnRef] = useState('');
  const [rcptNum, setRcptNum] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (!user || !paymentId) {
      setLoading(false);
      return;
    }

    const fetchPayment = async () => {
      const snap = await getDoc(doc(db, 'payments', paymentId));
      if (!snap.exists()) {
        setLoading(false);
        return;
      }
      const data = { id: snap.id, ...(snap.data() as any) } as Payment;
      if (data.userId !== user.id && user.role !== 'admin') {
        router.replace('/dashboard');
        return;
      }
      setPayment(data);
      setPhone(user.phone || user.phoneNumber || '');
      setEmail((user as any).email || '');
      setLoading(false);
    };

    fetchPayment();
  }, [user, authLoading, paymentId, router]);

  const formatCardNumber = (val: string) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '').slice(0, 16);
    const parts = v.match(/\d{1,4}/g);
    return parts ? parts.join(' ') : '';
  };

  const formatExpiry = (val: string) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '').slice(0, 4);
    if (v.length >= 2) return v.slice(0, 2) + ' / ' + v.slice(2);
    return v;
  };

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setErrorMsg('');
    if (methodId === 'cash') {
      setStep('processing');
      simulateCashPayment();
    } else if (['edahabia', 'cib', 'tpe'].includes(methodId)) {
      setStep('form');
    } else if (methodId === 'baridimob') {
      setStep('otp');
    }
  };

  const handleCardSubmit = () => {
    setErrorMsg('');
    if (cardNumber.replace(/\s/g, '').length < 16) {
      setErrorMsg(isAr ? 'رقم البطاقة غير صحيح' : 'Numéro de carte invalide');
      return;
    }
    if (!cardHolder.trim()) {
      setErrorMsg(isAr ? 'اسم حامل البطاقة مطلوب' : 'Nom du titulaire requis');
      return;
    }
    if (expiry.replace(/[^0-9]/g, '').length < 4) {
      setErrorMsg(isAr ? 'تاريخ الانتهاء غير صحيح' : 'Date d\'expiration invalide');
      return;
    }
    if (cvv.length < 3) {
      setErrorMsg(isAr ? 'CVV غير صحيح' : 'CVV invalide');
      return;
    }
    // Demo failure simulation for expired card
    if (expiry.startsWith('00') || expiry.startsWith('01')) {
      setStep('failure');
      return;
    }
    setStep('otp');
  };

  const handleOtpSubmit = () => {
    setErrorMsg('');
    if (otp !== MOCK_OTP) {
      setErrorMsg(isAr ? 'رمز OTP غير صحيح' : 'Code OTP incorrect');
      setStep('failure');
      return;
    }
    setStep('processing');
    simulateCardPayment();
  };

  const simulateCashPayment = async () => {
    if (!payment || !user) return;
    await new Promise((r) => setTimeout(r, 1500));
    const ref = `SATIM-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const rcpt = `RCPT-${Date.now()}`;
    setTxnRef(ref);
    setRcptNum(rcpt);
    await finalizePayment(ref, rcpt, 'cash');
    setStep('success');
  };

  const simulateCardPayment = async () => {
    if (!payment || !user) return;
    await new Promise((r) => setTimeout(r, 2000));
    const ref = `SATIM-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const rcpt = `RCPT-${Date.now()}`;
    setTxnRef(ref);
    setRcptNum(rcpt);
    await finalizePayment(ref, rcpt, selectedMethod);
    setStep('success');
  };

  const finalizePayment = async (ref: string, rcpt: string, method: string) => {
    if (!payment || !user) return;
    try {
      await updateDoc(doc(db, 'payments', payment.id), {
        paymentStatus: 'paid',
        paymentMethod: method,
        paidAt: serverTimestamp(),
        transactionRef: ref,
        receiptNumber: rcpt,
      });

      if (payment.relatedType === 'booking' && payment.relatedId) {
        await updateDoc(doc(db, 'bookings', payment.relatedId), { paymentStatus: 'paid' });
      }
      if (payment.relatedType === 'subscription' && payment.relatedId) {
        await updateDoc(doc(db, 'subscriptions', payment.relatedId), { paymentStatus: 'paid', status: 'active' });
      }

      await createNotification({
        userId: user.id,
        titleAr: 'تم الدفع بنجاح ✅',
        titleFr: 'Paiement réussi ✅',
        messageAr: `تم تأكيد دفعك بمبلغ ${payment.amount} DZD. رقم العملية: ${ref}`,
        messageFr: `Votre paiement de ${payment.amount} DZD a été confirmé. Réf : ${ref}`,
        type: 'system',
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getFailureReason = () => {
    if (expiry.startsWith('00') || expiry.startsWith('01')) return isAr ? 'البطاقة منتهية الصلاحية' : 'Carte expirée';
    if (otp && otp !== MOCK_OTP) return isAr ? 'رمز OTP غير صحيح' : 'Code OTP incorrect';
    return isAr ? 'تم رفض الدفع من قبل البنك' : 'Paiement refusé par la banque';
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

  if (!payment) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <Card className="p-10 border-2 border-red-500/20 bg-black/40 rounded-2xl text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-lg font-bold">{isAr ? 'العملية غير موجودة' : 'Transaction introuvable'}</p>
        </Card>
      </div>
    );
  }

  const methodInfo = METHODS.find((m) => m.id === selectedMethod);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <Lock className="w-3 h-3" />
            {isAr ? 'بوابة دفع آمنة' : 'Passerelle de paiement sécurisée'}
          </div>
          <h1 className="text-2xl font-black">{isAr ? 'إتمام الدفع' : 'Finaliser le paiement'}</h1>
          <p className="text-sm text-slate-400 font-bold">
            {isAr ? 'المبلغ المطلوب:' : 'Montant à payer:'}{' '}
            <span className="text-emerald-400 text-xl">{payment.amount} {payment.currency || 'DZD'}</span>
          </p>
        </div>

        {/* Security badges */}
        <div className="flex justify-center gap-3 flex-wrap">
          <span className="flex items-center gap-1 text-[10px] text-slate-400 bg-white/5 px-2 py-1 rounded-lg border border-white/10">
            <Shield className="w-3 h-3 text-emerald-400" /> SSL Protected
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-400 bg-white/5 px-2 py-1 rounded-lg border border-white/10">
            <Lock className="w-3 h-3 text-emerald-400" /> {isAr ? 'معاملة مشفرة' : 'Transaction chiffrée'}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-400 bg-white/5 px-2 py-1 rounded-lg border border-white/10">
            🔒 CIB / EDAHABIA Secure Gateway
          </span>
        </div>

        {/* Step 1: Method Selection */}
        {step === 'method' && (
          <Card className="p-6 border-2 border-emerald-500/10 bg-black/40 backdrop-blur-md rounded-2xl space-y-4">
            <h2 className="text-lg font-black text-emerald-400">{isAr ? 'اختر طريقة الدفع' : 'Choisissez un mode de paiement'}</h2>
            <div className="grid gap-3">
              {METHODS.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleMethodSelect(m.id)}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${m.color}20` }}>
                      <Icon className="w-5 h-5" style={{ color: m.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white text-sm">{isAr ? m.nameAr : m.nameFr}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>
                );
              })}
            </div>
          </Card>
        )}

        {/* Step 2: Card Form */}
        {step === 'form' && methodInfo && (
          <Card className="p-6 border-2 border-emerald-500/10 bg-black/40 backdrop-blur-md rounded-2xl space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${methodInfo.color}20` }}>
                <methodInfo.icon className="w-5 h-5" style={{ color: methodInfo.color }} />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">{isAr ? methodInfo.nameAr : methodInfo.nameFr}</h2>
                <p className="text-xs text-slate-400">{isAr ? 'أدخل بيانات البطاقة' : 'Saisissez les informations de la carte'}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-xs text-slate-400 font-bold mb-1 block">{isAr ? 'رقم البطاقة' : 'Numéro de carte'}</Label>
                <Input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="bg-slate-900 border-white/10 text-white font-mono tracking-widest"
                  maxLength={19}
                />
              </div>
              <div>
                <Label className="text-xs text-slate-400 font-bold mb-1 block">{isAr ? 'اسم حامل البطاقة' : 'Nom du titulaire'}</Label>
                <Input
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                  placeholder={isAr ? 'NOM PRENOM' : 'NOM PRENOM'}
                  className="bg-slate-900 border-white/10 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-slate-400 font-bold mb-1 block">{isAr ? 'تاريخ الانتهاء' : 'Expiration'}</Label>
                  <Input
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM / YY"
                    className="bg-slate-900 border-white/10 text-white font-mono"
                    maxLength={7}
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-400 font-bold mb-1 block">CVV</Label>
                  <Input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="XXX"
                    type="password"
                    className="bg-slate-900 border-white/10 text-white font-mono"
                    maxLength={3}
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs text-slate-400 font-bold mb-1 block">{isAr ? 'رقم الهاتف' : 'Téléphone'}</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XX XX XX XX"
                  className="bg-slate-900 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-400 font-bold mb-1 block">{isAr ? 'البريد الإلكتروني' : 'Email'}</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemple.dz"
                  className="bg-slate-900 border-white/10 text-white"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                <AlertTriangle className="w-4 h-4" />
                {errorMsg}
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={() => setStep('method')} variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5">
                {isAr ? 'رجوع' : 'Retour'}
              </Button>
              <Button onClick={handleCardSubmit} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                {isAr ? 'التأكيد والمتابعة' : 'Continuer'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
              <Lock className="w-3 h-3" />
              {isAr ? 'بياناتك مشفرة ومحمية بمعايير الأمان المصرفي' : 'Vos données sont chiffrées selon les standards bancaires'}
            </div>
          </Card>
        )}

        {/* Step 3: OTP */}
        {step === 'otp' && (
          <Card className="p-6 border-2 border-emerald-500/10 bg-black/40 backdrop-blur-md rounded-2xl space-y-4">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-lg font-black text-white">{isAr ? 'التحقق بخطوتين' : 'Vérification en deux étapes'}</h2>
              <p className="text-xs text-slate-400">
                {isAr ? 'أدخل الرمز المكون من 6 أرقام المرسل إلى هاتفك' : 'Entrez le code OTP à 6 chiffres envoyé à votre téléphone'}
              </p>
            </div>

            <div className="flex justify-center gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={otp[i] || ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (!val) return;
                    const newOtp = otp.split('');
                    newOtp[i] = val;
                    setOtp(newOtp.join('').slice(0, 6));
                    if (i < 5) {
                      const next = e.target.parentElement?.querySelectorAll('input')[i + 1] as HTMLInputElement;
                      next?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !otp[i] && i > 0) {
                      const prev = (e.target as HTMLInputElement).parentElement?.querySelectorAll('input')[i - 1] as HTMLInputElement;
                      prev?.focus();
                    }
                  }}
                  className="w-10 h-12 bg-slate-900 border border-white/10 rounded-lg text-center text-white font-black text-lg focus:border-emerald-500 focus:outline-none"
                />
              ))}
            </div>
            <p className="text-[10px] text-center text-slate-500">
              {isAr ? 'رمز التجريبي:' : 'Code démo:'} <span className="text-emerald-400 font-bold">{MOCK_OTP}</span>
            </p>

            {errorMsg && (
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                <AlertTriangle className="w-4 h-4" />
                {errorMsg}
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={() => setStep(selectedMethod === 'baridimob' ? 'method' : 'form')} variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5">
                {isAr ? 'رجوع' : 'Retour'}
              </Button>
              <Button onClick={handleOtpSubmit} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                {isAr ? 'تحقق' : 'Vérifier'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </Card>
        )}

        {/* Processing */}
        {step === 'processing' && (
          <Card className="p-10 border-2 border-emerald-500/10 bg-black/40 backdrop-blur-md rounded-2xl text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-400 mx-auto" />
            <h2 className="text-xl font-black text-white">{isAr ? 'جاري معالجة الدفع...' : 'Traitement du paiement...'}</h2>
            <p className="text-sm text-slate-400">{isAr ? 'يرجى عدم إغلاق هذه الصفحة' : 'Veuillez ne pas fermer cette page'}</p>
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full animate-pulse" style={{ width: '60%' }} />
            </div>
          </Card>
        )}

        {/* Success */}
        {step === 'success' && (
          <Card className="p-8 border-2 border-emerald-500/20 bg-emerald-950/20 backdrop-blur-md rounded-2xl text-center space-y-5">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-emerald-400">{isAr ? 'تم قبول عملية الدفع' : 'Paiement accepté'}</h2>
              <p className="text-sm text-slate-400 mt-1">{isAr ? 'تمت العملية بنجاح' : 'Transaction réussie'}</p>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-white/10 space-y-2 text-left">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">{isAr ? 'رقم العملية' : 'Référence'}</span>
                <span className="font-mono font-bold text-emerald-400">{txnRef}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">{isAr ? 'المبلغ' : 'Montant'}</span>
                <span className="font-bold text-white">{payment.amount} DZD</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">{isAr ? 'الطريقة' : 'Méthode'}</span>
                <span className="font-bold text-white">{METHODS.find((m) => m.id === selectedMethod)?.nameFr || selectedMethod}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">{isAr ? 'التاريخ' : 'Date'}</span>
                <span className="font-bold text-white">{new Date().toLocaleDateString(isAr ? 'ar-DZ' : 'fr-FR')}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={() => router.push(`/payments/${payment.id}/receipt`)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl">
                <Receipt className="w-5 h-5 mr-2" />
                {isAr ? 'عرض الإيصال' : 'Voir le reçu'}
              </Button>
              <Button onClick={() => router.push('/dashboard')} variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 font-bold h-12 rounded-xl">
                {isAr ? 'الرئيسية' : 'Accueil'}
              </Button>
            </div>
          </Card>
        )}

        {/* Failure */}
        {step === 'failure' && (
          <Card className="p-8 border-2 border-red-500/20 bg-red-950/10 backdrop-blur-md rounded-2xl text-center space-y-5">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-red-400">{isAr ? 'عملية الدفع مرفوضة' : 'Paiement refusé'}</h2>
              <p className="text-sm text-slate-400 mt-1">{getFailureReason()}</p>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-white/10 space-y-2 text-left">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">{isAr ? 'المبلغ' : 'Montant'}</span>
                <span className="font-bold text-white">{payment.amount} DZD</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">{isAr ? 'الحالة' : 'Statut'}</span>
                <span className="font-bold text-red-400">{isAr ? 'مرفوض' : 'Refusé'}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={() => { setStep('method'); setErrorMsg(''); setOtp(''); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl">
                <ArrowRight className="w-5 h-5 mr-2" />
                {isAr ? 'إعادة المحاولة' : 'Réessayer'}
              </Button>
              <Button onClick={() => router.push('/payments')} variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 font-bold h-12 rounded-xl">
                {isAr ? 'مدفوعاتي' : 'Mes paiements'}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
