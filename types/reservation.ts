export type VehicleType = 'bus' | 'minibus' | 'car';
export type PaymentMethod = 'subscription' | 'cash' | 'baridimob' | 'edahabia';
export type ReservationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type TripType = 'university' | 'airport' | 'port' | 'tourism' | 'competition' | 'scientific_event' | 'sport_event';

export interface Location {
  id: string;
  name: string;
  nameAr: string;
  type: 'university' | 'faculty' | 'institute' | 'residence' | 'station' | 'city_center' | 'airport' | 'port' | 'tourism';
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Route {
  id: string;
  name: string;
  nameAr: string;
  departure: Location;
  destination: Location;
  stops: Location[];
  distance: number; // in km
  estimatedTime: number; // in minutes
  basePrice: number; // in DZD
}

export interface Vehicle {
  id: string;
  type: VehicleType;
  plateNumber: string;
  capacity: number;
  availableSeats: number;
  driver: {
    id: string;
    name: string;
    nameAr: string;
    phone: string;
    rating: number;
  };
  features: {
    wifi: boolean;
    wifiPassword: string;
    ac: boolean;
    usb: boolean;
  };
  status: 'active' | 'inactive' | 'maintenance';
}

export interface Reservation {
  id: string;
  reservationNumber: string;
  userId: string;
  route: Route;
  vehicle: Vehicle;
  departurePoint: Location;
  destination: Location;
  date: string;
  time: string;
  seats: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed';
  status: ReservationStatus;
  createdAt: string;
  qrCode?: string;
}

export interface ReservationFormData {
  departurePoint: string;
  destination: string;
  tripType?: TripType;
  university: string;
  faculty?: string;
  residence?: string;
  date: string;
  time: string;
  vehicleType: VehicleType;
  seats: number;
  paymentMethod: PaymentMethod;
}
