'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { NotificationCenter } from '@/components/NotificationCenter';
import { AlertBanner } from '@/components/AlertBanner';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { mockAlertBanners } from '@/mock/notifications';
import { useState } from 'react';

export default function NotificationsPage() {
  const { language } = useLanguage();
  const [activeAlerts, setActiveAlerts] = useState(mockAlertBanners);

  const handleDismissAlert = (id: string) => {
    setActiveAlerts(activeAlerts.filter(alert => alert.id !== id));
  };

  return (
    <DashboardLayout role="user">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'الإشعارات' : 'Notifications'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar'
              ? 'ابق على اطلاع بجميع تحديثات UNIMOVE-DZ'
              : 'Restez informé de toutes les mises à jour UNIMOVE-DZ'}
          </p>
        </div>

        {/* Alert Banners */}
        {activeAlerts.length > 0 && (
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <AlertBanner
                key={alert.id}
                alert={alert}
                onDismiss={handleDismissAlert}
              />
            ))}
          </div>
        )}

        {/* Notification Center */}
        <NotificationCenter showHeader={true} />
      </div>
    </DashboardLayout>
  );
}
