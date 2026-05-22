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
      booking: 'احجز رحلتك',
      signUp: 'إنشاء حساب',
      signIn: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      language: 'اللغة',
      loading: 'جاري التحميل...',
      success: 'تم بنجاح',
      error: 'خطأ',
      cancel: 'إلغاء',
      submit: 'إرسال',
      next: 'التالي',
      previous: 'السابق',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
      add: 'إضافة',
      back: 'رجوع',
      close: 'إغلاق',
    },
    nav: {
      home: 'الرئيسية',
      about: 'عن المشروع',
      features: 'المميزات',
      contact: 'اتصل بنا',
      dashboard: 'لوحة التحكم',
      admin: 'إدارة النظام',
      register: 'التسجيل',
    },
    hero: {
      title: 'نقل ذكي للطلاب الجامعيين',
      subtitle: 'حل متكامل لنقل الطلاب بين الجامعات',
      pilot: 'المرحلة التجريبية – سيدي بلعباس',
      description: 'تطبيق ذكي لإدارة النقل الجامعي مع بطاقة رقمية وحجز سهل',
    },
    problem: {
      title: 'المشكلة',
      description: 'الطلاب يواجهون صعوبات في إيجاد نقل آمن وموثوق بين الجامعات',
    },
    solution: {
      title: 'الحل',
      description: 'منصة متكاملة توفر نقلا آمنا ومنظما مع بطاقة رقمية',
    },
    impact: {
      title: 'التأثير',
      description: 'تحسين حياة الطلاب وتوفير خيارات نقل آمنة وفعالة',
    },
    features: {
      registration: 'تسجيل سهل برقم الهاتف',
      institution: 'اختيار الجامعة والكلية',
      qrCode: 'بطاقة رقمية بـ QR كود',
      membership: 'عضوية موثوقة',
      booking: 'حجز رحلات بسهولة',
      tracking: 'تتبع الرحلات',
    },
    register: {
      title: 'إنشاء حساب جديد',
      phone: 'رقم الهاتف',
      enterPhone: 'أدخل رقم هاتفك',
      otp: 'كود التحقق',
      enterOTP: 'أدخل الكود المرسل لك',
      resend: 'إعادة إرسال',
      role: 'اختر دورك',
      student: 'طالب/طالبة',
      teacher: 'أستاذ/أستاذة',
      admin: 'مسؤول',
      institution: 'اختر الجامعة/الكلية',
      documents: 'المستندات المطلوبة',
      upload: 'رفع المستندات',
      subscription: 'اختر خطة الاشتراك',
      daily: 'يومي',
      weekly: 'أسبوعي',
      monthly: 'شهري',
      payment: 'الدفع',
      cardNumber: 'رقم البطاقة',
      validUntil: 'صالحة حتى',
      fullName: 'الاسم الكامل',
      homePoint: 'نقطة التجمع',
      preferredRoute: 'الطريق المفضل',
      success: 'تم التسجيل بنجاح',
    },
    dashboard: {
      welcome: 'أهلا وسهلا',
      myCard: 'بطاقتي',
      myReservations: 'حجوزاتي',
      bookTrip: 'احجز رحلة جديدة',
      upcoming: 'قادمة',
      completed: 'مكتملة',
      cancelled: 'ملغاة',
    },
    admin: {
      dashboard: 'لوحة التحكم',
      institutions: 'الجامعات والكليات',
      routes: 'الطرق',
      users: 'المستخدمون',
      subscriptions: 'الاشتراكات',
      analytics: 'التحليلات',
      overview: 'نظرة عامة',
      activeUsers: 'المستخدمون النشطون',
      revenue: 'الإيرادات',
      reservations: 'الحجوزات',
    },
    about: {
      title: 'عن المشروع',
      description: 'مشروع تخرج ماستر 2 في القانون والعلوم السياسية',
      student: 'الطالبة: مراح فريال / مراح أمينة',
      faculty: 'الكلية: كلية الحقوق والعلوم السياسية',
      supervisor: 'الإشراف: د:رمدوم نورة',
      university: 'جامعة جيلالي اليابس – سيدي بلعباس',
      futureStartup: 'تم تصميم هذا المشروع كنموذج أولي لشركة ناشئة مستقبلية',
    },
    vision: {
      title: 'الرؤية المستقبلية',
      expansion: 'التوسع إلى جميع الولايات',
      ai: 'دمج تقنيات الذكاء الاصطناعي',
      sustainability: 'الاستدامة والنقل الأخضر',
    },
    footer: {
      rights: 'جميع الحقوق محفوظة',
      terms: 'شروط الخدمة',
      privacy: 'سياسة الخصوصية',
      contact: 'اتصل بنا',
    },
  },
  fr: {
    common: {
      appName: 'Unimove DZ',
      booking: 'Réservez un trajet',
      signUp: 'Créer un compte',
      signIn: 'Se connecter',
      logout: 'Déconnexion',
      language: 'Langue',
      loading: 'Chargement...',
      success: 'Succès',
      error: 'Erreur',
      cancel: 'Annuler',
      submit: 'Soumettre',
      next: 'Suivant',
      previous: 'Précédent',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      back: 'Retour',
      close: 'Fermer',
    },
    nav: {
      home: 'Accueil',
      about: 'À propos',
      features: 'Caractéristiques',
      contact: 'Contactez-nous',
      dashboard: 'Tableau de bord',
      admin: 'Administration',
      register: 'Inscription',
    },
    hero: {
      title: 'Transport intelligent pour étudiants',
      subtitle: 'Une solution complète de transport entre universités',
      pilot: 'Phase pilote – Sidi Bel Abbès',
      description: 'Application intelligente de gestion du transport universitaire avec carte numérique et réservation facile',
    },
    problem: {
      title: 'Le problème',
      description: 'Les étudiants rencontrent des difficultés à trouver un transport sûr et fiable entre les universités',
    },
    solution: {
      title: 'La solution',
      description: 'Une plateforme complète offrant un transport sûr et organisé avec carte numérique',
    },
    impact: {
      title: 'L\'impact',
      description: 'Améliorer la vie des étudiants et offrir des options de transport sûres et efficaces',
    },
    features: {
      registration: 'Inscription facile par numéro de téléphone',
      institution: 'Sélection de l\'université et de la faculté',
      qrCode: 'Carte numérique avec code QR',
      membership: 'Adhésion fiable',
      booking: 'Réservation de trajets facile',
      tracking: 'Suivi des trajets',
    },
    register: {
      title: 'Créer un nouveau compte',
      phone: 'Numéro de téléphone',
      enterPhone: 'Entrez votre numéro de téléphone',
      otp: 'Code de vérification',
      enterOTP: 'Entrez le code qui vous a été envoyé',
      resend: 'Renvoyer',
      role: 'Choisissez votre rôle',
      student: 'Étudiant(e)',
      teacher: 'Enseignant(e)',
      admin: 'Administrateur',
      institution: 'Choisissez l\'université/faculté',
      documents: 'Documents requis',
      upload: 'Télécharger les documents',
      subscription: 'Choisissez un plan d\'abonnement',
      daily: 'Quotidien',
      weekly: 'Hebdomadaire',
      monthly: 'Mensuel',
      payment: 'Paiement',
      cardNumber: 'Numéro de carte',
      validUntil: 'Valide jusqu\'au',
      fullName: 'Nom complet',
      homePoint: 'Point de rassemblement',
      preferredRoute: 'Itinéraire préféré',
      success: 'Inscription réussie',
    },
    dashboard: {
      welcome: 'Bienvenue',
      myCard: 'Ma carte',
      myReservations: 'Mes réservations',
      bookTrip: 'Réserver un nouveau trajet',
      upcoming: 'À venir',
      completed: 'Terminé',
      cancelled: 'Annulé',
    },
    admin: {
      dashboard: 'Tableau de bord',
      institutions: 'Universités et facultés',
      routes: 'Itinéraires',
      users: 'Utilisateurs',
      subscriptions: 'Abonnements',
      analytics: 'Analyse',
      overview: 'Aperçu',
      activeUsers: 'Utilisateurs actifs',
      revenue: 'Chiffre d\'affaires',
      reservations: 'Réservations',
    },
    about: {
      title: 'À propos du projet',
      description: 'Projet de fin d\'études en Droit et Sciences Politiques',
      student: 'Étudiante: Merah Amina',
      faculty: 'Faculté: Droit et Sciences Politiques',
      supervisor: 'Superviseur: DR RAMDOUM NORA',
      university: 'Université Djillali Liabes – Sidi Bel Abbès',
      futureStartup: 'Ce projet a été conçu comme prototype pour une future startup',
    },
    vision: {
      title: 'Vision Future',
      expansion: 'Expansion à tous les États',
      ai: 'Intégration des technologies d\'IA',
      sustainability: 'Durabilité et transport vert',
    },
    footer: {
      rights: 'Tous les droits réservés',
      terms: 'Conditions d\'utilisation',
      privacy: 'Politique de confidentialité',
      contact: 'Nous contacter',
    },
  },
};
