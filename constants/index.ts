export const APP_NAME = 'UNIMOVE-DZ';
export const APP_VERSION = '1.0.0';

export const ATTRIBUTIONS = {
  developer: {
    name: 'UNIMOVE-DZ',
    nameAr: 'مشروع UNIMOVE-DZ',
    title: 'Plateforme de transport universitaire intelligent'
  },
  academic: {
    name: 'Merah Ibtissam',
    nameAr: 'مراح ابتسام',
    title: 'Master Droit Public 2025/2026'
  }
};

export const SUBSCRIPTION_PRICES = {
  daily: 100,
  weekly: 500,
  monthly: 1500
};

export const SUBSCRIPTION_LABELS = {
  ar: {
    daily: 'يومي',
    weekly: 'أسبوعي',
    monthly: 'شهري'
  },
  fr: {
    daily: 'Journalier',
    weekly: 'Hebdomadaire',
    monthly: 'Mensuel'
  }
};

export const ROLE_LABELS = {
  ar: {
    student: 'طالب',
    teacher: 'أستاذ',
    admin: 'مدير'
  },
  fr: {
    student: 'Étudiant',
    teacher: 'Enseignant',
    admin: 'Administrateur'
  }
};

export const BOOKING_STATUS_LABELS = {
  ar: {
    pending: 'قيد الانتظار',
    confirmed: 'مؤكد',
    completed: 'مكتمل',
    cancelled: 'ملغي'
  },
  fr: {
    pending: 'En attente',
    confirmed: 'Confirmé',
    completed: 'Terminé',
    cancelled: 'Annulé'
  }
};

export const NAVIGATION_ITEMS = {
  user: [
    { id: 'dashboard', label: { ar: 'لوحة التحكم', fr: 'Tableau de bord' }, icon: 'LayoutDashboard', path: '/dashboard' },
    { id: 'reservation', label: { ar: 'حجز رحلة', fr: 'Réserver' }, icon: 'Calendar', path: '/reservation' },
    { id: 'my-trips', label: { ar: 'رحلاتي', fr: 'Mes trajets' }, icon: 'MapPin', path: '/my-trips' },
    { id: 'my-card', label: { ar: 'بطاقتي', fr: 'Ma carte' }, icon: 'CreditCard', path: '/my-card' },
    { id: 'notifications', label: { ar: 'الإشعارات', fr: 'Notifications' }, icon: 'Bell', path: '/notifications' },
    { id: 'profile', label: { ar: 'الملف الشخصي', fr: 'Profil' }, icon: 'User', path: '/profile' },
  ],
  admin: [
    { id: 'admin-dashboard', label: { ar: 'لوحة التحكم', fr: 'Tableau de bord' }, icon: 'LayoutDashboard', path: '/admin' },
    { id: 'admin-users', label: { ar: 'المستخدمين', fr: 'Utilisateurs' }, icon: 'Users', path: '/admin/users' },
    { id: 'admin-buses', label: { ar: 'الحافلات', fr: 'Bus' }, icon: 'Bus', path: '/admin/buses' },
    { id: 'admin-drivers', label: { ar: 'السائقين', fr: 'Chauffeurs' }, icon: 'UserCheck', path: '/admin/drivers' },
    { id: 'admin-bookings', label: { ar: 'الحجوزات', fr: 'Réservations' }, icon: 'CalendarCheck', path: '/admin/bookings' },
  ]
};
