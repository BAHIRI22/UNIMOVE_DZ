'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: (date: string, route: string) => void;
}

export function BookingModal({ isOpen, onClose, onBook }: BookingModalProps) {
  const { t, language } = useLanguage();
  const [bookingDate, setBookingDate] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const routes = [
    { id: 'route-1', name: 'سيدي بلعباس - وهران / Sidi Bel Abbès - Oran' },
    { id: 'route-2', name: 'سيدي بلعباس - الجزائر / Sidi Bel Abbès - Alger' },
    { id: 'route-3', name: 'سيدي بلعباس - مستغانم / Sidi Bel Abbès - Mostaganem' },
    { id: 'route-4', name: 'سيدي بلعباس - تلمسان / Sidi Bel Abbès - Tlemcen' },
  ];

  const handleBooking = async () => {
    if (!bookingDate || !selectedRoute) {
      toast.error(
        language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Veuillez remplir tous les champs',
        {
          description: language === 'ar' ? 'التاريخ والطريق مطلوبان' : 'La date et l\'itinéraire sont requis',
        }
      );
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);

    onBook(bookingDate, selectedRoute);
    setBookingDate('');
    setSelectedRoute('');
    onClose();
    
    toast.success(
      language === 'ar' ? 'تم الحجز بنجاح!' : 'Réservation réussie!',
      {
        description: language === 'ar' ? 'تم تأكيد حجز رحلتك' : 'Votre réservation a été confirmée',
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="modal-overlay">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="modal-content spacing-card"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-black text-gray-900">{t('dashboard.bookTrip')}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-6">
            <div className="space-y-3">
              <Label htmlFor="date" className="font-semibold text-lg text-gray-900">
                {language === 'ar' ? 'التاريخ' : 'Date'}
              </Label>
              <Input
                id="date"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="input-premium"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="route" className="font-semibold text-lg text-gray-900">
                {t('register.preferredRoute')}
              </Label>
              <select
                id="route"
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="select-premium"
              >
                <option value="">
                  {language === 'ar' ? 'اختر طريقاً...' : 'Choisir un itinéraire...'}
                </option>
                {routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border-2 border-emerald-200">
              <p className="text-base md:text-lg text-emerald-800 font-medium">
                {language === 'ar'
                  ? 'تأكد من اختيار تاريخ وطريق صحيحين قبل التأكيد'
                  : 'Assurez-vous de sélectionner une date et un itinéraire corrects'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="outline"
                className="flex-1 button-secondary touch-target"
                onClick={onClose}
                disabled={isLoading}
              >
                {t('common.cancel')}
              </Button>
              <Button
                className="flex-1 button-primary touch-target"
                onClick={handleBooking}
                disabled={!bookingDate || !selectedRoute || isLoading}
              >
                {isLoading ? t('common.loading') : t('dashboard.bookTrip')}
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
