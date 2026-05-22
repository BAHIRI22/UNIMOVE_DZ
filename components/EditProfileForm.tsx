'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, X } from 'lucide-react';
import { UserProfile } from '@/types/profile';

interface EditProfileFormProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onCancel: () => void;
}

export function EditProfileForm({ profile, onSave, onCancel }: EditProfileFormProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState(profile);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedProfile = {
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

    setLoading(false);
    onSave(updatedProfile);
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'المعلومات الشخصية' : 'Informations personnelles'}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">
                {language === 'ar' ? 'الاسم الأول' : 'Prénom'}
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">
                {language === 'ar' ? 'اسم العائلة' : 'Nom de famille'}
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="mt-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'معلومات الاتصال' : 'Informations de contact'}
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">
                {language === 'ar' ? 'رقم الهاتف' : 'Numéro de téléphone'}
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                disabled
                className="mt-2 bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                {language === 'ar' ? 'محقق عبر OTP' : 'Vérifié par OTP'}
              </p>
            </div>
            <div>
              <Label htmlFor="email">
                {language === 'ar' ? 'البريد الإلكتروني (اختياري)' : 'Email (optionnel)'}
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Academic Info */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'المعلومات الأكاديمية' : 'Informations académiques'}
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="university">
                {language === 'ar' ? 'الجامعة' : 'Université'}
              </Label>
              <Input
                id="university"
                value={language === 'ar' ? formData.universityAr : formData.university}
                onChange={(e) => {
                  if (language === 'ar') {
                    handleChange('universityAr', e.target.value);
                  } else {
                    handleChange('university', e.target.value);
                  }
                }}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="faculty">
                {language === 'ar' ? 'الكلية' : 'Faculté'}
              </Label>
              <Input
                id="faculty"
                value={language === 'ar' ? formData.facultyAr : formData.faculty}
                onChange={(e) => {
                  if (language === 'ar') {
                    handleChange('facultyAr', e.target.value);
                  } else {
                    handleChange('faculty', e.target.value);
                  }
                }}
                className="mt-2"
              />
            </div>
            {formData.level && (
              <div>
                <Label htmlFor="level">
                  {language === 'ar' ? 'المستوى' : 'Niveau'}
                </Label>
                <Input
                  id="level"
                  value={language === 'ar' ? formData.levelAr : formData.level}
                  onChange={(e) => {
                    if (language === 'ar') {
                      handleChange('levelAr', e.target.value);
                    } else {
                      handleChange('level', e.target.value);
                    }
                  }}
                  className="mt-2"
                />
              </div>
            )}
          </div>
        </div>

        {/* Usual Departure */}
        <div>
          <Label htmlFor="usualDeparturePoint">
            {language === 'ar' ? 'نقطة الانطلاق المعتادة' : 'Point de départ habituel'}
          </Label>
          <Input
            id="usualDeparturePoint"
            value={language === 'ar' ? formData.usualDeparturePointAr : formData.usualDeparturePoint}
            onChange={(e) => {
              if (language === 'ar') {
                handleChange('usualDeparturePointAr', e.target.value);
              } else {
                handleChange('usualDeparturePoint', e.target.value);
              }
            }}
            className="mt-2"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            {language === 'ar' ? 'إلغاء' : 'Annuler'}
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-secondary text-white flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {language === 'ar' ? 'جاري الحفظ...' : 'Enregistrement...'}
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {language === 'ar' ? 'حفظ التغييرات' : 'Enregistrer'}
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
