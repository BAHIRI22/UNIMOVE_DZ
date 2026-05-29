'use client';

import { useEffect, useState } from 'react';
import { Shield, AlertTriangle, CheckCircle2, XCircle, Database, Cloud, Link, Code } from 'lucide-react';

interface StatusItem {
  label: string;
  status: 'ok' | 'warn' | 'error';
  value?: string;
}

export default function ProductionStatusCard() {
  const [items, setItems] = useState<StatusItem[]>([]);
  const [mode, setMode] = useState<string>('unknown');

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    setMode(isDev ? 'development' : 'production');

    const checks: StatusItem[] = [
      {
        label: 'NEXT_PUBLIC_FIREBASE_API_KEY',
        status: (process.env.NEXT_PUBLIC_FIREBASE_API_KEY && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.startsWith('your_')) ? 'ok' : 'error',
      },
      {
        label: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
        status: (process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN && !process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN.includes('your-')) ? 'ok' : 'error',
      },
      {
        label: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        status: (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID.includes('your')) ? 'ok' : 'error',
      },
      {
        label: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
        status: (process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET && !process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET.includes('your')) ? 'ok' : 'error',
      },
      {
        label: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
        status: (process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID && process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID !== 'your_sender_id') ? 'ok' : 'error',
      },
      {
        label: 'NEXT_PUBLIC_FIREBASE_APP_ID',
        status: (process.env.NEXT_PUBLIC_FIREBASE_APP_ID && !process.env.NEXT_PUBLIC_FIREBASE_APP_ID.includes('your')) ? 'ok' : 'error',
      },
      {
        label: 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
        status: (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME.includes('your')) ? 'ok' : 'error',
      },
      {
        label: 'NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET',
        status: (process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET && !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.includes('your')) ? 'ok' : 'error',
      },
      {
        label: 'Application Mode',
        status: isDev ? 'warn' : 'ok',
        value: isDev ? 'development' : 'production',
      },
      {
        label: 'App URL',
        status: typeof window !== 'undefined' && window.location.origin.includes('vercel') ? 'ok' : 'warn',
        value: typeof window !== 'undefined' ? window.location.origin : 'unknown',
      },
    ];

    setItems(checks);
  }, []);

  const okCount = items.filter((i) => i.status === 'ok').length;
  const warnCount = items.filter((i) => i.status === 'warn').length;
  const errorCount = items.filter((i) => i.status === 'error').length;

  return (
    <div style={{ background: 'rgba(3, 24, 19, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <Shield size={28} color="#10b981" />
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>حالة الإنتاج / Statut Production</h2>
          <p style={{ fontSize: 13, opacity: 0.6, margin: 0 }}>Vérification des variables d'environnement</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle2 size={18} color="#10b981" />
          <span style={{ fontSize: 14, fontWeight: 700 }}>{okCount} OK</span>
        </div>
        <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertTriangle size={18} color="#fbbf24" />
          <span style={{ fontSize: 14, fontWeight: 700 }}>{warnCount} Warn</span>
        </div>
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <XCircle size={18} color="#ef4444" />
          <span style={{ fontSize: 14, fontWeight: 700 }}>{errorCount} Error</span>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: 8,
              background: item.status === 'ok' ? 'rgba(16,185,129,0.05)' : item.status === 'warn' ? 'rgba(251,191,36,0.05)' : 'rgba(239,68,68,0.05)',
              border: `1px solid ${item.status === 'ok' ? 'rgba(16,185,129,0.2)' : item.status === 'warn' ? 'rgba(251,191,36,0.2)' : 'rgba(239,68,68,0.2)'}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {item.label.includes('FIREBASE') && <Database size={16} color="#60a5fa" />}
              {item.label.includes('CLOUDINARY') && <Cloud size={16} color="#a78bfa" />}
              {item.label.includes('URL') && <Link size={16} color="#34d399" />}
              {item.label.includes('Mode') && <Code size={16} color="#fbbf24" />}
              <span style={{ fontSize: 13, fontFamily: 'monospace' }}>{item.label}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {item.value && (
                <span style={{ fontSize: 12, opacity: 0.7, fontFamily: 'monospace' }}>{item.value}</span>
              )}
              {item.status === 'ok' && <CheckCircle2 size={18} color="#10b981" />}
              {item.status === 'warn' && <AlertTriangle size={18} color="#fbbf24" />}
              {item.status === 'error' && <XCircle size={18} color="#ef4444" />}
            </div>
          </div>
        ))}
      </div>

      {mode === 'development' && (
        <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', fontSize: 13 }}>
          <strong style={{ color: '#fbbf24' }}>⚠️ وضع التطوير:</strong> تأكد من تعيين كل متغيرات البيئة في Vercel قبل النشر.
        </div>
      )}
    </div>
  );
}
