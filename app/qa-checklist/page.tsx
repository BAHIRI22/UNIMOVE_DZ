'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  Circle,
  Smartphone,
  Shield,
  CreditCard,
  Bus,
  Bell,
  FileText,
  UserCheck,
  QrCode,
  LayoutDashboard,
  LogIn,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react';
import ProductionStatusCard from '@/components/ProductionStatusCard';

interface CheckItem {
  id: string;
  labelAr: string;
  labelFr: string;
  category: string;
  link?: string;
}

const CHECKLIST: CheckItem[] = [
  { id: 'login-user', labelAr: 'تسجيل دخول المستخدم', labelFr: 'Login utilisateur', category: 'auth', link: '/login' },
  { id: 'login-admin', labelAr: 'تسجيل دخول المشرف', labelFr: 'Login admin', category: 'auth', link: '/login' },
  { id: 'upload-doc', labelAr: 'رفع وثيقة التحقق', labelFr: 'Upload document', category: 'user', link: '/dashboard' },
  { id: 'admin-approve', labelAr: 'قبول المستخدم من الإدارة', labelFr: 'Validation admin', category: 'admin', link: '/admin-panel' },
  { id: 'notifications', labelAr: 'الإشعارات', labelFr: 'Notifications', category: 'general', link: '/notifications' },
  { id: 'subscription', labelAr: 'الاشتراك', labelFr: 'Subscription', category: 'user', link: '/subscriptions' },
  { id: 'booking', labelAr: 'الحجز', labelFr: 'Booking', category: 'user', link: '/reservation' },
  { id: 'payment-mock', labelAr: 'الدفع التجريبي', labelFr: 'Payment mock', category: 'user', link: '/payments' },
  { id: 'qr', labelAr: 'رمز QR', labelFr: 'QR', category: 'user', link: '/my-card' },
  { id: 'driver-dashboard', labelAr: 'لوحة السائق', labelFr: 'Driver dashboard', category: 'driver', link: '/driver-dashboard' },
  { id: 'admin-panel', labelAr: 'لوحة الإدارة', labelFr: 'Admin panel', category: 'admin', link: '/admin-panel' },
  { id: 'mobile-responsive', labelAr: 'التوافق مع الجوال', labelFr: 'Mobile responsive', category: 'general' },
];

