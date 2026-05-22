export type UserType = 'student' | 'teacher' | 'administrative' | 'driver' | 'investor' | 'responsible';
export type SubscriptionType = 'ticket' | 'daily' | 'weekly' | 'monthly' | 'student' | 'teacher' | 'administrative' | 'group' | 'event';

export interface UserProfile {
  id: string;
  phone: string;
  phoneVerified: boolean;
  email?: string;
  emailVerified?: boolean;
  firstName: string;
  firstNameAr: string;
  lastName: string;
  lastNameAr: string;
  userType: UserType;
  userTypeAr: string;
  university: string;
  universityAr: string;
  faculty: string;
  facultyAr: string;
  level?: string;
  levelAr?: string;
  function?: string;
  functionAr?: string;
  usualDeparturePoint?: string;
  usualDeparturePointAr?: string;
  profilePhoto?: string;
  verified: boolean;
  activeSubscription?: SubscriptionType;
  subscriptionExpiry?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountSettings {
  userId: string;
  preferredLanguage: 'ar' | 'fr';
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  darkMode: boolean;
  privacyProfileVisible: boolean;
  privacyPhoneVisible: boolean;
  privacyEmailVisible: boolean;
}

export interface SecuritySettings {
  userId: string;
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
  sessionTimeout: number; // in minutes
  lastPasswordChange?: string;
  lastLoginAt: string;
  loginHistory: LoginHistory[];
}

export interface LoginHistory {
  id: string;
  userId: string;
  device: string;
  browser: string;
  ipAddress: string;
  location: string;
  locationAr: string;
  loginAt: string;
  successful: boolean;
}
