'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, CheckCircle } from 'lucide-react';
import { generateTicketNumber } from '@/mock/support-data';

interface LostItemFormProps {
  onSubmit: (item: any) => void;
  onCancel?: () => void;
}

export function LostItemForm({ onSubmit, onCancel }: LostItemFormProps) {
  const { language } = useLanguage();
  const [itemType, setItemType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const lostItem = {
      id: Date.now().toString(),
      ticketNumber: generateTicketNumber('LOST'),
      itemType,
      description,
      location,
      date,
      time,
      status: 'reported',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingItems = JSON.parse(localStorage.getItem('lostItems') || '[]');
    existingItems.push(lostItem);
    localStorage.setItem('lostItems', JSON.stringify(existingItems));

    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
    onSubmit(lostItem);
  };

  if (submitted) {
    return (
      <Card className="p-8 border border-gray-200 bg-emerald-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            {language === 'ar' ? 'تم الإبلاغ عن المفقود بنجاح' : 'Objet perdu signalé avec succès'}
          </h3>
          <p className="text-gray-600">
            {language === 'ar'
              ? 'رقم التذكرة الخاص بك:'
              : 'Votre numéro de ticket:'}{' '}
            <span className="font-bold">{generateTicketNumber('LOST')}</span>
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            {language === 'ar' ? 'الإبلاغ عن مفقود آخر' : 'Signaler un autre objet'}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="itemType">
            {language === 'ar' ? 'نوع المفقود' : 'Type d\'objet'}
          </Label>
          <Input
            id="itemType"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            placeholder={language === 'ar' ? 'مثال: حقيبة، هاتف، نظارات...' : 'Ex: Sac, téléphone, lunettes...'}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">
            {language === 'ar' ? 'الوصف' : 'Description'}
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={language === 'ar' ? 'صف المفقود بالتفصيل...' : 'Décrivez l\'objet en détail...'}
            className="mt-2 min-h-24"
            required
          />
        </div>

        <div>
          <Label htmlFor="location">
            {language === 'ar' ? 'الموقع' : 'Emplacement'}
          </Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={language === 'ar' ? 'مثال: حافلة 12345، جامعة...' : 'Ex: Bus 12345, université...'}
            className="mt-2"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">
              {language === 'ar' ? 'التاريخ' : 'Date'}
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2"
              required
            />
          </div>
          <div>
            <Label htmlFor="time">
              {language === 'ar' ? 'الوقت' : 'Heure'}
            </Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-2"
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              {language === 'ar' ? 'إلغاء' : 'Annuler'}
            </Button>
          )}
          <Button type="submit" className="flex-1 bg-primary hover:bg-secondary text-white" disabled={loading}>
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                {language === 'ar' ? 'جاري الإرسال...' : 'Envoi...'}
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'إرسال' : 'Envoyer'}
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
