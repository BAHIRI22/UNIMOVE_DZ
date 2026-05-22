export type UserRole = 'student' | 'teacher' | 'administrative' | 'driver' | 'investor' | 'manager';
export type BusStatus = 'active' | 'maintenance' | 'inactive';
export type DriverStatus = 'available' | 'on_trip' | 'unavailable';
export type RouteStatus = 'active' | 'inactive';

export interface AdminStats {
  totalUsers: number;
  totalBookings: number;
  activeBuses: number;
  totalDrivers: number;
  estimatedRevenue: number;
  todayTrips: number;
  recentBookings: number;
}

export interface AdminUser {
  id: string;
  fullName: string;
  fullNameAr: string;
  email: string;
  phone: string;
  role: UserRole;
  roleAr: string;
  university?: string;
  universityAr?: string;
  faculty?: string;
  facultyAr?: string;
  isVerified: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface AdminBus {
  id: string;
  plateNumber: string;
  vehicleType: 'bus' | 'minibus' | 'car';
  capacity: number;
  driverId?: string;
  driverName?: string;
  driverNameAr?: string;
  features: {
    wifi: boolean;
    wifiPassword: string;
    ac: boolean;
    usb: boolean;
  };
  status: BusStatus;
  routeId?: string;
  createdAt: string;
}

export interface AdminDriver {
  id: string;
  fullName: string;
  fullNameAr: string;
  phone: string;
  email?: string;
  licenseNumber: string;
  licenseExpiry: string;
  vehicleId?: string;
  vehiclePlate?: string;
  status: DriverStatus;
  rating: number;
  totalTrips: number;
  createdAt: string;
}

export interface AdminRoute {
  id: string;
  name: string;
  nameAr: string;
  departure: string;
  departureAr: string;
  destination: string;
  destinationAr: string;
  stops: string[];
  distance: number;
  estimatedTime: number;
  price: number;
  availableSeats: number;
  vehicleId?: string;
  vehiclePlate?: string;
  status: RouteStatus;
  createdAt: string;
}

export interface AdminBooking {
  id: string;
  bookingNumber: string;
  userId: string;
  userName: string;
  userNameAr: string;
  routeId: string;
  routeName: string;
  routeNameAr: string;
  vehicleId: string;
  vehiclePlate: string;
  driverId: string;
  driverName: string;
  driverNameAr: string;
  departurePoint: string;
  destination: string;
  date: string;
  time: string;
  seats: number;
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  createdAt: string;
}
