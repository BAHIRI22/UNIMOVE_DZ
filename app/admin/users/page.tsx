'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Shield, UserCheck, XCircle } from 'lucide-react';

export default function AdminUsersPage() {
  const { language } = useLanguage();

  const users = [
    {
      id: 1,
      fullName: 'Ahmed Benali',
      phone: '+213555123456',
      email: 'ahmed@example.com',
      role: 'student',
      institution: 'Université Sidi Bel Abbès',
      faculty: 'Faculté des Sciences',
      subscription: 'monthly',
      status: 'approved',
      createdAt: '2026-05-15',
    },
    {
      id: 2,
      fullName: 'Fatima Zerhouni',
      phone: '+213556789012',
      email: 'fatima@example.com',
      role: 'teacher',
      institution: 'Université Sidi Bel Abbès',
      faculty: 'Faculté de Droit',
      subscription: 'weekly',
      status: 'pending',
      createdAt: '2026-05-18',
    },
    {
      id: 3,
      fullName: 'Karim Hadj',
      phone: '+213557890123',
      email: 'karim@example.com',
      role: 'student',
      institution: 'Université Sidi Bel Abbès',
      faculty: 'Faculté de Médecine',
      subscription: 'daily',
      status: 'approved',
      createdAt: '2026-05-20',
    },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-700';
      case 'teacher':
        return 'bg-purple-100 text-purple-700';
      case 'admin':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleLabel = (role: string) => {
    const labels = {
      ar: {
        student: 'طالب',
        teacher: 'أستاذ',
        admin: 'مدير',
      },
      fr: {
        student: 'Étudiant',
        teacher: 'Enseignant',
        admin: 'Administrateur',
      },
    };
    return labels[language][role as keyof typeof labels.ar] || role;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      ar: {
        approved: 'مقبول',
        pending: 'قيد الانتظار',
        rejected: 'مرفوض',
      },
      fr: {
        approved: 'Approuvé',
        pending: 'En attente',
        rejected: 'Rejeté',
      },
    };
    return labels[language][status as keyof typeof labels.ar] || status;
  };

  return (
    <DashboardLayout role="admin">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'إدارة المستخدمين' : 'Gestion des utilisateurs'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'إدارة حسابات المستخدمين والتحقق منها'
                : 'Gérer les comptes utilisateurs et les valider'}
            </p>
          </div>
          <Button className="bg-primary hover:bg-secondary text-white flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {language === 'ar' ? 'إضافة مستخدم' : 'Ajouter un utilisateur'}
          </Button>
        </div>

        {/* Search */}
        <Card className="p-4 border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={language === 'ar' ? 'بحث مستخدم...' : 'Rechercher un utilisateur...'}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Users Table */}
        <Card className="border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'الاسم الكامل' : 'Nom complet'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'الهاتف' : 'Téléphone'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'البريد' : 'Email'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'الدور' : 'Rôle'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'المؤسسة' : 'Institution'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'الاشتراك' : 'Abonnement'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'الحالة' : 'Statut'}
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  {language === 'ar' ? 'إجراءات' : 'Actions'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{user.fullName}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </TableCell>
                  <TableCell>{user.institution}</TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{user.subscription}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {user.status === 'pending' && (
                        <Button variant="ghost" size="sm" className="p-2 text-green-600 hover:bg-green-50">
                          <UserCheck className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="p-2">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2 text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
}