export default function QAChecklistPage() {
  const router = useRouter();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [lang, setLang] = useState<'ar' | 'fr'>('ar');
  const isRTL = lang === 'ar';

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completed = Object.values(checked).filter(Boolean).length;
  const total = CHECKLIST.length;
  const percent = Math.round((completed / total) * 100);

  const categories = [
    { key: 'auth', icon: LogIn, labelAr: 'المصادقة', labelFr: 'Authentification' },
    { key: 'user', icon: UserCheck, labelAr: 'المستخدم', labelFr: 'Utilisateur' },
    { key: 'admin', icon: Shield, labelAr: 'الإدارة', labelFr: 'Administration' },
    { key: 'driver', icon: Bus, labelAr: 'السائق', labelFr: 'Chauffeur' },
    { key: 'general', icon: Smartphone, labelAr: 'عام', labelFr: 'Général' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#031813',
        color: 'white',
        padding: '40px 24px',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 6 }}>
              {isRTL ? 'قائمة فحص الجودة' : 'Checklist QA'}
            </h1>
            <p style={{ fontSize: 15, opacity: 0.6 }}>
              {isRTL ? 'اختبار شامل قبل الإنتاج' : 'Tests complets avant production'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setLang('ar')}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.2)',
                background: lang === 'ar' ? '#10b981' : 'transparent',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              العربية
            </button>
            <button
              onClick={() => setLang('fr')}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.2)',
                background: lang === 'fr' ? '#10b981' : 'transparent',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              Français
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <ArrowLeft size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
              {isRTL ? 'عودة' : 'Retour'}
            </button>
          </div>
        </div>

        {/* Progress */}
        <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 12,
            padding: 20,
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ position: 'relative', width: 70, height: 70 }}>
            <svg width="70" height="70" viewBox="0 0 70 70">
              <circle cx="35" cy="35" r="30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
              <circle
                cx="35"
                cy="35"
                r="30"
                fill="none"
                stroke="#10b981"
                strokeWidth="6"
                strokeDasharray={2 * Math.PI * 30}
                strokeDashoffset={2 * Math.PI * 30 * (1 - percent / 100)}
                strokeLinecap="round"
                transform="rotate(-90 35 35)"
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 16,
              }}
            >
              {percent}%
            </div>
          </div>
          <div>
            <p style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>
              {completed} / {total}
            </p>
            <p style={{ fontSize: 14, opacity: 0.6, margin: 0 }}>
              {isRTL ? 'عنصر مكتمل' : 'éléments complétés'}
            </p>
          </div>
        </div>

        {/* Production Status */}
        <ProductionStatusCard />

        {/* Demo Account Info */}
        <div
          style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: 12,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <AlertTriangle size={20} color="#60a5fa" />
            <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>
              {isRTL ? 'حسابات الاختبار / Demo' : 'Comptes de test / Demo'}
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 8, padding: 14 }}>
              <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 6 }}>Admin</p>
              <p style={{ fontSize: 15, fontWeight: 700, fontFamily: 'monospace', marginBottom: 4 }}>0550000000</p>
              <p style={{ fontSize: 13, fontFamily: 'monospace', opacity: 0.8 }}>OTP: 123456</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 8, padding: 14 }}>
              <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 6 }}>Driver</p>
              <p style={{ fontSize: 15, fontWeight: 700, fontFamily: 'monospace', marginBottom: 4 }}>0550000001</p>
              <p style={{ fontSize: 13, fontFamily: 'monospace', opacity: 0.8 }}>OTP: 123456</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 8, padding: 14 }}>
              <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 6 }}>User Test</p>
              <p style={{ fontSize: 15, fontWeight: 700, fontFamily: 'monospace', marginBottom: 4 }}>0551234567</p>
              <p style={{ fontSize: 13, fontFamily: 'monospace', opacity: 0.8 }}>OTP: 123456</p>
            </div>
          </div>
          <p style={{ fontSize: 12, opacity: 0.5, marginTop: 12 }}>
            {isRTL
              ? 'ملاحظة: OTP التجريبي يعمل فقط في وضع التطوير.'
              : 'Note: OTP demo fonctionne uniquement en mode développement.'}
          </p>
        </div>

        {/* Checklist by Category */}
        {categories.map((cat) => {
          const catItems = CHECKLIST.filter((c) => c.category === cat.key);
          if (catItems.length === 0) return null;
          const CatIcon = cat.icon;
          return (
            <div key={cat.key} style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <CatIcon size={20} color="#10b981" />
                <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>
                  {isRTL ? cat.labelAr : cat.labelFr}
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {catItems.map((item) => {
                  const isChecked = !!checked[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 18px',
                        borderRadius: 10,
                        background: isChecked ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isChecked ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.08)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        {isChecked ? (
                          <CheckCircle2 size={22} color="#10b981" />
                        ) : (
                          <Circle size={22} color="rgba(255,255,255,0.3)" />
                        )}
                        <div>
                          <p style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>
                            {isRTL ? item.labelAr : item.labelFr}
                          </p>
                        </div>
                      </div>
                      {item.link && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(item.link!);
                          }}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 6,
                            border: '1px solid rgba(255,255,255,0.15)',
                            background: 'rgba(255,255,255,0.05)',
                            color: 'white',
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {isRTL ? 'اختبار' : 'Tester'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* User Test Flow */}
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.05)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: 12,
            padding: 24,
            marginBottom: 24,
          }}
        >
          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>
            {isRTL ? 'سيناريو اختبار المستخدم' : 'Scénario de test utilisateur'}
          </h3>
          <ol style={{ paddingLeft: isRTL ? 0 : 20, paddingRight: isRTL ? 20 : 0, margin: 0, opacity: 0.9, lineHeight: 1.9 }}>
            <li>{isRTL ? 'إنشاء حساب جديد برقم هاتف (مثلاً 0551234567)' : 'Créer un compte avec un numéro (ex: 0551234567)'}</li>
            <li>{isRTL ? 'إدخال رمز OTP: 123456' : 'Saisir OTP: 123456'}</li>
            <li>{isRTL ? 'ملء البيانات الشخصية في /register' : 'Remplir les infos personnelles dans /register'}</li>
            <li>{isRTL ? 'رفع وثيقة التحقق من /dashboard' : 'Uploader un document depuis /dashboard'}</li>
            <li>{isRTL ? 'تسجيل الدخول كمشرف (0550000000) والموافقة على المستخدم' : 'Se connecter en admin (0550000000) et approuver l\'utilisateur'}</li>
            <li>{isRTL ? 'تفعيل البطاقة الرقمية في /my-card' : 'Activer la carte numérique dans /my-card'}</li>
            <li>{isRTL ? 'شراء اشتراك في /subscriptions' : 'Acheter un abonnement dans /subscriptions'}</li>
            <li>{isRTL ? 'إنشاء حجز في /reservation' : 'Créer une réservation dans /reservation'}</li>
            <li>{isRTL ? 'تأكيد دفع تجريبي في /payments' : 'Confirmer un paiement mock dans /payments'}</li>
            <li>{isRTL ? 'فحص QR من /my-card' : 'Scanner le QR depuis /my-card'}</li>
          </ol>
        </div>

        {/* Mobile Test Notes */}
        <div
          style={{
            background: 'rgba(99, 102, 241, 0.05)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: 12,
            padding: 24,
            marginBottom: 40,
          }}
        >
          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>
            {isRTL ? 'اختبار الجوال' : 'Test mobile'}
          </h3>
          <ul style={{ paddingLeft: isRTL ? 0 : 20, paddingRight: isRTL ? 20 : 0, margin: 0, opacity: 0.9, lineHeight: 1.9 }}>
            <li>{isRTL ? 'تسجيل الدخول يعمل بشكل صحيح على الشاشات الصغيرة' : 'Login fonctionne bien sur petits écrans'}</li>
            <li>{isRTL ? 'لوحة التحكم /dashboard متجاوبة' : 'Dashboard /dashboard est responsive'}</li>
            <li>{isRTL ? 'لوحة الإدارة /admin-panel تُعرض بشكل مقبول على الجوال' : 'Admin panel /admin-panel lisible sur mobile'}</li>
            <li>{isRTL ? 'رفع الملفات يعمل من المتصفح على الجوال' : 'Upload fonctionne depuis le navigateur mobile'}</li>
            <li>{isRTL ? 'صفحة الحجز /reservation سهلة الاستخدام باللمس' : 'Réservation /reservation utilisable au toucher'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
