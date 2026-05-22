'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ComplaintForm } from '@/components/ComplaintForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Complaint } from '@/types/support';

export default function ComplaintsPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Load complaints from localStorage
    const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    setComplaints(storedComplaints);
  }, []);

  const handleComplaintSubmit = (complaint: Complaint) => {
    setComplaints([...complaints, complaint]);
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in_progress':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, Record<string, string>> = {
      ar: {
        new: 'جديد',
        in_progress: 'قيد المعالجة',
        resolved: 'تم الحل',
        rejected: 'مرفوض',
      },
      fr: {
        new: 'Nouveau',
        in_progress: 'En cours',
        resolved: 'Résolu',
        rejected: 'Rejeté',
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
              {language === 'ar' ? 'الشكاوى' : 'Réclamations'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'إدارة ومتابعة شكواك'
                : 'Gérer et suivre vos réclamations'}
            </p>
          </div>
        </div>

        {showForm ? (
          <ComplaintForm
            onSubmit={handleComplaintSubmit}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <>
            {/* New Complaint Button */}
            <Button
              onClick={() => setShowForm(true)}
              className="w-full h-12 bg-primary hover:bg-secondary text-white flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              {language === 'ar' ? 'تقديم شكوى جديدة' : 'Nouvelle réclamation'}
            </Button>

            {/* Complaints List */}
            {complaints.length === 0 ? (
              <Card className="p-12 border border-gray-200 text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {language === 'ar' ? 'لا توجد شكاوى' : 'Aucune réclamation'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar'
                    ? 'لم تقم بتقديم أي شكوى بعد'
                    : 'Vous n\'avez pas encore soumis de réclamation'}
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <Card key={complaint.id} className="p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-sm text-gray-600">
                            #{complaint.ticketNumber}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
                            {getStatusLabel(complaint.status)}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900">{complaint.subject}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{complaint.description}</p>
                    {complaint.resolution && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-900">
                            {language === 'ar' ? 'الحل:' : 'Résolution:'}
                          </span>
                        </div>
                        <p className="text-sm text-green-800">{complaint.resolution}</p>
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
