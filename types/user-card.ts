export type UserType = 'student' | 'teacher' | 'administrative' | 'driver';
export type SubscriptionType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface UserCard {
  id: string;
  userId: string;
  fullName: string;
  fullNameAr: string;
  userType: UserType;
  userTypeAr: string;
  university: string;
  universityAr: string;
  faculty?: string;
  facultyAr?: string;
  institute?: string;
  instituteAr?: string;
  phone: string;
  email?: string;
  cardNumber: string;
  isVerified: boolean;
  subscriptionType: SubscriptionType;
  subscriptionTypeAr: string;
  validFrom: string;
  validUntil: string;
  qrData: string;
  photo?: string;
}

export interface UserCardData {
  user: UserCard;
  qrCodeUrl: string;
}
