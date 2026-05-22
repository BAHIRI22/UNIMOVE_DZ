'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, Info, CheckCircle, XCircle, X } from 'lucide-react';
import type { AlertBanner } from '@/types/notification';

interface AlertBannerProps {
  alert: AlertBanner;
  onDismiss?: (id: string) => void;
}

export function AlertBanner({ alert, onDismiss }: AlertBannerProps) {
  const { language } = useLanguage();

  const getAlertStyles = () => {
    switch (alert.type) {
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          title: 'text-blue-900',
          message: 'text-blue-800',
          iconComponent: Info,
        };
      case 'warning':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          icon: 'text-orange-600',
          title: 'text-orange-900',
          message: 'text-orange-800',
          iconComponent: AlertTriangle,
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-600',
          title: 'text-red-900',
          message: 'text-red-800',
          iconComponent: XCircle,
        };
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          title: 'text-green-900',
          message: 'text-green-800',
          iconComponent: CheckCircle,
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'text-gray-600',
          title: 'text-gray-900',
          message: 'text-gray-800',
          iconComponent: Info,
        };
    }
  };

  const styles = getAlertStyles();
  const Icon = styles.iconComponent;

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-xl p-4`}>
      <div className="flex items-start gap-3">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${styles.icon}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold ${styles.title} mb-1`}>
            {language === 'ar' ? alert.titleAr : alert.title}
          </h4>
          <p className={`text-sm ${styles.message}`}>
            {language === 'ar' ? alert.messageAr : alert.message}
          </p>
        </div>
        {alert.dismissible && onDismiss && (
          <button
            onClick={() => onDismiss(alert.id)}
            className={`flex-shrink-0 ${styles.icon} hover:opacity-70 transition-opacity`}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
