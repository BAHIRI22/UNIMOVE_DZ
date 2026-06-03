'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import transportData from '@/data/transport-data.json';
import {
  University, Building2, Home, Hospital, Plane, Ship,
  TrainFront, MapPin, Landmark, Bus, Car, DollarSign,
  ChevronLeft, Plus, Edit3, Trash2, Save, X, Link2, Mail, Phone, Globe
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const CATEGORIES = [
  { id: 'universities', labelAr: 'الجامعات', labelFr: 'Universités', icon: University },
  { id: 'udlStructures', labelAr: 'الكليات والمعاهد', labelFr: 'Facultés et Instituts', icon: Building2 },
  { id: 'residences', labelAr: 'الإقامات الجامعية', labelFr: 'Résidences universitaires', icon: Home },
  { id: 'hospitals', labelAr: 'المستشفيات', labelFr: 'Hôpitaux', icon: Hospital },
  { id: 'airports', labelAr: 'المطارات', labelFr: 'Aéroports', icon: Plane },
  { id: 'ports', labelAr: 'الموانئ', labelFr: 'Ports', icon: Ship },
  { id: 'trainStations', labelAr: 'محطات القطار', labelFr: 'Gares ferroviaires', icon: TrainFront },
  { id: 'dairas', labelAr: 'الدوائر', labelFr: 'Daïras', icon: MapPin },
  { id: 'meetingPoints', labelAr: 'نقاط التجمع', labelFr: 'Points de rassemblement', icon: Landmark },
  { id: 'missionTypes', labelAr: 'أنواع المهمات', labelFr: 'Types de missions', icon: Bus },
  { id: 'transportNatures', labelAr: 'طبيعة النقل', labelFr: 'Nature du transport', icon: Car },
  { id: 'pricingRules', labelAr: 'قواعد التسعير', labelFr: 'Règles de tarification', icon: DollarSign },
  { id: 'contactLinks', labelAr: 'روابط التواصل', labelFr: 'Liens de contact', icon: Link2 },
];

export default function DataManagementPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const isAr = language === 'ar';
  const [activeCategory, setActiveCategory] = useState('universities');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const defaultContactLinks = {
    facebook: '',
    instagram: '',
    linkedin: '',
    x: '',
    email: 'support@unimove-dz.dz',
    phone: '+213 (0) 55 70 77 069',
    website: '',
  };

  const [contactLinks, setContactLinks] = useState(defaultContactLinks);
  const [contactLinksLoading, setContactLinksLoading] = useState(false);
  const [contactLinksSaved, setContactLinksSaved] = useState(false);

  useEffect(() => {
    const fetchContactLinks = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'contactLinks'));
        if (snap.exists()) {
          setContactLinks({ ...defaultContactLinks, ...snap.data() });
        }
      } catch (e) {
        console.error('[DataManagement] Error fetching contact links:', e);
      }
    };
    fetchContactLinks();
  }, []);

  const label = (fr: string, ar: string) => (isAr ? ar : fr);

  const getData = () => {
    const key = activeCategory as keyof typeof transportData;
    const data = transportData[key];
    return Array.isArray(data) ? data : [];
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleSave = () => {
    // In a real app, this would update Firestore. For now, we show an alert.
    alert(isAr ? 'سيتم حفظ التغييرات في النظام' : 'Les modifications seront enregistrées dans le système');
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm(isAr ? 'هل أنت متأكد من الحذف؟' : 'Confirmer la suppression ?')) {
      alert(isAr ? 'تم الحذف (وضع العرض التوضيحي)' : 'Supprimé (mode démo)');
    }
  };

  const handleAdd = () => {
    const newId = `new-${Date.now()}`;
    setEditingId(newId);
    setEditForm({ id: newId, nameFr: '', nameAr: '' });
  };

  const handleContactLinkChange = (field: string, value: string) => {
    setContactLinks((prev) => ({ ...prev, [field]: value }));
    setContactLinksSaved(false);
  };

  const handleSaveContactLinks = async () => {
    setContactLinksLoading(true);
    try {
      await setDoc(doc(db, 'settings', 'contactLinks'), {
        ...contactLinks,
        updatedAt: serverTimestamp(),
      });
      setContactLinksSaved(true);
      setTimeout(() => setContactLinksSaved(false), 3000);
    } catch (e) {
      console.error('[DataManagement] Error saving contact links:', e);
      alert(isAr ? 'حدث خطأ أثناء الحفظ' : 'Erreur lors de l\'enregistrement');
    } finally {
      setContactLinksLoading(false);
    }
  };

  const renderContactLinks = () => (
    <Card className="p-6 md:p-8 bg-slate-900 border border-emerald-500/20 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
          <Link2 className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-xl font-black text-emerald-400">{label('Liens de contact & réseaux sociaux', 'روابط التواصل والشبكات الاجتماعية')}</h3>
          <p className="text-sm text-slate-400">{label('Ces liens apparaissent dans le pied de page du site', 'تظهر هذه الروابط في تذييل الموقع')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { field: 'facebook', labelFr: 'Facebook', labelAr: 'فيسبوك', icon: Link2, placeholder: 'https://facebook.com/...' },
          { field: 'instagram', labelFr: 'Instagram', labelAr: 'إنستغرام', icon: Link2, placeholder: 'https://instagram.com/...' },
          { field: 'linkedin', labelFr: 'LinkedIn', labelAr: 'لينكدإن', icon: Link2, placeholder: 'https://linkedin.com/...' },
          { field: 'x', labelFr: 'X (Twitter)', labelAr: 'X (تويتر)', icon: Link2, placeholder: 'https://x.com/...' },
          { field: 'email', labelFr: 'Email', labelAr: 'البريد الإلكتروني', icon: Mail, placeholder: 'contact@unimove-dz.dz' },
          { field: 'phone', labelFr: 'Téléphone', labelAr: 'الهاتف', icon: Phone, placeholder: '+213 (0) 55 70 77 069' },
          { field: 'website', labelFr: 'Site web', labelAr: 'الموقع الإلكتروني', icon: Globe, placeholder: 'https://unimove-dz.vercel.app' },
        ].map((item) => (
          <div key={item.field} className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 text-sm font-bold">
              <item.icon className="w-4 h-4" />
              <span>{isAr ? item.labelAr : item.labelFr}</span>
            </div>
            <input
              type="text"
              value={(contactLinks as any)[item.field] || ''}
              onChange={(e) => handleContactLinkChange(item.field, e.target.value)}
              placeholder={item.placeholder}
              className="bg-slate-800 border border-emerald-500/30 rounded-lg px-3 py-2 text-white w-full text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={handleSaveContactLinks}
          disabled={contactLinksLoading}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 disabled:opacity-60 rounded-xl font-bold transition-colors"
        >
          {contactLinksLoading ? (
            <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {label('Enregistrer', 'حفظ')}
        </button>
        {contactLinksSaved && (
          <span className="text-emerald-400 font-bold text-sm">{label('Enregistré !', 'تم الحفظ!')}</span>
        )}
      </div>
    </Card>
  );

  const renderPricingRules = () => (
    <Card className="p-6 bg-slate-900 border border-emerald-500/20 rounded-2xl">
      <h3 className="text-xl font-black text-emerald-400 mb-4">{label('Règles de tarification', 'قواعد التسعير')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(transportData.pricingRules).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
            <span className="text-slate-300 font-bold text-sm">{key}</span>
            <span className="text-emerald-400 font-black">{typeof value === 'number' ? (value < 1 ? `${Math.round(value * 100)}%` : `${value} DA`) : String(value)}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-amber-300 mt-4">{label('* Modifiable uniquement par le super-administrateur', '* قابل للتعديل فقط من قبل المسؤول الأعلى')}</p>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#031813] text-white p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <img src="/images/logo.png?v=logo-clean" alt="UNIMOVE-DZ Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-4xl font-black">{label('Gestion des données', 'إدارة البيانات')}</h1>
            <p className="text-lg opacity-70 mt-2">{label('Universités, facultés, daïras, communes, aéroports, ports, gares, hôpitaux, résidences, tarifs...', 'جامعات، كليات، دوائر، بلديات، مطارات، موانئ، محطات، مستشفيات، إقامات، تعريفات...')}</p>
          </div>
        </div>
        <button
          onClick={() => router.push('/admin-panel')}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          {label('Retour au Panel', 'العودة للوحة الإدارة')}
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setEditingId(null); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                  : 'border-white/10 hover:border-emerald-500/30 text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{isAr ? cat.labelAr : cat.labelFr}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeCategory === 'pricingRules' ? (
        renderPricingRules()
      ) : activeCategory === 'contactLinks' ? (
        renderContactLinks()
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-emerald-400">
              {isAr ? CATEGORIES.find((c) => c.id === activeCategory)?.labelAr : CATEGORIES.find((c) => c.id === activeCategory)?.labelFr}
            </h2>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-bold text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              {label('Ajouter', 'إضافة')}
            </button>
          </div>

          <div className="bg-black/30 rounded-2xl overflow-x-auto border border-white/5">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-emerald-500/10">
                  <th className="p-4 text-right text-sm font-bold text-emerald-400">ID</th>
                  <th className="p-4 text-right text-sm font-bold text-emerald-400">{label('Nom FR', 'الاسم FR')}</th>
                  <th className="p-4 text-right text-sm font-bold text-emerald-400">{label('Nom AR', 'الاسم AR')}</th>
                  <th className="p-4 text-right text-sm font-bold text-emerald-400">{label('Actions', 'الإجراءات')}</th>
                </tr>
              </thead>
              <tbody>
                {getData().map((item: any) => (
                  <tr key={item.id} className="border-b border-white/5">
                    <td className="p-4 text-sm font-mono text-slate-400">{item.id}</td>
                    <td className="p-4 text-sm text-white">
                      {editingId === item.id ? (
                        <input
                          value={editForm.nameFr || ''}
                          onChange={(e) => setEditForm({ ...editForm, nameFr: e.target.value })}
                          className="bg-slate-800 border border-emerald-500/30 rounded-lg px-3 py-2 text-white w-full"
                        />
                      ) : (
                        item.nameFr || '-'
                      )}
                    </td>
                    <td className="p-4 text-sm text-white">
                      {editingId === item.id ? (
                        <input
                          value={editForm.nameAr || ''}
                          onChange={(e) => setEditForm({ ...editForm, nameAr: e.target.value })}
                          className="bg-slate-800 border border-emerald-500/30 rounded-lg px-3 py-2 text-white w-full"
                        />
                      ) : (
                        item.nameAr || '-'
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {editingId === item.id ? (
                          <>
                            <button onClick={handleSave} className="p-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
                              <Save className="w-4 h-4" />
                            </button>
                            <button onClick={() => setEditingId(null)} className="p-2 bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEdit(item)} className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {getData().length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      {label('Aucune donnée disponible', 'لا توجد بيانات')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
