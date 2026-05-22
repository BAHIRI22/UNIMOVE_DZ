'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('language') as Language;
    if (saved) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const isRTL = language === 'ar';

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {mounted && (
        <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen">
          {children}
        </div>
      )}
      {!mounted && children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

const translations = {
  ar: {
    common: {
      appName: 'Unimove DZ',
      booking: 'Ø§Ø­Ø¬Ø² Ø±Ø­Ù„ØªÙƒ',
      signUp: 'Ø¥Ù†Ø´Ø§Ø¡ Ø­Ø³Ø§Ø¨',
      signIn: 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„',
      logout: 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø®Ø±ÙˆØ¬',
      language: 'Ø§Ù„Ù„ØºØ©',
      loading: 'Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„...',
      success: 'ØªÙ… Ø¨Ù†Ø¬Ø§Ø­',
      error: 'Ø®Ø·Ø£',
      cancel: 'Ø¥Ù„ØºØ§Ø¡',
      submit: 'Ø¥Ø±Ø³Ø§Ù„',
      next: 'Ø§Ù„ØªØ§Ù„ÙŠ',
      previous: 'Ø§Ù„Ø³Ø§Ø¨Ù‚',
      save: 'Ø­ÙØ¸',
      delete: 'Ø­Ø°Ù',
      edit: 'ØªØ¹Ø¯ÙŠÙ„',
      add: 'Ø¥Ø¶Ø§ÙØ©',
      back: 'Ø±Ø¬ÙˆØ¹',
      close: 'Ø¥ØºÙ„Ø§Ù‚',
    },
    nav: {
      home: 'Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©',
      about: 'Ø¹Ù† Ø§Ù„Ù…Ø´Ø±ÙˆØ¹',
      features: 'Ø§Ù„Ù…Ù…ÙŠØ²Ø§Øª',
      contact: 'Ø§ØªØµÙ„ Ø¨Ù†Ø§',
      dashboard: 'Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…',
      admin: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù†Ø¸Ø§Ù…',
      register: 'Ø§Ù„ØªØ³Ø¬ÙŠÙ„',
    },
    hero: {
      title: 'Ù†Ù‚Ù„ Ø°ÙƒÙŠ Ù„Ù„Ø·Ù„Ø§Ø¨ Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠÙŠÙ†',
      subtitle: 'Ø­Ù„ Ù…ØªÙƒØ§Ù…Ù„ Ù„Ù†Ù‚Ù„ Ø§Ù„Ø·Ù„Ø§Ø¨ Ø¨ÙŠÙ† Ø§Ù„Ø¬Ø§Ù…Ø¹Ø§Øª',
      pilot: 'Ø§Ù„Ù…Ø±Ø­Ù„Ø© Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠØ© â€“ Ø³ÙŠØ¯ÙŠ Ø¨Ù„Ø¹Ø¨Ø§Ø³',
      description: 'ØªØ·Ø¨ÙŠÙ‚ Ø°ÙƒÙŠ Ù„Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù†Ù‚Ù„ Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ Ù…Ø¹ Ø¨Ø·Ø§Ù‚Ø© Ø±Ù‚Ù…ÙŠØ© ÙˆØ­Ø¬Ø² Ø³Ù‡Ù„',
    },
    problem: {
      title: 'Ø§Ù„Ù…Ø´ÙƒÙ„Ø©',
      description: 'Ø§Ù„Ø·Ù„Ø§Ø¨ ÙŠÙˆØ§Ø¬Ù‡ÙˆÙ† ØµØ¹ÙˆØ¨Ø§Øª ÙÙŠ Ø¥ÙŠØ¬Ø§Ø¯ Ù†Ù‚Ù„ Ø¢Ù…Ù† ÙˆÙ…ÙˆØ«ÙˆÙ‚ Ø¨ÙŠÙ† Ø§Ù„Ø¬Ø§Ù…Ø¹Ø§Øª',
    },
    solution: {
      title: 'Ø§Ù„Ø­Ù„',
      description: 'Ù…Ù†ØµØ© Ù…ØªÙƒØ§Ù…Ù„Ø© ØªÙˆÙØ± Ù†Ù‚Ù„Ø§Ù‹ Ø¢Ù…Ù†Ø§Ù‹ ÙˆÙ…Ù†Ø¸Ù…Ø§Ù‹ Ù…Ø¹ Ø¨Ø·Ø§Ù‚Ø© Ø±Ù‚Ù…ÙŠØ©',
    },
    impact: {
      title: 'Ø§Ù„ØªØ£Ø«ÙŠØ±',
      description: 'ØªØ­Ø³ÙŠÙ† Ø­ÙŠØ§Ø© Ø§Ù„Ø·Ù„Ø§Ø¨ ÙˆØªÙˆÙÙŠØ± Ø®ÙŠØ§Ø±Ø§Øª Ù†Ù‚Ù„ Ø¢Ù…Ù†Ø© ÙˆÙØ¹Ø§Ù„Ø©',
    },
    features: {
      registration: 'ØªØ³Ø¬ÙŠÙ„ Ø³Ù‡Ù„ Ø¨Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ',
      institution: 'Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ø¬Ø§Ù…Ø¹Ø© ÙˆØ§Ù„ÙƒÙ„ÙŠØ©',
      qrCode: 'Ø¨Ø·Ø§Ù‚Ø© Ø±Ù‚Ù…ÙŠØ© Ø¨Ù€ QR ÙƒÙˆØ¯',
      membership: 'Ø¹Ø¶ÙˆÙŠØ© Ù…ÙˆØ«ÙˆÙ‚Ø©',
      booking: 'Ø­Ø¬Ø² Ø±Ø­Ù„Ø§Øª Ø¨Ø³Ù‡ÙˆÙ„Ø©',
      tracking: 'ØªØªØ¨Ø¹ Ø§Ù„Ø±Ø­Ù„Ø§Øª',
    },
    register: {
      title: 'Ø¥Ù†Ø´Ø§Ø¡ Ø­Ø³Ø§Ø¨ Ø¬Ø¯ÙŠØ¯',
      phone: 'Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ',
      enterPhone: 'Ø£Ø¯Ø®Ù„ Ø±Ù‚Ù… Ù‡Ø§ØªÙÙƒ',
      otp: 'ÙƒÙˆØ¯ Ø§Ù„ØªØ­Ù‚Ù‚',
      enterOTP: 'Ø£Ø¯Ø®Ù„ Ø§Ù„ÙƒÙˆØ¯ Ø§Ù„Ù…Ø±Ø³Ù„ Ù„Ùƒ',
      resend: 'Ø¥Ø¹Ø§Ø¯Ø© Ø¥Ø±Ø³Ø§Ù„',
      role: 'Ø§Ø®ØªØ± Ø¯ÙˆØ±Ùƒ',
      student: 'Ø·Ø§Ù„Ø¨/Ø·Ø§Ù„Ø¨Ø©',
      teacher: 'Ø£Ø³ØªØ§Ø°/Ø£Ø³ØªØ§Ø°Ø©',
      admin: 'Ù…Ø³Ø¤ÙˆÙ„',
      institution: 'Ø§Ø®ØªØ± Ø§Ù„Ø¬Ø§Ù…Ø¹Ø©/Ø§Ù„ÙƒÙ„ÙŠØ©',
      documents: 'Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø©',
      upload: 'Ø±ÙØ¹ Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª',
      subscription: 'Ø§Ø®ØªØ± Ø®Ø·Ø© Ø§Ù„Ø§Ø´ØªØ±Ø§Ùƒ',
      daily: 'ÙŠÙˆÙ…ÙŠ',
      weekly: 'Ø£Ø³Ø¨ÙˆØ¹ÙŠ',
      monthly: 'Ø´Ù‡Ø±ÙŠ',
      payment: 'Ø§Ù„Ø¯ÙØ¹',
      cardNumber: 'Ø±Ù‚Ù… Ø§Ù„Ø¨Ø·Ø§Ù‚Ø©',
      validUntil: 'ØµØ§Ù„Ø­Ø© Ø­ØªÙ‰',
      fullName: 'Ø§Ù„Ø§Ø³Ù… Ø§Ù„ÙƒØ§Ù…Ù„',
      homePoint: 'Ù†Ù‚Ø·Ø© Ø§Ù„ØªØ¬Ù…Ø¹',
      preferredRoute: 'Ø§Ù„Ø·Ø±ÙŠÙ‚ Ø§Ù„Ù…ÙØ¶Ù„',
      success: 'ØªÙ… Ø§Ù„ØªØ³Ø¬ÙŠÙ„ Ø¨Ù†Ø¬Ø§Ø­',
    },
    dashboard: {
      welcome: 'Ø£Ù‡Ù„Ø§ ÙˆØ³Ù‡Ù„Ø§',
      myCard: 'Ø¨Ø·Ø§Ù‚ØªÙŠ',
      myReservations: 'Ø­Ø¬ÙˆØ²Ø§ØªÙŠ',
      bookTrip: 'Ø§Ø­Ø¬Ø² Ø±Ø­Ù„Ø© Ø¬Ø¯ÙŠØ¯Ø©',
      upcoming: 'Ù‚Ø§Ø¯Ù…Ø©',
      completed: 'Ù…ÙƒØªÙ…Ù„Ø©',
      cancelled: 'Ù…Ù„ØºØ§Ø©',
    },
    admin: {
      dashboard: 'Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…',
      institutions: 'Ø§Ù„Ø¬Ø§Ù…Ø¹Ø§Øª ÙˆØ§Ù„ÙƒÙ„ÙŠØ§Øª',
      routes: 'Ø§Ù„Ø·Ø±Ù‚',
      users: 'Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙˆÙ†',
      subscriptions: 'Ø§Ù„Ø§Ø´ØªØ±Ø§ÙƒØ§Øª',
      analytics: 'Ø§Ù„ØªØ­Ù„ÙŠÙ„Ø§Øª',
      overview: 'Ù†Ø¸Ø±Ø© Ø¹Ø§Ù…Ø©',
      activeUsers: 'Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙˆÙ† Ø§Ù„Ù†Ø´Ø·ÙˆÙ†',
      revenue: 'Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª',
      reservations: 'Ø§Ù„Ø­Ø¬ÙˆØ²Ø§Øª',
    },
    about: {
      title: 'Ø¹Ù† Ø§Ù„Ù…Ø´Ø±ÙˆØ¹',
      description: 'Ù…Ø´Ø±ÙˆØ¹ ØªØ®Ø±Ø¬ Ù…Ø§Ø³ØªØ± 2 ÙÙŠ Ø§Ù„Ù‚Ø§Ù†ÙˆÙ† ÙˆØ§Ù„Ø¹Ù„ÙˆÙ… Ø§Ù„Ø³ÙŠØ§Ø³ÙŠØ©',
      student: 'Ø§Ù„Ø·Ø§Ù„Ø¨Ø©: Ù…Ø±Ø§Ø­ ÙØ±ÙŠØ§Ù„ / Ù…Ø±Ø§Ø­ Ø£Ù…ÙŠÙ†Ø©',
      faculty: 'Ø§Ù„ÙƒÙ„ÙŠØ©: ÙƒÙ„ÙŠØ© Ø§Ù„Ø­Ù‚ÙˆÙ‚ ÙˆØ§Ù„Ø¹Ù„ÙˆÙ… Ø§Ù„Ø³ÙŠØ§Ø³ÙŠØ©',
      supervisor: 'الإشراف: د:رمدوم نورة',
      university: 'Ø¬Ø§Ù…Ø¹Ø© Ø¬ÙŠÙ„Ø§Ù„ÙŠ Ø§Ù„ÙŠØ§Ø¨Ø³ â€“ Ø³ÙŠØ¯ÙŠ Ø¨Ù„Ø¹Ø¨Ø§Ø³',
      futureStartup: 'ØªÙ… ØªØµÙ…ÙŠÙ… Ù‡Ø°Ø§ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ ÙƒÙ†Ù…ÙˆØ°Ø¬ Ø£ÙˆÙ„ÙŠ Ù„Ø´Ø±ÙƒØ© Ù†Ø§Ø´Ø¦Ø© Ù…Ø³ØªÙ‚Ø¨Ù„ÙŠØ©',
    },
    vision: {
      title: 'Ø§Ù„Ø±Ø¤ÙŠØ© Ø§Ù„Ù…Ø³ØªÙ‚Ø¨Ù„ÙŠØ©',
      expansion: 'Ø§Ù„ØªÙˆØ³Ø¹ Ø¥Ù„Ù‰ Ø¬Ù…ÙŠØ¹ Ø§Ù„ÙˆÙ„Ø§ÙŠØ§Øª',
      ai: 'Ø¯Ù…Ø¬ ØªÙ‚Ù†ÙŠØ§Øª Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ',
      sustainability: 'Ø§Ù„Ø§Ø³ØªØ¯Ø§Ù…Ø© ÙˆØ§Ù„Ù†Ù‚Ù„ Ø§Ù„Ø£Ø®Ø¶Ø±',
    },
    footer: {
      rights: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ‚ Ù…Ø­ÙÙˆØ¸Ø©',
      terms: 'Ø´Ø±ÙˆØ· Ø§Ù„Ø®Ø¯Ù…Ø©',
      privacy: 'Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø®ØµÙˆØµÙŠØ©',
      contact: 'Ø§ØªØµÙ„ Ø¨Ù†Ø§',
    },
  },
  fr: {
    common: {
      appName: 'Unimove DZ',
      booking: 'RÃ©servez un trajet',
      signUp: 'CrÃ©er un compte',
      signIn: 'Se connecter',
      logout: 'DÃ©connexion',
      language: 'Langue',
      loading: 'Chargement...',
      success: 'SuccÃ¨s',
      error: 'Erreur',
      cancel: 'Annuler',
      submit: 'Soumettre',
      next: 'Suivant',
      previous: 'PrÃ©cÃ©dent',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      back: 'Retour',
      close: 'Fermer',
    },
    nav: {
      home: 'Accueil',
      about: 'Ã€ propos',
      features: 'CaractÃ©ristiques',
      contact: 'Contactez-nous',
      dashboard: 'Tableau de bord',
      admin: 'Administration',
      register: 'Inscription',
    },
    hero: {
      title: 'Transport intelligent pour Ã©tudiants',
      subtitle: 'Une solution complÃ¨te de transport entre universitÃ©s',
      pilot: 'Phase pilote â€“ Sidi Bel AbbÃ¨s',
      description: 'Application intelligente de gestion du transport universitaire avec carte numÃ©rique et rÃ©servation facile',
    },
    problem: {
      title: 'Le problÃ¨me',
      description: 'Les Ã©tudiants rencontrent des difficultÃ©s Ã  trouver un transport sÃ»r et fiable entre les universitÃ©s',
    },
    solution: {
      title: 'La solution',
      description: 'Une plateforme complÃ¨te offrant un transport sÃ»r et organisÃ© avec carte numÃ©rique',
    },
    impact: {
      title: 'L\'impact',
      description: 'AmÃ©liorer la vie des Ã©tudiants et offrir des options de transport sÃ»res et efficaces',
    },
    features: {
      registration: 'Inscription facile par numÃ©ro de tÃ©lÃ©phone',
      institution: 'SÃ©lection de l\'universitÃ© et de la facultÃ©',
      qrCode: 'Carte numÃ©rique avec code QR',
      membership: 'AdhÃ©sion fiable',
      booking: 'RÃ©servation de trajets facile',
      tracking: 'Suivi des trajets',
    },
    register: {
      title: 'CrÃ©er un nouveau compte',
      phone: 'NumÃ©ro de tÃ©lÃ©phone',
      enterPhone: 'Entrez votre numÃ©ro de tÃ©lÃ©phone',
      otp: 'Code de vÃ©rification',
      enterOTP: 'Entrez le code qui vous a Ã©tÃ© envoyÃ©',
      resend: 'Renvoyer',
      role: 'Choisissez votre rÃ´le',
      student: 'Ã‰tudiant(e)',
      teacher: 'Enseignant(e)',
      admin: 'Administrateur',
      institution: 'Choisissez l\'universitÃ©/facultÃ©',
      documents: 'Documents requis',
      upload: 'TÃ©lÃ©charger les documents',
      subscription: 'Choisissez un plan d\'abonnement',
      daily: 'Quotidien',
      weekly: 'Hebdomadaire',
      monthly: 'Mensuel',
      payment: 'Paiement',
      cardNumber: 'NumÃ©ro de carte',
      validUntil: 'Valide jusqu\'au',
      fullName: 'Nom complet',
      homePoint: 'Point de rassemblement',
      preferredRoute: 'ItinÃ©raire prÃ©fÃ©rÃ©',
      success: 'Inscription rÃ©ussie',
    },
    dashboard: {
      welcome: 'Bienvenue',
      myCard: 'Ma carte',
      myReservations: 'Mes rÃ©servations',
      bookTrip: 'RÃ©server un nouveau trajet',
      upcoming: 'Ã€ venir',
      completed: 'TerminÃ©',
      cancelled: 'AnnulÃ©',
    },
    admin: {
      dashboard: 'Tableau de bord',
      institutions: 'UniversitÃ©s et facultÃ©s',
      routes: 'ItinÃ©raires',
      users: 'Utilisateurs',
      subscriptions: 'Abonnements',
      analytics: 'Analyse',
      overview: 'AperÃ§u',
      activeUsers: 'Utilisateurs actifs',
      revenue: 'Chiffre d\'affaires',
      reservations: 'RÃ©servations',
    },
    about: {
      title: 'Ã€ propos du projet',
      description: 'Projet de fin d\'Ã©tudes en Droit et Sciences Politiques',
      student: 'Ã‰tudiante: Merah Amina',
      faculty: 'FacultÃ©: Droit et Sciences Politiques',
      supervisor: 'Superviseur: DR RAMDOUM NORA',
      university: 'UniversitÃ© Djillali Liabes â€“ Sidi Bel AbbÃ¨s',
      futureStartup: 'Ce projet a Ã©tÃ© conÃ§u comme prototype pour une future startup',
    },
    vision: {
      title: 'Vision Future',
      expansion: 'Expansion Ã  tous les Ã‰tats',
      ai: 'IntÃ©gration des technologies d\'IA',
      sustainability: 'DurabilitÃ© et transport vert',
    },
    footer: {
      rights: 'Tous les droits rÃ©servÃ©s',
      terms: 'Conditions d\'utilisation',
      privacy: 'Politique de confidentialitÃ©',
      contact: 'Nous contacter',
    },
  },
};
