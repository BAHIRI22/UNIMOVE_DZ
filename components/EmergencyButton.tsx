'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Phone, AlertTriangle } from 'lucide-react';

interface EmergencyButtonProps {
  onClick: () => void;
  fixed?: boolean;
}

export function EmergencyButton({ onClick, fixed = false }: EmergencyButtonProps) {
  const { language } = useLanguage();

  const buttonClasses = fixed
    ? 'fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-2xl flex items-center justify-center'
    : 'w-full h-14 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 rounded-xl';

  return (
    <Button onClick={onClick} className={buttonClasses}>
      <Phone className={fixed ? 'w-7 h-7' : 'w-5 h-5'} />
      {!fixed && (
        <>
          <AlertTriangle className="w-5 h-5" />
          {language === 'ar' ? 'طلب مساعدة عاجلة' : 'Demande d\'aide urgente'}
        </>
      )}
    </Button>
  );
}
