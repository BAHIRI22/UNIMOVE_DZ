'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  console.log('ADMIN_MINIMAL_TEST_RENDERED');
  const router = useRouter();

  return (
    <main style={{ minHeight: '100vh', background: '#021612', color: 'white', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Header Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img src="/images/udl-logo.jpeg" alt="UDL Logo" style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: '12px' }} />
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: 0, color: '#10b981', letterSpacing: '-0.025em' }}>ADMIN_MINIMAL_TEST_RENDERED</h1>
              <h2 style={{ margin: '4px 0 0 0', fontSize: '18px', color: '#a7f3d0' }}>لوحة الإدارة الأمنية والمراقبة لـ UNIMOVE-DZ</h2>
            </div>
          </div>
          
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            style={{
              padding: '12px 24px',
              borderRadius: '14px',
              fontWeight: 'bold',
              fontSize: '15px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(16,185,129,0.2)'
            }}
          >
            <span>←</span>
            <span>رجوع / Retour</span>
          </button>
        </div>

        {/* Content Details */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fbbf24' }}>
            <span style={{ fontSize: '24px' }}>⚠️</span>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>ملاحظة أمنية هامّة:</h3>
          </div>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#cbd5e1', margin: 0 }}>
            هذه صفحة أدمن مستقلة ومحمية بالكامل، مخصصة حصرياً للمحاكاة التقنية وإدارة الأسطول، وليست لوحة معلومات (Dashboard) الخاصة بالطالب أو المستخدم العام.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '10px' }}>
            <Link 
              href="/admin-panel" 
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: 'white',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 'bold',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              الذهاب إلى لوحة الإدارة المتكاملة
            </Link>
            <Link 
              href="/dashboard" 
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                backgroundColor: 'transparent',
                color: '#10b981',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              رجوع إلى Dashboard المستخدم
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
