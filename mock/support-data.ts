import { Complaint, LostItem, EmergencyRequest } from '@/types/support';

export const complaintCategories = [
  { value: 'delay', label: 'Delay', labelAr: 'تأخير' },
  { value: 'cancellation', label: 'Cancellation', labelAr: 'إلغاء' },
  { value: 'payment', label: 'Payment Issue', labelAr: 'مشكلة دفع' },
  { value: 'driver', label: 'Driver Issue', labelAr: 'مشكلة سائق' },
  { value: 'vehicle', label: 'Vehicle Issue', labelAr: 'مشكلة مركبة' },
  { value: 'security', label: 'Security Issue', labelAr: 'مشكلة أمنية' },
  { value: 'lost_item', label: 'Lost Item', labelAr: 'مفقود' },
  { value: 'other', label: 'Other', labelAr: 'أخرى' },
];

export const emergencyTypes = [
  { value: 'medical', label: 'Medical Emergency', labelAr: 'طوارئ طبية' },
  { value: 'accident', label: 'Accident', labelAr: 'حادث' },
  { value: 'harassment', label: 'Harassment', labelAr: 'تحرش' },
  { value: 'security', label: 'Security Threat', labelAr: 'تهديد أمني' },
  { value: 'other', label: 'Other Emergency', labelAr: 'طوارئ أخرى' },
];

export const mockComplaints: Complaint[] = [
  {
    id: 'comp-001',
    ticketNumber: 'SUP-ABC123',
    userId: 'user-001',
    userName: 'Ahmed Benali',
    userNameAr: 'أحمد بن علي',
    category: 'delay',
    categoryAr: 'تأخير',
    subject: 'Bus was 20 minutes late',
    subjectAr: 'تأخر الحافلة 20 دقيقة',
    description: 'The bus scheduled for 8:00 AM arrived at 8:20 AM, causing me to miss my class.',
    descriptionAr: 'الحافلة المقررة الساعة 8:00 وصلت الساعة 8:20، مما جعلني أفوت درسي.',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2026-05-15T08:30:00Z',
    updatedAt: '2026-05-16T10:00:00Z',
    resolvedAt: '2026-05-16T10:00:00Z',
    resolution: 'We apologize for the delay. The driver has been notified and we have implemented better scheduling.',
    resolutionAr: 'نعتذر عن التأخير. تم إبلاغ السائق وقد قمنا بتنفيذ جدولة أفضل.',
  },
  {
    id: 'comp-002',
    ticketNumber: 'SUP-DEF456',
    userId: 'user-002',
    userName: 'Fatima Zerhouni',
    userNameAr: 'فاطمة زرهوني',
    category: 'driver',
    categoryAr: 'مشكلة سائق',
    subject: 'Driver was rude',
    subjectAr: 'السائق كان غير مهذب',
    description: 'The driver was very rude and refused to help with my luggage.',
    descriptionAr: 'كان السائق غير مهذب جداً ورفض المساعدة في أمتعتي.',
    status: 'in_progress',
    priority: 'high',
    driverId: 'driver-001',
    createdAt: '2026-05-18T14:00:00Z',
    updatedAt: '2026-05-19T09:00:00Z',
  },
];

export const mockLostItems: LostItem[] = [
  {
    id: 'lost-001',
    ticketNumber: 'LOST-XYZ789',
    userId: 'user-003',
    userName: 'Youssef Karim',
    userNameAr: 'يوسف كريم',
    itemType: 'Backpack',
    itemTypeAr: 'حقيبة ظهر',
    description: 'Black backpack with laptop and books inside',
    descriptionAr: 'حقيبة ظهر سوداء تحتوي على حاسوب وكتب',
    location: 'Bus 12345 ABC',
    locationAr: 'حافلة 12345 ABC',
    date: '2026-05-19',
    time: '09:30',
    vehicleId: 'bus-001',
    status: 'found',
    createdAt: '2026-05-19T10:00:00Z',
    updatedAt: '2026-05-20T11:00:00Z',
    foundAt: '2026-05-20T11:00:00Z',
  },
];

export const mockEmergencyRequests: EmergencyRequest[] = [
  {
    id: 'emer-001',
    ticketNumber: 'EMER-999',
    userId: 'user-004',
    userName: 'Karim Hadj',
    userNameAr: 'كريم حاج',
    type: 'medical',
    typeAr: 'طوارئ طبية',
    description: 'Passenger feeling unwell, needs medical attention',
    descriptionAr: 'راكب يشعر بالمرض، يحتاج إلى عناية طبية',
    location: 'Route Centrale, near University',
    locationAr: 'الطريق المركزي، قرب الجامعة',
    status: 'resolved',
    priority: 'urgent',
    vehicleId: 'bus-002',
    createdAt: '2026-05-17T16:30:00Z',
    updatedAt: '2026-05-17T17:00:00Z',
    resolvedAt: '2026-05-17T17:00:00Z',
  },
];

export const generateTicketNumber = (prefix: string): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
};
