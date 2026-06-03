'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { createNotification } from '@/lib/notifications';

export function NotificationScheduler() {
  const { user } = useAuth();

  // Check for upcoming trips and send reminders
  useEffect(() => {
    if (!user?.id) return;

    const checkUpcomingTrips = async () => {
      const now = new Date();
      const thirtyMinsLater = new Date(now.getTime() + 30 * 60 * 1000);
      const today = now.toISOString().split('T')[0];
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const thirtyMinsTime = `${String(thirtyMinsLater.getHours()).padStart(2, '0')}:${String(thirtyMinsLater.getMinutes()).padStart(2, '0')}`;

      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', user.id),
        where('status', 'in', ['approved', 'assigned', 'started']),
        where('date', '==', today)
      );

      try {
        const snap = await getDocs(q);
        snap.forEach(async (d) => {
          const data = d.data();
          const tripTime = data.time;
          // If trip is within 30 minutes and no reminder sent yet
          if (tripTime >= currentTime && tripTime <= thirtyMinsTime && !data.reminderSent) {
            await createNotification({
              userId: user.id,
              titleAr: '⏰ تذكير برحلتك',
              titleFr: '⏰ Rappel de trajet',
              messageAr: `رحلتك من ${data.fromPoint} إلى ${data.toDestination} ستنطلق خلال 30 دقيقة (${tripTime}).`,
              messageFr: `Votre trajet de ${data.fromPoint} à ${data.toDestination} démarre dans 30 minutes (${tripTime}).`,
              type: 'trip_reminder',
            });
            await updateDoc(doc(db, 'bookings', d.id), { reminderSent: true });
          }
        });
      } catch (e) {
        console.error('[NotificationScheduler] Trip reminder error:', e);
      }
    };

    // Check subscription renewal (3 days before expiry)
    const checkSubscriptionRenewal = async () => {
      if (!user?.subscriptionEndDate) return;
      const endDate = new Date(user.subscriptionEndDate);
      const now = new Date();
      const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
      const diff = endDate.getTime() - now.getTime();

      if (diff > 0 && diff <= threeDaysMs && !(user as any).renewalReminderSent) {
        await createNotification({
          userId: user.id,
          titleAr: '🔄 تذكير بتجديد الاشتراك',
          titleFr: '🔄 Rappel de renouvellement',
          messageAr: `اشتراكك ينتهي في ${endDate.toLocaleDateString('fr-FR')}. قم بتجديده الآن لتجنب الانقطاع.`,
          messageFr: `Votre abonnement expire le ${endDate.toLocaleDateString('fr-FR')}. Renouvelez-le maintenant pour éviter l'interruption.`,
          type: 'subscription_reminder',
        });
        // Mark as sent in user doc
        await updateDoc(doc(db, 'users', user.id), { renewalReminderSent: true });
      }
    };

    // Run checks every 5 minutes
    const interval = setInterval(() => {
      checkUpcomingTrips();
      checkSubscriptionRenewal();
    }, 5 * 60 * 1000);

    // Run immediately on mount
    checkUpcomingTrips();
    checkSubscriptionRenewal();

    return () => clearInterval(interval);
  }, [user?.id, user?.subscriptionEndDate]);

  // Listen for driver delay alerts
  useEffect(() => {
    if (!user?.id) return;

    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', user.id),
      where('status', 'in', ['approved', 'assigned'])
    );

    const unsub = onSnapshot(q, (snap) => {
      snap.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          const data = change.doc.data();
          // If delayAlert field was added
          if (data.delayAlert && !data.delayNotificationSent) {
            createNotification({
              userId: user.id,
              titleAr: '⚠️ تأخير في الرحلة',
              titleFr: '⚠️ Retard du trajet',
              messageAr: data.delayAlertMessageAr || `يوجد تأخير في رحلتك بسبب ${data.delayReason || 'ظروف غير متوقعة'}.`,
              messageFr: data.delayAlertMessageFr || `Votre trajet est retardé à cause de ${data.delayReason || 'circonstances imprévues'}.`,
              type: 'delay_alert',
            });
            updateDoc(doc(db, 'bookings', change.doc.id), { delayNotificationSent: true });
          }
        }
      });
    });

    return () => unsub();
  }, [user?.id]);

  return null;
}
