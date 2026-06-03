'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Phone, AlertTriangle, CheckCircle, MapPin, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { EmergencyType } from '@/types/support';
import { emergencyTypes, generateTicketNumber } from '@/mock/support-data';

export default function EmergencyPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [type, setType] = useState<EmergencyType | ''>('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const emergencyRequest = {
      id: Date.now().toString(),
      ticketNumber: generateTicketNumber('EMER'),
      type,
      description,
      location,
      status: 'pending',
      priority: 'urgent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingEmergencies = JSON.parse(localStorage.getItem('emergencies') || '[]');
    existingEmergencies.push(emergencyRequest);
    localStorage.setItem('emergencies', JSON.stringify(existingEmergencies));

    setTicketNumber(emergencyRequest.ticketNumber);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const handleCallEmergency = () => {
    window.open('tel:0550000000');
  };

  if (submitted) {
    return (
      <DashboardLayout role="user">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 border border-gray-200 bg-emerald-50">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {language === 'ar' ? 'تم إرسال طلب المساعدة' : 'Demande d\'aide envoyée'}
              </h1>
              <p className="text-gray-600">
                {language === 'ar'
                  ? 'رقم التذكرة:'
                  : 'Numéro de ticket:'}{' '}
                <span className="font-bold text-xl">{ticketNumber}</span>
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">
                    {language === 'ar' ? 'اتصل بالطوارئ' : 'Appeler les urgences'}
                  </h3>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  {language === 'ar'
                    ? 'إذا كانت الحالة حرجة، اتصل فوراً:'
                    : 'Si la situation est critique, appelez immédiatement:'}
                </p>
                <Button
                  onClick={handleCallEmergency}
                  className="w-full bg-red-600 hover:bg-red-700 text-white h-12"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  0550 00 00 00
                </Button>
              </div>
              <Button
                onClick={() => router.push('/support')}
                variant="outline"
                className="w-full"
              >
                {language === 'ar' ? 'العودة للدعم' : 'Retour au support'}
              </Button>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="user">
      <div className="max-w-2xl mx-auto space-y-8">
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
            <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
              {language === 'ar' ? 'مساعدة عاجلة' : 'Aide urgente'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'طلب مساعدة فورية للحالات الطارئة'
                : 'Demande d\'aide immédiate pour les situations d\'urgence'}
            </p>
          </div>
        </div>

        {/* Emergency Call Button */}
        <Card className="p-6 border-2 border-red-200 bg-red-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {language === 'ar' ? 'اتصل بالطوارئ' : 'Appeler les urgences'}
                </h3>
                <p className="text-sm text-gray-600">0550 00 00 00</p>
              </div>
            </div>
            <Button
              onClick={handleCallEmergency}
              className="bg-red-600 hover:bg-red-700 text-white h-12"
            >
              <Phone className="w-5 h-5 mr-2" />
              {language === 'ar' ? 'اتصل الآن' : 'Appeler maintenant'}
            </Button>
          </div>
        </Card>

        {/* Emergency Form */}
        <Card className="p-6 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="type">
                {language === 'ar' ? 'نوع الطوارئ' : 'Type d\'urgence'}
              </Label>
              <Select value={type} onValueChange={(value: EmergencyType) => setType(value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder={language === 'ar' ? 'اختر النوع' : 'Choisir le type'} />
                </SelectTrigger>
                <SelectContent>
                  {emergencyTypes.map((emergency) => (
                    <SelectItem key={emergency.value} value={emergency.value}>
                      {language === 'ar' ? emergency.labelAr : emergency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">
                {language === 'ar' ? 'الوصف' : 'Description'}
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={language === 'ar' ? 'صف الموقف بالتفصيل...' : 'Décrivez la situation en détail...'}
                className="mt-2 min-h-32"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">
                {language === 'ar' ? 'الموقع' : 'Emplacement'}
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={language === 'ar' ? 'مثال: حافلة 12345، جامعة...' : 'Ex: Bus 12345, université...'}
                className="mt-2"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {language === 'ar' ? 'جاري الإرسال...' : 'Envoi...'}
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  {language === 'ar' ? 'إرسال طلب المساعدة' : 'Envoyer demande d\'aide'}
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Info */}
        <Card className="p-6 border border-gray-200 bg-orange-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                {language === 'ar' ? 'مهم جداً' : 'Très important'}
              </h3>
              <p className="text-sm text-gray-700">
                {language === 'ar'
                  ? 'هذا النظام مخصص للحالات الطارئة فقط. إذا كانت الحالة ليست طارئة، يرجى استخدام قسم الشكاوى.'
                  : 'Ce système est destiné uniquement aux situations d\'urgence. Si la situation n\'est pas urgente, veuillez utiliser la section des réclamations.'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
