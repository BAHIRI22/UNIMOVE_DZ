'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, CheckCircle, Clock, AlertTriangle, User, Bus, CreditCard, CalendarX, MessageSquare, Search, Bell, AlertOctagon, Trash2 } from 'lucide-react';
import { Notification } from '@/types/notification';
import { getNotificationIcon, getPriorityColor } from '@/mock/notifications';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationItemProps) {
  const { language } = useLanguage();

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      'check-circle': CheckCircle,
      'clock': Clock,
      'alert-triangle': AlertTriangle,
      'user': User,
      'bus': Bus,
      'credit-card': CreditCard,
      'calendar-x': CalendarX,
      'message-square': MessageSquare,
      'search': Search,
      'bell': Bell,
      'alert-octagon': AlertOctagon,
    };
    return icons[iconName] || Bell;
  };

  const Icon = getIconComponent(getNotificationIcon(notification.type));

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return language === 'ar' ? 'الآن' : 'À l\'instant';
    if (diffMins < 60) return `${diffMins} ${language === 'ar' ? 'دقيقة' : 'min'}`;
    if (diffHours < 24) return `${diffHours} ${language === 'ar' ? 'ساعة' : 'h'}`;
    if (diffDays < 7) return `${diffDays} ${language === 'ar' ? 'يوم' : 'j'}`;
    return date.toLocaleDateString();
  };

  return (
    <Card
      className={`p-4 border transition-all hover:shadow-md ${
        notification.read ? 'bg-white border-gray-200' : 'bg-primary/5 border-primary/30'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getPriorityColor(notification.priority)}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
              {language === 'ar' ? notification.titleAr : notification.title}
            </h4>
            <span className="text-xs text-gray-500 flex-shrink-0">{formatTime(notification.createdAt)}</span>
          </div>
          <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-700'} mb-2`}>
            {language === 'ar' ? notification.messageAr : notification.message}
          </p>
          <div className="flex items-center gap-2">
            {!notification.read && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMarkAsRead(notification.id)}
                className="text-primary hover:text-primary/80 h-8 px-3"
              >
                <Check className="w-4 h-4 mr-1" />
                {language === 'ar' ? 'وضع علامة مقروء' : 'Marquer comme lu'}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(notification.id)}
              className="text-red-600 hover:text-red-700 h-8 px-3"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              {language === 'ar' ? 'حذف' : 'Supprimer'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
