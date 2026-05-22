'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Phone, Mail, CheckCircle, Shield, Calendar, MapPin, GraduationCap, Edit } from 'lucide-react';
import { UserProfile } from '@/types/profile';
import { userTypeLabels, subscriptionTypeLabels } from '@/mock/profile-data';

interface ProfileCardProps {
  profile: UserProfile;
  onEdit?: () => void;
}

export function ProfileCard({ profile, onEdit }: ProfileCardProps) {
  const { language } = useLanguage();

  return (
    <Card className="p-6 border border-gray-200 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {language === 'ar' ? `${profile.firstNameAr} ${profile.lastNameAr}` : `${profile.firstName} ${profile.lastName}`}
                </h2>
                {profile.verified && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    {language === 'ar' ? 'موثق' : 'Vérifié'}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? userTypeLabels.ar[profile.userType] : userTypeLabels.fr[profile.userType]}
              </p>
            </div>
          </div>
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'تعديل' : 'Modifier'}
            </Button>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'الهاتف' : 'Téléphone'}
              </div>
              <div className="font-medium text-gray-900 flex items-center gap-2">
                {profile.phone}
                {profile.phoneVerified && (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                )}
              </div>
            </div>
          </div>
          {profile.email && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </div>
                <div className="font-medium text-gray-900 flex items-center gap-2">
                  {profile.email}
                  {profile.emailVerified && (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Academic Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'الجامعة' : 'Université'}
              </div>
              <div className="font-medium text-gray-900">
                {language === 'ar' ? profile.universityAr : profile.university}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'الكلية' : 'Faculté'}
              </div>
              <div className="font-medium text-gray-900">
                {language === 'ar' ? profile.facultyAr : profile.faculty}
              </div>
            </div>
          </div>
          {profile.level && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-pink-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600">
                  {language === 'ar' ? 'المستوى' : 'Niveau'}
                </div>
                <div className="font-medium text-gray-900">
                  {language === 'ar' ? profile.levelAr : profile.level}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Subscription */}
        {profile.activeSubscription && (
          <div className="p-4 bg-emerald-100 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-emerald-700 font-medium">
                  {language === 'ar' ? 'الاشتراك النشط' : 'Abonnement actif'}
                </div>
                <div className="font-bold text-emerald-900">
                  {language === 'ar' ? subscriptionTypeLabels.ar[profile.activeSubscription] : subscriptionTypeLabels.fr[profile.activeSubscription]}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-emerald-700">
                  {language === 'ar' ? 'ينتهي في' : 'Expire le'}
                </div>
                <div className="font-bold text-emerald-900">
                  {profile.subscriptionExpiry}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Account Info */}
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {language === 'ar' ? 'عضو منذ' : 'Membre depuis'}{' '}
            {new Date(profile.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Card>
  );
}
