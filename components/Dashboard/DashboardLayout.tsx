'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardTopbar } from './DashboardTopbar';
import { MobileBottomNavigation } from './MobileBottomNavigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'user' | 'admin';
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { isRTL } = useLanguage();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <DashboardSidebar role={role} />
      <div className={`relative flex min-h-screen flex-col ${isRTL ? 'lg:mr-64' : 'lg:ml-64'}`}>
        <main className="fixed inset-y-0 left-0 right-0 z-0 overflow-hidden lg:left-0 lg:right-64">
          {/* VIDEO BACKGROUND */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/UNIMOVEDZ.mp4" type="video/mp4" />
          </video>
        </main>

        <div className="relative z-20">
          <DashboardTopbar onMobileMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </div>
        <main className="relative z-10 flex-1 overflow-hidden min-h-screen">
          {/* DASHBOARD CONTENT */}
          <div className="relative z-20">
            <div className="p-4 pb-28 sm:p-6 sm:pb-28 lg:p-8">
              {children}
            </div>
          </div>
        </main>
      </div>
      <MobileBottomNavigation role={role} />
    </div>
  );
}
