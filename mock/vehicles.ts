import { Vehicle } from '@/types/reservation';

export const vehicles: Vehicle[] = [
  {
    id: 'bus-001',
    type: 'bus',
    plateNumber: '12345 ABC',
    capacity: 40,
    availableSeats: 35,
    driver: {
      id: 'driver-001',
      name: 'Mohamed Ahmed',
      nameAr: 'محمد أحمد',
      phone: '+213555123456',
      rating: 4.8,
    },
    features: {
      wifi: true,
      wifiPassword: 'UNIMOVE_DZ',
      ac: true,
      usb: true,
    },
    status: 'active',
  },
  {
    id: 'bus-002',
    type: 'bus',
    plateNumber: '67890 DEF',
    capacity: 40,
    availableSeats: 38,
    driver: {
      id: 'driver-002',
      name: 'Ali Bouzid',
      nameAr: 'علي بوزيد',
      phone: '+213556789012',
      rating: 4.5,
    },
    features: {
      wifi: true,
      wifiPassword: 'UNIMOVE_DZ',
      ac: true,
      usb: false,
    },
    status: 'active',
  },
  {
    id: 'minibus-001',
    type: 'minibus',
    plateNumber: '11223 GHI',
    capacity: 15,
    availableSeats: 12,
    driver: {
      id: 'driver-003',
      name: 'Youssef Karim',
      nameAr: 'يوسف كريم',
      phone: '+213557890123',
      rating: 4.7,
    },
    features: {
      wifi: true,
      wifiPassword: 'UNIMOVE_DZ',
      ac: true,
      usb: true,
    },
    status: 'active',
  },
  {
    id: 'minibus-002',
    type: 'minibus',
    plateNumber: '44556 JKL',
    capacity: 15,
    availableSeats: 10,
    driver: {
      id: 'driver-004',
      name: 'Ahmed Benali',
      nameAr: 'أحمد بن علي',
      phone: '+213558901234',
      rating: 4.6,
    },
    features: {
      wifi: true,
      wifiPassword: 'UNIMOVE_DZ',
      ac: false,
      usb: true,
    },
    status: 'active',
  },
  {
    id: 'car-001',
    type: 'car',
    plateNumber: '77889 MNO',
    capacity: 4,
    availableSeats: 3,
    driver: {
      id: 'driver-005',
      name: 'Karim Hadj',
      nameAr: 'كريم حاج',
      phone: '+213559012345',
      rating: 4.9,
    },
    features: {
      wifi: true,
      wifiPassword: 'UNIMOVE_DZ',
      ac: true,
      usb: true,
    },
    status: 'active',
  },
  {
    id: 'car-002',
    type: 'car',
    plateNumber: '99012 PQR',
    capacity: 4,
    availableSeats: 4,
    driver: {
      id: 'driver-006',
      name: 'Fatima Zerhouni',
      nameAr: 'فاطمة زرهوني',
      phone: '+213550123456',
      rating: 4.8,
    },
    features: {
      wifi: true,
      wifiPassword: 'UNIMOVE_DZ',
      ac: true,
      usb: true,
    },
    status: 'active',
  },
];

export const getVehicleByType = (type: string): Vehicle[] => {
  return vehicles.filter(v => v.type === type);
};

export const getAvailableVehicles = (): Vehicle[] => {
  return vehicles.filter(v => v.status === 'active' && v.availableSeats > 0);
};
