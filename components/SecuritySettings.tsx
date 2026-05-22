'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Shield, Smartphone, Clock, AlertTriangle, History, LogOut } from 'lucide-react';
import type { SecuritySettings } from '@/types/profile';

interface SecuritySettingsProps {
  settings: SecuritySettings;
  onLogout: () => void;
}

export function SecuritySettings({ settings, onLogout }: SecuritySettingsProps) {
  const { language } = useLanguage();

  return (
    <Card className="p-6 border border-gray-200">
      <div className="space-y-6">
        {/* Phone Verification */}
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-emerald-900 mb-1">
                {language === 'ar' ? 'رقم الهاتف موثق' : 'Numéro de téléphone vérifié'}
              </div>
              <div className="text-sm text-emerald-700">
                {language === 'ar'
                  ? 'تم التحقق من رقم هاتفك عبر OTP'
                  : 'Votre numéro de téléphone a été vérifié par OTP'}
              </div>
            </div>
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Security Options */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            {language === 'ar' ? 'خيارات الأمان' : 'Options de sécurité'}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium text-gray-900">
                    {language === 'ar' ? 'المصادقة الثنائية (قريباً)' : 'Authentification à deux facteurs (bientôt)'}
                  </Label>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'إضافة طبقة أمان إضافية' : 'Ajouter une couche de sécurité supplémentaire'}
                  </p>
                </div>
              </div>
              <Switch checked={settings.twoFactorEnabled} disabled />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium text-gray-900">
                    {language === 'ar' ? 'تنبيهات تسجيل الدخول' : 'Alertes de connexion'}
                  </Label>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'إشعار عند تسجيل الدخول من جهاز جديد' : 'Notification lors de la connexion depuis un nouvel appareil'}
                  </p>
                </div>
              </div>
              <Switch checked={settings.loginAlerts} />
            </div>
          </div>
        </div>

        {/* Session */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {language === 'ar' ? 'الجلسة' : 'Session'}
          </h3>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <div>
                <Label className="font-medium text-gray-900">
                  {language === 'ar' ? 'مهلة انتهاء الجلسة' : 'Délai d\'expiration de session'}
                </Label>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'تسجيل الخروج التلقائي بعد' : 'Déconnexion automatique après'} {settings.sessionTimeout} {language === 'ar' ? 'دقيقة' : 'minutes'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Login History */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <History className="w-5 h-5" />
            {language === 'ar' ? 'سجل تسجيل الدخول' : 'Historique de connexion'}
          </h3>
          <div className="space-y-3">
            {settings.loginHistory.slice(0, 3).map((login) => (
              <div key={login.id} className={`p-4 rounded-xl border ${
                login.successful ? 'bg-white border-gray-200' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{login.device}</div>
                    <div className="text-sm text-gray-600">{login.browser}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {language === 'ar' ? login.locationAr : login.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {new Date(login.loginAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(login.loginAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="pt-4 border-t border-gray-200">
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            {language === 'ar' ? 'تسجيل الخروج' : 'Déconnexion'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
