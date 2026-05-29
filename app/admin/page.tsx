'use client';

export default function AdminPage() {
  console.log('ADMIN_MINIMAL_TEST_RENDERED');
  return (
    <main style={{ minHeight: '100vh', background: '#031813', color: 'white', padding: 40 }}>
      <h1 style={{ fontSize: 48, fontWeight: 900 }}>ADMIN_MINIMAL_TEST_RENDERED</h1>
      <h2>لوحة الإدارة</h2>
      <p>هذه صفحة أدمن مستقلة وليست Dashboard المستخدم</p>
    </main>
  );
}
