'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ATTRIBUTIONS } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Smartphone, Download } from 'lucide-react';
import { QRCodeDisplay } from './QRCodeDisplay';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface ContactLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  x?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export function Footer() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [contactLinks, setContactLinks] = useState<ContactLinks>({
    email: 'support@unimove-dz.dz',
    phone: '+213 (0) 55 70 77 069',
  });

  useEffect(() => {
    setMounted(true);
    const fetchLinks = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'contactLinks'));
        if (snap.exists()) {
          setContactLinks((prev) => ({ ...prev, ...snap.data() }));
        }
      } catch (e) {
        console.error('[Footer] Error fetching contact links:', e);
      }
    };
    fetchLinks();
  }, []);

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-5 gap-12 mb-16 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 transition-all duration-300 hover:scale-105 hover:drop-shadow-2xl">
                <Image
                  src="/images/logo.png?v=logo-clean"
                  alt="UNIMOVE-DZ Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-4xl text-white tracking-tight">UNIMOVE-DZ</span>
                <span className="text-xl text-emerald-300 font-bold mt-2">
                  {language === 'ar' ? 'الجامعة أقرب، أسهل، و أأمن' : 'L\'université plus proche, plus facile et plus sûre'}
                </span>
              </div>
            </div>
            <p className="text-slate-300 text-xl leading-[2.2] mb-6 font-medium">
              {language === 'ar'
                ? 'نظام نقل جامعي ذكي للطلاب والأساتذة والموظفين'
                : 'Système de transport universitaire intelligent pour étudiants, enseignants et personnel'}
            </p>
            {/* UDL Partnership */}
            <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image src="/images/udl-logo.jpeg" alt="UDL" fill className="object-contain rounded-lg" />
              </div>
              <div>
                <p className="text-white font-bold text-base">
                  UNIMOVE-DZ
                </p>
                <p className="text-emerald-300 text-sm font-medium">
                  {language === 'ar'
                    ? 'مشروع جامعي تم تطويره بالتعاون مع'
                    : 'Projet universitaire développé en partenariat avec'}
                </p>
                <p className="text-slate-300 text-sm font-bold">
                  {language === 'ar'
                    ? 'جامعة الجيلالي اليابس — سيدي بلعباس'
                    : 'Université Djillali Liabès — Sidi Bel Abbès'}
                </p>
              </div>
            </div>
            {contactLinks.email && (
              <a href={`mailto:${contactLinks.email}`} className="flex items-center gap-4 text-xl text-emerald-300 mb-8 hover:text-white transition-colors">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="font-medium">{contactLinks.email}</span>
              </a>
            )}
            {contactLinks.phone && (
              <a href={`tel:${contactLinks.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 text-xl text-emerald-300 hover:text-white transition-colors">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="font-medium">{contactLinks.phone}</span>
              </a>
            )}

            {/* PWA QR Install */}
            <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-base">
                    {language === 'ar' ? 'ثبّت التطبيق على هاتفك' : 'Installer sur votre téléphone'}
                  </h5>
                  <p className="text-emerald-300 text-sm">
                    {language === 'ar' ? 'امسح الكود للتثبيت الفوري' : 'Scannez pour installer'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 flex-wrap">
                <div className="bg-white p-3 rounded-xl shadow-lg">
                  <QRCodeDisplay
                    value={mounted && typeof window !== 'undefined' ? window.location.origin : 'https://unimove-dz.vercel.app'}
                    size={120}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-emerald-300 text-sm">
                    <Download className="w-4 h-4 shrink-0" />
                    <span>{language === 'ar' ? '1. افتح الكاميرا' : '1. Ouvrez la caméra'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300 text-sm">
                    <Smartphone className="w-4 h-4 shrink-0" />
                    <span>{language === 'ar' ? '2. امسح الكود QR' : '2. Scannez le QR'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300 text-sm">
                    <Download className="w-4 h-4 shrink-0" />
                    <span>{language === 'ar' ? '3. اضغط "تثبيت"' : '3. Appuyez "Installer"'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-2xl text-white mb-8">
              {language === 'ar' ? 'روابط سريعة' : 'Liens rapides'}
            </h4>
            <ul className="space-y-6">
              <li>
                <Link href="/" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'الرئيسية' : 'Accueil'}
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'من نحن' : 'À propos'}
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'الخدمات' : 'Services'}
                </Link>
              </li>
              <li>
                <Link href="#booking" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'الحجز' : 'Réservation'}
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-bold">
                  {language === 'ar' ? 'عرض توضيحي' : 'Démo'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-black text-2xl text-white mb-8">
              {language === 'ar' ? 'قانوني' : 'Légal'}
            </h4>
            <ul className="space-y-6">
              <li>
                <Link href="/terms" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'الشروط والأحكام' : 'Conditions d\'utilisation'}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'سياسة الخصوصية' : 'Politique de confidentialité'}
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'المساعدة' : 'Aide'}
                </Link>
              </li>
              <li>
                <Link href="/credits" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'الاعتمادات' : 'Crédits'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Attribution */}
          <div>
            <h4 className="font-black text-2xl text-white mb-8">
              {language === 'ar' ? 'المشروع الأكاديمي' : 'Projet académique'}
            </h4>
            <ul className="space-y-6">
              <li className="text-slate-300">
                <span className="font-black text-white block mb-2 text-xl">
                  {language === 'ar' ? 'الطالبة' : 'Étudiante'}
                </span>
                <span className="text-xl font-medium">{ATTRIBUTIONS.academic.nameAr}</span>
              </li>
              <li className="text-slate-300">
                <span className="font-black text-white block mb-2 text-xl">
                  {language === 'ar' ? 'التخصص' : 'Spécialité'}
                </span>
                <span className="text-xl font-medium">{ATTRIBUTIONS.academic.title}</span>
              </li>
              <li className="text-slate-300">
                <span className="font-black text-white block mb-2 text-xl">
                  {language === 'ar' ? 'الإشراف' : 'Supervision'}
                </span>
                <span className="text-xl font-medium">{language === 'ar' ? 'د:رمدوم نورة' : 'DR RAMDOUM NORA'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Social Links */}
          <div className="flex items-center gap-5">
            {contactLinks.facebook && (
              <a href={contactLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/10 hover:bg-emerald-500 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Facebook className="w-7 h-7" />
              </a>
            )}
            {contactLinks.instagram && (
              <a href={contactLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/10 hover:bg-emerald-500 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Instagram className="w-7 h-7" />
              </a>
            )}
            {contactLinks.linkedin && (
              <a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/10 hover:bg-emerald-500 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Linkedin className="w-7 h-7" />
              </a>
            )}
            {contactLinks.x && (
              <a href={contactLinks.x} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/10 hover:bg-emerald-500 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            )}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-slate-300 text-xl font-medium">
              © 2025/2026 UNIMOVE-DZ. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'Tous droits réservés'}
            </p>
            <p className="text-slate-400 text-lg mt-3 font-medium">
              {language === 'ar'
                ? 'مشروع تخرج ماستر 2 في القانون والعلوم السياسية'
                : 'Projet de fin d\'études en Droit et Sciences Politiques'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
