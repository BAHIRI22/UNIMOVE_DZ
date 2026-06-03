import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';

export interface Rating {
  id?: string;
  bookingId: string;
  userId: string;
  driverId?: string;
  rating: number; // 1-5
  punctualityRating?: number; // 1-5
  cleanlinessRating?: number; // 1-5
  safetyRating?: number; // 1-5
  comment?: string;
  createdAt: any;
}

export async function submitRating(data: Omit<Rating, 'id' | 'createdAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'ratings'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  // Mark booking as rated
  await updateDoc(doc(db, 'bookings', data.bookingId), { rated: true });
  return docRef.id;
}

export async function getDriverRatings(driverId: string): Promise<{ average: number; count: number; ratings: Rating[] }> {
  const q = query(collection(db, 'ratings'), where('driverId', '==', driverId), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  const ratings = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Rating[];
  if (ratings.length === 0) return { average: 0, count: 0, ratings: [] };
  const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
  return { average: Math.round((sum / ratings.length) * 10) / 10, count: ratings.length, ratings };
}

export async function hasUserRatedBooking(userId: string, bookingId: string): Promise<boolean> {
  const q = query(
    collection(db, 'ratings'),
    where('userId', '==', userId),
    where('bookingId', '==', bookingId)
  );
  const snap = await getDocs(q);
  return !snap.empty;
}
