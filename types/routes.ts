export type RouteStatus = 'on_time' | 'delayed' | 'finished' | 'cancelled';
export type BusStatus = 'active' | 'inactive' | 'maintenance';

export interface Stop {
  id: string;
  name: string;
  nameAr: string;
  location: string;
  locationAr: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  isMajor: boolean;
  accessibilityInfo?: {
    hasRamp: boolean;
    hasAccessiblePath: boolean;
    distanceKm?: number;
    walkingTimeMinutes?: number;
  };
}

export interface Route {
  id: string;
  name: string;
  nameAr: string;
  departure: string;
  departureAr: string;
  destination: string;
  destinationAr: string;
  stops: Stop[];
  status: RouteStatus;
  estimatedTime: number; // in minutes
  distance: number; // in km
  wifiAvailable: boolean;
  wifiPassword?: string;
  schedule: {
    departureTime: string;
    arrivalTime: string;
    frequency: number; // in minutes
  }[];
}

export interface LiveBus {
  id: string;
  routeId: string;
  busNumber: string;
  driverId: string;
  driverName: string;
  driverNameAr: string;
  driverPhone: string;
  currentStopId: string;
  nextStopId: string;
  currentLocation: {
    lat: number;
    lng: number;
  };
  status: BusStatus;
  availableSeats: number;
  totalSeats: number;
  eta: number; // in minutes to next stop
  lastUpdate: string;
}

export interface RouteSchedule {
  id: string;
  routeId: string;
  departureTime: string;
  arrivalTime: string;
  dayOfWeek: string;
  isActive: boolean;
}
