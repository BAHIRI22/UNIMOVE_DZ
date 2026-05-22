'use client';

import QRCode from 'react-qr-code';
import { useRef } from 'react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
}

export function QRCodeDisplay({ value, size = 200, className = '' }: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={qrRef} className={`flex items-center justify-center bg-white p-4 rounded-xl ${className}`}>
      <QRCode
        value={value}
        size={size}
        level="H"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
}
