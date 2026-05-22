'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ATTRIBUTIONS } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const { language } = useLanguage();

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
                  src="/images/logo.png?v=2026-logo-update"
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
            <p className="text-slate-300 text-xl leading-[2.2] mb-8 font-medium">
              {language === 'ar'
                ? 'نظام نقل جامعي ذكي للطلاب والأساتذة والموظفين'
                : 'Système de transport universitaire intelligent pour étudiants, enseignants et personnel'}
            </p>
            <div className="flex items-center gap-4 text-xl text-emerald-300 mb-8">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <span className="font-medium">support@unimove-dz.dz</span>
            </div>
            <div className="flex items-center gap-4 text-xl text-emerald-300">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <span className="font-medium">+213 (0) 55 70 77 069</span>
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
            <a href="#" className="w-14 h-14 bg-white/10 hover:bg-emerald-500 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <Facebook className="w-7 h-7" />
            </a>
            <a href="#" className="w-14 h-14 bg-white/10 hover:bg-emerald-500 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <Twitter className="w-7 h-7" />
            </a>
            <a href="#" className="w-14 h-14 bg-white/10 hover:bg-emerald-500 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <Instagram className="w-7 h-7" />
            </a>
            <a href="#" className="w-14 h-14 bg-white/10 hover:bg-emerald-500 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <Linkedin className="w-7 h-7" />
            </a>
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
