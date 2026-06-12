'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Gift, Calendar } from 'lucide-react';

interface StudentDayBannerProps {
  onClose?: () => void;
  showClose?: boolean;
}

export default function StudentDayBanner({ onClose, showClose = true }: StudentDayBannerProps) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [offerSettings, setOfferSettings] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('studentDayOffer');
    if (stored) {
      setOfferSettings(JSON.parse(stored));
    }
  }, []);

  // Check if offer is active based on settings
  const isOfferActive = offerSettings?.enabled && (() => {
    const today = new Date();
    const startDate = new Date(offerSettings.startDate);
    const endDate = new Date(offerSettings.endDate);
    return today >= startDate && today <= endDate;
  })();

  if (!isOfferActive) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="hidden md:flex w-10 h-10 bg-white/20 rounded-full items-center justify-center flex-shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm md:text-base">
                {isAr
                  ? '🎓 بمناسبة اليوم الوطني للطالب 19 ماي'
                  : '🎓 À l\'occasion de la Journée Nationale de l\'Étudiant - 19 Mai'}
              </p>
              <p className="text-xs md:text-sm opacity-90 mt-1">
                {isAr
                  ? 'تقدم UNIMOVE-DZ تنقلات مجانية أو تخفيضات خاصة للطلبة حسب البرنامج السنوي'
                  : 'UNIMOVE-DZ offre des transports gratuits ou des réductions spéciales pour les étudiants selon le programme annuel'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden md:flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs">
              <Calendar className="w-3 h-3" />
              <span>19 ماي - 25 ماي</span>
            </div>
            {showClose && onClose && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
