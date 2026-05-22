export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  phone: string;
  fullName: string;
  role: UserRole;
  institution: string;
  faculty: string;
  cardNumber: string;
  qrCode: string;
  subscription: 'daily' | 'weekly' | 'monthly';
  validUntil: string;
  homePoint: string;
  preferredRoute: string;
  email?: string;
  documents?: string[];
  createdAt: string;
  isApproved?: boolean;
  avatar?: string;
}

export interface Bus {
  id: string;
  plateNumber: string;
  capacity: number;
  driverId: string;
  route: string;
  status: 'active' | 'inactive' | 'maintenance';
  features: string[];
  wifi: boolean;
  ac: boolean;
}

export interface Driver {
  id: string;
  fullName: string;
  phone: string;
  licenseNumber: string;
  busId: string;
  status: 'active' | 'inactive';
  rating: number;
}

export interface Booking {
  id: string;
  userId: string;
  busId: string;
  route: string;
  departurePoint: string;
  destination: string;
  date: string;
  time: string;
  seats: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeBookings: number;
  totalRevenue: number;
  activeBuses: number;
  activeDrivers: number;
  occupancyRate: number;
}
