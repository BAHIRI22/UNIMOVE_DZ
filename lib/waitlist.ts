import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  limit,
  updateDoc,
} from 'firebase/firestore';

export interface WaitlistEntry {
  id?: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  routeKey: string; // "from|to|date|time"
  fromPoint: string;
  toDestination: string;
  date: string;
  time: string;
  passengersCount: number;
  vehicleType: string;
  status: 'waiting' | 'promoted' | 'expired';
  createdAt: any;
  promotedAt?: any;
  promotedToBookingId?: string;
}

/** Build a route key for grouping bookings/waitlist by route+date */
export function buildRouteKey(from: string, to: string, date: string, time: string): string {
  return `${from.trim()}|${to.trim()}|${date}|${time}`;
}

/** Get capacity by vehicle type */
export function getVehicleCapacity(vehicleType: string): number {
  switch (vehicleType) {
    case 'car': return 4;
    case 'minibus': return 15;
    case 'bus': return 45;
    default: return 45;
  }
}

/** Check if route/date is at capacity based on active bookings */
export async function checkRouteCapacity(
  routeKey: string,
  vehicleType: string
): Promise<{ isFull: boolean; totalPassengers: number; capacity: number }> {
  const capacity = getVehicleCapacity(vehicleType);
  const bookingsQuery = query(
    collection(db, 'bookings'),
    where('routeKey', '==', routeKey),
    where('status', 'in', ['pending', 'approved', 'assigned', 'started'])
  );
  const snap = await getDocs(bookingsQuery);
  let totalPassengers = 0;
  snap.forEach((d) => {
    totalPassengers += (d.data().passengersCount || 1);
  });
  return { isFull: totalPassengers >= capacity, totalPassengers, capacity };
}

/** Add user to waitlist for a route/date */
export async function joinWaitlist(entry: Omit<WaitlistEntry, 'id' | 'createdAt' | 'status'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'waitlist'), {
    ...entry,
    status: 'waiting',
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/** Get waitlist entries for a specific route/date, ordered by creation time (FIFO) */
export async function getWaitlistForRoute(routeKey: string): Promise<WaitlistEntry[]> {
  const q = query(
    collection(db, 'waitlist'),
    where('routeKey', '==', routeKey),
    where('status', '==', 'waiting'),
    orderBy('createdAt', 'asc'),
    limit(10)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as WaitlistEntry[];
}

/** Promote the first waitlist entry for a route to a booking */
export async function promoteFromWaitlist(routeKey: string): Promise<WaitlistEntry | null> {
  const entries = await getWaitlistForRoute(routeKey);
  if (entries.length === 0) return null;

  const first = entries[0];
  await updateDoc(doc(db, 'waitlist', first.id!), {
    status: 'promoted',
    promotedAt: serverTimestamp(),
  });
  return first;
}

/** Auto-promote waitlist entries when a booking is cancelled or completed */
export async function processWaitlistOnBookingChange(routeKey: string, vehicleType: string): Promise<void> {
  const { isFull } = await checkRouteCapacity(routeKey, vehicleType);
  if (isFull) return;

  // Try to promote one person from waitlist
  await promoteFromWaitlist(routeKey);
}
