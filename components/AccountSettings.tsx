'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Mail, MessageSquare, Moon, Eye, EyeOff, Globe, Save } from 'lucide-react';
import type { AccountSettings } from '@/types/profile';

interface AccountSettingsProps {
  settings: AccountSettings;
  onSave: (settings: AccountSettings) => void;
}

export function AccountSettings({ settings, onSave }: AccountSettingsProps) {
  const { language } = useLanguage();
  const [localSettings, setLocalSettings] = useState(settings);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Save to localStorage
    localStorage.setItem('accountSettings', JSON.stringify(localSettings));

    setLoading(false);
    onSave(localSettings);
  };

  const handleToggle = (field: keyof AccountSettings) => {
    setLocalSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Card className="p-6 border border-gray-200">
      <div className="space-y-6">
        {/* Language */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <Label className="font-medium text-gray-900">
                {language === 'ar' ? 'اللغة المفضلة' : 'Langue préférée'}
              </Label>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'اختر لغة التطبيق' : 'Choisir la langue de l\'application'}
              </p>
            </div>
          </div>
          <Select
            value={localSettings.preferredLanguage}
            onValueChange={(value: 'ar' | 'fr') => setLocalSettings(prev => ({ ...prev, preferredLanguage: value }))}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            {language === 'ar' ? 'الإشعارات' : 'Notifications'}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium text-gray-900">
                    {language === 'ar' ? 'إشعارات التطبيق' : 'Notifications de l\'application'}
                  </Label>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'تلقي إشعارات داخل التطبيق' : 'Recevoir des notifications dans l\'application'}
                  </p>
                </div>
              </div>
              <Switch
                checked={localSettings.notificationsEnabled}
                onCheckedChange={() => handleToggle('notificationsEnabled')}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium text-gray-900">
                    {language === 'ar' ? 'إشعارات البريد الإلكتروني' : 'Notifications par email'}
                  </Label>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'تلقي إشعارات عبر البريد الإلكتروني' : 'Recevoir des notifications par email'}
                  </p>
                </div>
              </div>
              <Switch
                checked={localSettings.emailNotifications}
                onCheckedChange={() => handleToggle('emailNotifications')}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium text-gray-900">
                    {language === 'ar' ? 'إشعارات SMS' : 'Notifications SMS'}
                  </Label>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'تلقي إشعارات عبر SMS' : 'Recevoir des notifications par SMS'}
                  </p>
                </div>
              </div>
              <Switch
                checked={localSettings.smsNotifications}
                onCheckedChange={() => handleToggle('smsNotifications')}
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5" />
            {language === 'ar' ? 'المظهر' : 'Apparence'}
          </h3>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-gray-600" />
              <div>
                <Label className="font-medium text-gray-900">
                  {language === 'ar' ? 'الوضع الداكن' : 'Mode sombre'}
                </Label>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'تفعيل الوضع الداكن (قريباً)' : 'Activer le mode sombre (bientôt)'}
                </p>
              </div>
            </div>
            <Switch
              checked={localSettings.darkMode}
              onCheckedChange={() => handleToggle('darkMode')}
              disabled
            />
          </div>
        </div>

        {/* Privacy */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            {language === 'ar' ? 'الخصوصية' : 'Confidentialité'}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium text-gray-900">
                    {language === 'ar' ? 'ملف التعريف العام' : 'Profil public'}
                  </Label>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'جعل ملف التعريف مرئياً للآخرين' : 'Rendre le profil visible aux autres'}
                  </p>
                </div>
              </div>
              <Switch
                checked={localSettings.privacyProfileVisible}
                onCheckedChange={() => handleToggle('privacyProfileVisible')}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <EyeOff className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium text-gray-900">
                    {language === 'ar' ? 'إخفاء رقم الهاتف' : 'Masquer le téléphone'}
                  </Label>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'إخفاء رقم الهاتف من الآخرين' : 'Masquer le numéro de téléphone aux autres'}
                  </p>
                </div>
              </div>
              <Switch
                checked={localSettings.privacyPhoneVisible}
                onCheckedChange={() => handleToggle('privacyPhoneVisible')}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <EyeOff className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium text-gray-900">
                    {language === 'ar' ? 'إخفاء البريد الإلكتروني' : 'Masquer l\'email'}
                  </Label>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'إخفاء البريد الإلكتروني من الآخرين' : 'Masquer l\'email aux autres'}
                  </p>
                </div>
              </div>
              <Switch
                checked={localSettings.privacyEmailVisible}
                onCheckedChange={() => handleToggle('privacyEmailVisible')}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="w-full bg-primary hover:bg-secondary text-white flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {language === 'ar' ? 'جاري الحفظ...' : 'Enregistrement...'}
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {language === 'ar' ? 'حفظ الإعدادات' : 'Enregistrer les paramètres'}
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
