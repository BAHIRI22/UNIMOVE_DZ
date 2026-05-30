'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Check,
  Crown,
  Lock,
  Loader2,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { createNotification } from '@/lib/notifications';
import { motion } from 'framer-motion';

interface Plan {
  type: 'daily' | 'weekly' | 'monthly' | 'semester' | 'yearly';
  nameAr: string;
  nameFr: string;
  price: number;
  durationDays: number;
  benefitsAr: string[];
  benefitsFr: string[];
  isPopular?: boolean;
}

const PLANS: Plan[] = [
  {
    type: 'daily',
    nameAr: 'اشتراك يومي',
    nameFr: 'Abonnement Journalier',
    price: 100,
    durationDays: 1,
    benefitsAr: ['رحلات غير محدودة لمدة يوم واحد', 'اتصال WiFi مجاني وسريع', 'صعود أولوية'],
    benefitsFr: ['Trajets illimités pendant 1 jour', 'Accès WiFi gratuit', 'Embarquement prioritaire'],
  },
  {
    type: 'weekly',
    nameAr: 'اشتراك أسبوعي',
    nameFr: 'Abonnement Hebdomadaire',
    price: 500,
    durationDays: 7,
    benefitsAr: ['رحلات غير محدودة لمدة 7 أيام', 'اتصال WiFi مجاني وسريع', 'صعود أولوية', 'حجز مقعد مجاني'],
    benefitsFr: ['Trajets illimités pendant 7 jours', 'Accès WiFi gratuit', 'Embarquement prioritaire', 'Réservation de siège gratuite'],
  },
  {
    type: 'monthly',
    nameAr: 'اشتراك شهري',
    nameFr: 'Abonnement Mensuel',
    price: 1500,
    durationDays: 30,
    benefitsAr: ['رحلات غير محدودة لمدة 30 يوم', 'اتصال WiFi مجاني وسريع', 'صعود أولوية', 'حجز مقعد مجاني', 'دعم فني مخصص'],
    benefitsFr: ['Trajets illimités pendant 30 jours', 'Accès WiFi gratuit', 'Embarquement prioritaire', 'Réservation de siège gratuite', 'Support dédié'],
    isPopular: true,
  },
  {
    type: 'semester',
    nameAr: 'اشتراك سداسي',
    nameFr: 'Abonnement Semestriel',
    price: 6000,
    durationDays: 180,
    benefitsAr: ['رحلات غير محدودة لمدة 180 يوم', 'اتصال WiFi مجاني وسريع', 'صعود أولوية', 'حجز مقعد مجاني', 'دعم فني مخصص VIP', 'تأمين سفر مشمول'],
    benefitsFr: ['Trajets illimités pendant 180 jours', 'Accès WiFi gratuit', 'Embarquement prioritaire', 'Réservation de siège gratuite', 'Support VIP', 'Assurance incluse'],
  },
  {
    type: 'yearly',
    nameAr: 'اشتراك سنوي',
    nameFr: 'Abonnement Annuel',
    price: 10000,
    durationDays: 365,
    benefitsAr: ['رحلات غير محدودة لمدة 365 يوم', 'وفر أكثر من 40٪', 'اتصال WiFi مجاني وسريع', 'صعود أولوية', 'حجز مقعد مجاني', 'دعم فني مخصص VIP', 'تأمين سفر مشمول'],
    benefitsFr: ['Trajets illimités pendant 365 jours', 'Économisez plus de 40%', 'Accès WiFi gratuit', 'Embarquement prioritaire', 'Réservation de siège gratuite', 'Support VIP', 'Assurance incluse'],
  },
];

