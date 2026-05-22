'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { DigitalCard } from '@/components/DigitalCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { AlertCircle, Wifi } from 'lucide-react';
import { UserCard } from '@/types/user-card';

export default function MyCardPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [userCard, setUserCard] = useState<UserCard | null>(null);

  useEffect(() => {
    // Create mock user card data
    const mockUserCard: UserCard = {
      id: 'card-001',
      userId: user?.id || 'user-1',
      fullName: user?.fullName || 'Ahmed Benali',
      fullNameAr: user?.fullName?.split('/')[0] || 'أحمد بن علي',
      userType: 'student',
      userTypeAr: 'طالب',
      university: 'Université Djillali Liabes',
      universityAr: 'جامعة الجيلالي اليابس',
      faculty: 'Faculté de Droit et Sciences Politiques',
      facultyAr: 'كلية الحقوق والعلوم السياسية',
      phone: user?.phone || '+213555123456',
      email: user?.email,
      cardNumber: 'UMV-' + Date.now().toString(36).toUpperCase(),
      isVerified: true,
      subscriptionType: 'monthly',
      subscriptionTypeAr: 'شهري',
      validFrom: '2026-01-01',
      validUntil: '2026-12-31',
      qrData: JSON.stringify({
        id: user?.id || 'user-1',
        phone: user?.phone || '+213555123456',
        cardNumber: 'UMV-' + Date.now().toString(36).toUpperCase(),
        validUntil: '2026-12-31',
      }),
    };
    setUserCard(mockUserCard);
  }, [user]);

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
