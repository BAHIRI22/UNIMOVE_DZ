export type ComplaintCategory = 'delay' | 'cancellation' | 'payment' | 'driver' | 'vehicle' | 'security' | 'lost_item' | 'other';
export type ComplaintStatus = 'new' | 'in_progress' | 'resolved' | 'rejected';
export type EmergencyType = 'medical' | 'accident' | 'harassment' | 'security' | 'other';

export interface Complaint {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userNameAr: string;
  category: ComplaintCategory;
  categoryAr: string;
  subject: string;
  subjectAr: string;
  description: string;
  descriptionAr: string;
  status: ComplaintStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  bookingId?: string;
  vehicleId?: string;
  driverId?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  resolution?: string;
  resolutionAr?: string;
}

export interface LostItem {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userNameAr: string;
  itemType: string;
  itemTypeAr: string;
  description: string;
  descriptionAr: string;
  location: string;
  locationAr: string;
  date: string;
  time: string;
  vehicleId?: string;
  routeId?: string;
  status: 'reported' | 'found' | 'returned' | 'unclaimed';
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  foundAt?: string;
  returnedAt?: string;
}

export interface EmergencyRequest {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userNameAr: string;
  type: EmergencyType;
  typeAr: string;
  description: string;
  descriptionAr: string;
  location: string;
  locationAr: string;
  status: 'pending' | 'responding' | 'resolved';
  priority: 'urgent';
  bookingId?: string;
  vehicleId?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  type: 'complaint' | 'lost_item' | 'emergency';
  status: ComplaintStatus | 'reported' | 'found' | 'returned' | 'unclaimed' | 'pending' | 'responding' | 'resolved';
  createdAt: string;
  updatedAt: string;
}
