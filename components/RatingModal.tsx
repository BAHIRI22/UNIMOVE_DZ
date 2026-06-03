'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { submitRating } from '@/lib/ratings';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  userId: string;
  driverId?: string;
  driverName?: string;
}

export function RatingModal({ isOpen, onClose, bookingId, userId, driverId, driverName }: RatingModalProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [rating, setRating] = useState(0);
  const [punctuality, setPunctuality] = useState(0);
  const [cleanliness, setCleanliness] = useState(0);
  const [safety, setSafety] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setLoading(true);
    try {
      await submitRating({
        bookingId,
        userId,
        driverId: driverId || '',
        rating,
        punctualityRating: punctuality || undefined,
        cleanlinessRating: cleanliness || undefined,
        safetyRating: safety || undefined,
        comment: comment.trim() || undefined,
      });
      setSubmitted(true);
    } catch (e) {
      console.error('Rating submit error:', e);
    } finally {
      setLoading(false);
    }
  };

  const StarRow = ({
    value,
    onChange,
    label,
    icon: Icon,
  }: {
    value: number;
    onChange: (v: number) => void;
    label: string;
    icon?: React.ElementType;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        {Icon && <Icon className="w-4 h-4 text-emerald-600" />}
        <span>{label}</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className="p-1 transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            aria-label={`${n} stars`}
          >
            <Star
              className={`w-7 h-7 ${n <= value ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md" dir={isAr ? 'rtl' : 'ltr'}>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {isAr ? 'قيّم رحلتك' : 'Évaluez votre trajet'}
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>
            <p className="font-bold text-emerald-700">
              {isAr ? 'شكراً لتقييمك!' : 'Merci pour votre évaluation !'}
            </p>
            <Button onClick={onClose} className="mt-2">
              {isAr ? 'إغلاق' : 'Fermer'}
            </Button>
          </div>
        ) : (
          <div className="space-y-5 py-2">
            {driverName && (
              <p className="text-sm text-slate-500">
                {isAr ? `السائق: ${driverName}` : `Chauffeur : ${driverName}`}
              </p>
            )}

            <StarRow
              value={rating}
              onChange={setRating}
              label={isAr ? 'التقييم العام' : 'Note globale'}
              icon={Star}
            />
            <StarRow
              value={punctuality}
              onChange={setPunctuality}
              label={isAr ? 'الالتزام بالمواعيد' : 'Ponctualité'}
              icon={Clock}
            />
            <StarRow
              value={cleanliness}
              onChange={setCleanliness}
              label={isAr ? 'نظافة المركبة' : 'Propreté du véhicule'}
              icon={ShieldCheck}
            />
            <StarRow
              value={safety}
              onChange={setSafety}
              label={isAr ? 'الأمان والقيادة' : 'Sécurité et conduite'}
              icon={ShieldCheck}
            />

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                {isAr ? 'تعليق (اختياري)' : 'Commentaire (optionnel)'}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                rows={3}
                placeholder={isAr ? 'شاركنا تجربتك...' : 'Partagez votre expérience...'}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading || rating === 0}
              className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl"
            >
              {loading
                ? isAr
                  ? 'جاري الإرسال...'
                  : 'Envoi en cours...'
                : isAr
                  ? 'إرسال التقييم'
                  : 'Soumettre l\'évaluation'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
