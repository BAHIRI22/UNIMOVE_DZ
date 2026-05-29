'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { db } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Upload, FileCheck2, Loader2, CheckCircle2, FileText, ImageIcon, X } from 'lucide-react';
import { compressImageToMaxSize } from '@/lib/imageCompression';

const DOC_OPTIONS_AR = [
  { value: 'student_card', label: 'بطاقة الطالب' },
  { value: 'professional_badge', label: 'الشارة المهنية' },
  { value: 'school_certificate', label: 'شهادة مدرسية' },
  { value: 'work_card', label: 'بطاقة العمل' },
];

const DOC_OPTIONS_FR = [
  { value: 'student_card', label: 'Carte étudiant' },
  { value: 'professional_badge', label: 'Badge professionnel' },
  { value: 'school_certificate', label: 'Certificat de scolarité' },
  { value: 'work_card', label: 'Carte de travail' },
];

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

interface CloudinaryUploadResponse {
  secure_url?: string;
  public_id?: string;
  resource_type?: string;
  format?: string;
  bytes?: number;
  error?: { message?: string };
}

export function VerificationUpload() {
  const { user } = useAuth();
  const { language, isRTL } = useLanguage();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [docType, setDocType] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);

  const options = language === 'ar' ? DOC_OPTIONS_AR : DOC_OPTIONS_FR;

  const isPending =
    (user as any)?.verificationStatus === 'pending' ||
    (user as any)?.verificationSubmittedAt ||
    user?.status === 'pending';
  const isRejected = user?.status === 'rejected' || (user as any)?.verificationStatus === 'rejected';

  useEffect(() => {
    if (!file || !file.type.startsWith('image/')) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleSelectedFile = (selectedFile?: File) => {
    setError('');
    setDone(false);
    setProgress(0);
    setCompressing(false);
    setOriginalSize(0);
    setCompressedSize(0);
    if (!selectedFile) {
      setFile(null);
      return;
    }
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError(language === 'ar' ? 'صيغة غير مدعومة (jpg, png, pdf فقط)' : 'Format non supporté (jpg, png, pdf uniquement)');
      return;
    }
    // PDF: must be <= 5MB directly (no compression for PDF)
    if (selectedFile.type === 'application/pdf' && selectedFile.size > MAX_SIZE) {
      setError(
        language === 'ar'
          ? 'حجم ملف PDF كبير. يرجى اختيار ملف أقل من 5MB'
          : 'Fichier PDF trop volumineux. Veuillez choisir un fichier de moins de 5 Mo'
      );
      return;
    }
    setOriginalSize(selectedFile.size);
    setFile(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectedFile(e.target.files?.[0]);
    e.target.value = '';
  };

  const uploadToCloudinary = async (selectedFile: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary configuration is missing');
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', uploadPreset);

    return new Promise<CloudinaryUploadResponse>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress(Math.min(99, Math.round((event.loaded / event.total) * 100)));
        }
      };

      xhr.onload = () => {
        let response: CloudinaryUploadResponse = {};
        try {
          response = JSON.parse(xhr.responseText);
        } catch (parseError) {
          reject(parseError);
          return;
        }

        if (xhr.status >= 200 && xhr.status < 300 && response.secure_url) {
          setProgress(100);
          resolve(response);
          return;
        }

        reject(new Error(response.error?.message || 'Cloudinary upload failed'));
      };

      xhr.onerror = () => reject(new Error('Cloudinary upload failed'));
      xhr.send(formData);
    });
  };

  const syncLocalUser = (updates: Record<string, any>) => {
    if (typeof window === 'undefined') return;

    const keys = ['unimove_current_user'];
    if (user?.phoneNumber) keys.push(`user_${user.phoneNumber}`);
    if (user?.phone) keys.push(`user_${user.phone}`);

    keys.forEach((key) => {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      try {
        localStorage.setItem(key, JSON.stringify({ ...JSON.parse(raw), ...updates }));
      } catch (e) {}
    });
  };

  const handleUpload = async () => {
    if (!user?.id) {
      setError(language === 'ar' ? 'المستخدم غير معروف' : 'Utilisateur inconnu');
      return;
    }
    if (!docType) {
      setError(language === 'ar' ? 'اختر نوع الوثيقة' : 'Choisissez le type de document');
      return;
    }
    if (!file) {
      setError(language === 'ar' ? 'اختر ملفًا' : 'Choisissez un fichier');
      return;
    }

    setUploading(true);
    setError('');
    setProgress(0);

    let fileToUpload = file;

    try {
      // Compress images before upload
      if (file.type.startsWith('image/')) {
        setCompressing(true);
        console.log('[VerificationUpload] Original file size:', file.size, 'bytes');
        fileToUpload = await compressImageToMaxSize(file, 5);
        setCompressing(false);
        setCompressedSize(fileToUpload.size);
        console.log('[VerificationUpload] Compressed file size:', fileToUpload.size, 'bytes');

        if (fileToUpload.size > MAX_SIZE) {
          setError(
            language === 'ar'
              ? 'تعذر ضغط الصورة إلى أقل من 5MB، يرجى اختيار صورة أوضح وأصغر'
              : 'Impossible de compresser l\'image à moins de 5 Mo. Veuillez choisir une image plus claire et plus petite'
          );
          setUploading(false);
          return;
        }
      }

      const cloudinaryResponse = await uploadToCloudinary(fileToUpload);
      const secureUrl = cloudinaryResponse.secure_url;

      if (!secureUrl) {
        throw new Error('Cloudinary secure_url is missing');
      }

      console.log('[VerificationUpload] Cloudinary upload success URL:', secureUrl);

      await updateDoc(doc(db, 'users', user.id), {
        verificationDocumentUrl: secureUrl,
        verificationDocumentType: docType,
        verificationDocumentName: fileToUpload.name,
        verificationDocumentMimeType: fileToUpload.type,
        verificationDocumentCloudinaryPublicId: cloudinaryResponse.public_id || '',
        verificationSubmittedAt: serverTimestamp(),
        verificationStatus: 'pending',
        status: 'pending',
        accountStatus: 'pending',
        verified: false,
        adminNote: '',
      });

      syncLocalUser({
        verificationDocumentUrl: secureUrl,
        verificationDocumentType: docType,
        verificationDocumentName: fileToUpload.name,
        verificationDocumentMimeType: fileToUpload.type,
        verificationDocumentCloudinaryPublicId: cloudinaryResponse.public_id || '',
        verificationSubmittedAt: new Date().toISOString(),
        verificationStatus: 'pending',
        status: 'pending',
        accountStatus: 'pending',
        verified: false,
        adminNote: '',
      });

      setDone(true);
    } catch (e: any) {
      console.error('[VerificationUpload] error:', e);
      setError(
        e?.message === 'Cloudinary configuration is missing'
          ? language === 'ar'
            ? 'إعدادات Cloudinary غير مكتملة'
            : 'Configuration Cloudinary incomplète'
          : language === 'ar'
          ? 'تعذر رفع الملف. حاول مرة أخرى'
          : 'Échec du téléchargement. Réessayez'
      );
    } finally {
      setUploading(false);
      setCompressing(false);
    }
  };

  return (
    <Card className="p-8 border border-amber-200 bg-amber-50 rounded-3xl shadow-xl" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <ShieldAlert className="w-7 h-7 text-amber-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-1">
            {language === 'ar' ? 'التحقق مطلوب' : 'Vérification requise'}
          </h3>
          <p className="text-slate-700">
            {language === 'ar'
              ? 'يرجى رفع وثيقة تثبت انتماءك للجامعة'
              : 'Veuillez téléverser un document prouvant votre affiliation'}
          </p>
          {isRejected && (user as any)?.adminNote && (
            <p className="mt-2 text-rose-700 text-sm font-bold">
              {language === 'ar' ? 'سبب الرفض: ' : 'Motif du refus : '}
              {(user as any).adminNote}
            </p>
          )}
          {isPending && !isRejected && (user as any)?.verificationDocumentUrl && (
            <p className="mt-2 text-amber-800 text-sm font-bold">
              {language === 'ar' ? 'تم استلام الوثيقة، في انتظار الموافقة...' : 'Document reçu, en attente d\'approbation...'}
            </p>
          )}
        </div>
      </div>

      <Button
        onClick={() => setModalOpen(true)}
        className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base"
      >
        <Upload className="w-5 h-5" />
        {language === 'ar' ? 'رفع وثيقة' : 'Téléverser document'}
      </Button>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  {language === 'ar' ? 'رفع وثيقة التحقق' : 'Téléversement du document'}
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {language === 'ar' ? 'الصيغ المقبولة: JPG, PNG, PDF' : 'Formats acceptés : JPG, PNG, PDF'}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {done ? (
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                      {language === 'ar' ? 'تم إرسال الوثيقة بنجاح' : 'Document envoyé avec succès'}
                    </h3>
                    <p className="text-slate-600">
                      {language === 'ar'
                        ? 'حسابك قيد المراجعة من طرف الإدارة.'
                        : 'Votre compte est en cours d\'examen par l\'administration.'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    {language === 'ar' ? 'نوع الوثيقة' : 'Type de document'}
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full h-12 rounded-xl border border-slate-300 bg-white px-4 text-base font-semibold focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="">{language === 'ar' ? '-- اختر --' : '-- Choisir --'}</option>
                    {options.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(event) => {
                    event.preventDefault();
                    setIsDragging(false);
                    handleSelectedFile(event.dataTransfer.files?.[0]);
                  }}
                  className={`rounded-3xl border-2 border-dashed p-8 text-center transition ${
                    isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-slate-50'
                  }`}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Upload className="h-8 w-8" />
                  </div>
                  <p className="text-lg font-black text-slate-900">
                    {language === 'ar' ? 'اسحب الملف هنا أو اختره من جهازك' : 'Glissez le fichier ici ou sélectionnez-le'}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    {language === 'ar' ? 'الحجم الأقصى 5 ميغابايت' : 'Taille maximale 5 Mo'}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => inputRef.current?.click()}
                    className="mt-5 h-11 rounded-xl border-2 border-emerald-200 px-6 font-bold text-emerald-700 hover:bg-emerald-50"
                  >
                    {language === 'ar' ? 'اختيار ملف' : 'Choisir un fichier'}
                  </Button>
                </div>

                {file && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                        {previewUrl ? (
                          <img src={previewUrl} alt={file.name} className="h-full w-full object-cover" />
                        ) : (
                          <FileText className="h-8 w-8 text-red-500" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 truncate text-sm font-black text-slate-900">
                          {previewUrl ? <ImageIcon className="h-4 w-4 text-emerald-600" /> : <FileText className="h-4 w-4 text-red-500" />}
                          {file.name}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {(file.size / 1024).toFixed(0)} KB
                        </p>
                      </div>
                      <FileCheck2 className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                )}

                {compressing && (
                  <div className="flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <p className="text-sm font-bold text-blue-800">
                      {language === 'ar' ? 'جاري ضغط الصورة...' : 'Compression de l\'image en cours...'}
                    </p>
                  </div>
                )}

                {!compressing && compressedSize > 0 && file?.type.startsWith('image/') && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-sm font-bold text-emerald-800 mb-1">
                      {language === 'ar' ? 'تم ضغط الصورة بنجاح' : 'Image compressée avec succès'}
                    </p>
                    <div className="flex gap-4 text-xs font-semibold text-emerald-700">
                      <span>
                        {language === 'ar' ? 'الحجم الأصلي:' : 'Taille originale :'} {(originalSize / 1024).toFixed(0)} KB
                      </span>
                      <span>
                        {language === 'ar' ? 'الحجم بعد الضغط:' : 'Taille compressée :'} {(compressedSize / 1024).toFixed(0)} KB
                      </span>
                    </div>
                  </div>
                )}

                {uploading && (
                  <div className="space-y-2">
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="text-sm font-bold text-slate-600">{progress}%</p>
                  </div>
                )}

                {error && <p className="text-rose-600 text-sm font-bold">{error}</p>}

                <Button
                  onClick={handleUpload}
                  disabled={uploading || compressing || !file || !docType}
                  className="h-12 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base"
                >
                  {uploading || compressing ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" />{language === 'ar' ? 'جاري الرفع...' : 'Envoi en cours...'}</span>
                  ) : (
                    <span className="flex items-center gap-2"><Upload className="w-5 h-5" />{language === 'ar' ? 'رفع وثيقة التحقق' : 'Téléverser le document'}</span>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
