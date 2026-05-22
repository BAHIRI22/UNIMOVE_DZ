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
                  src="/images/logo.png"
                  alt="UNIMOVE-DZ Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-4xl text-white tracking-tight">UNIMOVE-DZ</span>
                <span className="text-xl text-emerald-300 font-bold mt-2">
                  {language === 'ar' ? 'Ø§Ù„Ø¬Ø§Ù…Ø¹Ø© Ø£Ù‚Ø±Ø¨ØŒ Ø£Ø³Ù‡Ù„ØŒ Ùˆ Ø£Ø£Ù…Ù†' : 'L\'universitÃ© plus proche, plus facile et plus sÃ»re'}
                </span>
              </div>
            </div>
            <p className="text-slate-300 text-xl leading-[2.2] mb-8 font-medium">
              {language === 'ar'
                ? 'Ù†Ø¸Ø§Ù… Ù†Ù‚Ù„ Ø¬Ø§Ù…Ø¹ÙŠ Ø°ÙƒÙŠ Ù„Ù„Ø·Ù„Ø§Ø¨ ÙˆØ§Ù„Ø£Ø³Ø§ØªØ°Ø© ÙˆØ§Ù„Ù…ÙˆØ¸ÙÙŠÙ†'
                : 'SystÃ¨me de transport universitaire intelligent pour Ã©tudiants, enseignants et personnel'}
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
              {language === 'ar' ? 'Ø±ÙˆØ§Ø¨Ø· Ø³Ø±ÙŠØ¹Ø©' : 'Liens rapides'}
            </h4>
            <ul className="space-y-6">
              <li>
                <Link href="/" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©' : 'Accueil'}
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'Ù…Ù† Ù†Ø­Ù†' : 'Ã€ propos'}
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'Ø§Ù„Ø®Ø¯Ù…Ø§Øª' : 'Services'}
                </Link>
              </li>
              <li>
                <Link href="#booking" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'Ø§Ù„Ø­Ø¬Ø²' : 'RÃ©servation'}
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-bold">
                  {language === 'ar' ? 'Ø¹Ø±Ø¶ ØªÙˆØ¶ÙŠØ­ÙŠ' : 'DÃ©mo'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-black text-2xl text-white mb-8">
              {language === 'ar' ? 'Ù‚Ø§Ù†ÙˆÙ†ÙŠ' : 'LÃ©gal'}
            </h4>
            <ul className="space-y-6">
              <li>
                <Link href="/terms" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'Ø§Ù„Ø´Ø±ÙˆØ· ÙˆØ§Ù„Ø£Ø­ÙƒØ§Ù…' : 'Conditions d\'utilisation'}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø®ØµÙˆØµÙŠØ©' : 'Politique de confidentialitÃ©'}
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø©' : 'Aide'}
                </Link>
              </li>
              <li>
                <Link href="/credits" className="text-slate-300 hover:text-emerald-300 transition-colors text-xl font-medium">
                  {language === 'ar' ? 'Ø§Ù„Ø§Ø¹ØªÙ…Ø§Ø¯Ø§Øª' : 'CrÃ©dits'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Attribution */}
          <div>
            <h4 className="font-black text-2xl text-white mb-8">
              {language === 'ar' ? 'Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø§Ù„Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠ' : 'Projet acadÃ©mique'}
            </h4>
            <ul className="space-y-6">
              <li className="text-slate-300">
                <span className="font-black text-white block mb-2 text-xl">
                  {language === 'ar' ? 'Ø§Ù„Ø·Ø§Ù„Ø¨Ø©' : 'Ã‰tudiante'}
                </span>
                <span className="text-xl font-medium">{ATTRIBUTIONS.academic.nameAr}</span>
              </li>
              <li className="text-slate-300">
                <span className="font-black text-white block mb-2 text-xl">
                  {language === 'ar' ? 'Ø§Ù„ØªØ®ØµØµ' : 'SpÃ©cialitÃ©'}
                </span>
                <span className="text-xl font-medium">{ATTRIBUTIONS.academic.title}</span>
              </li>
              <li className="text-slate-300">
                <span className="font-black text-white block mb-2 text-xl">
                  {language === 'ar' ? 'Ø§Ù„Ø¥Ø´Ø±Ø§Ù' : 'Supervision'}
                </span>
                <span className="text-xl font-medium">{language === 'ar' ? 'Ø§Ù„Ø¯ÙƒØªÙˆØ±Ø© Ø±Ù…Ø¯ÙˆÙ… Ù†ÙˆØ±Ø©' : 'DR RAMDOUM NORA'}</span>
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
              Â© 2025/2026 UNIMOVE-DZ. {language === 'ar' ? 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ‚ Ù…Ø­ÙÙˆØ¸Ø©' : 'Tous droits rÃ©servÃ©s'}
            </p>
            <p className="text-slate-400 text-lg mt-3 font-medium">
              {language === 'ar'
                ? 'Ù…Ø´Ø±ÙˆØ¹ ØªØ®Ø±Ø¬ Ù…Ø§Ø³ØªØ± 2 ÙÙŠ Ø§Ù„Ù‚Ø§Ù†ÙˆÙ† ÙˆØ§Ù„Ø¹Ù„ÙˆÙ… Ø§Ù„Ø³ÙŠØ§Ø³ÙŠØ©'
                : 'Projet de fin d\'Ã©tudes en Droit et Sciences Politiques'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
