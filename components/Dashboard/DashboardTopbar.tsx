'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Search, Settings, Menu, User, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';

interface SimpleNotification {
  id: string;
  titleAr: string;
  titleFr: string;
  read: boolean;
}

export function DashboardTopbar({ onMobileMenuClick }: DashboardTopbarProps) {
  const { language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentNotifications, setRecentNotifications] = useState<SimpleNotification[]>([]);

  useEffect(() => {
    console.log('[DashboardTopbar] user?.role:', user?.role);
    console.log('[DashboardTopbar] user?.status:', (user as any)?.status);
    console.log('[DashboardTopbar] user?.verified:', (user as any)?.verified);
  }, [user]);

  useEffect(() => {
    if (!user?.id) {
      setUnreadCount(0);
      setRecentNotifications([]);
      return;
    }

    // Subscribe to unread count
    const qUnread = query(
      collection(db, 'notifications'),
      where('userId', '==', user.id),
      where('read', '==', false)
    );

    const unsubUnread = onSnapshot(qUnread, (snapshot) => {
      setUnreadCount(snapshot.size);
    }, (error) => {
      console.error('[DashboardTopbar] Error fetching unread notifications count:', error);
    });

    // Subscribe to last 3 notifications for dropdown preview
    const qRecent = query(
      collection(db, 'notifications'),
      where('userId', '==', user.id),
      orderBy('createdAt', 'desc'),
      limit(3)
    );

    const unsubRecent = onSnapshot(qRecent, (snapshot) => {
      const items: SimpleNotification[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          titleAr: data.titleAr || '',
          titleFr: data.titleFr || '',
          read: data.read ?? false,
        });
      });
      setRecentNotifications(items);
    }, (error) => {
      console.error('[DashboardTopbar] Error fetching recent notifications:', error);
    });

    return () => {
      unsubUnread();
      unsubRecent();
    };
  }, [user?.id]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={language === 'ar' ? 'بحث...' : 'Rechercher...'}
                className="pl-10 w-64 bg-gray-50 border-gray-200 focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {user?.role === 'admin' && (
            <Link
              href="/admin-panel"
              className="inline-flex h-10 items-center rounded-full bg-gradient-to-r from-amber-600 to-orange-700 px-4 text-sm font-black text-white shadow-lg shadow-amber-600/20 transition hover:-translate-y-0.5"
              style={{ display: 'inline-flex', visibility: 'visible' }}
            >
              {language === 'ar' ? 'لوحة الإدارة' : 'Admin Panel'}
            </Link>
          )}
          <Link
            href="/demo"
            className="hidden sm:inline-flex h-10 items-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 px-4 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5"
          >
            {language === 'ar' ? 'وضع العرض' : 'Mode présentation'}
          </Link>

          {/* Language toggle */}
          <button
            onClick={() => setLanguage(language === 'ar' ? 'fr' : 'ar')}
            className="px-3 py-1.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            {language === 'ar' ? 'FR' : 'AR'}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-black text-white ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900">
                    {language === 'ar' ? 'الإشعارات' : 'Notifications'}
                  </h3>
                  {unreadCount > 0 && (
                    <Badge className="bg-emerald-600 font-bold hover:bg-emerald-600 text-white rounded-full">
                      {unreadCount} {language === 'ar' ? 'جديد' : 'Nouveau'}
                    </Badge>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                  {recentNotifications.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 font-semibold text-sm">
                      {language === 'ar' ? 'لا توجد إشعارات جديدة' : 'Aucune notification nouvelle'}
                    </div>
                  ) : (
                    recentNotifications.map((n) => (
                      <div key={n.id} className={`p-4 transition hover:bg-slate-50/80 ${!n.read ? 'bg-emerald-50/20' : ''}`}>
                        <p className={`text-sm leading-5 font-bold ${!n.read ? 'text-slate-900' : 'text-slate-600'}`}>
                          {language === 'ar' ? n.titleAr : n.titleFr}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-3 bg-slate-50 border-t border-gray-100 text-center">
                  <Link
                    href="/notifications"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-black text-emerald-700 hover:text-emerald-800 transition"
                  >
                    {language === 'ar' ? 'عرض جميع الإشعارات' : 'Afficher toutes les notifications'}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="hidden md:block text-left">
                <p className="font-medium text-sm text-gray-900">{user?.fullName}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
            </button>

            {/* Profile dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-medium text-gray-900">{user?.fullName}</p>
                  <p className="text-sm text-gray-500">{user?.phone}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">
                      {language === 'ar' ? 'الإعدادات' : 'Paramètres'}
                    </span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">
                      {language === 'ar' ? 'تسجيل الخروج' : 'Déconnexion'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
