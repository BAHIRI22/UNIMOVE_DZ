'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PhoneOtpAuth } from '@/components/PhoneOtpAuth';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateCardNumber, generateQRCode, formatCardExpiry } from '@/lib/cardGenerator';
import { SmartSelect } from '@/components/SmartSelect';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp, getDocs, query, where, collection } from 'firebase/firestore';
import academicData from '@/data/academic-data.json';
import { compressImageToMaxSize } from '@/lib/imageCompression';
import { Upload, FileText, CheckCircle2, X, FileCheck2, ImageIcon, Loader2 } from 'lucide-react';

interface FormErrors {
  facultyOrInstitute?: string;
  verificationMethod?: string;
  daira?: string;
  commune?: string;
  departurePoint?: string;
  specialNeedsDocument?: string;
}

function RegisterContent() {
  const { language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithFirebase } = useAuth();
  const [firebaseUser, setFirebaseUser] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const phoneFromQuery = searchParams.get('phone') || '';
  const verifiedPhone = firebaseUser?.phoneNumber || phoneFromQuery;

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    role: 'student' as UserRole,
    university: 'Université Djillali Liabès Sidi Bel Abbès',
    facultyOrInstitute: '',
    academicYear: '',
    grade: '',
    email: '',
    wilaya: 'Sidi Bel Abbès',
    daira: '',
    commune: '',
    departurePoint: '',
    verificationMethod: '',
    specialNeeds: false,
    specialNeedsType: '',
    specialNeedsDocumentUrl: '',
    specialNeedsDocumentName: '',
  });

  const [snFile, setSnFile] = useState<File | null>(null);
  const [snUploading, setSnUploading] = useState(false);
  const [snProgress, setSnProgress] = useState(0);
  const [snPreviewUrl, setSnPreviewUrl] = useState<string | null>(null);
  const [snCompressing, setSnCompressing] = useState(false);

  const isAR = language === 'ar';

  const label = (fr: string, ar: string) => isAR ? ar : fr;

  // Check if phone already exists on mount (in users or drivers collections)
  useEffect(() => {
    if (!phoneFromQuery) return;
    const checkExisting = async () => {
      const q = query(collection(db, 'users'), where('phoneNumber', '==', phoneFromQuery));
      const snap = await getDocs(q);
      if (!snap.empty) {
        router.replace('/login');
        return;
      }
      const altQ = query(collection(db, 'users'), where('phone', '==', phoneFromQuery));
      const altSnap = await getDocs(altQ);
      if (!altSnap.empty) {
        router.replace('/login');
        return;
      }
      // Also check drivers collection
      const drvQ = query(collection(db, 'drivers'), where('phoneNumber', '==', phoneFromQuery));
      const drvSnap = await getDocs(drvQ);
      if (!drvSnap.empty) {
        router.replace('/login');
      }
    };
    checkExisting();
  }, [phoneFromQuery, router]);

  const handlePhoneAuthSuccess = (user: any) => {
    setFirebaseUser(user);
  };

  const handleChange = (key: string, value: string | boolean) => {
    setForm((prev) => {
      const next: any = { ...prev, [key]: value };
      if (key === 'daira') { next.commune = ''; next.departurePoint = ''; }
      if (key === 'commune') { next.departurePoint = ''; }
      if (key === 'role') { next.academicYear = ''; next.grade = ''; next.verificationMethod = ''; }
      if (key === 'specialNeeds' && value === false) {
        next.specialNeedsType = '';
        next.specialNeedsDocumentUrl = '';
        next.specialNeedsDocumentName = '';
        setSnFile(null);
        setSnPreviewUrl(null);
      }
      return next;
    });
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const facultyOptions = useMemo(() => {
    return academicData.faculties.map((f: any) => ({
      value: f.id,
      label: isAR ? f.nameAr : f.nameFr,
    }));
  }, [isAR]);

  const academicYearOptions = useMemo(() => {
    const key = form.role === 'student' ? 'student' : form.role;
    const list = (academicData.academicYears as any)[key] || [];
    return list.map((item: any) => ({
      value: item.id,
      label: isAR ? item.nameAr : item.nameFr,
    }));
  }, [form.role, isAR]);

  const dairaOptions = useMemo(() => {
    return academicData.wilaya.dairias.map((d: any) => ({
      value: d.id,
      label: isAR ? d.nameAr : d.nameFr,
    }));
  }, [isAR]);

  const selectedDaira = useMemo(() => {
    return academicData.wilaya.dairias.find((d: any) => d.id === form.daira);
  }, [form.daira]);

  const communeOptions = useMemo(() => {
    if (!selectedDaira) return [];
    return selectedDaira.communes.map((c: any) => ({
      value: c.id,
      label: isAR ? c.nameAr : c.nameFr,
    }));
  }, [selectedDaira, isAR]);

  const departurePointOptions = useMemo(() => {
    if (!selectedDaira) return [];
    return selectedDaira.departurePoints.map((p: any) => ({
      value: p.id,
      label: isAR ? p.nameAr : p.nameFr,
    }));
  }, [selectedDaira, isAR]);

  const verificationMethodOptions = useMemo(() => {
    const key = form.role === 'student' ? 'student' : form.role;
    const list = (academicData.verificationMethods as any)[key] || [];
    return list.map((item: any) => ({
      value: item.id,
      label: isAR ? item.nameAr : item.nameFr,
    }));
  }, [form.role, isAR]);

  const isDriver = form.role === 'driver';
  const isAdminRole = form.role === 'administrative' || form.role === 'admin';
  const needsStudentFields = !isDriver && !isAdminRole;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (needsStudentFields) {
      if (!form.facultyOrInstitute) newErrors.facultyOrInstitute = isAR ? 'يرجى اختيار الكلية أو المعهد' : 'Veuillez choisir la faculté ou l institut';
      if (!form.verificationMethod) newErrors.verificationMethod = isAR ? 'يرجى اختيار طريقة التحقق' : 'Veuillez choisir la méthode de vérification';
      if (!form.daira) newErrors.daira = isAR ? 'يرجى اختيار الدائرة' : 'Veuillez choisir la daïra';
      if (!form.commune) newErrors.commune = isAR ? 'يرجى اختيار البلدية' : 'Veuillez choisir la commune';
      if (!form.departurePoint) newErrors.departurePoint = isAR ? 'يرجى اختيار نقطة الانطلاق' : 'Veuillez choisir le point de départ';
    }
    if (form.specialNeeds && !form.specialNeedsDocumentUrl) {
      newErrors.specialNeedsDocument = isAR ? 'يرجى رفع وثيقة تثبت حالة ذوي الاحتياجات الخاصة' : 'Veuillez téléverser un document attestant le handicap';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getLabelPair = (value: string, options: { value: string; label: string }[]) => {
    const opt = options.find((o) => o.value === value);
    return opt ? opt.label : value;
  };

  const SN_TYPES = [
    { value: 'mobility', labelAr: 'حركية (كرسي متحرك)', labelFr: 'Mobilité (fauteuil roulant)' },
    { value: 'visual', labelAr: 'بصرية', labelFr: 'Visuel' },
    { value: 'hearing', labelAr: 'سمعية', labelFr: 'Auditif' },
    { value: 'other', labelAr: 'أخرى', labelFr: 'Autre' },
  ];

  const handleSnFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowed.includes(file.type)) {
      alert(isAR ? 'صيغة غير مدعومة (jpg, png, pdf فقط)' : 'Format non supporté (jpg, png, pdf uniquement)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert(isAR ? 'الحجم الأقصى 5 ميغابايت' : 'Taille maximale 5 Mo');
      return;
    }
    setSnFile(file);
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setSnPreviewUrl(url);
    } else {
      setSnPreviewUrl(null);
    }
  };

  const uploadToCloudinary = async (selectedFile: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) throw new Error('Cloudinary config missing');
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', uploadPreset);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`);
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setSnProgress(Math.min(99, Math.round((event.loaded / event.total) * 100)));
        }
      };
      xhr.onload = () => {
        try {
          const res = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300 && res.secure_url) {
            setSnProgress(100);
            resolve(res.secure_url);
            return;
          }
          reject(new Error(res.error?.message || 'Upload failed'));
        } catch { reject(new Error('Upload failed')); }
      };
      xhr.onerror = () => reject(new Error('Upload failed'));
      xhr.send(formData);
    });
  };

  const handleSnUpload = async () => {
    if (!snFile) return;
    setSnUploading(true);
    setSnProgress(0);
    try {
      let fileToUpload = snFile;
      if (snFile.type.startsWith('image/')) {
        setSnCompressing(true);
        fileToUpload = await compressImageToMaxSize(snFile, 5);
        setSnCompressing(false);
      }
      const url = await uploadToCloudinary(fileToUpload);
      setForm((prev) => ({ ...prev, specialNeedsDocumentUrl: url, specialNeedsDocumentName: fileToUpload.name }));
      setErrors((prev) => ({ ...prev, specialNeedsDocument: undefined }));
    } catch {
      alert(isAR ? 'تعذر رفع الملف' : 'Échec du téléchargement');
    } finally {
      setSnUploading(false);
      setSnCompressing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!verifiedPhone) return;

    setSubmitLoading(true);
    setSubmitError('');

    try {
      // Check if phone number already exists
      const phoneQuery = query(collection(db, 'users'), where('phoneNumber', '==', verifiedPhone));
      const phoneSnap = await getDocs(phoneQuery);
      if (!phoneSnap.empty) {
        setSubmitError(
          isAR
            ? 'هذا الرقم مسجل مسبقاً'
            : 'Ce numéro existe déjà'
        );
        setSubmitLoading(false);
        return;
      }

      // Also check with normalized phone formats
      const digitsOnly = verifiedPhone.replace(/\D/g, '');
      if (digitsOnly) {
        const altQuery = query(collection(db, 'users'), where('phone', '==', verifiedPhone));
        const altSnap = await getDocs(altQuery);
        if (!altSnap.empty) {
          setSubmitError(
            isAR
              ? 'هذا الرقم مسجل مسبقاً'
              : 'Ce numéro existe déjà'
          );
          setSubmitLoading(false);
          return;
        }
      }
      const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
      const cardNumber = generateCardNumber();

      const facultyLabelAr = getLabelPair(form.facultyOrInstitute, facultyOptions);
      const facultyLabelFr = getLabelPair(form.facultyOrInstitute, academicData.faculties.map((f: any) => ({ value: f.id, label: f.nameFr })));
      const vmLabelAr = getLabelPair(form.verificationMethod, verificationMethodOptions);
      const vmLabelFr = getLabelPair(form.verificationMethod, ((academicData.verificationMethods as any)[form.role === 'student' ? 'student' : form.role] || []).map((v: any) => ({ value: v.id, label: v.nameFr })));

      const userDoc = {
        fullName,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: verifiedPhone,
        phoneNumber: verifiedPhone,
        role: form.role,
        university: form.university,
        facultyOrInstitute: form.facultyOrInstitute,
        facultyLabelAr,
        facultyLabelFr,
        academicYear: form.academicYear || '',
        grade: form.grade || '',
        email: form.email || '',
        wilaya: form.wilaya,
        daira: form.daira,
        commune: form.commune,
        departurePoint: form.departurePoint,
        verificationMethod: form.verificationMethod,
        verificationMethodLabelAr: vmLabelAr,
        verificationMethodLabelFr: vmLabelFr,
        specialNeeds: form.specialNeeds,
        specialNeedsType: form.specialNeeds ? form.specialNeedsType : '',
        specialNeedsDocumentUrl: form.specialNeeds ? form.specialNeedsDocumentUrl : '',
        specialNeedsDocumentName: form.specialNeeds ? form.specialNeedsDocumentName : '',
        specialNeedsVerified: false,
        verificationStatus: 'pending',
        accountStatus: 'pending',
        verified: false,
        status: 'pending',
        subscriptionStatus: 'inactive',
        adminNote: '',
        cardNumber,
        qrCode: generateQRCode(cardNumber),
        subscription: 'monthly',
        validUntil: formatCardExpiry(30),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const userId = firebaseUser?.uid || `phone-${verifiedPhone.replace(/\D/g, '')}`;
      await setDoc(doc(db, 'users', userId), userDoc, { merge: true });
      console.log('User created in Firestore with ID:', userId);

      const authUser = firebaseUser || { uid: userId, phoneNumber: verifiedPhone };
      await loginWithFirebase(authUser as any, {
        id: userId,
        ...userDoc,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as any);

      setSuccess(true);
      const redirectPath =
        form.role === 'driver'
          ? '/driver-dashboard'
          : form.role === 'admin'
            ? '/admin-panel'
            : '/dashboard';
      setTimeout(() => router.push(redirectPath), 1800);
    } catch (error: any) {
      console.error('Firestore save error:', error);
      setSubmitError(
        isAR
          ? 'حدث خطأ أثناء حفظ الحساب، يرجى التحقق من الاتصال والمحاولة مرة أخرى'
          : 'Une erreur est survenue lors de la sauvegarde du compte, veuillez vérifier la connexion et réessayer'
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100">
      <Header />
      <main className="flex-1 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900">
                {isAR ? 'إنشاء حساب' : 'Créer un compte'}
              </h1>
              <p className="mt-3 text-slate-600 font-medium">
                {isAR ? 'حسابك سيبقى في انتظار التحقق الإداري' : 'Votre compte restera en attente de vérification administrative'}
              </p>
            </div>
            <Button variant="outline" onClick={() => window.history.length > 1 ? router.back() : router.push('/dashboard')}>
              {isAR ? 'رجوع' : 'Retour'}
            </Button>
          </div>

          {!verifiedPhone && (
            <PhoneOtpAuth mode="register" onAuthSuccess={handlePhoneAuthSuccess} />
          )}

          {verifiedPhone && !success && (
            <Card className="p-8 md:p-10 border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>{isAR ? 'رقم الهاتف' : 'Téléphone'}</Label>
                  <Input value={verifiedPhone} readOnly dir="ltr" className="h-12 bg-slate-100" />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{label('Prénom', 'الاسم')}</Label>
                    <Input value={form.firstName} onChange={(e) => handleChange('firstName', e.target.value)} required className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>{label('Nom', 'اللقب')}</Label>
                    <Input value={form.lastName} onChange={(e) => handleChange('lastName', e.target.value)} required className="h-12 rounded-xl" />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{label('Rôle', 'الدور')}</Label>
                    <select value={form.role} onChange={(e) => handleChange('role', e.target.value)} className="h-12 w-full rounded-xl border border-slate-300 px-3 bg-white">
                      <option value="student">{isAR ? 'طالب' : 'Étudiant'}</option>
                      <option value="teacher">{isAR ? 'أستاذ' : 'Enseignant'}</option>
                      <option value="administrative">{isAR ? 'إداري' : 'Administratif'}</option>
                      <option value="driver">{isAR ? 'سائق' : 'Chauffeur'}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>{label('Email', 'البريد الإلكتروني')}</Label>
                    <Input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} className="h-12 rounded-xl" />
                  </div>
                </div>

                {needsStudentFields && (
                  <>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <SmartSelect
                          label={label('Faculté ou institut', 'الكلية أو المعهد')}
                          options={facultyOptions}
                          value={form.facultyOrInstitute}
                          onChange={(v) => handleChange('facultyOrInstitute', v)}
                          placeholder={label('Choisir une faculté...', 'اختر الكلية...')}
                        />
                        {errors.facultyOrInstitute && <p className="text-sm text-red-600">{errors.facultyOrInstitute}</p>}
                      </div>
                      <div className="space-y-2">
                        <SmartSelect
                          label={label(form.role === 'student' ? 'Année universitaire' : 'Grade', form.role === 'student' ? 'السنة الجامعية' : 'الرتبة')}
                          options={academicYearOptions}
                          value={form.role === 'student' ? form.academicYear : form.grade}
                          onChange={(v) => handleChange(form.role === 'student' ? 'academicYear' : 'grade', v)}
                          placeholder={label('Choisir...', 'اختر...')}
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>{label('Wilaya', 'الولاية')}</Label>
                        <Input value={isAR ? 'سيدي بلعباس' : 'Sidi Bel Abbès'} readOnly className="h-12 bg-slate-100 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <SmartSelect
                          label={label('Daïra', 'الدائرة')}
                          options={dairaOptions}
                          value={form.daira}
                          onChange={(v) => handleChange('daira', v)}
                          placeholder={label('Choisir une daïra...', 'اختر الدائرة...')}
                        />
                        {errors.daira && <p className="text-sm text-red-600">{errors.daira}</p>}
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <SmartSelect
                          label={label('Commune', 'البلدية')}
                          options={communeOptions}
                          value={form.commune}
                          onChange={(v) => handleChange('commune', v)}
                          placeholder={label('Choisir une commune...', 'اختر البلدية...')}
                          disabled={!form.daira}
                        />
                        {errors.commune && <p className="text-sm text-red-600">{errors.commune}</p>}
                      </div>
                      <div className="space-y-2">
                        <SmartSelect
                          label={label('Point de départ', 'نقطة الانطلاق')}
                          options={departurePointOptions}
                          value={form.departurePoint}
                          onChange={(v) => handleChange('departurePoint', v)}
                          placeholder={label('Choisir un point...', 'اختر نقطة الانطلاق...')}
                          disabled={!form.daira}
                        />
                        {errors.departurePoint && <p className="text-sm text-red-600">{errors.departurePoint}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <SmartSelect
                        label={label('Méthode de vérification', 'طريقة التحقق')}
                        options={verificationMethodOptions}
                        value={form.verificationMethod}
                        onChange={(v) => handleChange('verificationMethod', v)}
                        placeholder={label('Choisir une méthode...', 'اختر طريقة التحقق...')}
                      />
                      {errors.verificationMethod && <p className="text-sm text-red-600">{errors.verificationMethod}</p>}
                    </div>
                  </>
                )}

                {/* Special Needs Section */}
                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      id="specialNeeds"
                      type="checkbox"
                      checked={form.specialNeeds}
                      onChange={(e) => handleChange('specialNeeds', e.target.checked)}
                      className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <Label htmlFor="specialNeeds" className="text-base font-bold text-slate-900 cursor-pointer">
                      {isAR ? 'أنا من ذوي الاحتياجات الخاصة (خصم 50% + امتيازات)' : 'Je suis une personne à mobilité réduite (Réduction 50% + Privilèges)'}
                    </Label>
                  </div>

                  {form.specialNeeds && (
                    <div className="space-y-4 border-t border-blue-200 pt-4">
                      <div className="space-y-2">
                        <Label>{label('Type de besoin spécial', 'نوع الاحتياج الخاص')}</Label>
                        <select
                          value={form.specialNeedsType}
                          onChange={(e) => handleChange('specialNeedsType', e.target.value)}
                          className="h-12 w-full rounded-xl border border-slate-300 px-3 bg-white"
                        >
                          <option value="">{isAR ? '-- اختر --' : '-- Choisir --'}</option>
                          {SN_TYPES.map((t) => (
                            <option key={t.value} value={t.value}>{isAR ? t.labelAr : t.labelFr}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-900">
                          {isAR ? 'وثيقة تثبت الحالة (إلزامي)' : 'Document attestant le handicap (obligatoire)'}
                        </Label>
                        <p className="text-xs text-slate-500">
                          {isAR ? 'صيغ مقبولة: JPG, PNG, PDF (أقصى 5 ميغابايت)' : 'Formats: JPG, PNG, PDF (max 5 Mo)'}
                        </p>

                        {!form.specialNeedsDocumentUrl ? (
                          <div className="space-y-3">
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                              onChange={handleSnFileChange}
                              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-emerald-600 file:text-white file:font-bold hover:file:bg-emerald-700"
                            />
                            {snFile && (
                              <div className="rounded-xl border border-slate-200 bg-white p-3 flex items-center gap-3">
                                {snPreviewUrl ? (
                                  <img src={snPreviewUrl} alt="" className="w-12 h-12 object-cover rounded-lg" />
                                ) : (
                                  <FileText className="w-8 h-8 text-red-500" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-slate-900 truncate">{snFile.name}</p>
                                  <p className="text-xs text-slate-500">{(snFile.size / 1024).toFixed(0)} KB</p>
                                </div>
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={handleSnUpload}
                                  disabled={snUploading || snCompressing}
                                  className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                                >
                                  {snUploading || snCompressing ? (
                                    <span className="flex items-center gap-1"><Loader2 className="w-4 h-4 animate-spin" /> {snProgress}%</span>
                                  ) : (
                                    <span className="flex items-center gap-1"><Upload className="w-4 h-4" /> {isAR ? 'رفع' : 'Envoyer'}</span>
                                  )}
                                </Button>
                              </div>
                            )}
                            {snCompressing && (
                              <p className="text-xs text-blue-700 font-bold">{isAR ? 'جاري ضغظ الصورة...' : 'Compression en cours...'}</p>
                            )}
                          </div>
                        ) : (
                          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                            <div className="flex-1">
                              <p className="text-sm font-bold text-emerald-800">{isAR ? 'تم رفع الوثيقة بنجاح' : 'Document téléversé avec succès'}</p>
                              <p className="text-xs text-emerald-700">{form.specialNeedsDocumentName}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setForm((prev) => ({ ...prev, specialNeedsDocumentUrl: '', specialNeedsDocumentName: '' }));
                                setSnFile(null);
                                setSnPreviewUrl(null);
                              }}
                              className="text-rose-600 hover:text-rose-800 text-sm font-bold"
                            >
                              {isAR ? 'تغيير' : 'Changer'}
                            </button>
                          </div>
                        )}
                        {errors.specialNeedsDocument && <p className="text-sm text-red-600">{errors.specialNeedsDocument}</p>}
                      </div>
                    </div>
                  )}
                </div>

                {submitError && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-bold">
                    {submitError}
                  </div>
                )}

                <Button type="submit" disabled={submitLoading} className="h-14 w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-lg font-black text-white disabled:opacity-50">
                  {submitLoading ? (isAR ? 'جاري الإنشاء...' : 'Création en cours...') : (isAR ? 'إنشاء الحساب' : 'Créer le compte')}
                </Button>
              </form>
            </Card>
          )}

          {success && (
            <Card className="p-10 text-center border-emerald-200 bg-emerald-50 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-black text-emerald-800">
                {isAR
                  ? 'تم إنشاء حسابك بنجاح حسابك في انتظار التحقق الإداري'
                  : 'Compte créé avec succès, votre compte est en attente de vérification administrative'}
              </h2>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterContent />
    </Suspense>
  );
}