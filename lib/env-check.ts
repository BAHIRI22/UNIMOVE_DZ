// UNIMOVE-DZ Environment Variable Check (Phase 15)
// Run this early in your app lifecycle to catch missing config before runtime errors.

const REQUIRED_ENV = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
  'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
  'NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET',
] as const;

export function checkEnv(): { ok: boolean; missing: string[] } {
  const missing: string[] = [];
  for (const key of REQUIRED_ENV) {
    const val = process.env[key];
    if (!val || val.trim() === '' || val.startsWith('your_')) {
      missing.push(key);
    }
  }
  return { ok: missing.length === 0, missing };
}

export function getEnvOrThrow(key: (typeof REQUIRED_ENV)[number]): string {
  const val = process.env[key];
  if (!val || val.trim() === '') {
    throw new Error(`[UNIMOVE] Missing required environment variable: ${key}`);
  }
  return val;
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}
