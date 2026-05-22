export type NotificationType = 
  | 'booking_confirmation'
  | 'departure_reminder'
  | 'bus_delay'
  | 'driver_change'
  | 'vehicle_change'
  | 'payment_confirmed'
  | 'subscription_expired'
  | 'complaint_update'
  | 'lost_item_found'
  | 'admin_message'
  | 'emergency_alert';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  priority: NotificationPriority;
  read: boolean;
  createdAt: string;
  readAt?: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface AlertBanner {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  dismissible: boolean;
  dismissed?: boolean;
  createdAt: string;
  expiresAt?: string;
}