export default function SubscriptionsPage() {
  const { language, isRTL } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [pendingSubId, setPendingSubId] = useState<string | null>(null);
  const [pendingPaymentId, setPendingPaymentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selecting, setSelecting] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isVerified =
    user?.verified === true ||
    (user as any)?.verificationStatus === 'approved' ||
    (user as any)?.verificationStatus === 'verified';
  const isApproved = user?.status === 'approved' || (user as any)?.accountStatus === 'active';
  const isFullyActive = isVerified && isApproved;

  const syncLocalUser = (updates: Record<string, any>) => {
    if (typeof window === 'undefined') return;
    const keys = ['unimove_current_user'];
    if (user?.phoneNumber) keys.push(`user_${user.phoneNumber}`);
    if (user?.phone) keys.push(`user_${user.phone}`);

    keys.forEach((key) => {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      try {
        localStorage.setItem(key, JSON.stringify({ ...JSON.parse(raw), ...updates }));
      } catch (e) {}
    });
  };

  const handleSelectPlan = async (plan: Plan) => {
    if (!user?.id || !isFullyActive) return;
    
    setSelecting(plan.type);
    try {
      // 1. Create a subscription with pending and unpaid status
      const docRef = await addDoc(collection(db, 'subscriptions'), {
        userId: user.id,
        userPhone: user.phone || user.phoneNumber || '',
        fullName: user.fullName || '',
        planType: plan.type,
        planNameAr: plan.nameAr,
        planNameFr: plan.nameFr,
        price: plan.price,
        durationDays: plan.durationDays,
        status: 'pending',
        paymentStatus: 'unpaid',
        createdAt: serverTimestamp(),
      });

      // 1b. Create a pending payment record (Phase 14)
      const paymentRef = await addDoc(collection(db, 'payments'), {
        paymentId: `PAY-${Date.now()}`,
        userId: user.id,
        fullName: user.fullName || '',
        phoneNumber: user.phone || user.phoneNumber || '',
        relatedType: 'subscription',
        relatedId: docRef.id,
        amount: plan.price,
        currency: 'DZD',
        paymentMethod: 'mock',
        paymentStatus: 'pending',
        createdAt: serverTimestamp(),
      });

      setPendingSubId(docRef.id);
      setPendingPaymentId(paymentRef.id);
      setSelectedPlan(plan);
      console.log('[Subscriptions] Created pending subscription:', docRef.id, 'payment:', paymentRef.id);
      // Redirect to professional checkout page
      router.push(`/payments/${paymentRef.id}`);
    } catch (e) {
      console.error('[Subscriptions] Error creating pending subscription:', e);
    } finally {
      setSelecting(null);
    }
  };

  const handleSubscribe = async () => {
    if (!user?.id || !selectedPlan || !pendingSubId) return;
    if (!isFullyActive) return;

    setLoading(true);
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + selectedPlan.durationDays);

      const startDateString = startDate.toISOString();
      const endDateString = endDate.toISOString();

      // 2. Update existing subscription record to active and paid
      await updateDoc(doc(db, 'subscriptions', pendingSubId), {
        startDate: startDateString,
        endDate: endDateString,
        status: 'active',
        paymentStatus: 'paid',
      });

      // 2b. Update payment record to paid (Phase 14)
      const txnRef = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      const rcptNum = `RCPT-${Date.now()}`;
      if (pendingPaymentId) {
        await updateDoc(doc(db, 'payments', pendingPaymentId), {
          paymentStatus: 'paid',
          paidAt: serverTimestamp(),
          transactionRef: txnRef,
          receiptNumber: rcptNum,
        });
      }

      // 3. Update user status
      await updateDoc(doc(db, 'users', user.id), {
        subscriptionStatus: 'active',
        subscriptionPlan: selectedPlan.type,
        subscriptionEndDate: endDateString,
        validUntil: endDate.toLocaleDateString('fr-FR'), // Compatibilité avec les anciennes cartes
        subscription: selectedPlan.type, // Compatibilité avec MembershipCard
      });

      // 4. Sync localStorage
      syncLocalUser({
        subscriptionStatus: 'active',
        subscriptionPlan: selectedPlan.type,
        subscriptionEndDate: endDateString,
        validUntil: endDate.toLocaleDateString('fr-FR'),
        subscription: selectedPlan.type,
      });

      // 5. Create User Notification
      await createNotification({
        userId: user.id,
        titleAr: 'تم تفعيل اشتراكك بنجاح 🎉',
        titleFr: 'Abonnement activé avec succès 🎉',
        messageAr: `شكراً لك! تم تفعيل اشتراكك (${selectedPlan.nameAr}) بنجاح وهو صالح لغاية ${endDate.toLocaleDateString('ar-DZ')}.`,
        messageFr: `Merci! Votre abonnement (${selectedPlan.nameFr}) a été activé. Il est valide jusqu'au ${endDate.toLocaleDateString('fr-FR')}.`,
        type: 'system',
      });

      // 6. Create Admin Notification
      await createNotification({
        userId: 'admin',
        userPhone: user.phone || user.phoneNumber || '',
        titleAr: 'اشتراك جديد 💳',
        titleFr: 'Nouvel abonnement 💳',
        messageAr: `قام المستخدم ${user.fullName} بتفعيل اشتراك جديد (${selectedPlan.nameAr} - ${selectedPlan.price} دج).`,
        messageFr: `L'utilisateur ${user.fullName} a activé un nouvel abonnement (${selectedPlan.nameFr} - ${selectedPlan.price} DZD).`,
        type: 'system',
        relatedEntityId: user.id,
        relatedEntityType: 'user',
      });

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('[Subscriptions Page] Error purchasing subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="user">
      <div className="max-w-7xl mx-auto space-y-10" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="text-center md:text-right space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
            {language === 'ar' ? 'باقات الاشتراك المميزة' : 'Abonnements Premium'}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-semibold max-w-2xl">
            {language === 'ar'
              ? 'اختر الباقة المناسبة لك لتفعيل بطاقتك الرقمية وبدء التنقل بحرية وأمان.'
              : 'Choisissez le forfait idéal pour activer votre carte numérique et voyager librement.'}
          </p>
        </div>

        {/* Unverified Banner Warning */}
        {!isFullyActive && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Lock className="w-7 h-7 text-amber-600" />
            </div>
            <div className="flex-1 space-y-1 text-center md:text-right">
              <h3 className="text-xl font-extrabold text-amber-900">
                {language === 'ar' ? 'يجب التحقق من حسابك قبل الاشتراك' : 'Vérification requise avant abonnement'}
              </h3>
              <p className="text-sm md:text-base font-semibold text-amber-800">
                {language === 'ar'
                  ? 'يرجى رفع وثائق التحقق الخاصة بك وانتظار موافقة الإدارة لتتمكن من تفعيل الاشتراك.'
                  : 'Veuillez soumettre vos documents et attendre la validation de l’administration pour pouvoir souscrire.'}
              </p>
            </div>
            <Button
              onClick={() => router.push('/dashboard')}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold h-11 px-6 rounded-xl"
            >
              {language === 'ar' ? 'الذهاب لرفع الوثيقة' : 'Aller au dashboard'}
            </Button>
          </div>
        )}

        {/* Success State */}
        {success ? (
          <Card className="p-12 text-center border-2 border-emerald-200 bg-emerald-50 rounded-[2rem] max-w-2xl mx-auto shadow-2xl">
            <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-2">
              {language === 'ar' ? 'تم الاشتراك بنجاح!' : 'Abonnement activé !'}
            </h3>
            <p className="text-lg font-bold text-slate-600 mb-4">
              {language === 'ar'
                ? 'تم تفعيل بطاقتك الرقمية، جاري توجيهك للرئيسية...'
                : 'Votre carte est active, redirection vers le tableau de bord...'}
            </p>
            <div className="flex items-center justify-center gap-2 text-emerald-700 font-extrabold text-sm">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}</span>
            </div>
          </Card>
        ) : (
          <div className="space-y-12">
            {/* Plans Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PLANS.map((plan) => {
                const isSelected = selectedPlan?.type === plan.type;
                return (
                  <Card
                    key={plan.type}
                    onClick={() => {
                      if (isFullyActive && !selecting) {
                        handleSelectPlan(plan);
                      }
                    }}
                    className={`relative p-8 border-2 transition-all duration-300 rounded-[2rem] flex flex-col justify-between shadow-md hover:shadow-2xl hover:-translate-y-2 ${
                      !isFullyActive
                        ? 'opacity-65 cursor-not-allowed border-slate-200 bg-slate-50'
                        : isSelected
                        ? 'border-emerald-500 bg-emerald-50/20 ring-4 ring-emerald-500/10 cursor-pointer'
                        : plan.isPopular
                        ? 'border-emerald-200 shadow-xl cursor-pointer bg-white'
                        : 'border-slate-200 cursor-pointer bg-white'
                    }`}
                  >
                    {/* Popular Badge */}
                    {plan.isPopular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white text-xs font-black px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                          <Crown className="w-4 h-4" />
                          {language === 'ar' ? 'الأكثر اختياراً' : 'Le plus populaire'}
                        </Badge>
                      </div>
                    )}

                    <div className="space-y-6">
                      {/* Plan Header */}
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl font-black text-slate-900">
                          {language === 'ar' ? plan.nameAr : plan.nameFr}
                        </h3>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-black text-emerald-600">{plan.price}</span>
                          <span className="text-lg font-extrabold text-slate-500">DA</span>
                        </div>
                        <p className="text-sm text-slate-500 font-semibold">
                          {language === 'ar' ? 'صالح لمدة' : 'Valide pour'} {plan.durationDays}{' '}
                          {plan.durationDays === 1
                            ? language === 'ar'
                              ? 'يوم'
                              : 'jour'
                            : language === 'ar'
                            ? 'يوم'
                            : 'jours'}
                        </p>
                      </div>

                      {/* Plan Benefits */}
                      <div className="space-y-3 pt-4 border-t border-slate-100">
                        {(language === 'ar' ? plan.benefitsAr : plan.benefitsFr).map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                            <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            </div>
                            <span className="leading-5">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Plan Selector Action */}
                    <div className="pt-8">
                      {isFullyActive ? (
                        <Button
                          type="button"
                          disabled={selecting !== null}
                          variant={isSelected ? 'default' : 'outline'}
                          className={`w-full h-12 rounded-xl font-bold text-base transition-all ${
                            isSelected
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg'
                              : 'border-2 border-emerald-200 hover:border-emerald-600 text-emerald-700 hover:bg-emerald-50'
                          }`}
                        >
                          {selecting === plan.type ? (
                            <span className="flex items-center gap-2">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              {language === 'ar' ? 'جاري الحفظ...' : 'Création...'}
                            </span>
                          ) : isSelected ? (
                            language === 'ar' ? 'مختار' : 'Sélectionné'
                          ) : (
                            language === 'ar' ? 'اختيار هذه الباقة' : 'Choisir ce forfait'
                          )}
                        </Button>
                      ) : (
                        <Button
                          disabled
                          type="button"
                          className="w-full h-12 rounded-xl font-bold text-base bg-slate-200 text-slate-400 cursor-not-allowed"
                        >
                          <Lock className="w-4 h-4 mr-2 ml-2" />
                          {language === 'ar' ? 'مغلق' : 'Bloqué'}
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Selected Plan Drawer Details & Demo Payment */}
            {selectedPlan && isFullyActive && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-2 border-emerald-500 rounded-[2rem] p-6 md:p-8 lg:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/40 rounded-full blur-2xl -z-10" />
                <div className="space-y-4 flex-1 text-center md:text-right">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-black text-emerald-800">
                    <Sparkles className="h-4 w-4" />
                    {language === 'ar' ? 'الدفع التجريبي الآمن' : 'Paiement démo sécurisé'}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                    {language === 'ar' ? 'تأكيد اشتراكك' : 'Confirmer votre abonnement'}
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-base font-semibold text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Crown className="w-5 h-5 text-emerald-600" />
                      {language === 'ar' ? selectedPlan.nameAr : selectedPlan.nameFr}
                    </span>
                    <span className="hidden md:inline text-slate-300">|</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                      {selectedPlan.durationDays} {language === 'ar' ? 'يوم' : 'jours'}
                    </span>
                  </div>
                  <div className="text-3xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-1">
                    <span>{language === 'ar' ? 'المجموع:' : 'Total :'}</span>
                    <span className="text-emerald-600">{selectedPlan.price}</span>
                    <span className="text-xl">DZD</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto">
                  <Button
                    onClick={handleSubscribe}
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg h-14 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-3 w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>{language === 'ar' ? 'جاري المعالجة...' : 'Traitement...'}</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-6 h-6" />
                        <span>{language === 'ar' ? 'تأكيد الدفع التجريبي' : 'Confirmer le paiement démo'}</span>
                      </>
                    )}
                  </Button>
                  <p className="text-xs font-semibold text-slate-500 text-center">
                    {language === 'ar'
                      ? 'دفع افتراضي محاكي، لن يتم خصم أي أموال حقيقية.'
                      : 'Simulateur virtuel, aucun argent réel ne sera débité.'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* General Info */}
            <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 max-w-4xl mx-auto shadow-sm">
              <h3 className="font-extrabold text-slate-900 text-xl mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-emerald-600" />
                {language === 'ar' ? 'شروط وقواعد الاشتراكات' : 'Conditions d\'abonnement'}
              </h3>
              <ul className="space-y-4 text-sm font-semibold text-slate-600 leading-6">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 text-lg">•</span>
                  <span>
                    {language === 'ar'
                      ? 'الاشتراكات صالحة للنقل غير المحدود على جميع خطوط حافلات UNIMOVE-DZ المتاحة.'
                      : 'Les abonnements sont valables pour des trajets illimités sur toutes les lignes de bus UNIMOVE-DZ.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 text-lg">•</span>
                  <span>
                    {language === 'ar'
                      ? 'تفعيل الاشتراك يتطلب أن يكون ملف التحقق الخاص بك (بطاقة طالب، شارة مهنية) معتمداً من طرف الإدارة.'
                      : 'L\'activation nécessite un compte validé par l\'administration (carte d\'étudiant, badge professionnel).'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 text-lg">•</span>
                  <span>
                    {language === 'ar'
                      ? 'في حال إلغاء الاشتراك من قِبل الإدارة نتيجة إساءة الاستخدام، لا يتم استرداد أي قيمة متبقية.'
                      : 'En cas de résiliation pour non-respect des règles, aucun remboursement ne sera effectué.'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
