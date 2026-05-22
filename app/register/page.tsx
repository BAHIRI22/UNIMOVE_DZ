'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PhoneOtpAuth } from '@/components/PhoneOtpAuth';
import { RoleStep } from '@/components/Register/RoleStep';
import { InstitutionStep } from '@/components/Register/InstitutionStep';
import { SubscriptionStep } from '@/components/Register/SubscriptionStep';
import { PaymentStep } from '@/components/Register/PaymentStep';
import { SuccessStep } from '@/components/Register/SuccessStep';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateCardNumber, generateQRCode, formatCardExpiry } from '@/lib/cardGenerator';
import { Card } from '@/components/ui/card';
import subscriptions from '@/data/subscriptions.json';
import { Progress } from '@/components/ui/progress';

type Step = 'phone' | 'role' | 'institution' | 'subscription' | 'payment' | 'success';

interface RegistrationData {
  phone: string;
  firebaseUser: any;
  role: 'student' | 'teacher' | 'admin' | 'driver';
  institution: string;
  subscription: 'daily' | 'weekly' | 'monthly';
  fullName: string;
  homePoint: string;
  cardNumber: string;
  qrCode: string;
  validUntil: string;
}

export default function RegisterPage() {
  const { t } = useLanguage();
  const { loginWithFirebase } = useAuth();
  const [currentStep, setCurrentStep] = useState<Step>('phone');
  const [data, setData] = useState<Partial<RegistrationData>>({});

  const steps: Step[] = ['phone', 'role', 'institution', 'subscription', 'payment', 'success'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handlePhoneAuthSuccess = async (firebaseUser: any) => {
    setData((prev) => ({ ...prev, firebaseUser, phone: firebaseUser.phoneNumber }));
    setCurrentStep('role');
  };

  const handleRoleNext = (role: 'student' | 'teacher' | 'admin') => {
    setData((prev) => ({ ...prev, role }));
    setCurrentStep('institution');
  };

  const handleInstitutionNext = (institution: string) => {
    setData((prev) => ({ ...prev, institution }));
    setCurrentStep('subscription');
  };

  const handleSubscriptionNext = (subData: {
    subscription: 'daily' | 'weekly' | 'monthly';
    fullName: string;
    homePoint: string;
  }) => {
    setData((prev) => ({ ...prev, ...subData }));
    setCurrentStep('payment');
  };

  const handlePaymentNext = async () => {
    if (!data.phone || !data.fullName || !data.subscription || !data.firebaseUser) return;

    const cardNumber = generateCardNumber();
    const qrCode = generateQRCode(cardNumber);
    const subType = data.subscription;
    const subData = subscriptions.find((s) => s.id === `sub-${subType}`);
    const validUntil = formatCardExpiry(subData ? parseInt(subData.validity) : 30);

    const finalData: RegistrationData = {
      phone: data.phone,
      firebaseUser: data.firebaseUser,
      role: data.role || 'student',
      institution: data.institution || '',
      subscription: data.subscription,
      fullName: data.fullName,
      homePoint: data.homePoint || '',
      cardNumber,
      qrCode,
      validUntil,
    };

    setData(finalData);

    // Register user with Firebase
    await loginWithFirebase(data.firebaseUser, {
      phone: finalData.phone,
      fullName: finalData.fullName,
      role: finalData.role,
      institution: finalData.institution,
      faculty: finalData.institution,
      cardNumber: finalData.cardNumber,
      qrCode: finalData.qrCode,
      subscription: finalData.subscription,
      validUntil: finalData.validUntil,
      homePoint: finalData.homePoint,
    });

    setCurrentStep('success');
  };

  const handlePrevious = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100">
      <Header />

      <main className="flex-1 py-16 md:py-20 relative overflow-hidden">
        {/* Floating blurred shapes */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Progress Indicator */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900">
                {t('register.title')}
              </h1>
              <span className="text-xl font-bold text-gray-600">
                {currentStepIndex + 1} / {steps.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <Card className="p-10 md:p-12 border-0 shadow-lg rounded-3xl bg-white/80 backdrop-blur-sm">
            {currentStep === 'phone' && (
              <PhoneOtpAuth
                mode="register"
                onAuthSuccess={handlePhoneAuthSuccess}
              />
            )}
            {currentStep === 'role' && (
              <RoleStep
                onNext={handleRoleNext}
                onPrevious={handlePrevious}
              />
            )}
            {currentStep === 'institution' && (
              <InstitutionStep
                onNext={handleInstitutionNext}
                onPrevious={handlePrevious}
              />
            )}
            {currentStep === 'subscription' && (
              <SubscriptionStep
                onNext={handleSubscriptionNext}
                onPrevious={handlePrevious}
              />
            )}
            {currentStep === 'payment' && (
              <PaymentStep
                amount={
                  subscriptions.find((s) => s.id === `sub-${data.subscription}`)?.price || 0
                }
                onNext={handlePaymentNext}
                onPrevious={handlePrevious}
              />
            )}
            {currentStep === 'success' && (
              <SuccessStep
                cardNumber={data.cardNumber || ''}
                qrCode={data.qrCode || ''}
                validUntil={data.validUntil || ''}
              />
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
