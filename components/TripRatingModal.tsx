'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { db } from '@/lib/firebase';
import { doc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface TripRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  driverId?: string;
  driverName?: string;
}

export default function TripRatingModal({
  isOpen,
  onClose,
  bookingId,
  driverId,
  driverName,
}: TripRatingModalProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [driverRating, setDriverRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [punctualityRating, setPunctualityRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleStarClick = (rating: number, setter: (val: number) => void) => {
    setter(rating);
  };

  const handleSubmit = async () => {
    if (driverRating === 0 || cleanlinessRating === 0 || punctualityRating === 0) {
      alert(isAr ? 'يرجى تقييم جميع الفئات' : 'Veuillez noter toutes les catégories');
      return;
    }

    setSubmitting(true);
    try {
      // Save rating to Firestore
      await addDoc(collection(db, 'tripRatings'), {
        bookingId,
        driverId,
        driverName,
        driverRating,
        cleanlinessRating,
        punctualityRating,
        comment,
        createdAt: serverTimestamp(),
      });

      // Update booking to mark as rated
      await updateDoc(doc(db, 'bookings', bookingId), {
        rated: true,
        ratedAt: serverTimestamp(),
      });

      alert(isAr ? 'شكراً لتقييمك!' : 'Merci pour votre évaluation!');
      onClose();
      // Reset form
      setDriverRating(0);
      setCleanlinessRating(0);
      setPunctualityRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert(isAr ? 'حدث خطأ أثناء إرسال التقييم' : 'Erreur lors de l\'envoi de l\'évaluation');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const StarRating = ({ rating, setRating, label }: { rating: number; setRating: (val: number) => void; label: string }) => (
    <div className="mb-4">
      <Label className="block mb-2 font-medium text-gray-900">{label}</Label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star, setRating)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isAr ? 'تقييم الرحلة' : 'Évaluer le trajet'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          <StarRating
            rating={driverRating}
            setRating={setDriverRating}
            label={isAr ? 'تقييم السائق' : 'Note du chauffeur'}
          />
          <StarRating
            rating={cleanlinessRating}
            setRating={setCleanlinessRating}
            label={isAr ? 'نظافة الحافلة' : 'Propreté du bus'}
          />
          <StarRating
            rating={punctualityRating}
            setRating={setPunctualityRating}
            label={isAr ? 'الالتزام بالمواعيد' : 'Respect des horaires'}
          />

          <div className="mb-4">
            <Label className="block mb-2 font-medium text-gray-900">
              {isAr ? 'أضف تعليقاً (اختياري)' : 'Ajouter un commentaire (optionnel)'}
            </Label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={isAr ? 'اكتب تجربتك هنا...' : 'Écrivez votre expérience ici...'}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 bg-primary hover:bg-secondary text-white flex items-center justify-center gap-2"
            >
              {submitting ? (
                isAr ? 'جاري الإرسال...' : 'Envoi...'
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {isAr ? 'إرسال التقييم' : 'Envoyer l\'évaluation'}
                </>
              )}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              {isAr ? 'إلغاء' : 'Annuler'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
