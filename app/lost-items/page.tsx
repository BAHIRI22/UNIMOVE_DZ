'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { LostItemForm } from '@/components/LostItemForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LostItem } from '@/types/support';

export default function LostItemsPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Load lost items from localStorage
    const storedItems = JSON.parse(localStorage.getItem('lostItems') || '[]');
    setLostItems(storedItems);
  }, []);

  const handleItemSubmit = (item: LostItem) => {
    setLostItems([...lostItems, item]);
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'found':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'returned':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'unclaimed':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, Record<string, string>> = {
      ar: {
        reported: 'تم الإبلاغ',
        found: 'تم العثور',
        returned: 'تم الإرجاع',
        unclaimed: 'غير مطالب به',
      },
      fr: {
        reported: 'Signalé',
        found: 'Trouvé',
        returned: 'Retourné',
        unclaimed: 'Non réclamé',
      },
    };
    return labels[language]?.[status] || status;
  };

  return (
    <DashboardLayout role="user">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/support')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'ar' ? 'رجوع' : 'Retour'}
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'المفقودات' : 'Objets perdus'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'الإبلاغ عن ومتابعة المفقودات'
                : 'Signaler et suivre les objets perdus'}
            </p>
          </div>
        </div>

        {showForm ? (
          <LostItemForm
            onSubmit={handleItemSubmit}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <>
            {/* New Item Button */}
            <Button
              onClick={() => setShowForm(true)}
              className="w-full h-12 bg-primary hover:bg-secondary text-white flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              {language === 'ar' ? 'الإبلاغ عن مفقود' : 'Signaler un objet perdu'}
            </Button>

            {/* Lost Items List */}
            {lostItems.length === 0 ? (
              <Card className="p-12 border border-gray-200 text-center">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {language === 'ar' ? 'لا توجد مفقودات' : 'Aucun objet perdu'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar'
                    ? 'لم تقم بالإبلاغ عن أي مفقود بعد'
                    : 'Vous n\'avez pas encore signalé d\'objet perdu'}
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {lostItems.map((item) => (
                  <Card key={item.id} className="p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-sm text-gray-600">
                            #{item.ticketNumber}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                            {getStatusLabel(item.status)}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900">{item.itemType}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                    {item.status === 'found' && (
                      <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-900">
                            {language === 'ar' ? 'تم العثور على المفقود!' : 'Objet trouvé!'}
                          </span>
                        </div>
                        <p className="text-sm text-green-800 mt-2">
                          {language === 'ar'
                            ? 'يرجى زيارة مكتب UNIMOVE-DZ لاستلامه'
                            : 'Veuillez visiter le bureau UNIMOVE-DZ pour le récupérer'}
                        </p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
