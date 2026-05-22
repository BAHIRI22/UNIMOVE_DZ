export type SubscriptionType = 'ticket' | 'daily' | 'weekly' | 'monthly' | 'student' | 'teacher' | 'administrative' | 'group' | 'event';
export type PaymentMethod = 'cash' | 'baridimob' | 'edahabia' | 'ccp' | 'credit_card' | 'qr_code';
export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed';
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled';

export interface Subscription {
  id: string;
  type: SubscriptionType;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  duration: number; // in days
  benefits: string[];
  benefitsAr: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
}

export interface PaymentMethodOption {
  id: string;
  type: PaymentMethod;
  name: string;
  nameAr: string;
  icon: string;
  available: boolean;
  comingSoon?: boolean;
}

export interface Payment {
  id: string;
  userId: string;
  subscriptionId: string;
  subscriptionType: SubscriptionType;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: string;
  completedAt?: string;
}

export interface UserSubscription {
  id: string;
  userId: string;
  subscriptionId: string;
  subscriptionType: SubscriptionType;
  subscriptionName: string;
  subscriptionNameAr: string;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  paymentId: string;
  amount: number;
  autoRenew: boolean;
}
