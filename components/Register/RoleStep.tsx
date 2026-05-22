'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { UserCircle2 } from 'lucide-react';
import { UserRole } from '@/contexts/AuthContext';

interface RoleStepProps {
  onNext: (role: UserRole) => void;
  onPrevious: () => void;
}

export function RoleStep({ onNext, onPrevious }: RoleStepProps) {
  const { t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roles: { value: UserRole; label: string; descAr: string; descFr: string }[] = [
    {
      value: 'student',
      label: t('register.student'),
      descAr: 'للطلاب والطالبات المسجلين في الجامعة',
      descFr: 'Pour les étudiants inscrits à l\'université',
    },
    {
      value: 'teacher',
      label: t('register.teacher'),
      descAr: 'للأساتذة والعاملين',
      descFr: 'Pour les enseignants et le personnel',
    },
    {
      value: 'admin',
      label: t('register.admin'),
      descAr: 'لمسؤولي النظام والإدارة',
      descFr: 'Pour les administrateurs du système',
    },
  ];

  const handleNext = () => {
    if (selectedRole) {
      onNext(selectedRole);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center mb-8">
        <div className="p-6 rounded-full bg-emerald-100">
          <UserCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 text-center">
          {t('register.role')}
        </h2>
        <p className="text-lg text-gray-600 text-center font-medium">
          {t('register.role')}
        </p>
      </div>

      <div className="space-y-5">
        {roles.map((role) => (
          <button
            key={role.value}
            onClick={() => setSelectedRole(role.value)}
            className={`w-full p-6 md:p-8 rounded-2xl border-2 text-left transition-all duration-500 ${
              selectedRole === role.value
                ? 'border-emerald-600 bg-emerald-50 shadow-lg shadow-emerald-600/15 scale-[1.01]'
                : 'border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50 hover:scale-[1.005]'
            }`}
          >
            <div className="font-black text-xl text-gray-900 mb-2">{role.label}</div>
            <div className="text-base text-gray-600 font-medium">
              {t('language') === 'ar' ? role.descAr : role.descFr}
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-5 pt-4">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-16 text-xl font-bold rounded-2xl border-2"
          onClick={onPrevious}
        >
          {t('common.previous')}
        </Button>
        <Button
          size="lg"
          className="flex-1 h-16 text-xl font-black rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
          onClick={handleNext}
          disabled={!selectedRole}
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
}
