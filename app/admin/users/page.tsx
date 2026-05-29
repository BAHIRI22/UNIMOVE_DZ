'use client';

import { useState, useEffect, useMemo } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, UserCheck, XCircle, Clock, AlertCircle, Users, Filter, CheckCircle2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, updateDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';

interface FirestoreUser {
  id: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  phoneNumber?: string;
  email?: string;
  role?: string;
  university?: string;
  facultyOrInstitute?: string;
  facultyLabelAr?: string;
  facultyLabelFr?: string;
  department?: string;
  departmentLabelAr?: string;
  departmentLabelFr?: string;
  speciality?: string;
  specialityLabelAr?: string;
  specialityLabelFr?: string;
  verificationMethod?: string;
  verificationMethodLabelAr?: string;
  verificationMethodLabelFr?: string;
  verificationStatus?: string;
  accountStatus?: string;
  verified?: boolean;
  status?: string;
  adminNote?: string;
  createdAt?: string;
}

export default function AdminUsersPage() {
  const { language } = useLanguage();
  const [users, setUsers] = useState<FirestoreUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [processing, setProcessing] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FirestoreUser | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [rejectNote, setRejectNote] = useState('');

type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected';

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData: FirestoreUser[] = [];
      snapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() } as FirestoreUser);
      });
      setUsers(usersData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching users:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let result = [...users];

    if (statusFilter !== 'all') {
      result = result.filter((u) => u.status === statusFilter);
    }

    result = result.sort((a, b) => {
      const aPending = a.status === 'pending' ? 1 : 0;
      const bPending = b.status === 'pending' ? 1 : 0;
      if (aPending !== bPending) return bPending - aPending;
      return 0;
    });

    if (!q) return result;
    return result.filter((user) =>
      (user.fullName?.toLowerCase().includes(q)) ||
      (user.firstName?.toLowerCase().includes(q)) ||
      (user.lastName?.toLowerCase().includes(q)) ||
      (user.phone?.includes(q)) ||
      (user.phoneNumber?.includes(q)) ||
      (user.email?.toLowerCase().includes(q))
    );
  }, [users, searchQuery, statusFilter]);

  const counts = useMemo(() => ({
    all: users.length,
    pending: users.filter((u) => u.status === 'pending').length,
    approved: users.filter((u) => u.status === 'approved').length,
    rejected: users.filter((u) => u.status === 'rejected').length,
  }), [users]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-700';
      case 'teacher': return 'bg-purple-100 text-purple-700';
      case 'administrative': return 'bg-teal-100 text-teal-700';
      case 'driver': return 'bg-orange-100 text-orange-700';
      case 'admin': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, Record<string, string>> = {
      ar: { student: 'طالب', teacher: 'أستاذ', administrative: 'إداري', driver: 'سائق', admin: 'مدير' },
      fr: { student: 'Étudiant', teacher: 'Enseignant', administrative: 'Administratif', driver: 'Chauffeur', admin: 'Administrateur' },
    };
    return labels[language]?.[role] || role;
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status?: string) => {
    const labels: Record<string, Record<string, string>> = {
      ar: { approved: 'مقبول', pending: 'قيد الانتظار', rejected: 'مرفوض' },
      fr: { approved: 'Approuvé', pending: 'En attente', rejected: 'Rejeté' },
    };
    return labels[language]?.[status || 'pending'] || status;
  };

  const getVerifiedLabel = (verified?: boolean) => {
    if (verified === true) return { text: language === 'ar' ? 'نعم' : 'Oui', color: 'bg-emerald-100 text-emerald-700' };
    return { text: language === 'ar' ? 'لا' : 'Non', color: 'bg-gray-100 text-gray-700' };
  };

  const handleApprove = async (user: FirestoreUser) => {
    setProcessing(true);
    try {
      await updateDoc(doc(db, 'users', user.id), {
        verified: true,
        status: 'approved',
        verificationStatus: 'verified',
        accountStatus: 'active',
        approvedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error approving user:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleRejectClick = (user: FirestoreUser) => {
    setSelectedUser(user);
    setRejectNote('');
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = async () => {
    if (!selectedUser) return;
    setProcessing(true);
    try {
      await updateDoc(doc(db, 'users', selectedUser.id), {
        verified: false,
        status: 'rejected',
        verificationStatus: 'rejected',
        accountStatus: 'pending',
        adminNote: rejectNote,
        rejectedAt: serverTimestamp(),
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const filters: { key: StatusFilter; labelAr: string; labelFr: string }[] = [
    { key: 'all', labelAr: 'الكل', labelFr: 'Tous' },
    { key: 'pending', labelAr: 'قيد الانتظار', labelFr: 'En attente' },
    { key: 'approved', labelAr: 'مقبول', labelFr: 'Approuvés' },
    { key: 'rejected', labelAr: 'مرفوض', labelFr: 'Rejetés' },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="max-w-[96rem] mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'إدارة المستخدمين' : 'Users Management'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'إدارة حسابات المستخدمين والتحقق منها'
                : 'Gérer les comptes utilisateurs et les valider'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Users className="w-5 h-5" />
              <span className="font-bold">{counts.all}</span>
              <span className="text-sm">{language === 'ar' ? 'مستخدم' : 'Utilisateurs'}</span>
            </div>
            {counts.pending > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                <Clock className="w-5 h-5" />
                <span className="font-bold">{counts.pending}</span>
                <span className="text-sm">{language === 'ar' ? 'قيد الانتظار' : 'En attente'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Filters & Search */}
        <Card className="p-4 md:p-6 border border-slate-200 rounded-2xl shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => {
                const isActive = statusFilter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setStatusFilter(f.key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                      isActive
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20'
                        : 'bg-white text-gray-700 border-slate-200 hover:border-emerald-400 hover:text-emerald-700'
                    }`}
                  >
                    {f.key === 'all' && <Filter className="w-4 h-4" />}
                    {f.key === 'pending' && <Clock className="w-4 h-4" />}
                    {f.key === 'approved' && <CheckCircle2 className="w-4 h-4" />}
                    {f.key === 'rejected' && <XCircle className="w-4 h-4" />}
                    {language === 'ar' ? f.labelAr : f.labelFr}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-black ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                      {counts[f.key]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={language === 'ar' ? 'بحث بالاسم أو رقم الهاتف...' : 'Rechercher par nom ou téléphone...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 rounded-xl border-slate-200"
              />
            </div>
          </div>
        </Card>

        {/* Users Table */}
        <Card className="border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">{language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}</div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">{language === 'ar' ? 'لا يوجد مستخدمون' : 'Aucun utilisateur'}</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-bold text-gray-900 whitespace-nowrap">{language === 'ar' ? 'الاسم واللقب' : 'Nom et prénom'}</TableHead>
                    <TableHead className="font-bold text-gray-900 whitespace-nowrap">{language === 'ar' ? 'الهاتف' : 'Téléphone'}</TableHead>
                    <TableHead className="font-bold text-gray-900 whitespace-nowrap">{language === 'ar' ? 'الدور' : 'Rôle'}</TableHead>
                    <TableHead className="font-bold text-gray-900 whitespace-nowrap">{language === 'ar' ? 'الجامعة' : 'Université'}</TableHead>
                    <TableHead className="font-bold text-gray-900 whitespace-nowrap">{language === 'ar' ? 'الكلية/المعهد' : 'Faculté/Institut'}</TableHead>
                    <TableHead className="font-bold text-gray-900 whitespace-nowrap">{language === 'ar' ? 'القسم' : 'Département'}</TableHead>
                    <TableHead className="font-bold text-gray-900 whitespace-nowrap">{language === 'ar' ? 'التخصص' : 'Spécialité'}</TableHead>
                    <TableHead className="font-bold text-gray-900 whitespace-nowrap">{language === 'ar' ? 'طريقة التحقق' : 'Vérification'}</TableHead>
                    <TableHead className="font-bold text-gray-900 whitespace-nowrap">{language === 'ar' ? 'الحالة' : 'Statut'}</TableHead>
                    <TableHead className="font-bold text-gray-900 whitespace-nowrap">{language === 'ar' ? 'موثق' : 'Vérifié'}</TableHead>
                    <TableHead className="font-bold text-gray-900 whitespace-nowrap">{language === 'ar' ? 'تاريخ التسجيل' : "Date d'inscription"}</TableHead>
                    <TableHead className="font-bold text-gray-900 whitespace-nowrap">{language === 'ar' ? 'إجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => {
                    const verifiedInfo = getVerifiedLabel(user.verified);
                    return (
                      <TableRow key={user.id} className="hover:bg-emerald-50/30">
                        <TableCell className="font-semibold whitespace-nowrap">{user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim()}</TableCell>
                        <TableCell dir="ltr" className="whitespace-nowrap">{user.phoneNumber || user.phone || '-'}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRoleColor(user.role || '')}`}>
                            {getRoleLabel(user.role || '')}
                          </span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-gray-600">{user.university || '-'}</TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-gray-600">{language === 'ar' ? user.facultyLabelAr : user.facultyLabelFr}</TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-gray-600">{language === 'ar' ? user.departmentLabelAr : user.departmentLabelFr}</TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-gray-600">{language === 'ar' ? user.specialityLabelAr : user.specialityLabelFr}</TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-gray-600">{language === 'ar' ? user.verificationMethodLabelAr : user.verificationMethodLabelFr}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(user.status)}`}>
                            {getStatusLabel(user.status)}
                          </span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${verifiedInfo.color}`}>
                            {verifiedInfo.text}
                          </span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-gray-600">{formatDate(user.createdAt)}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex gap-1">
                            {user.status === 'pending' && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                  onClick={() => handleApprove(user)}
                                  disabled={processing}
                                  title={language === 'ar' ? 'قبول' : 'Approuver'}
                                >
                                  <UserCheck className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                  onClick={() => handleRejectClick(user)}
                                  disabled={processing}
                                  title={language === 'ar' ? 'رفض' : 'Rejeter'}
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            {user.status === 'rejected' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                onClick={() => handleApprove(user)}
                                disabled={processing}
                                title={language === 'ar' ? 'قبول' : 'Approuver'}
                              >
                                <UserCheck className="w-4 h-4" />
                              </Button>
                            )}
                            {user.status === 'approved' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                onClick={() => handleRejectClick(user)}
                                disabled={processing}
                                title={language === 'ar' ? 'رفض' : 'Rejeter'}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </div>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              {language === 'ar' ? 'رفض التحقق من الحساب' : 'Rejeter la vérification du compte'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="font-bold text-gray-700">
                {language === 'ar' ? 'ملاحظة الإدارة (اختياري)' : "Note de l'administration (optionnel)"}
              </Label>
              <Textarea
                value={rejectNote}
                onChange={(e) => setRejectNote(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل سبب الرفض...' : 'Entrez la raison du rejet...'}
                className="mt-2 rounded-xl border-slate-200"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)} disabled={processing} className="rounded-xl">
              {language === 'ar' ? 'إلغاء' : 'Annuler'}
            </Button>
            <Button variant="destructive" onClick={handleRejectConfirm} disabled={processing} className="rounded-xl">
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
