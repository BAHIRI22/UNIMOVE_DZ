'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { DigitalCard } from '@/components/DigitalCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { AlertCircle, Wifi } from 'lucide-react';
import { UserCard } from '@/types/user-card';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const safeText = (value: any): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (value?.toDate) return value.toDate().toLocaleDateString('ar-DZ');
  if (value?.seconds) return new Date(value.seconds * 1000).toLocaleDateString('ar-DZ');
  return '';
};

export default function MyCardPage() {
  const { language } = useLanguage();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [userCard, setUserCard] = useState<UserCard | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }
    if (!user) return;
    const safeRole = safeText(user.role);
    const safeUniversity = safeText(user.university || user.institution);
    const safeFaculty = safeText(user.facultyOrInstitute || user.faculty);
    const safePhone = safeText(user.phoneNumber || user.phone);
    const safeCardNumber = safeText(user.cardNumber);
    const safeValidUntil = safeText(user.validUntil);
    const currentUserCard: UserCard = {
      id: safeCardNumber,
      userId: safeText(user.id),
      fullName: safeText(user.fullName),
      fullNameAr: safeText(user.fullName),
      userType: safeRole === 'admin' ? 'administrative' : (safeRole as UserCard['userType']),
      userTypeAr: safeRole,
      university: safeUniversity,
      universityAr: safeUniversity,
      faculty: safeFaculty,
      facultyAr: safeFaculty,
      phone: safePhone,
      email: safeText(user?.email),
      cardNumber: safeCardNumber,
      isVerified: user.verificationStatus === 'approved' || user.verificationStatus === 'verified',
      subscriptionType: safeText(user.subscription) as UserCard['subscriptionType'],
      subscriptionTypeAr: safeText(user.subscription),
      validFrom: safeText(user.createdAt),
      validUntil: safeValidUntil,
      qrData: JSON.stringify({
        id: safeText(user.id),
        phone: safePhone,
        cardNumber: safeCardNumber,
        validUntil: safeValidUntil,
      }),
    };
    setUserCard(currentUserCard);
  }, [isLoading, router, user]);

  const handleDownload = () => {
    // Implement download functionality
    window.print();
  };

  const handlePrint = () => {
    // Implement print functionality
    window.print();
  };

  if (!userCard) {
    return (
      <DashboardLayout role="user">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center py-20">
            <AlertCircle className="w-24 h-24 text-slate-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}
            </h2>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="user">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {language === 'ar' ? 'بطاقتي' : 'Ma carte'}
          </h1>
          <p className="text-xl text-slate-600 leading-8">
            {language === 'ar'
              ? 'بطاقتك الرقمية UNIMOVE-DZ'
              : 'Votre carte numérique UNIMOVE-DZ'}
          </p>
          </div>
          <Button variant="outline" onClick={() => window.history.length > 1 ? router.back() : router.push('/dashboard')}>
            {language === 'ar' ? 'رجوع' : 'Retour'}
          </Button>
        </div>

        {/* WiFi Info */}
        <Card className="p-6 border border-emerald-200 bg-emerald-50 rounded-3xl shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <Wifi className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">
                {language === 'ar' ? 'Wi-Fi متاح في جميع الحافلات' : 'Wi-Fi disponible dans tous les bus'}
              </p>
              <p className="text-base text-slate-600">
                {language === 'ar' ? 'كلمة المرور:' : 'Mot de passe:'} <span className="font-bold text-emerald-600">UNIMOVE_DZ</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Digital Card */}
        <DigitalCard
          userCard={userCard}
          onDownload={handleDownload}
          onPrint={handlePrint}
        />

        {/* Info */}
        <Card className="p-8 border border-slate-200 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-3xl shadow-xl">
          <h3 className="font-bold text-gray-900 text-xl mb-4">
            {language === 'ar' ? 'معلومات مهمة' : 'Informations importantes'}
          </h3>
          <ul className="space-y-4 text-base text-slate-700 leading-8">
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 text-xl">•</span>
              <span>
                {language === 'ar'
                  ? 'استخدم هذه البطاقة للدخول إلى الحافلات الجامعية'
                  : 'Utilisez cette carte pour accéder aux bus universitaires'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 text-xl">•</span>
              <span>
                {language === 'ar'
                  ? 'أظهر رمز QR للسائق عند الصعود'
                  : 'Montrez le code QR au chauffeur à l\'embarquement'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 text-xl">•</span>
              <span>
                {language === 'ar'
                  ? 'تأكد من صلاحية اشتراكك قبل كل رحلة'
                  : 'Vérifiez la validité de votre abonnement avant chaque trajet'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 text-xl">•</span>
              <span>
                {language === 'ar'
                  ? 'في حالة فقدان البطاقة، تواصل مع الدعم الفني'
                  : 'En cas de perte de carte, contactez le support technique'}
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
