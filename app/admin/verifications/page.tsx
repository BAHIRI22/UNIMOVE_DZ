'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, UserCheck, XCircle, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

interface VerificationUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  email?: string;
  role: string;
  university: string;
  facultyOrInstitute: string;
  facultyLabelAr?: string;
  facultyLabelFr?: string;
  verificationMethod: string;
  verificationMethodLabelAr?: string;
  verificationMethodLabelFr?: string;
  verificationStatus: string;
  accountStatus: string;
  adminNote?: string;
  isDeleted?: boolean;
  createdAt: string;
}

export default function AdminVerificationsPage() {
  const { language } = useLanguage();
  const [users, setUsers] = useState<VerificationUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<VerificationUser | null>(null);
  const [rejectNote, setRejectNote] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData: VerificationUser[] = [];
      snapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() } as VerificationUser);
      });
      const filtered = usersData.filter((u) => u.isDeleted !== true && (u.verificationStatus || 'pending') !== 'approved');
      setUsers(filtered);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching pending users:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.fullName?.toLowerCase().includes(query) ||
      user.phone?.includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-700';
      case 'teacher':
        return 'bg-purple-100 text-purple-700';
      case 'administrative':
        return 'bg-teal-100 text-teal-700';
      case 'driver':
        return 'bg-orange-100 text-orange-700';
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
        administrative: 'إداري',
        driver: 'سائق',
        admin: 'مدير',
      },
      fr: {
        student: 'Étudiant',
        teacher: 'Enseignant',
        administrative: 'Administratif',
        driver: 'Chauffeur',
        admin: 'Administrateur',
      },
    };
    return labels[language][role as keyof typeof labels.ar] || role;
  };

  const handleAccept = async (user: VerificationUser) => {
    setProcessing(true);
    try {
      await updateDoc(doc(db, 'users', user.id), {
        verificationStatus: 'approved',
        accountStatus: 'active',
        verified: true,
        status: 'approved',
        verifiedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error accepting user:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleRejectClick = (user: VerificationUser) => {
    setSelectedUser(user);
    setRejectNote('');
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = async () => {
    if (!selectedUser) return;
    setProcessing(true);
    try {
      await updateDoc(doc(db, 'users', selectedUser.id), {
        verificationStatus: 'rejected',
        accountStatus: 'pending',
        verified: false,
        status: 'rejected',
        adminNote: rejectNote,
        updatedAt: serverTimestamp(),
      });
      setRejectDialogOpen(false);
      setSelectedUser(null);
      setRejectNote('');
    } catch (error) {
      console.error('Error rejecting user:', error);
    } finally {
      setProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'طلبات التحقق' : 'Demandes de vérification'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'مراجعة والموافقة على حسابات المستخدمين الجديدة'
                : 'Examiner et approuver les nouveaux comptes utilisateurs'}
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800">
            <Clock className="w-5 h-5" />
            <span className="font-bold">{users.length}</span>
            <span className="text-sm">
              {language === 'ar' ? 'غير مقبول' : 'Non approuvé'}
            </span>
          </div>
        </div>

        {/* Search */}
        <Card className="p-4 border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={language === 'ar' ? 'بحث مستخدم...' : 'Rechercher un utilisateur...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Users Table */}
        <Card className="border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              {language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {language === 'ar' ? 'لا يوجد مستخدمون بانتظار التحقق' : 'Aucun utilisateur en attente de vérification'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-bold text-gray-900">
                    {language === 'ar' ? 'الاسم واللقب' : 'Nom et prénom'}
                  </TableHead>
                  <TableHead className="font-bold text-gray-900">
                    {language === 'ar' ? 'رقم الهاتف' : 'Téléphone'}
                  </TableHead>
                  <TableHead className="font-bold text-gray-900">
                    {language === 'ar' ? 'الدور' : 'Rôle'}
                  </TableHead>
                  <TableHead className="font-bold text-gray-900">
                    {language === 'ar' ? 'الجامعة' : 'Université'}
                  </TableHead>
                  <TableHead className="font-bold text-gray-900">
                    {language === 'ar' ? 'الكلية/المعهد' : 'Faculté/Institut'}
                  </TableHead>
                  <TableHead className="font-bold text-gray-900">
                    {language === 'ar' ? 'طريقة التحقق' : 'Méthode de vérification'}
                  </TableHead>
                  <TableHead className="font-bold text-gray-900">
                    {language === 'ar' ? 'تاريخ التسجيل' : "Date d'inscription"}
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
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{user.fullName}</TableCell>
                    <TableCell dir="ltr">{user.phone}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </TableCell>
                    <TableCell>{language === 'ar' ? 'جامعة الجيلالي اليابس' : 'Université Djillali Liabès'}</TableCell>
                    <TableCell>
                      {language === 'ar' ? user.facultyLabelAr : user.facultyLabelFr}
                    </TableCell>
                    <TableCell>
                      {language === 'ar' ? user.verificationMethodLabelAr : user.verificationMethodLabelFr}
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.verificationStatus === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {user.verificationStatus === 'rejected'
                          ? (language === 'ar' ? 'مرفوض' : 'Rejeté')
                          : (language === 'ar' ? 'قيد التحقق' : 'En attente')}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 text-green-600 hover:bg-green-50"
                          onClick={() => handleAccept(user)}
                          disabled={processing}
                        >
                          <UserCheck className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 text-red-600 hover:bg-red-50"
                          onClick={() => handleRejectClick(user)}
                          disabled={processing}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              {language === 'ar' ? 'رفض التحقق' : 'Rejeter la vérification'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{language === 'ar' ? 'ملاحظة الإدارة (اختياري)' : 'Note de l\'administration (optionnel)'}</Label>
              <Textarea
                value={rejectNote}
                onChange={(e) => setRejectNote(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل سبب الرفض...' : 'Entrez la raison du rejet...'}
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
              disabled={processing}
            >
              {language === 'ar' ? 'إلغاء' : 'Annuler'}
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectConfirm}
              disabled={processing}
            >
              {processing ? (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 animate-spin" />
                  {language === 'ar' ? 'جاري...' : 'En cours...'}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  {language === 'ar' ? 'رفض' : 'Rejeter'}
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
