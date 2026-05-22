'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Sparkles } from 'lucide-react';

interface DemoModeBannerProps {
  onStartDemo: () => void;
}

export function DemoModeBanner({ onStartDemo }: DemoModeBannerProps) {
  const { language } = useLanguage();

  return (
    <Card className="p-8 border-2 border-primary bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {language === 'ar' ? 'وضع العرض التوضيحي' : 'Mode Démonstration'}
            </h2>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'جاهز لتقديم المشروع أمام اللجنة'
                : 'Prêt à présenter le projet devant le jury'}
            </p>
          </div>
        </div>
        <Button
          onClick={onStartDemo}
          className="h-14 px-8 bg-primary hover:bg-secondary text-white flex items-center gap-2 text-lg"
        >
          <Play className="w-6 h-6" />
          {language === 'ar' ? 'بدء العرض' : 'Démarrer la présentation'}
        </Button>
      </div>
    </Card>
  );
}
