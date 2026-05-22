'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
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
    <div className="min-h-screen bg-emerald-950">
      <DashboardSidebar role={role} />
      <div className="lg:ml-64">
        <DashboardTopbar onMobileMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main className="relative flex-1 overflow-hidden min-h-screen">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
          >
            <source src="/videos/UNIMOVEDZ.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-emerald-950/60 z-10" />

          <div className="relative z-20 p-4 pb-28 sm:p-6 sm:pb-28 lg:p-8">
            {children}
          </div>
        </main>
      </div>
      <MobileBottomNavigation role={role} />
    </div>
  );
}
