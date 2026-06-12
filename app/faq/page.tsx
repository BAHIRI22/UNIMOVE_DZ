'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  questionAr: string;
  questionFr: string;
  answerAr: string;
  answerFr: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    questionAr: 'كيف أحجز رحلة؟',
    questionFr: 'Comment réserver un trajet ?',
    answerAr: 'يمكنك حجز رحلة من خلال الانتقال إلى صفحة الحجز، اختيار نقطة الانطلاق والوجهة، تحديد التاريخ والوقت، ثم تأكيد الحجز. يمكنك الدفع باستخدام اشتراكك النشط أو الدفع نقداً.',
    answerFr: 'Vous pouvez réserver un trajet en allant sur la page de réservation, en choisissant le point de départ et la destination, en sélectionnant la date et l\'heure, puis en confirmant la réservation. Vous pouvez payer avec votre abonnement actif ou en espèces.',
  },
  {
    id: '2',
    questionAr: 'كيف أدفع الاشتراك؟',
    questionFr: 'Comment payer l\'abonnement ?',
    answerAr: 'انتقل إلى صفحة الاشتراكات، اختر الخطة المناسبة (يومي، أسبوعي، شهري، فصلي، سنوي)، ثم اضغط على "تأكيد الدفع التجريبي" لتفعيل اشتراكك.',
    answerFr: 'Allez sur la page des abonnements, choisissez le plan approprié (journalier, hebdomadaire, mensuel, semestriel, annuel), puis cliquez sur "Confirmer le paiement de démonstration" pour activer votre abonnement.',
  },
  {
    id: '3',
    questionAr: 'ماذا أفعل إذا فاتتني الحافلة؟',
    questionFr: 'Que faire si je rate le bus ?',
    answerAr: 'إذا فاتتك الحافلة، يمكنك حجز رحلة أخرى في نفس اليوم إذا كانت المقاعد متاحة. يمكنك أيضاً الاتصال بخدمة العملاء للمساعدة.',
    answerFr: 'Si vous ratez le bus, vous pouvez réserver un autre trajet le même jour si des places sont disponibles. Vous pouvez également contacter le service client pour obtenir de l\'aide.',
  },
  {
    id: '4',
    questionAr: 'كيف أسترجع المبلغ؟',
    questionFr: 'Comment obtenir un remboursement ?',
    answerAr: 'للاسترداد، تواصل مع المشرف من خلال صفحة الدعم أو إرسال شكوى. سيتم مراجعة طلبك والرد عليك في أقرب وقت ممكن.',
    answerFr: 'Pour un remboursement, contactez l\'administrateur via la page de support ou en soumettant une réclamation. Votre demande sera examinée et vous recevrez une réponse dès que possible.',
  },
  {
    id: '5',
    questionAr: 'كيف أتابع الرحلة مباشرة؟',
    questionFr: 'Comment suivre le trajet en direct ?',
    answerAr: 'بعد تأكيد الحجز، يمكنك تتبع موقع الحافلة في الوقت الفعلي من خلال صفحة "تتبع الرحلة" أو من خلال بطاقة الحجز الخاصة بك.',
    answerFr: 'Après confirmation de la réservation, vous pouvez suivre la position du bus en temps réel via la page "Suivi du trajet" ou depuis votre carte de réservation.',
  },
  {
    id: '6',
    questionAr: 'كيف أتحقق من صلاحية اشتراكي؟',
    questionFr: 'Comment vérifier la validité de mon abonnement ?',
    answerAr: 'يمكنك التحقق من صلاحية اشتراكك من لوحة التحكم الرئيسية أو من بطاقة العضوية الرقمية. سيتم عرض تاريخ انتهاء الصلاحية وحالة الاشتراك.',
    answerFr: 'Vous pouvez vérifier la validité de votre abonnement depuis le tableau de bord principal ou votre carte d\'adhésion numérique. La date d\'expiration et le statut de l\'abonnement seront affichés.',
  },
];

export default function FAQPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <DashboardLayout role="user">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
          </h1>
          <p className="text-gray-600">
            {isAr ? 'إجابات على الأسئلة الأكثر شيوعاً' : 'Réponses aux questions les plus fréquentes'}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item) => (
            <Card key={item.id} className="border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 flex-1">
                  {isAr ? item.questionAr : item.questionFr}
                </span>
                {expandedItems.has(item.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 ml-4" />
                )}
              </button>
              {expandedItems.has(item.id) && (
                <div className="px-6 pb-4 pt-0">
                  <p className="text-gray-600 leading-relaxed">
                    {isAr ? item.answerAr : item.answerFr}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <Card className="p-6 border border-gray-200 bg-primary/5">
          <div className="text-center">
            <h3 className="font-bold text-gray-900 mb-2">
              {isAr ? 'لم تجد إجابتك؟' : 'Vous n\'avez pas trouvé votre réponse ?'}
            </h3>
            <p className="text-gray-600 mb-4">
              {isAr ? 'تواصل معنا وسنكون سعداء بمساعدتك' : 'Contactez-nous et nous serons heureux de vous aider'}
            </p>
            <a
              href="/support"
              className="inline-block px-6 py-2 bg-primary hover:bg-secondary text-white rounded-lg font-medium transition-colors"
            >
              {isAr ? 'تواصل مع الدعم' : 'Contacter le support'}
            </a>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
