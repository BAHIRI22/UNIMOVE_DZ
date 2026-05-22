'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2, CheckCircle2, X } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  phone: string;
  role: 'student' | 'teacher' | 'admin';
  institution: string;
  status: 'active' | 'pending' | 'inactive';
  joinDate: string;
}

export function AdminUsers() {
  const { t, language } = useLanguage();
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'أحمد محمد',
      phone: '+213 555 123 456',
      role: 'student',
      institution: 'كلية الحقوق',
      status: 'active',
      joinDate: '2026-02-15',
    },
    {
      id: '2',
      name: 'فاطمة علي',
      phone: '+213 555 234 567',
      role: 'student',
      institution: 'كلية التكنولوجيا',
      status: 'active',
      joinDate: '2026-02-20',
    },
    {
      id: '3',
      name: 'محمد عمر',
      phone: '+213 555 345 678',
      role: 'teacher',
      institution: 'كلية العلوم',
      status: 'pending',
      joinDate: '2026-02-28',
    },
    {
      id: '4',
      name: 'ليلى حسن',
      phone: '+213 555 456 789',
      role: 'student',
      institution: 'كلية الحقوق',
      status: 'active',
      joinDate: '2026-02-10',
    },
  ]);

  const getRoleBadge = (role: string) => {
    const roleMap: Record<string, { ar: string; fr: string }> = {
      student: { ar: 'طالب', fr: 'Étudiant' },
      teacher: { ar: 'أستاذ', fr: 'Enseignant' },
      admin: { ar: 'مسؤول', fr: 'Administrateur' },
    };
    return language === 'ar' ? roleMap[role]?.ar : roleMap[role]?.fr;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return language === 'ar' ? 'نشط' : 'Actif';
      case 'pending':
        return language === 'ar' ? 'في الانتظار' : 'En attente';
      case 'inactive':
        return language === 'ar' ? 'غير نشط' : 'Inactif';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('admin.users')}</h2>

      <div className="space-y-3">
        {users.map((user) => (
          <Card key={user.id} className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {getRoleBadge(user.role)}
                  </Badge>
                  <Badge className={getStatusColor(user.status)}>
                    {getStatusLabel(user.status)}
                  </Badge>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mt-3">
                  <div>
                    <span className="text-gray-500 text-xs">{language === 'ar' ? 'الهاتف' : 'Téléphone'}</span>
                    <p className="font-medium text-gray-900">{user.phone}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs">{language === 'ar' ? 'الجامعة' : 'Université'}</span>
                    <p className="font-medium text-gray-900">{user.institution}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs">{language === 'ar' ? 'تاريخ الانضمام' : 'Date d\'adhésion'}</span>
                    <p className="font-medium text-gray-900">{user.joinDate}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-primary hover:bg-primary/10">
                  <Eye className="w-4 h-4" />
                </Button>
                {user.status === 'pending' && (
                  <Button variant="outline" size="sm" className="text-green-600 hover:bg-green-50">
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
