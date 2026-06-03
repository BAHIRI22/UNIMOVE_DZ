'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  MapPin,
  CreditCard,
  Bell,
  User,
  Users,
  Bus,
  UserCheck,
  CalendarCheck,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Settings,
  DollarSign
} from 'lucide-react';
import { NAVIGATION_ITEMS, ATTRIBUTIONS } from '@/constants';
import { motion } from 'framer-motion';
import { PWAInstallQR } from '@/components/PWAInstallQR';

interface DashboardSidebarProps {
  role: 'user' | 'admin';
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const { language, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = role === 'admin' ? NAVIGATION_ITEMS.admin : NAVIGATION_ITEMS.user;

  const iconMap: Record<string, any> = {
    LayoutDashboard,
    Calendar,
    MapPin,
    CreditCard,
    Bell,
    User,
    Users,
    Bus,
    UserCheck,
    CalendarCheck,
    Settings,
    DollarSign,
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 h-screen
          bg-white/95 backdrop-blur-xl border-emerald-100
          transition-all duration-500 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : isRTL ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}
          shadow-2xl shadow-emerald-900/10
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-200">
            {!isCollapsed ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                {role === 'admin' ? (
                  <motion.div
                    className="w-12 h-12 flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <img
                      src="/images/logo.png?v=logo-clean"
                      alt="UNIMOVE-DZ Logo"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Bus className="w-7 h-7 text-emerald-600" />
                  </motion.div>
                )}
                <div>
                  <h1 className="font-black text-lg text-gray-900">UNIMOVE-DZ</h1>
                  <p className="text-sm text-gray-500 font-medium">
                    {language === 'ar' ? 'نقل جامعي ذكي' : 'Transport universitaire intelligent'}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="mx-auto flex-shrink-0"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {role === 'admin' ? (
                  <img
                    src="/images/logo.png?v=logo-clean"
                    alt="UNIMOVE-DZ Logo"
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                    <Bus className="w-5 h-5 text-emerald-600" />
                  </div>
                )}
              </motion.div>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-2 hover:bg-emerald-50 rounded-xl transition-colors"
            >
              <ChevronRight className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 hover:bg-emerald-50 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item, index) => {
              const Icon = iconMap[item.icon];
              const isActive = pathname === item.path;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`
                      relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group
                      ${isActive
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl shadow-emerald-600/30 hover:shadow-2xl hover:shadow-emerald-600/40 hover:scale-[1.02] before:absolute before:left-0 before:top-1/2 before:h-8 before:w-1 before:-translate-y-1/2 before:rounded-r-full before:bg-white'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-100 hover:scale-[1.01]'
                      }
                    `}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className={`w-6 h-6 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-emerald-600'} transition-colors duration-300`} />
                    </motion.div>
                    {!isCollapsed && (
                      <span className="font-semibold text-base truncate">{item.label[language]}</span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-5 border-t border-slate-200 space-y-3">
            {!isCollapsed && (
              <>
                <PWAInstallQR />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-gray-500 space-y-2 pt-2"
                >
                  <p className="font-semibold text-gray-700">
                    {language === 'ar' ? 'المشروع:' : 'Projet:'}
                  </p>
                  <p>{ATTRIBUTIONS.project.nameAr}</p>
                  <p className="font-semibold text-gray-700 mt-3">
                    {language === 'ar' ? 'الإشراف الأكاديمي:' : 'Supervision académique:'}
                  </p>
                  <p>د:رمدوم نورة</p>
                </motion.div>
              </>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="flex items-center gap-4 px-5 py-4 w-full text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-500 hover:shadow-lg hover:shadow-red-500/20"
            >
              <LogOut className="w-6 h-6 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-semibold text-base">
                  {language === 'ar' ? 'تسجيل الخروج' : 'Déconnexion'}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </aside>
    </>
  );
}
