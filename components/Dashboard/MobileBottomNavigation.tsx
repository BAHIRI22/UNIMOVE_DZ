'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Bell, CreditCard, LayoutDashboard, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MobileBottomNavigationProps {
  role: 'user' | 'admin';
}

export function MobileBottomNavigation({ role }: MobileBottomNavigationProps) {
  const pathname = usePathname();
  const { language } = useLanguage();

  if (role === 'admin') return null;

  const items = [
    { href: '/dashboard', icon: LayoutDashboard, label: language === 'ar' ? 'الرئيسية' : 'Accueil' },
    { href: '/reservation', icon: Calendar, label: language === 'ar' ? 'حجز' : 'Réserver' },
    { href: '/live-tracking', icon: MapPin, label: language === 'ar' ? 'تتبع' : 'Suivi' },
    { href: '/my-card', icon: CreditCard, label: language === 'ar' ? 'بطاقتي' : 'Carte' },
    { href: '/notifications', icon: Bell, label: language === 'ar' ? 'تنبيهات' : 'Alertes' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-emerald-100 bg-white/95 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-2xl shadow-emerald-900/10 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-14 flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-black transition-all ${
                active
                  ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-600/25'
                  : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              <Icon className="mb-1 h-5 w-5" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
