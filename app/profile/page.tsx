'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProfileCard } from '@/components/ProfileCard';
import { EditProfileForm } from '@/components/EditProfileForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { mockUserProfile } from '@/mock/profile-data';
import { UserProfile } from '@/types/profile';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load profile from localStorage
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <DashboardLayout role="user">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 lg:space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-3 md:mb-4 tracking-tight">
            {language === 'ar' ? 'ملفي' : 'Mon profil'}
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-7 md:leading-8">
            {language === 'ar'
              ? 'إدارة معلوماتك الشخصية والإعدادات'
              : 'Gérez vos informations personnelles et vos paramètres'}
          </p>
        </div>

        {/* Profile Card or Edit Form */}
        {isEditing ? (
          <EditProfileForm
            profile={profile}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <ProfileCard profile={profile} onEdit={handleEdit} />
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-10">
          <button
            onClick={() => router.push('/settings')}
            className="p-6 md:p-8 lg:p-10 bg-white border-2 border-slate-200 rounded-2xl md:rounded-3xl hover:shadow-2xl transition-all duration-300 text-left hover:scale-[1.02] hover:border-emerald-500"
          >
            <div className="flex items-center gap-4 md:gap-5 mb-4 md:mb-5">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl md:text-4xl">⚙️</span>
              </div>
              <h3 className="font-black text-gray-900 text-xl md:text-2xl">
                {language === 'ar' ? 'الإعدادات' : 'Paramètres'}
              </h3>
            </div>
            <p className="text-base md:text-lg text-slate-600 leading-7 md:leading-8 font-medium">
              {language === 'ar'
                ? 'تعديل اللغة والإشعارات'
                : 'Modifier la langue et les notifications'}
            </p>
          </button>
          <button
            onClick={() => router.push('/security')}
            className="p-6 md:p-8 lg:p-10 bg-white border-2 border-slate-200 rounded-2xl md:rounded-3xl hover:shadow-2xl transition-all duration-300 text-left hover:scale-[1.02] hover:border-emerald-500"
          >
            <div className="flex items-center gap-4 md:gap-5 mb-4 md:mb-5">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl md:text-4xl">🔒</span>
              </div>
              <h3 className="font-black text-gray-900 text-xl md:text-2xl">
                {language === 'ar' ? 'الأمان' : 'Sécurité'}
              </h3>
            </div>
            <p className="text-base md:text-lg text-slate-600 leading-7 md:leading-8 font-medium">
              {language === 'ar'
                ? 'إدارة الأمان وسجل الدخول'
                : 'Gérer la sécurité et l\'historique de connexion'}
            </p>
          </button>
        </div>

        {/* Info */}
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 md:p-12 shadow-xl">
          <h3 className="font-black text-gray-900 text-xl md:text-2xl mb-4 md:mb-6">
            {language === 'ar' ? 'معلومات مهمة' : 'Informations importantes'}
          </h3>
          <ul className="space-y-4 md:space-y-5 text-base md:text-lg text-slate-700 leading-7 md:leading-8 font-medium">
            <li className="flex items-start gap-3 md:gap-4">
              <span className="text-emerald-600 text-xl md:text-2xl">•</span>
              <span>
                {language === 'ar'
                  ? 'رقم الهاتف موثق عبر OTP ولا يمكن تغييره'
                  : 'Le numéro de téléphone est vérifié par OTP et ne peut pas être modifié'}
              </span>
            </li>
            <li className="flex items-start gap-3 md:gap-4">
              <span className="text-emerald-600 text-xl md:text-2xl">•</span>
              <span>
                {language === 'ar'
                  ? 'يمكنك إضافة بريد إلكتروني اختياري في أي وقت'
                  : 'Vous pouvez ajouter un email optionnel à tout moment'}
              </span>
            </li>
            <li className="flex items-start gap-3 md:gap-4">
              <span className="text-emerald-600 text-xl md:text-2xl">•</span>
              <span>
                {language === 'ar'
                  ? 'جميع التغييرات يتم حفظها تلقائياً'
                  : 'Toutes les modifications sont sauvegardées automatiquement'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
