import { z } from 'zod';

export const phoneSchema = z.string()
  .regex(/^(\+213|0)[1-9]\d{8}$/, 'رقم هاتف غير صحيح / Numéro de téléphone invalide')
  .min(10, 'رقم هاتف غير صحيح / Numéro de téléphone invalide');

export const otpSchema = z.string()
  .regex(/^\d{6}$/, 'الكود يجب أن يكون 6 أرقام / Le code doit être 6 chiffres')
  .length(6);

export const fullNameSchema = z.string()
  .min(3, 'الاسم قصير جداً / Le nom est trop court')
  .max(100, 'الاسم طويل جداً / Le nom est trop long');

export const registrationFormSchema = z.object({
  phone: phoneSchema,
  otp: otpSchema,
  fullName: fullNameSchema,
  role: z.enum(['student', 'teacher', 'admin']),
  institution: z.string().min(1),
  subscription: z.enum(['daily', 'weekly', 'monthly']),
  homePoint: z.string().min(1),
  preferredRoute: z.string().min(1),
});

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;

export function validatePhone(phone: string): boolean {
  return phoneSchema.safeParse(phone).success;
}

export function validateOTP(otp: string): boolean {
  return otpSchema.safeParse(otp).success;
}

export function formatPhoneNumber(phone: string): string {
  // Algerian phone number formatting
  if (phone.startsWith('+213')) {
    return phone;
  }
  if (phone.startsWith('0')) {
    return `+213${phone.slice(1)}`;
  }
  return phone;
}
