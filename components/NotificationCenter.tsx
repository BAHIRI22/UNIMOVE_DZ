'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, CheckCircle, Filter, Trash2, Car, Clock, CreditCard, AlertTriangle } from 'lucide-react';
import { NotificationItem } from '@/components/NotificationItem';
import { Notification } from '@/types/notification';
import { mockNotifications } from '@/mock/notifications';
import { motion } from 'framer-motion';

interface NotificationCenterProps {
  showHeader?: boolean;
}

export function NotificationCenter({ showHeader = true }: NotificationCenterProps) {
  const { language } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    // Load from localStorage or use mock data
    const stored = localStorage.getItem('notifications');
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      setNotifications(mockNotifications);
      localStorage.setItem('notifications', JSON.stringify(mockNotifications));
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true, readAt: new Date().toISOString() } : n
    );
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const handleMarkAllAsRead = () => {
    const updated = notifications.map(n => 
      !n.read ? { ...n, read: true, readAt: new Date().toISOString() } : n
    );
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const handleDelete = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
    localStorage.setItem('notifications', JSON.stringify([]));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const smartSignals = [
    { icon: Car, label: language === 'ar' ? 'المركبة قريبة' : 'Véhicule proche' },
    { icon: CheckCircle, label: language === 'ar' ? 'حجز مؤكد' : 'Réservation confirmée' },
    { icon: CreditCard, label: language === 'ar' ? 'دفع مؤكد' : 'Paiement confirmé' },
    { icon: AlertTriangle, label: language === 'ar' ? 'أماكن محدودة' : 'Places limitées' },
  ];

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">
                {language === 'ar' ? 'الإشعارات' : 'Notifications'}
              </h2>
              <p className="text-sm text-gray-600">
                {unreadCount > 0 && (
                  <>
                    {unreadCount} {language === 'ar' ? 'غير مقروء' : 'non lu'}
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                {language === 'ar' ? 'الكل مقروء' : 'Tout marquer lu'}
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteAll}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                {language === 'ar' ? 'حذف الكل' : 'Tout supprimer'}
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {smartSignals.map((signal, index) => (
          <motion.div
            key={signal.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-2xl border border-emerald-100 bg-white/85 p-4 shadow-lg backdrop-blur-xl"
          >
            <signal.icon className="mb-3 h-5 w-5 text-emerald-600" />
            <p className="text-xs font-black text-slate-800">{signal.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {language === 'ar' ? 'الكل' : 'Tous'}
            </SelectItem>
            <SelectItem value="unread">
              {language === 'ar' ? 'غير مقروء' : 'Non lu'}
            </SelectItem>
            <SelectItem value="read">
              {language === 'ar' ? 'مقروء' : 'Lu'}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <Card className="p-12 border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 rounded-3xl text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100">
            <Bell className="w-10 h-10 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'لا توجد إشعارات' : 'Aucune notification'}
          </h3>
          <p className="text-gray-600">
            {language === 'ar'
              ? filter === 'unread'
                ? 'لا توجد إشعارات غير مقروءة'
                : filter === 'read'
                ? 'لا توجد إشعارات مقروءة'
                : 'لم تتلق أي إشعارات بعد'
              : filter === 'unread'
              ? 'Aucune notification non lue'
              : filter === 'read'
              ? 'Aucune notification lue'
              : 'Vous n\'avez pas encore reçu de notifications'}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
