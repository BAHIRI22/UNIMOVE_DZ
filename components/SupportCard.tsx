'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Search, AlertTriangle, Phone, ArrowRight } from 'lucide-react';

interface SupportCardProps {
  icon: React.ReactNode;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  onClick: () => void;
  color?: string;
}

export function SupportCard({ icon, title, titleAr, description, descriptionAr, onClick, color = 'emerald' }: SupportCardProps) {
  const { language } = useLanguage();

  const colorClasses: Record<string, string> = {
    emerald: 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200',
    blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
    orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
    red: 'bg-red-100 text-red-600 hover:bg-red-200',
  };

  return (
    <Card
      onClick={onClick}
      className="p-6 border border-gray-200 cursor-pointer hover:shadow-lg transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClasses[color] || colorClasses.emerald}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg mb-2">
            {language === 'ar' ? titleAr : title}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {language === 'ar' ? descriptionAr : description}
          </p>
          <Button variant="ghost" size="sm" className="text-primary group-hover:underline">
            {language === 'ar' ? 'البدء' : 'Commencer'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
