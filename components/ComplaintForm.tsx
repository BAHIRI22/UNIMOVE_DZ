'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, CheckCircle } from 'lucide-react';
import { ComplaintCategory } from '@/types/support';
import { complaintCategories, generateTicketNumber } from '@/mock/support-data';

interface ComplaintFormProps {
  onSubmit: (complaint: any) => void;
  onCancel?: () => void;
  userId?: string;
  userName?: string;
}

export function ComplaintForm({ onSubmit, onCancel, userId, userName }: ComplaintFormProps) {
  const { language } = useLanguage();
  const [category, setCategory] = useState<ComplaintCategory | ''>('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const complaint = {
      id: Date.now().toString(),
      ticketNumber: generateTicketNumber('SUP'),
      category,
      subject,
      description,
      status: 'new',
      priority: 'medium',
      userId: userId || 'unknown',
      userName: userName || 'Unknown User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    existingComplaints.push(complaint);
    localStorage.setItem('complaints', JSON.stringify(existingComplaints));

    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
    onSubmit(complaint);
  };

  if (submitted) {
    return (
      <Card className="p-8 border border-gray-200 bg-emerald-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            {language === 'ar' ? 'تم إرسال الشكوى بنجاح' : 'Réclamation envoyée avec succès'}
          </h3>
          <p className="text-gray-600">
            {language === 'ar'
              ? 'رقم التذكرة الخاص بك:'
              : 'Votre numéro de ticket:'}{' '}
            <span className="font-bold">{generateTicketNumber('SUP')}</span>
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            {language === 'ar' ? 'إرسال شكوى أخرى' : 'Envoyer une autre réclamation'}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="category">
            {language === 'ar' ? 'الفئة' : 'Catégorie'}
          </Label>
          <Select value={category} onValueChange={(value: ComplaintCategory) => setCategory(value)}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder={language === 'ar' ? 'اختر الفئة' : 'Choisir la catégorie'} />
            </SelectTrigger>
            <SelectContent>
              {complaintCategories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {language === 'ar' ? cat.labelAr : cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="subject">
            {language === 'ar' ? 'الموضوع' : 'Sujet'}
          </Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={language === 'ar' ? 'موضوع الشكوى' : 'Sujet de la réclamation'}
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
            placeholder={language === 'ar' ? 'صف المشكلة بالتفصيل...' : 'Décrivez le problème en détail...'}
            className="mt-2 min-h-32"
            required
          />
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
