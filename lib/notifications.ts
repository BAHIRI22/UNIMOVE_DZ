import { db } from './firebase';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';

export interface NotificationPayload {
  userId: string; // 'admin' for administrative notifications
  userPhone?: string;
  titleAr: string;
  titleFr: string;
  messageAr: string;
  messageFr: string;
  type:
    | 'account_approved'
    | 'account_rejected'
    | 'document_uploaded'
    | 'booking_created'
    | 'booking_approved'
    | 'booking_rejected'
    | 'subscription_expiring'
    | 'trip_reminder'
    | 'subscription_reminder'
    | 'delay_alert'
    | 'system';
  read?: boolean;
  relatedEntityId?: string;
  relatedEntityType?: string;
}

export async function createNotification(data: NotificationPayload) {
  try {
    const docRef = await addDoc(collection(db, 'notifications'), {
      ...data,
      read: false,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('[Notification Helper] Error creating notification:', error);
    throw error;
  }
}

export async function createUserNotification(userId: string, data: Omit<NotificationPayload, 'userId'>) {
  return createNotification({
    ...data,
    userId,
  });
}

export async function createAdminNotification(data: Omit<NotificationPayload, 'userId'>) {
  return createNotification({
    ...data,
    userId: 'admin',
  });
}

export async function markNotificationAsRead(id: string) {
  try {
    const docRef = doc(db, 'notifications', id);
    await updateDoc(docRef, { read: true });
  } catch (error) {
    console.error('[Notification Helper] Error marking notification as read:', error);
    throw error;
  }
}

export async function markAllNotificationsAsRead(userId: string) {
  try {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(db);

    querySnapshot.forEach((document) => {
      const docRef = doc(db, 'notifications', document.id);
      batch.update(docRef, { read: true });
    });

    await batch.commit();
  } catch (error) {
    console.error('[Notification Helper] Error marking all notifications as read:', error);
    throw error;
  }
}
