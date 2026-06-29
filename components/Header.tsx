'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AccessibilityMenu } from '@/components/AccessibilityMenu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { ProtectedPageLink } from '@/components/ProtectedPageLink';
import { isProtectedPath } from '@/lib/passcode';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { language, setLanguage, isRTL } = useLanguage();
  const { isAuthenticated, logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: language === 'ar' ? 'الرئيسية' : 'Accueil' },
  ];

  const projectLinks = [
    { href: '/about-project', label: language === 'ar' ? 'المشروع' : 'Projet' },
    { href: '/business-model', label: language === 'ar' ? 'نموذج الأعمال' : 'Business' },
    { href: '/pricing', label: language === 'ar' ? 'الأسعار' : 'Tarifs' },
    { href: '/startup', label: language === 'ar' ? 'Startup' : 'Startup' },
    { href: '/investors', label: language === 'ar' ? 'المستثمرون' : 'Investisseurs' },
    { href: '/financial-plan', label: language === 'ar' ? 'المالية' : 'Finance' },
    { href: '/demo', label: language === 'ar' ? 'وضع العرض' : 'Mode présentation', highlight: true },
  ] as Array<{ href: string; label: string; highlight?: boolean }>;


  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200/50' 
        : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 lg:h-24 items-center justify-between">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-1.5 md:gap-2.5 hover:opacity-95 transition-opacity select-none flex-shrink-0">
            {/* Main App Logo */}
            <motion.div 
              className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex-shrink-0"
              whileHover={{ scale: 1.04, rotate: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/images/logo.png?v=logo-clean"
                alt="UNIMOVE-DZ Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Vertical Divider */}
            <div className="hidden sm:block h-8 md:h-10 border-l rtl:border-l-0 rtl:border-r border-slate-300 mx-1 md:mx-1.5 flex-shrink-0" />

            {/* University Logo & Brand Text */}
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              {/* University Circular Logo - Crystal Sharp */}
              <div className="relative w-10 h-10 md:w-11 md:h-11 flex-shrink-0 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center p-1">
                <Image 
                  src="/images/udl-logo.jpeg" 
                  alt="Université Djillali Liabès" 
                  width={38}
                  height={38}
                  className="object-contain" 
                  priority
                />
              </div>
              
              {/* Brand Text & Tagline */}
              <div className="hidden lg:flex flex-col text-start">
                <span className="text-xs md:text-sm font-black text-slate-800 leading-tight whitespace-nowrap">
                  {language === 'ar' ? 'جامعة الجيلالي اليابس' : 'Université Djillali Liabès'}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold leading-tight mt-0.5 whitespace-nowrap">
                  {language === 'ar' ? 'الجامعة أقرب، أسهل، و أأمن' : 'L\'université plus proche, plus facile et plus sûre'}
                </span>
              </div>
            </div>
          </Link>

          {/* Center Navigation - Hide on mobile */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-5">
            {!isAuthenticated && (
              <>
                {navLinks.map((link) =>
                  isProtectedPath(link.href) ? (
                    <ProtectedPageLink
                      key={link.href}
                      href={link.href}
                      className="relative text-xs lg:text-sm font-bold transition-all duration-300 text-slate-700 hover:text-emerald-600 group whitespace-nowrap"
                      label={link.label}
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full" />
                    </ProtectedPageLink>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative text-xs lg:text-sm font-bold transition-all duration-300 text-slate-700 hover:text-emerald-600 group whitespace-nowrap"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  )
                )}

                {/* Project Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                    className="relative text-xs lg:text-sm font-bold transition-all duration-300 text-slate-700 hover:text-emerald-600 group whitespace-nowrap flex items-center gap-1"
                  >
                    {language === 'ar' ? 'عن المشروع' : 'À propos du projet'}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${projectDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {projectDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
                      >
                        <div className="py-2">
                          {projectLinks.map((link) =>
                            isProtectedPath(link.href) ? (
                              <ProtectedPageLink
                                key={link.href}
                                href={link.href}
                                onClick={() => setProjectDropdownOpen(false)}
                                className={`block px-4 py-3 text-sm font-bold transition-all duration-200 ${
                                  link.highlight 
                                    ? 'text-emerald-600 hover:bg-emerald-50' 
                                    : 'text-slate-700 hover:bg-slate-50'
                                }`}
                                label={link.label}
                              >
                                {link.label}
                              </ProtectedPageLink>
                            ) : (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setProjectDropdownOpen(false)}
                                className={`block px-4 py-3 text-sm font-bold transition-all duration-200 ${
                                  link.highlight 
                                    ? 'text-emerald-600 hover:bg-emerald-50' 
                                    : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                {link.label}
                              </Link>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </nav>

          {/* Right Side - Auth & Language */}
          <div className="flex items-center gap-1.5 md:gap-2.5 flex-shrink-0">
            {/* Theme & Accessibility */}
            <div className="hidden sm:flex items-center gap-1.5">
              <ThemeToggle />
              <AccessibilityMenu />
            </div>

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === 'ar' ? 'fr' : 'ar')}
              className="px-2.5 py-1.5 md:px-3 md:py-2 text-xs md:text-sm font-bold bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700 rounded-lg md:rounded-xl transition-all duration-300 flex-shrink-0"
            >
              {language === 'ar' ? 'FR' : 'AR'}
            </motion.button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
                <span className="text-xs md:text-sm font-bold text-slate-700 whitespace-nowrap">
                  {language === 'ar' ? 'مرحباً' : 'Bienvenue'}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 h-9 md:h-11 text-xs md:text-sm font-black text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg md:rounded-xl shadow-md transition-all duration-500 hover:shadow-lg flex-shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="hidden sm:inline whitespace-nowrap">{language === 'ar' ? 'خروج' : 'Déconnexion'}</span>
                </motion.button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" asChild className="px-3 py-1.5 md:px-4 md:py-2 h-9 md:h-11 text-xs md:text-sm font-bold rounded-lg md:rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-500 flex-shrink-0 whitespace-nowrap">
                    <Link href="/register">
                      {language === 'ar' ? 'تسجيل' : 'Inscription'}
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" asChild className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-3 py-1.5 md:px-4 md:py-2 h-9 md:h-11 text-xs md:text-sm font-black rounded-lg md:rounded-xl shadow-md transition-all duration-500 hover:shadow-lg flex-shrink-0 whitespace-nowrap">
                    <Link href="/login">
                      {language === 'ar' ? 'دخول' : 'Connexion'}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 border-t border-slate-200">
                <nav className="flex flex-col gap-4">
                  {!isAuthenticated && (
                    <>
                      {navLinks.map((link) =>
                        isProtectedPath(link.href) ? (
                          <ProtectedPageLink
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-bold transition-all duration-300 py-2 text-slate-700 hover:text-emerald-600"
                            label={link.label}
                          >
                            {link.label}
                          </ProtectedPageLink>
                        ) : (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-bold transition-all duration-300 py-2 text-slate-700 hover:text-emerald-600"
                          >
                            {link.label}
                          </Link>
                        )
                      )}

                      {/* Project Links in Mobile Menu */}
                      <div className="pt-4 border-t border-slate-200">
                        <p className="text-sm font-bold text-slate-500 mb-3">
                          {language === 'ar' ? 'عن المشروع' : 'À propos du projet'}
                        </p>
                        <div className="flex flex-col gap-2">
                          {projectLinks.map((link) =>
                            isProtectedPath(link.href) ? (
                              <ProtectedPageLink
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-base font-bold transition-all duration-300 py-2 ${
                                  link.highlight 
                                    ? 'text-emerald-600 hover:text-emerald-700' 
                                    : 'text-slate-700 hover:text-emerald-600'
                                }`}
                                label={link.label}
                              >
                                {link.label}
                              </ProtectedPageLink>
                            ) : (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-base font-bold transition-all duration-300 py-2 ${
                                  link.highlight 
                                    ? 'text-emerald-600 hover:text-emerald-700' 
                                    : 'text-slate-700 hover:text-emerald-600'
                                }`}
                              >
                                {link.label}
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-4 pt-4 border-t border-slate-200">
                      <span className="text-base font-bold text-slate-700 py-2">
                        {language === 'ar' ? 'مرحباً' : 'Bienvenue'}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={logout}
                        className="flex items-center justify-center gap-2 px-5 py-3 text-base font-black text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/30"
                      >
                        <LogOut className="w-5 h-5" />
                        {language === 'ar' ? 'خروج' : 'Déconnexion'}
                      </motion.button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 pt-4 border-t border-slate-200">
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="lg" asChild className="w-full px-5 py-3 h-14 text-base font-bold rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-500">
                          <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                            {language === 'ar' ? 'تسجيل' : 'Inscription'}
                          </Link>
                        </Button>
                      </motion.div>
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button size="lg" asChild className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white w-full px-5 py-3 h-14 text-base font-black rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/30">
                          <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                            {language === 'ar' ? 'دخول' : 'Connexion'}
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
